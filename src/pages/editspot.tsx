import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { VehicleSize } from '../models/VehicleSize';

interface Vehicle {
  _id: string;
  licensePlate: string;
  type: string;
  size: string;
}

const getVehicleSizeLabel = (size: string) => {
  switch (size) {
    case VehicleSize.SMALL:
      return 'Small';
    case VehicleSize.MEDIUM:
      return 'Medium';
    case VehicleSize.LARGE:
      return 'Large';
    default:
      return size;
  }
};

export default function EditSpotPage() {
  const router = useRouter();
  const { id, level } = router.query;
  const [spot, setSpot] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // Fetch spot data
        const spotResponse = await fetch(`/api/editSpot?id=${id}`);
        if (!spotResponse.ok) {
          throw new Error('Failed to fetch spot');
        }
        const spotData = await spotResponse.json();
        setSpot(spotData);

        // Fetch available vehicles
        const vehiclesResponse = await fetch('/api/getVehicles');
        if (!vehiclesResponse.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const vehiclesData = await vehiclesResponse.json();
        setVehicles(vehiclesData);

        if (vehiclesData.length > 0) {
          setSelectedVehicle(vehiclesData[0]._id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePark = async () => {
    if (!selectedVehicle) {
      setError('Please select a vehicle');
      return;
    }

    try {
      const response = await fetch('/api/editSpot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          action: 'park',
          vehicleId: selectedVehicle,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to park vehicle');
      }

      router.push('/parkinglot');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to park vehicle');
    }
  };

  const handleUnpark = async () => {
    try {
      const response = await fetch('/api/editSpot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          action: 'unpark',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to unpark vehicle');
      }

      router.push('/parkinglot');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unpark vehicle');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{ color: 'red' }}>{error}</div>
      </Layout>
    );
  }

  if (!spot) {
    return (
      <Layout>
        <div>Spot not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Edit Spot: {spot.spotId}</h1>
      <p>Status: {spot.isOccupied ? 'Occupied' : 'Available'}</p>
      <p>Size: {getVehicleSizeLabel(spot.size)}</p>
      
      {spot.isOccupied && spot.vehicleInfo && (
        <p>
          Vehicle: {spot.vehicleInfo.licensePlate} ({spot.vehicleInfo.type} - {getVehicleSizeLabel(spot.vehicleInfo.size)})
        </p>
      )}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      {!spot.isOccupied && (
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="vehicle" style={{ display: 'block', marginBottom: '8px' }}>
            Select Vehicle:
          </label>
          <select
            id="vehicle"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            style={{
              padding: '8px',
              width: '100%',
              maxWidth: '300px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.licensePlate} ({vehicle.type} - {getVehicleSizeLabel(vehicle.size)})
              </option>
            ))}
          </select>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        {!spot.isOccupied ? (
          <button 
            onClick={handlePark}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Park
          </button>
        ) : (
          <button 
            onClick={handleUnpark}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Unpark
          </button>
        )}
        <button 
          onClick={() => router.push('/parkinglot')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Back
        </button>
      </div>
    </Layout>
  );
}
