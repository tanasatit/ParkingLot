import React, { useState } from 'react';
import { ParkingLot } from '../models/ParkingLot';
import { Car } from '../models/Car';
import { VehicleSize } from '../models/enums/VehicleSize';

const lot = new ParkingLot();

const App = () => {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [_, forceRerender] = useState(false);

  const level = (lot as any).levels[selectedLevel];

  const handlePark = (spot: any) => {
    const vehicle = new Car('CAR001'); // Replace with your vehicle logic
    const success = spot.park(vehicle);
    if (success) {
      forceRerender(v => !v);
    }
  };

  // Group spots by size
  const groupedSpots: Record<string, any[]> = {
    SMALL: [],
    MEDIUM: [],
    LARGE: [],
    EXTRALARGE: [],
  };

  (level as any).spots.forEach((spot: any) => {
    const sizeKey = typeof spot.size === 'number'
  ? VehicleSize[spot.size as keyof typeof VehicleSize]
  : spot.size;

  
    if (!groupedSpots[sizeKey]) {
      groupedSpots[sizeKey] = [];
    }
  
    groupedSpots[sizeKey].push(spot);
  });
  

  const sizeLabels: Record<string, string> = {
    SMALL: '🟦 Small Spots',
    MEDIUM: '🟩 Medium Spots',
    LARGE: '🟧 Large Spots',
    EXTRALARGE: '🟥 Extra Large Spots',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🚗 Parking Lot</h1>

      <label htmlFor="level">Choose Level: </label>
      <select
        id="level"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(Number(e.target.value))}
      >
        {[...Array(5)].map((_, i) => (
          <option key={i} value={i}>Level {i}</option>
        ))}
      </select>

      <div style={{ marginTop: '20px' }}>
        <h2>Level {selectedLevel}</h2>

        {Object.keys(groupedSpots).map((size) => (
          <div key={size} style={{ marginBottom: '30px' }}>
            <h3>{sizeLabels[size]}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {groupedSpots[size].map((spot, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (spot.isAvailable()) handlePark(spot);
                  }}
                  style={{
                    cursor: spot.isAvailable() ? 'pointer' : 'not-allowed',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                    width: '100px',
                    backgroundColor: spot.isAvailable() ? '#d4fcd4' : '#fcd4d4',
                  }}
                >
                  <strong>{spot.getId()}</strong><br />
                  {spot.isAvailable() ? '🟢 Available' : '🔴 Occupied'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
