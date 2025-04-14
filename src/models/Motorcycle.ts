import mongoose from "mongoose";
import { Vehicle } from "./Vehicle";
import { VehicleSize } from "./VehicleSize";

const MotorcycleSchema = new mongoose.Schema({});

MotorcycleSchema.methods.canFitInSpot = function (spot: any): boolean {
  return true; 
};

export const Motorcycle = mongoose.models.Motorcycle || Vehicle.discriminator("Motorcycle", MotorcycleSchema);
