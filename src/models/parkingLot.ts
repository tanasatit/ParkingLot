// ParkingLot.ts
import { ParkingLevel } from './ParkingLevel';
import { Vehicle } from './Vehicle';

export class ParkingLot {
  private levels: ParkingLevel[];

  constructor(levels: ParkingLevel[]) {
    this.levels = levels;
  }

  parkVehicle(vehicle: Vehicle): boolean {
    for (const level of this.levels) {
      if (level.parkVehicle(vehicle)) {
        return true;
      }
    }
    return false; // Could not park anywhere
  }

  removeVehicle(vehicle: Vehicle): boolean {
    for (const level of this.levels) {
      if (level.removeVehicle(vehicle)) {
        return true;
      }
    }
    return false;
  }

  // Helper function to remove a vehicle by license plate
  removeVehicleByLicensePlate(licensePlate: string): boolean {
    for (const level of this.levels) {
      const vehicle = level.removeVehicleByLicensePlate(licensePlate);
      if (vehicle) return true;
    }
    return false; // Vehicle not found
  }

  getTotalAvailableSpots(): number {
    return this.levels.reduce(
      (total, level) => total + level.getAvailableSpots(),
      0
    );
  }
}
