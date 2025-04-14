import mongoose, { Document, Schema } from "mongoose";
import { VehicleSize } from "./VehicleSize";
import { Level } from "./Level";
import { ParkingSpot } from "./ParkingSpot";

const vehicleSchema = new mongoose.Schema(
  {
    licensePlate: { 
      type: String, 
      required: true, 
      unique: true },

    vehicleSize: {
      type: String,
      enum: Object.values(VehicleSize),
      required: true,
    },
    parkedSpots: [{ type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot" }],
  },
  {
    discriminatorKey: "vehicleSize", 
    collection: "vehicles"
  }
);

// Add getVehicleSize method
vehicleSchema.methods.getVehicleSize = function(): VehicleSize {
  return this.vehicleSize;
};

// park in a spot
vehicleSchema.methods.parkInSpot = async function (spot: any) {
  spot.isOccupied = true;
  spot.vehicle = this._id;
  await spot.save();

  this.parkedSpots.push(spot._id);
  await this.save();

  const level = await Level.findById(spot.level);
  if (level) {
    level.availableSpots -= 1;
    await level.save();
  }
};

// unpark from spot
vehicleSchema.methods.clearSpots = async function () {
  const spots = await ParkingSpot.find({ _id: { $in: this.parkedSpots } });

  for (const spot of spots) {
    spot.vehicle = null;
    spot.isOccupied = false;
    await spot.save();

    const level = await Level.findById(spot.level);
    if (level) {
      level.availableSpots += 1;
      await level.save();
    }
  }

  this.parkedSpots = [];
  await this.save();
};

vehicleSchema.methods.canFitInSpot = async function (spot: any) {
    return (
      spot.size === this.size ||
    	(spot.size === "MEDIUM" && this.size === "SMALL") ||
    	(spot.size === "SMALL" && this.size === "MEDIUM")
    )
}

export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
