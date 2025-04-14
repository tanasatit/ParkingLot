import React, { useState, useEffect } from 'react';
import { VehicleSize } from '../models/VehicleSize';
import Layout from '../components/layout';
import { useRouter } from 'next/router';

export default function ParkingLotPage() {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [parkData, setParkData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    async function fetchParkData() {
      try {
        const res = await fetch('/api/getParkingLot');
        const data = await res.json();
        
        if (!res.ok) {
          console.error("API Error:", data);
          setError(data.error || "Failed to fetch park data");
          return;
        }
        
        console.log("Park data fetched successfully:", data);
        setParkData(data);
      } catch (error) {
        console.error("Error in fetchParkData:", error);
        setError("Failed to fetch parking lot data");
      }
    }

    fetchParkData();
  }, [isClient]);

  if (!isClient) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>Error: {error}</div>
      </Layout>
    );
  }

  if (!parkData) {
    return (
      <Layout>
        <div>Loading parking lot data...</div>
      </Layout>
    );
  }

  const level = parkData.levels[selectedLevel];
  if (!level) {
    return (
      <Layout>
        <div>No level data available</div>
      </Layout>
    );
  }

  const groupedSpots: Record<string, any[]> = {
    SMALL: [],
    MEDIUM: [],
    LARGE: [],
  };

  level.spots.forEach((spot: any) => {
    const sizeKey = spot.size;
    if (!groupedSpots[sizeKey]) groupedSpots[sizeKey] = [];
    groupedSpots[sizeKey].push(spot);
  });

  const sizeLabels: Record<string, string> = {
    SMALL: '🟦 Small Spots',
    MEDIUM: '🟩 Medium Spots',
    LARGE: '🟧 Large Spots',
  };

  return (
    <Layout>
      <h1>🚗 Parking Lot</h1>
      <label htmlFor="level">Choose Level: </label>
      <select
        id="level"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(Number(e.target.value))}
      >
        {[...Array(parkData.levels.length)].map((_, i) => (
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
                  onClick={() =>
                    router.push(`/editspot?id=${spot._id}&level=${selectedLevel}`)
                  }
                  style={{
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                    width: '100px',
                    backgroundColor: spot.isOccupied ? '#fcd4d4' : '#d4fcd4',
                  }}
                >
                  <strong>{spot.spotId}</strong><br />
                  {spot.isOccupied ? '🔴 Occupied' : '🟢 Available'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
} 