"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSpot = void 0;
var ParkingSpot = /** @class */ (function () {
    function ParkingSpot(id, size, vehicle, state) {
        if (vehicle === void 0) { vehicle = null; }
        if (state === void 0) { state = false; }
        this.id = id;
        this.size = size;
        this.vehicle = vehicle;
        this.state = state;
    }
    ParkingSpot.prototype.isAvailable = function () {
        return this.vehicle === null;
    };
    ParkingSpot.prototype.canFitVehicle = function (vehicle) {
        return this.isAvailable() && vehicle.getVehicleSize() <= this.size;
    };
    ParkingSpot.prototype.park = function (vehicle) {
        if (this.canFitVehicle(vehicle)) {
            this.vehicle = vehicle;
            return true;
        }
        return false;
    };
    ParkingSpot.prototype.removeVehicle = function () {
        this.vehicle = null;
    };
    ParkingSpot.prototype.getOccupiedVehicle = function () {
        return this.vehicle;
    };
    ParkingSpot.prototype.getId = function () {
        return this.id;
    };
    return ParkingSpot;
}());
exports.ParkingSpot = ParkingSpot;
