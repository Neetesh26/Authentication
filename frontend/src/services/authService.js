import api from './axiosInstance.js';

export async function login(payload) {
  const response = await api.post('/auth/login', payload);
  return response.data;
}

export async function register(payload) {
  const response = await api.post('/auth/register', payload);
  return response.data;
}

export function saveToken(token) {
  localStorage.setItem('auth_token', token);
}

export function clearToken() {
  localStorage.removeItem('auth_token');
}

export function getToken() {
  return localStorage.getItem('auth_token');
}
