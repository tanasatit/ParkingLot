// ParkingSpot.ts
import mongoose from "mongoose";
import { VehicleSize } from "./VehicleSize";

// Schema
const parkingSpotSchema = new mongoose.Schema({
    levelNumber: { type: Number, required: true },
    spotNumber: { type: Number, required: true },
    spotId: { type: String, required: true , unique: true },
    size: { type: String, enum: Object.values(VehicleSize), required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", default: null },
    isOccupied: { type: Boolean, default: false},
  });

// Instance method: isAvailable
parkingSpotSchema.methods.isAvailable = function (): boolean {
  return this.vehicle === null;
};

// Instance method: canFitVehicle
parkingSpotSchema.methods.canFitVehicle = function (vehicle: typeof mongoose.Document & { getVehicleSize(): VehicleSize; canFitInSpot(spot: any): boolean }): boolean {
  return this.isAvailable() && vehicle.canFitInSpot(this);
};

// Instance method: park
parkingSpotSchema.methods.parkInSpot = async function (vehicle: mongoose.Document & { getVehicleSize(): VehicleSize }): Promise<boolean> {
  if (this.canFitVehicle(vehicle)) {
    this.vehicle = vehicle._id;
    await this.save();
    return true;
  }
  return false;
};

// Instance method: removeVehicle
parkingSpotSchema.methods.removeVehicle = async function (): Promise<void> {
    this.vehicle = null;
    this.isOccupied = false;
    await this.save();
  };

// Model export
export const ParkingSpot = mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", parkingSpotSchema);
