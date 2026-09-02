import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHarvestLot extends Document {
  farmerName: string;
  farmerId: string;
  crop: string;
  quantityKg: number;
  originDistrict: string;
  maxTransitHours: number;
  qualityGrade: string;
  createdAt: Date;
}

const HarvestLotSchema = new Schema<IHarvestLot>({
  farmerName: { type: String, required: true, default: 'Farmer Gurmail Singh' },
  farmerId: { type: String, required: true, default: 'farm-01' },
  crop: { type: String, required: true, enum: ['Tomato', 'Onion', 'Potato', 'Wheat'], default: 'Tomato' },
  quantityKg: { type: Number, required: true, default: 5000 },
  originDistrict: { type: String, required: true, default: 'Jalandhar' },
  maxTransitHours: { type: Number, required: true, default: 48 },
  qualityGrade: { type: String, required: true, default: 'A' },
  createdAt: { type: Date, default: Date.now },
});

export const HarvestLot: Model<IHarvestLot> = 
  mongoose.models.HarvestLot || mongoose.model<IHarvestLot>('HarvestLot', HarvestLotSchema);
