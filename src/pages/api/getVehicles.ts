import type { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/mongodb';
import { Vehicle } from '../../models/Vehicle';
import { VehicleSize } from '../../models/VehicleSize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Database.getinstance().connect();

    if (req.method === 'GET') {
      // Find all vehicles that are not parked
      const vehicles = await Vehicle.find({ parkedSpots: { $size: 0 } })
        .select('licensePlate vehicleSize')
        .lean();

      // Map the vehicles to include proper type and size information
      const mappedVehicles = vehicles.map(vehicle => {
        // Determine the vehicle type and size based on the discriminator
        let type = 'Unknown';
        let size = VehicleSize.MEDIUM; // Default size

        if (vehicle.vehicleSize === 'Car') {
          type = 'Car';
          size = VehicleSize.MEDIUM;
        } else if (vehicle.vehicleSize === 'Motorcycle') {
          type = 'Motorcycle';
          size = VehicleSize.SMALL;
        } else if (vehicle.vehicleSize === 'Bus') {
          type = 'Bus';
          size = VehicleSize.LARGE;
        }

        return {
          _id: vehicle._id,
          licensePlate: vehicle.licensePlate,
          type,
          size
        };
      });

      return res.status(200).json(mappedVehicles);
    }

    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("Error in getVehicles:", err);
    return res.status(500).json({ 
      error: 'Failed to fetch vehicles',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
} 