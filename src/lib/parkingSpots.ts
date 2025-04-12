import { ParkingSpot } from "../models/parkingSpot";
import { VehicleSize } from "../models/enums/VehicleSize";

const parkingSpots: ParkingSpot[] = [];

for (let i = 0; i < 10; i++) {
  let size = VehicleSize.SMALL;
  if (i >= 3 && i < 7) size = VehicleSize.MEDIUM;
  if (i >= 7) size = VehicleSize.LARGE;
  parkingSpots.push(new ParkingSpot(`L1S${i+1}`,size, 2, 15));
}

export default parkingSpots;