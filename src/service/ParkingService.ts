import { Vehicle } from "../models/Vehicle";
import { ParkingSpot } from "../models/parkingSpot";
import { SpotAllocator } from "./SpotAllocator";
import parkingSpots from "../lib/parkingSpots";

export class ParkingService {
  private static vehicleSpotMap: Map<string, ParkingSpot> = new Map();

  static parkVehicle(vehicle: Vehicle): boolean {
    const spot = SpotAllocator.findAvailableSpot(parkingSpots, vehicle);
    if (!spot) {
      console.log(`No spot available for ${vehicle.constructor.name} ${vehicle.licensePlate}`);
      return false;
    }
    spot.park(vehicle);
    this.vehicleSpotMap.set(vehicle.licensePlate, spot);
    return true;
  }

  static unparkVehicle(licensePlate: string): boolean {
    const spot = this.vehicleSpotMap.get(licensePlate);
    if (!spot) {
      console.log(`Vehicle with license plate ${licensePlate} not found`);
      return false;
    }
    spot.removeVehicle();
    this.vehicleSpotMap.delete(licensePlate);
    return true;
  }

  static getAvailableSpots(): number {
    return parkingSpots.filter(spot => spot.isAvailable()).length;
  }
}
