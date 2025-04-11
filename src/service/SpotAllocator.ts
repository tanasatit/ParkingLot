import { ParkingSpot } from "../models/parkingSpot";
import { Vehicle } from "../models/Vehicle";

export class SpotAllocator {
  static findAvailableSpot(spots: ParkingSpot[], vehicle: Vehicle): ParkingSpot | null {
    for (const spot of spots) {
      if (spot.isAvailable() && spot.canFitVehicle(vehicle)) {
        return spot;
      }
    }
    return null;
  }
}
