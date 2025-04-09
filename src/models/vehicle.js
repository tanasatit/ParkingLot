//models/vehicle.js

import mongoose from 'mongoose';

const VehicleSize = ({
    "MOTOCYCLE": "Motorcycle",
    "COMPACT": "Compact",
    "LARGE": "Large"
});

const Vehicle = new mongoose.Schema({
    licensePlate: {
      type: String,
      required: true,
    },
    spotsNeeded: Int,
    size: {
        type: String,
        enum: Object.keys(VehicleSize),
        required: true,
    },
  });

  
  
  export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
