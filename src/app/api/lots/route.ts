import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db/mongodb';
import { HarvestLot } from '../../../lib/db/models/HarvestLot';

// In-memory fallback if MongoDB is not configured
const inMemoryLots: any[] = [
  {
    _id: 'mock-01',
    farmerName: 'Farmer Gurmail Singh',
    farmerId: 'farm-01',
    crop: 'Tomato',
    quantityKg: 5000,
    originDistrict: 'Jalandhar (Nakodar)',
    maxTransitHours: 48,
    qualityGrade: 'A',
    createdAt: new Date(),
  },
];

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({
        success: true,
        source: 'in-memory-fallback',
        message: 'MongoDB URI not configured. Returning in-memory lot store.',
        data: inMemoryLots,
      });
    }

    const lots = await HarvestLot.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({
      success: true,
      source: 'mongodb',
      data: lots,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch harvest lots' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    if (!db) {
      const mockSaved = {
        _id: `mock-${Date.now()}`,
        ...body,
        createdAt: new Date(),
      };
      inMemoryLots.unshift(mockSaved);
      return NextResponse.json({
        success: true,
        source: 'in-memory-fallback',
        message: 'Lot saved to local memory (Connect MongoDB Atlas for persistent cloud storage).',
        data: mockSaved,
      });
    }

    const newLot = await HarvestLot.create(body);
    return NextResponse.json({
      success: true,
      source: 'mongodb',
      message: 'Harvest lot saved to MongoDB Atlas successfully.',
      data: newLot,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save harvest lot' },
      { status: 500 }
    );
  }
}
