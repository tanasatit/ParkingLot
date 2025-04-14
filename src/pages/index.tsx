import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

type VehicleType = 'Car' | 'Motorcycle' | 'Bus';

export default function AddVehiclePage() {
  const router = useRouter();
  const [plate, setPlate] = useState('');
  const [type, setType] = useState<VehicleType>('Car');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/addVehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          licensePlate: plate,
          vehicleType: type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add vehicle');
      }

      console.log('Vehicle added:', data);
      router.push('/parkinglot');
    } catch (error) {
      console.error('Error adding vehicle:', error);
      setError(error instanceof Error ? error.message : 'Failed to add vehicle');
    }
  };

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>Add Vehicle</h1>
        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="License Plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              style={{ 
                marginRight: '10px', 
                padding: '8px',
                width: '200px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
              required
            />
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as VehicleType)}
              style={{ 
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Bus">Bus</option>
            </select>
          </div>
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </Layout>
  );
}
