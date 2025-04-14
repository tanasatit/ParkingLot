// components/Layout.tsx
import Link from 'next/link';
import { ReactNode } from 'react';

const sidebarStyle = {
  width: '200px',
  backgroundColor: '#f4f4f4',
  padding: '20px',
  height: '100vh',
  position: 'fixed' as const,
  top: 0,
  left: 0,
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
};

const mainStyle = {
  marginLeft: '220px',
  padding: '20px',
};

const linkStyle = {
  display: 'block',
  padding: '10px 15px',
  margin: '5px 0',
  color: '#333',
  textDecoration: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
};

const linkHoverStyle = {
  backgroundColor: '#e0e0e0',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>🚘 Menu</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <Link href="/" style={linkStyle} onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}>
              Add Vehicle
            </Link>
          </li>
          <li>
            <Link href="/parkinglot" style={linkStyle} onMouseEnter={(e) => Object.assign(e.currentTarget.style, linkHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { backgroundColor: 'transparent' })}>
              Manage Parking Lot
            </Link>
          </li>
        </ul>
      </div>
      <div style={mainStyle}>{children}</div>
    </div>
  );
}
