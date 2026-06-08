import api from './axiosInstance.js';

export async function getProfile() {
  const response = await api.get('auth/me');
  return response.data;
}
