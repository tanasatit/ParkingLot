"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingLevel = void 0;
var ParkingLevel = /** @class */ (function () {
    function ParkingLevel(levelNumber, spots) {
        this.levelNumber = levelNumber;
        this.spots = spots;
    }
    ParkingLevel.prototype.parkVehicle = function (vehicle) {
        for (var _i = 0, _a = this.spots; _i < _a.length; _i++) {
            var spot = _a[_i];
            if (spot.canFitVehicle(vehicle)) {
                var success = spot.park(vehicle);
                if (success) {
                    console.log("Parked at Level ".concat(this.levelNumber, ", Spot ").concat(spot.getId()));
                }
                return success;
            }
        }
        return false;
    };
    ParkingLevel.prototype.removeVehicle = function (vehicle) {
        for (var _i = 0, _a = this.spots; _i < _a.length; _i++) {
            var spot = _a[_i];
            if (spot.getOccupiedVehicle() === vehicle) {
                spot.removeVehicle();
                return true;
            }
        }
        return false;
    };
    ParkingLevel.prototype.removeVehicleByLicensePlate = function (licensePlate) {
        for (var _i = 0, _a = this.spots; _i < _a.length; _i++) {
            var spot = _a[_i];
            var vehicle = spot.getOccupiedVehicle();
            if (vehicle && vehicle.licensePlate === licensePlate) {
                spot.removeVehicle();
                return vehicle;
            }
        }
        return null;
    };
    ParkingLevel.prototype.getAvailableSpots = function () {
        return this.spots.filter(function (spot) { return spot.isAvailable(); }).length;
    };
    return ParkingLevel;
}());
exports.ParkingLevel = ParkingLevel;
