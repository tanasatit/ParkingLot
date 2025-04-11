// pages/api/entry.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb'; // Assuming you already have this helper for MongoDB connection

// MongoDB collection name
const COLLECTION_NAME = 'vehicles';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { licensePlate, vehicleType } = req.body;

    // Validate the incoming data
    if (!licensePlate || !vehicleType) {
      return res.status(400).json({ message: 'License plate and vehicle type are required.' });
    }

    try {
      // Get the MongoDB client and database connection
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection(COLLECTION_NAME);

      // Check if the vehicle is already in the parking lot (based on license plate)
      const existingVehicle = await collection.findOne({ licensePlate });
      if (existingVehicle) {
        return res.status(400).json({ message: 'Vehicle is already parked.' });
      }

      // Insert the new vehicle into the MongoDB collection
      const newVehicle = {
        licensePlate,
        vehicleType
      };
      await collection.insertOne(newVehicle);

      return res.status(200).json({ message: 'Vehicle entered the parking lot.', vehicle: newVehicle });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error.' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
