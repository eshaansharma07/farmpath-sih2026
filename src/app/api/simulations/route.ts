import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db/mongodb';
import { SimulationRun } from '../../../lib/db/models/SimulationRun';

const inMemorySimulations: any[] = [];

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return NextResponse.json({
        success: true,
        source: 'in-memory-fallback',
        message: 'MongoDB URI not configured. Returning in-memory simulation runs.',
        data: inMemorySimulations,
      });
    }

    const runs = await SimulationRun.find().sort({ createdAt: -1 }).limit(20);
    return NextResponse.json({
      success: true,
      source: 'mongodb',
      data: runs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch simulations' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();

    if (!db) {
      const mockRun = {
        _id: `mock-sim-${Date.now()}`,
        ...body,
        createdAt: new Date(),
      };
      inMemorySimulations.unshift(mockRun);
      return NextResponse.json({
        success: true,
        source: 'in-memory-fallback',
        message: 'Simulation saved to memory. Configure MONGODB_URI to persist to MongoDB Atlas.',
        data: mockRun,
      });
    }

    const newRun = await SimulationRun.create(body);
    return NextResponse.json({
      success: true,
      source: 'mongodb',
      message: 'Simulation run successfully recorded in MongoDB Atlas.',
      data: newRun,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save simulation run' },
      { status: 500 }
    );
  }
}
