"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLot = void 0;
var ParkingLot = /** @class */ (function () {
    function ParkingLot(levels) {
        this.levels = levels;
    }
    ParkingLot.prototype.parkVehicle = function (vehicle) {
        for (var _i = 0, _a = this.levels; _i < _a.length; _i++) {
            var level = _a[_i];
            if (level.parkVehicle(vehicle)) {
                return true;
            }
        }
        return false; // Could not park anywhere
    };
    ParkingLot.prototype.removeVehicle = function (vehicle) {
        for (var _i = 0, _a = this.levels; _i < _a.length; _i++) {
            var level = _a[_i];
            if (level.removeVehicle(vehicle)) {
                return true;
            }
        }
        return false;
    };
    // Helper function to remove a vehicle by license plate
    ParkingLot.prototype.removeVehicleByLicensePlate = function (licensePlate) {
        for (var _i = 0, _a = this.levels; _i < _a.length; _i++) {
            var level = _a[_i];
            var vehicle = level.removeVehicleByLicensePlate(licensePlate);
            if (vehicle)
                return true;
        }
        return false; // Vehicle not found
    };
    ParkingLot.prototype.getTotalAvailableSpots = function () {
        return this.levels.reduce(function (total, level) { return total + level.getAvailableSpots(); }, 0);
    };
    return ParkingLot;
}());
exports.ParkingLot = ParkingLot;
