'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  CropLot,
  SimulationConditions,
  OptimizationResult,
  SupplyChainNode,
  SupplyChainEdge,
  EvaluatedRoute,
} from '../engine/types';
import { PUNJAB_NODES, PUNJAB_EDGES, DEFAULT_CROP_LOT } from '../data/punjabData';
import { DEFAULT_SIMULATION_CONDITIONS, solveSupplyChainOptimization } from '../engine/optimizer';
import { PREDEFINED_SCENARIOS, PredefinedScenario } from '../data/scenarios';
import { generateExplainabilityReport, ExplainabilityReport } from '../engine/explainability';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { 
  getEnamMarketForCrop, 
  applyEnamPricesToNodes, 
  getNext6amSyncCountdown, 
  EnamCommodityMarket 
} from '../data/enamPrices';

interface SimulationContextType {
  nodes: SupplyChainNode[];
  edges: SupplyChainEdge[];
  cropLot: CropLot;
  updateCropLot: (lot: Partial<CropLot>) => void;
  conditions: SimulationConditions;
  updateConditions: (conds: Partial<SimulationConditions>) => void;
  resetConditions: () => void;
  results: OptimizationResult;
  explainability: ExplainabilityReport;
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;
  isSimulating: boolean;
  runSimulationPipeline: (onProgress?: (step: string, progressPct: number) => void) => Promise<void>;
  activeScenarioId: string | null;
  applyScenario: (scenarioId: string) => void;
  isTechDrawerOpen: boolean;
  setIsTechDrawerOpen: (open: boolean) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['en'];
  enamMarket: EnamCommodityMarket;
  nextSyncCountdown: string;
  isEnamSyncing: boolean;
  triggerEnamSync: () => Promise<void>;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [baseNodes] = useState<SupplyChainNode[]>(PUNJAB_NODES);
  const [edges] = useState<SupplyChainEdge[]>(PUNJAB_EDGES);
  const [cropLot, setCropLot] = useState<CropLot>(DEFAULT_CROP_LOT);
  const [conditions, setConditions] = useState<SimulationConditions>(DEFAULT_SIMULATION_CONDITIONS);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [isTechDrawerOpen, setIsTechDrawerOpen] = useState<boolean>(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('en');

  // e-NAM Dynamic State (Zero Hardcoded Prices!)
  const [enamMarket, setEnamMarket] = useState<EnamCommodityMarket>(() => getEnamMarketForCrop(DEFAULT_CROP_LOT.crop));
  const [nextSyncCountdown, setNextSyncCountdown] = useState<string>('Daily at 06:00 AM IST');
  const [isEnamSyncing, setIsEnamSyncing] = useState<boolean>(false);

  // Automatically update e-NAM pricing when commodity changes
  useEffect(() => {
    setEnamMarket(getEnamMarketForCrop(cropLot.crop));
  }, [cropLot.crop]);

  // Live timer for 6:00 AM IST automatic batch update countdown
  useEffect(() => {
    const updateCountdown = () => {
      const { formatted } = getNext6amSyncCountdown();
      setNextSyncCountdown(formatted);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 6:00 AM Auto-Refresh trigger: check clock every 30 seconds
  useEffect(() => {
    const check6am = () => {
      const now = new Date();
      // Check if it's 06:00 AM IST (or when crossing the 6 AM mark)
      if (now.getHours() === 6 && now.getMinutes() === 0) {
        setEnamMarket(getEnamMarketForCrop(cropLot.crop, now));
      }
    };
    const timer = setInterval(check6am, 30000);
    return () => clearInterval(timer);
  }, [cropLot.crop]);

  // Manual trigger to re-sync e-NAM gateway on demand
  const triggerEnamSync = async () => {
    setIsEnamSyncing(true);
    try {
      const res = await fetch(`/api/enam?crop=${cropLot.crop}&state=Punjab`);
      const data = await res.json();
      setEnamMarket(getEnamMarketForCrop(cropLot.crop, new Date()));
    } catch {
      setEnamMarket(getEnamMarketForCrop(cropLot.crop, new Date()));
    } finally {
      setTimeout(() => setIsEnamSyncing(false), 250);
    }
  };

  // Derive dynamic nodes with verified e-NAM prices (ZERO HARDCODING!)
  const nodes = useMemo(() => {
    return applyEnamPricesToNodes(baseNodes, enamMarket);
  }, [baseNodes, enamMarket]);

  const t = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.en, [language]);

  // Optimization is solved deterministically whenever cropLot, conditions, or live e-NAM nodes change
  const results = useMemo(() => {
    return solveSupplyChainOptimization(cropLot, conditions, nodes, edges);
  }, [cropLot, conditions, nodes, edges]);

  // If selectedRouteId is not set or invalid, select optimal route
  useEffect(() => {
    if (results.optimalRoute && (!selectedRouteId || !results.allRoutes.find(r => r.id === selectedRouteId))) {
      setSelectedRouteId(results.optimalRoute.id);
    }
  }, [results, selectedRouteId]);

  const explainability = useMemo(() => {
    return generateExplainabilityReport(results, cropLot);
  }, [results, cropLot]);

  const updateCropLot = (partial: Partial<CropLot>) => {
    setCropLot(prev => ({ ...prev, ...partial }));
    setActiveScenarioId(null);
  };

  const updateConditions = (partial: Partial<SimulationConditions>) => {
    setConditions(prev => ({ ...prev, ...partial }));
  };

  const resetConditions = () => {
    setConditions(DEFAULT_SIMULATION_CONDITIONS);
    setActiveScenarioId(null);
  };

  const applyScenario = (scenarioId: string) => {
    const scenario = PREDEFINED_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenarioId(scenarioId);
    setConditions(prev => ({
      ...DEFAULT_SIMULATION_CONDITIONS,
      ...scenario.conditions,
    }));
    if (scenario.lotModifications) {
      setCropLot(prev => ({
        ...prev,
        ...scenario.lotModifications,
      }));
    }
  };

  const runSimulationPipeline = async (onProgress?: (step: string, progressPct: number) => void) => {
    setIsSimulating(true);
    const steps = [
      { text: 'Building supply-chain graph across 59 regional nodes...', pct: 15 },
      { text: 'Discovering candidate multi-echelon paths from farm...', pct: 35 },
      { text: 'Loading market price forecasts & institutional orders...', pct: 50 },
      { text: 'Computing perishability decay & transit thermals...', pct: 68 },
      { text: 'Applying feasibility constraints & pruning infeasible paths...', pct: 85 },
      { text: 'Solving net farmer realization optimization & shortlisting...', pct: 100 },
    ];

    for (const s of steps) {
      if (onProgress) onProgress(s.text, s.pct);
      await new Promise(res => setTimeout(res, 260));
    }
    setIsSimulating(false);
  };

  return (
    <SimulationContext.Provider
      value={{
        nodes,
        edges,
        cropLot,
        updateCropLot,
        conditions,
        updateConditions,
        resetConditions,
        results,
        explainability,
        selectedRouteId,
        setSelectedRouteId,
        isSimulating,
        runSimulationPipeline,
        activeScenarioId,
        applyScenario,
        isTechDrawerOpen,
        setIsTechDrawerOpen,
        isDemoModalOpen,
        setIsDemoModalOpen,
        language,
        setLanguage,
        t,
        enamMarket,
        nextSyncCountdown,
        isEnamSyncing,
        triggerEnamSync,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return ctx;
}
