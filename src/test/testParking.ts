// import { ParkingLot } from '../models/ParkingLot';
// import { ParkingLevel } from '../models/ParkingLevel';
// import { ParkingSpot } from '../models/parkingSpot';
// import { VehicleSize } from '../models/enums/VehicleSize';
// import { Car } from '../models/car';
// import { Bus } from '../models/bus';

// const level1Spots = [
//   new ParkingSpot('L1S1', VehicleSize.SMALL),
//   new ParkingSpot('L1S2', VehicleSize.MEDIUM),
//   new ParkingSpot('L1S3', VehicleSize.LARGE),
// ];

// const level2Spots = [
//   new ParkingSpot('L2S1', VehicleSize.SMALL),
//   new ParkingSpot('L2S2', VehicleSize.MEDIUM),
//   new ParkingSpot('L2S3', VehicleSize.LARGE),
// ];

// const level1 = new ParkingLevel(1, level1Spots);
// const level2 = new ParkingLevel(2, level2Spots);

// const lot = new ParkingLot([level1, level2]);

// const car = new Car('CAR001');
// const bus = new Bus('BUS999');

// console.log("Car parked:", lot.parkVehicle(car));
// console.log("Bus parked:", lot.parkVehicle(bus));
// console.log("Available spots:", lot.getTotalAvailableSpots());
// console.log("Remove bus:", lot.removeVehicle(bus));
// console.log("Available spots after removal:", lot.getTotalAvailableSpots());
