'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserFromToken, logout } from '../utils/auth';

interface User {
  email: string;
  role: 'ADMIN' | 'USER';
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getUserFromToken() as User | null;
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navbarStyle = {
    backgroundColor: '#16a34a', 
    color: 'white',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  } as const;

  return (
    <nav style={navbarStyle}>
      <Link
        href="/"
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        EasyBank
      </Link>

      {mounted && user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            Welcome, <strong>{user.email}</strong>
          </span>

          {user.role === 'ADMIN' && (
            <Link
              href="/articles/create"
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Create Article
            </Link>
          )}

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#b91c1c')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#dc2626')
            }
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
