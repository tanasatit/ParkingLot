// Truck.ts
import { Vehicle } from './Vehicle';
import { VehicleSize } from './enums/VehicleSize';

export class Truck extends Vehicle {
  getVehicleSize(): VehicleSize {
    return VehicleSize.LARGE;
  }
}
