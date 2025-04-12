// ParkingLevel.ts
import { VehicleSize } from './enums/VehicleSize';
import { ParkingSpot } from './parkingSpot';
import { Vehicle } from './Vehicle';



export class ParkingLevel {
  private spots: ParkingSpot[];
  private static readonly SPOTS_PER_ROW = 10;

  constructor(public readonly levelNumber: number, totalSpots: number) {
    this.spots = [];

    const smallSpots = Math.floor(totalSpots * 0.25);
    const mediunSpots = Math.floor(totalSpots * 0.5);
    const largeSpots = Math.floor(totalSpots * 0.2);
    const extralargeSpots = totalSpots - smallSpots - mediunSpots - largeSpots;

    for (let i=0; i<totalSpots; i++){
        let size = VehicleSize.EXTRA_LARGE;
        if (i < smallSpots) size = VehicleSize.SMALL;
        else if (i < smallSpots + mediunSpots) size = VehicleSize.MEDIUM;
        else if (i < smallSpots + mediunSpots + largeSpots ) size = VehicleSize.LARGE;

        const row = Math.floor(i / ParkingLevel.SPOTS_PER_ROW);
        const spot = new ParkingSpot(
            `L${levelNumber}-S${i}`,
            size,
            levelNumber,
            i
          );
          this.spots.push(spot);
    }
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


