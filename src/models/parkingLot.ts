import mongoose from "mongoose";
import { Vehicle } from "./Vehicle";

const parkingLotSchema = new mongoose.Schema({
  levels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level" }],
  totalLevels: { type: Number, required: true },
});

// Instance Method: Park a vehicle
parkingLotSchema.methods.parkVehicle = async function (vehicle: typeof Vehicle) {
  for (const levelId of this.levels) {
    const level = await mongoose.model("Level").findById(levelId);
    if (level && await level.parkVehicle(vehicle)) {
      return true;
    }
  }
  return false;
};

// Define static methods
const statics = {
  getInstance: async function(this: any) {
    let lot = await this.findOne();
    if (!lot) {
      lot = await this.createParkingLot();
    }
    return lot;
  },
  createParkingLot: async function(this: any) {
    const NUM_LEVELS = 5;
    const SPOTS_PER_LEVEL = 100;
    const levelIds = [];

    for (let i = 0; i < NUM_LEVELS; i++) {
      const level = await (mongoose.model("Level") as any).createLevel(i, SPOTS_PER_LEVEL);
      levelIds.push(level._id);
    }

    const parkingLot = new this({
      levels: levelIds,
      totalLevels: NUM_LEVELS,
    });

    await parkingLot.save();
    console.log("Parking lot created successfully!");
    return parkingLot;
  }
};

Object.assign(parkingLotSchema.statics, statics);

export const ParkingLot = (mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema)) as any;
