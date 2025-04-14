import mongoose from "mongoose";
import { Vehicle } from "./Vehicle";
import { VehicleSize } from "./VehicleSize";

const carSchema = new mongoose.Schema({});

carSchema.methods.canFitInSpot = function (spot: any): boolean {
  return (
    spot.size === VehicleSize.MEDIUM ||
    spot.size === VehicleSize.LARGE
  );
};

export const Car = mongoose.models.Car || Vehicle.discriminator("Car", carSchema);
