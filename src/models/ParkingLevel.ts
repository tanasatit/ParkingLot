// ParkingLevel.ts
import { ParkingSpot } from './parkingSpot';
import { Vehicle } from './Vehicle';



export class ParkingLevel {
  private spots: ParkingSpot[];

  constructor(private levelNumber: number, spots: ParkingSpot[]) {
    this.spots = spots;
  }

  parkVehicle(vehicle: Vehicle): boolean {
    for (const spot of this.spots) {
      if (spot.canFitVehicle(vehicle)) {
        const success = spot.park(vehicle);
        if (success) {
          console.log(`Parked at Level ${this.levelNumber}, Spot ${spot.getId()}`);
        }
        return success;
      }
    }
    return false;
  }

  removeVehicle(vehicle: Vehicle): boolean {
    for (const spot of this.spots) {
      if (spot.getOccupiedVehicle() === vehicle) {
        spot.removeVehicle();
        return true;
      }
    }
    return false;
  }

  removeVehicleByLicensePlate(licensePlate: string): Vehicle | null {
    for (const spot of this.spots) {
      const vehicle = spot.getOccupiedVehicle();
      if (vehicle && vehicle.licensePlate === licensePlate) {
        spot.removeVehicle();
        return vehicle;
      }
    }
    return null;
  }

  getAvailableSpots(): number {
    return this.spots.filter(spot => spot.isAvailable()).length;
  }

  
  
}


