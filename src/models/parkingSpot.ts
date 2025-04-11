// ParkingSpot.ts
import { VehicleSize } from './enums/VehicleSize';
import { Vehicle } from './Vehicle';

export class ParkingSpot {
  constructor(
    public readonly id: string,
    public readonly size: VehicleSize,
    private vehicle: Vehicle | null = null,
    private state: boolean = false
  ) {}

  isAvailable(): boolean {
    return this.vehicle === null;
  }

  canFitVehicle(vehicle: Vehicle): boolean {
    return this.isAvailable() && vehicle.getVehicleSize() <= this.size;
  }

  park(vehicle: Vehicle): boolean {
    if (this.canFitVehicle(vehicle)) {
      this.vehicle = vehicle;
      return true;
    }
    return false;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }

  getOccupiedVehicle(): Vehicle | null {
    return this.vehicle;
  }

  getId(): string {
    return this.id;
  }
}
