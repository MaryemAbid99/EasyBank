import { jwtDecode } from 'jwt-decode';
import api from './api';

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  }
  return getUserFromToken();
}

export async function register(email: string, password: string) {
  await api.post('/auth/register', { email, password });
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export function getUserFromToken(): DecodedToken | null {
  if (typeof window === 'undefined') return null;

  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}
