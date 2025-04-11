// Car.ts
import { Vehicle } from './Vehicle';
import { VehicleSize } from './enums/VehicleSize';

export class Car extends Vehicle {
  getVehicleSize(): VehicleSize {
    return VehicleSize.MEDIUM;
  }
}
