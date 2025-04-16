import type { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/mongodb';
import mongoose from 'mongoose';
import { Level } from '../../models/Level';
import { ParkingSpot } from '../../models/ParkingSpot';
import { Vehicle } from '../../models/Vehicle';
import { ParkingLot } from '../../models/ParkingLot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Database.getinstance().connect();
    console.log("Database connected successfully");

    // Ensure models are registered
    if (!mongoose.models.Level) {
      mongoose.model("Level", Level.schema);
    }
    if (!mongoose.models.ParkingSpot) {
      mongoose.model("ParkingSpot", ParkingSpot.schema);
    }
    if (!mongoose.models.Vehicle) {
      mongoose.model("Vehicle", Vehicle.schema);
    }
    if (!mongoose.models.ParkingLot) {
      mongoose.model("ParkingLot", ParkingLot.schema);
    }

    if (req.method === 'GET') {
      try {
        const lot = await ParkingLot.findOne().populate({
          path: 'levels',
          populate: {
            path: 'spots'
          }
        });
        
        
        if (!lot) {
          return res.status(404).json({ error: 'No parking lot found' });
        }

        return res.status(200).json(lot);
      } catch (err) {
        console.error("Error in GET handler:", err);
        return res.status(500).json({ 
          error: 'Failed to fetch parking lot', 
          details: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined
        });
      }
    }

    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("Error in main handler:", err);
    return res.status(500).json({ 
      error: 'Database connection failed', 
      details: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined
    });
  }
} 