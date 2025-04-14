// pages/api/addvehicle.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/mongodb';
import mongoose from 'mongoose';
import { Vehicle } from '../../models/Vehicle';
import { Car } from '../../models/Car';
import { Motorcycle } from '../../models/Motorcycle';
import { Bus } from '../../models/Bus';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await Database.getinstance().connect();
    console.log("Database connected successfully");

    const { licensePlate, vehicleType } = req.body;

    if (!licensePlate || !vehicleType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let vehicle;
    switch (vehicleType) {
      case 'Car':
        vehicle = new Car({ licensePlate });
        break;
      case 'Motorcycle':
        vehicle = new Motorcycle({ licensePlate });
        break;
      case 'Bus':
        vehicle = new Bus({ licensePlate });
        break;
      default:
        return res.status(400).json({ error: 'Invalid vehicle type' });
    }

    await vehicle.save();
    console.log("Vehicle saved successfully:", vehicle);

    return res.status(201).json({
      message: 'Vehicle added successfully',
      vehicle: {
        _id: vehicle._id,
        licensePlate: vehicle.licensePlate,
        type: vehicleType
      }
    });

  } catch (error) {
    console.error("Error in addVehicle:", error);
    return res.status(500).json({ 
      error: 'Failed to add vehicle',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
