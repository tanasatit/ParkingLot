import type { NextApiRequest, NextApiResponse } from 'next';
import Database from '../../lib/mongodb';
import mongoose from 'mongoose';
import { ParkingSpot } from '../../models/ParkingSpot';
import { Vehicle } from '../../models/Vehicle';
import { VehicleSize } from '../../models/VehicleSize';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await Database.getinstance().connect();

    if (req.method === 'GET') {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'Spot ID is required' });
      }

      const spot = await ParkingSpot.findById(id);
      if (!spot) {
        return res.status(404).json({ error: 'Spot not found' });
      }

      let vehicleInfo = null;
      if (spot.vehicle) {
        const vehicle = await Vehicle.findById(spot.vehicle);
        if (vehicle) {
          // Determine vehicle type and size
          let type = 'Unknown';
          let size = VehicleSize.MEDIUM;

          if (vehicle.vehicleSize === VehicleSize.SMALL) {
            type = 'Motorcycle';
            size = VehicleSize.SMALL;
          } else if (vehicle.vehicleSize === VehicleSize.LARGE) {
            type = 'Bus';
            size = VehicleSize.LARGE;
          } else {
            type = 'Car';
            size = VehicleSize.MEDIUM;
          }

          vehicleInfo = {
            licensePlate: vehicle.licensePlate,
            type,
            size
          };
        }
      }

      return res.status(200).json({
        ...spot.toObject(),
        vehicleInfo
      });
    }

    if (req.method === 'POST') {
      const { id, action, vehicleId } = req.body;
      if (!id || !action) {
        return res.status(400).json({ error: 'Spot ID and action are required' });
      }

      const spot = await ParkingSpot.findById(id);
      if (!spot) {
        return res.status(404).json({ error: 'Spot not found' });
      }

      if (action === 'park' && vehicleId) {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
          return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Check if vehicle is already parked
        if (vehicle.parkedSpots.length > 0) {
          return res.status(400).json({ error: 'Vehicle is already parked' });
        }

        // Map vehicle type to size
        let vehicleSize = VehicleSize.MEDIUM;
        if (vehicle.vehicleSize === 'Motorcycle') {
          vehicleSize = VehicleSize.SMALL;
        } else if (vehicle.vehicleSize === 'Bus') {
          vehicleSize = VehicleSize.LARGE;
        }

        // Update vehicle size to enum value
        vehicle.vehicleSize = vehicleSize;
        await vehicle.save();

        // Check if vehicle can fit in the spot
        if (spot.size === VehicleSize.SMALL && vehicleSize !== VehicleSize.SMALL) {
          return res.status(400).json({ error: 'Vehicle cannot fit in this spot' });
        }
        if (spot.size === VehicleSize.MEDIUM && vehicleSize === VehicleSize.LARGE) {
          return res.status(400).json({ error: 'Vehicle cannot fit in this spot' });
        }

        spot.vehicle = vehicle._id;
        spot.isOccupied = true;
        await spot.save();

        vehicle.parkedSpots.push(spot._id);
        await vehicle.save();
        
        return res.status(200).json({ message: 'Vehicle parked successfully' });
      } else if (action === 'unpark') {
        if (!spot.vehicle) {
          return res.status(400).json({ error: 'No vehicle parked in this spot' });
        }

        const vehicle = await Vehicle.findById(spot.vehicle);
        if (vehicle) {
          vehicle.parkedSpots = vehicle.parkedSpots.filter(
            (spotId: mongoose.Types.ObjectId) => spotId.toString() !== spot._id.toString()
          );
          await vehicle.save();
        }

        spot.vehicle = null;
        spot.isOccupied = false;
        await spot.save();
        
        return res.status(200).json({ message: 'Vehicle unparked successfully' });
      }

      return res.status(400).json({ error: 'Invalid action' });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err) {
    console.error("Error in editSpot:", err);
    return res.status(500).json({ 
      error: 'Failed to process request',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
} 