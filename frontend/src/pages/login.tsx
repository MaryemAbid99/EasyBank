import { useState } from 'react';
import { login } from '../utils/auth';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          backgroundColor: '#f9fafb',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              color: '#16a34a',
              fontWeight: 'bold',
              marginBottom: '20px',
              fontSize: '1.5rem',
            }}
          >
            Connexion
          </h2>
          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>
              {error}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            style={{
              backgroundColor: '#16a34a',
              color: 'white',
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
