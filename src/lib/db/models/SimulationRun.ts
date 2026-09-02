import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISimulationRun extends Document {
  crop: string;
  quantityKg: number;
  fuelPricePerLiter: number;
  ambientTemperatureC: number;
  transitDelayHours: number;
  recommendedRouteName: string;
  recommendedDestination: string;
  netRealizationPerKg: number;
  totalLotPayout: number;
  baselineMandiPayout: number;
  totalLotGain: number;
  gainPercentage: number;
  spoilagePct: number;
  createdAt: Date;
}

const SimulationRunSchema = new Schema<ISimulationRun>({
  crop: { type: String, required: true },
  quantityKg: { type: Number, required: true },
  fuelPricePerLiter: { type: Number, required: true },
  ambientTemperatureC: { type: Number, required: true },
  transitDelayHours: { type: Number, required: true },
  recommendedRouteName: { type: String, required: true },
  recommendedDestination: { type: String, required: true },
  netRealizationPerKg: { type: Number, required: true },
  totalLotPayout: { type: Number, required: true },
  baselineMandiPayout: { type: Number, required: true },
  totalLotGain: { type: Number, required: true },
  gainPercentage: { type: Number, required: true },
  spoilagePct: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const SimulationRun: Model<ISimulationRun> =
  mongoose.models.SimulationRun || mongoose.model<ISimulationRun>('SimulationRun', SimulationRunSchema);
