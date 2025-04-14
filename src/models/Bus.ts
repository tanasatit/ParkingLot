import mongoose from "mongoose";
import { Vehicle } from "./Vehicle";
import { VehicleSize } from "./VehicleSize";

const busSchema = new mongoose.Schema({});

busSchema.methods.canFitInSpot = function (spot: any): boolean {
  return spot.size === VehicleSize.LARGE;
};

export const Bus = mongoose.models.Bus || Vehicle.discriminator("Bus", busSchema);
