import mongoose from "mongoose";
import { VehicleSize } from './VehicleSize';
import { Vehicle } from './Vehicle';

const LevelSchema = new mongoose.Schema({
  levelNumber: { type: Number, required: true },
  spots: [{ type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpot" }],
  availableSpots: { type: Number, required: true }
});

LevelSchema.methods.parkVehicle = async function (vehicle: typeof Vehicle): Promise<boolean> {
  for (const spotId of this.spots) {
    const spot = await mongoose.model("ParkingSpot").findById(spotId);
    if (spot && spot.canFitVehicle(vehicle)) {
      await spot.park(vehicle);
      this.availableSpots -= 1;
      await this.save();
      return true;
    }
  }
  return false;
};

LevelSchema.methods.getAvailableSpots = function(): number {
  return this.availableSpots;
};

LevelSchema.statics.createLevel = async function (levelNumber: number, totalSpots: number) {
  const smallCount = Math.floor(totalSpots * 0.4);
  const mediumCount = Math.floor(totalSpots * 0.4);
  const largeCount = totalSpots - smallCount - mediumCount;

  const spotSizes = [
    ...Array(smallCount).fill(VehicleSize.SMALL),
    ...Array(mediumCount).fill(VehicleSize.MEDIUM),
    ...Array(largeCount).fill(VehicleSize.LARGE),
  ];

  const spotIds = [];

  for (let i = 0; i < totalSpots; i++) {
    try {
      const spotId = `L${levelNumber}S${i}`;
      const spot = await mongoose.model("ParkingSpot").create({
        spotId,
        levelNumber,
        spotNumber: i,
        size: spotSizes[i],
      });
      spotIds.push(spot._id);
    } catch (err) {
      console.error("Failed to create ParkingSpot:", err);
      throw err; 
    }
  }

  const level = new this({
    levelNumber,
    spots: spotIds,
    availableSpots: totalSpots,
  });

  await level.save();
  return level;
};

export const Level = (mongoose.models.Level || mongoose.model("Level", LevelSchema)) as any;




