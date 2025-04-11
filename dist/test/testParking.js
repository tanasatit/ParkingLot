"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParkingLot_1 = require("../models/ParkingLot");
var ParkingLevel_1 = require("../models/ParkingLevel");
var parkingSpot_1 = require("../models/parkingSpot");
var VehicleSize_1 = require("../models/enums/VehicleSize");
var car_1 = require("../models/car");
var bus_1 = require("../models/bus");
var level1Spots = [
    new parkingSpot_1.ParkingSpot('L1S1', VehicleSize_1.VehicleSize.SMALL),
    new parkingSpot_1.ParkingSpot('L1S2', VehicleSize_1.VehicleSize.MEDIUM),
    new parkingSpot_1.ParkingSpot('L1S3', VehicleSize_1.VehicleSize.LARGE),
];
var level2Spots = [
    new parkingSpot_1.ParkingSpot('L2S1', VehicleSize_1.VehicleSize.SMALL),
    new parkingSpot_1.ParkingSpot('L2S2', VehicleSize_1.VehicleSize.MEDIUM),
    new parkingSpot_1.ParkingSpot('L2S3', VehicleSize_1.VehicleSize.LARGE),
];
var level1 = new ParkingLevel_1.ParkingLevel(1, level1Spots);
var level2 = new ParkingLevel_1.ParkingLevel(2, level2Spots);
var lot = new ParkingLot_1.ParkingLot([level1, level2]);
var car = new car_1.Car('CAR001');
var bus = new bus_1.Bus('BUS999');
console.log("Car parked:", lot.parkVehicle(car));
console.log("Bus parked:", lot.parkVehicle(bus));
console.log("Available spots:", lot.getTotalAvailableSpots());
console.log("Remove bus:", lot.removeVehicle(bus));
console.log("Available spots after removal:", lot.getTotalAvailableSpots());
