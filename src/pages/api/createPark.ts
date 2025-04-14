// pages/api/createpark.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/mongodb';
import { ParkingLot } from '../../models/ParkingLot';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await Database.getinstance().connect();

  if (req.method === 'POST') {
    try {
      const NUM_LEVELS = 5;
      const SPOTS_PER_LEVEL = 100;

      // If your createParkingLot is attached to ParkingLot as a static:
      const parkingLot = await ParkingLot.createParkingLot(NUM_LEVELS, SPOTS_PER_LEVEL);

      return res.status(201).json({ message: 'Parking lot created', parkingLot });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create parking lot', details: err });
    }
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
