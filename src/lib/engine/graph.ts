import { SupplyChainNode, SupplyChainEdge, CropLot } from './types';
import { PUNJAB_NODES, PUNJAB_EDGES, calculateRoadDistanceKm } from '../data/punjabData';

export interface CandidatePath {
  nodes: SupplyChainNode[];
  edges: SupplyChainEdge[];
  totalDistanceKm: number;
  totalTransitHours: number;
}

/**
 * Builds candidate paths across the agricultural supply-chain graph starting from the farm node.
 * Models realistic routes:
 * - Path Type 1: Farm -> Mandi -> Retailer (Traditional Multi-Intermediary APMC Channel)
 * - Path Type 2: Farm -> Collection Center -> Agro-Processor (Direct Processing Channel)
 * - Path Type 3: Farm -> Collection Center -> Institutional Buyer (Direct Modern Trade)
 * - Path Type 4: Farm -> Collection Center -> Mandi -> Retailer (Cooperative Mandi Dispatch)
 * - Path Type 5: Farm -> Mandi -> Institutional Buyer (Mandi-Brokered Bulk)
 * - Path Type 6: Farm -> Interstate Gateway Mandi -> Retailer (Long-Haul Metro Transit)
 * - Path Type 7: Farm -> Agro-Processor (Direct Farmgate Sourcing)
 */
export function discoverCandidatePaths(
  farmNode: SupplyChainNode,
  nodes: SupplyChainNode[] = PUNJAB_NODES,
  edges: SupplyChainEdge[] = PUNJAB_EDGES
): CandidatePath[] {
  const nodeMap = new Map(nodes.map(n => [n.id, n]));
  const edgeMap = new Map(edges.map(e => [`${e.fromNodeId}->${e.toNodeId}`, e]));

  function getEdge(fromId: string, toId: string): SupplyChainEdge {
    const key = `${fromId}->${toId}`;
    if (edgeMap.has(key)) {
      return edgeMap.get(key)!;
    }
    // Fallback dynamic edge if not explicitly pre-indexed
    const from = nodeMap.get(fromId)!;
    const to = nodeMap.get(toId)!;
    const dist = calculateRoadDistanceKm(from.location.lat, from.location.lng, to.location.lat, to.location.lng);
    const speed = dist > 50 ? 45 : 35;
    return {
      id: `dyn-edge-${fromId}-${toId}`,
      fromNodeId: fromId,
      toNodeId: toId,
      distanceKm: dist,
      travelTimeHours: Math.round((dist / speed + 0.5) * 10) / 10,
      baseFreightPerKm: 2.8,
      roadQualityFactor: 1.1,
      tollAndInterstatePerTrip: dist > 60 ? 150 : 0,
      spoilageRiskBasePct: 0.03,
      isColdChain: false,
    };
  }

  const candidatePaths: CandidatePath[] = [];

  const ccs = nodes.filter(n => n.type === 'collection_center');
  const mandis = nodes.filter(n => n.type === 'mandi');
  const procs = nodes.filter(n => n.type === 'processor');
  const insts = nodes.filter(n => n.type === 'institutional_buyer');
  const rets = nodes.filter(n => n.type === 'retail');

  // Helper to compile path
  function assemblePath(pathNodes: SupplyChainNode[]): CandidatePath {
    const pathEdges: SupplyChainEdge[] = [];
    let totalDist = 0;
    let totalTime = 0;

    for (let i = 0; i < pathNodes.length - 1; i++) {
      const e = getEdge(pathNodes[i].id, pathNodes[i + 1].id);
      pathEdges.push(e);
      totalDist += e.distanceKm;
      totalTime += e.travelTimeHours + (pathNodes[i + 1].processingTimeHours || 0);
    }

    return {
      nodes: pathNodes,
      edges: pathEdges,
      totalDistanceKm: Math.round(totalDist * 10) / 10,
      totalTransitHours: Math.round(totalTime * 10) / 10,
    };
  }

  // 1. Farm -> CC -> Processor
  ccs.slice(0, 4).forEach(cc => {
    procs.forEach(proc => {
      candidatePaths.push(assemblePath([farmNode, cc, proc]));
    });
  });

  // 2. Farm -> CC -> Institutional Buyer
  ccs.slice(0, 4).forEach(cc => {
    insts.slice(0, 6).forEach(inst => {
      candidatePaths.push(assemblePath([farmNode, cc, inst]));
    });
  });

  // 3. Farm -> Mandi -> Retailer (Traditional Mandi Channel)
  mandis.forEach(mandi => {
    rets.slice(0, 4).forEach(ret => {
      candidatePaths.push(assemblePath([farmNode, mandi, ret]));
    });
  });

  // 4. Farm -> Mandi -> Processor
  mandis.slice(0, 3).forEach(mandi => {
    procs.slice(0, 3).forEach(proc => {
      candidatePaths.push(assemblePath([farmNode, mandi, proc]));
    });
  });

  // 5. Farm -> Mandi -> Institutional Buyer
  mandis.slice(0, 3).forEach(mandi => {
    insts.slice(0, 4).forEach(inst => {
      candidatePaths.push(assemblePath([farmNode, mandi, inst]));
    });
  });

  // 6. Direct Farmgate -> Processor (Only for very close processors)
  procs.slice(0, 2).forEach(proc => {
    candidatePaths.push(assemblePath([farmNode, proc]));
  });

  // 7. Long haul: Farm -> Delhi Mandi-06 -> Delhi/Chandigarh Retailer
  const delhiMandi = mandis.find(m => m.id === 'mandi-06');
  if (delhiMandi) {
    candidatePaths.push(assemblePath([farmNode, delhiMandi, rets[2]])); // Sector 26
    candidatePaths.push(assemblePath([farmNode, delhiMandi, rets[0]])); // Ludhiana
  }

  return candidatePaths;
}
