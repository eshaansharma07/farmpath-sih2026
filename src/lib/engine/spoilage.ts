import { CropType } from './types';

export interface SpoilageParameters {
  crop: CropType;
  transitHours: number;
  ambientTempC: number;
  isColdChain: boolean;
  roadVibrationMultiplier: number;
}

// Crop-specific perishability baseline parameters
// Tomatoes: high moisture, respiratory climacteric fruit -> rapid degradation
// Onions: cured allium, low respiration -> slow spoilage
// Potatoes: storable tubers, vulnerable to greening & bruising
// Wheat: low-moisture cereal grain, very low spoilage under dry conditions
const CROP_DECAY_RATES: Record<CropType, { k: number; tempSensitivity: number; maxAllowedLossPct: number }> = {
  Tomato: { k: 0.0035, tempSensitivity: 0.05, maxAllowedLossPct: 10.0 },
  Onion: { k: 0.0008, tempSensitivity: 0.02, maxAllowedLossPct: 12.0 },
  Potato: { k: 0.0006, tempSensitivity: 0.015, maxAllowedLossPct: 8.0 },
  Wheat: { k: 0.0001, tempSensitivity: 0.005, maxAllowedLossPct: 5.0 },
};

/**
 * Calculates expected spoilage percentage based on Arrhenius-like temperature acceleration,
 * transit duration, cold chain presence, and road vibration.
 * 
 * Formula:
 * Loss% = 100 * [ 1 - exp( -k * (1 + beta*(T - 20)) * t_hours * alpha_cold * gamma_vibration ) ]
 */
export function calculateExpectedSpoilagePct(params: SpoilageParameters): number {
  const { crop, transitHours, ambientTempC, isColdChain, roadVibrationMultiplier } = params;
  const config = CROP_DECAY_RATES[crop] || CROP_DECAY_RATES.Tomato;

  // Temperature factor (reference 20°C standard cool storage)
  const tempDelta = Math.max(0, ambientTempC - 20);
  const tempMultiplier = 1 + config.tempSensitivity * tempDelta;

  // Cold-chain refrigerated reefer reduces decay by 75%
  const coldChainFactor = isColdChain ? 0.25 : 1.0;

  // Transit mechanical shock & vibration factor
  const vibrationFactor = Math.max(0.8, roadVibrationMultiplier);

  // Total decay exponent
  const exponent = config.k * tempMultiplier * transitHours * coldChainFactor * vibrationFactor;

  // Spoilage percentage: 1 - e^(-exponent)
  const spoilageFraction = 1 - Math.exp(-exponent);
  const spoilagePct = Math.min(45, Math.max(0.5, spoilageFraction * 100));

  return Math.round(spoilagePct * 10) / 10;
}

export function getMaxAllowedSpoilagePct(crop: CropType): number {
  return CROP_DECAY_RATES[crop]?.maxAllowedLossPct || 10.0;
}
