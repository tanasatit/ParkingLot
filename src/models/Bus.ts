// Bus.ts
import { Vehicle } from './Vehicle';
import { VehicleSize } from './enums/VehicleSize';

export class Bus extends Vehicle {
  getVehicleSize(): VehicleSize {
    return VehicleSize.EXTRA_LARGE;
  }
}
