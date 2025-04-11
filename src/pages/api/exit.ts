// pages/api/exit.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const COLLECTION_NAME = 'vehicles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { licensePlate } = req.body;

    if (!licensePlate) {
      return res.status(400).json({ message: 'License plate is required.' });
    }

    try {
      // Get the MongoDB client and database connection
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection(COLLECTION_NAME);

      // Check if the vehicle exists
      const vehicle = await collection.findOne({ licensePlate });
      if (!vehicle) {
        return res.status(400).json({ message: 'Vehicle not found or already removed.' });
      }

      // Remove the vehicle from the parking lot
      await collection.deleteOne({ licensePlate });

      return res.status(200).json({ message: 'Vehicle removed successfully.' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
