import { VehicleSize } from './enums/VehicleSize';

export abstract class Vehicle {
  constructor(public licensePlate: string) {}

  abstract getVehicleSize(): VehicleSize;
}
