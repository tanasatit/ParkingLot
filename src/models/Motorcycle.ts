// Motorcycle.ts
import { Vehicle } from './Vehicle';
import { VehicleSize } from './enums/VehicleSize';

export class Motorcycle extends Vehicle {
  getVehicleSize(): VehicleSize {
    return VehicleSize.SMALL;
  }
}
