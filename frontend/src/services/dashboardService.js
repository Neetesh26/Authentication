import api from './axiosInstance.js';

export async function getDashboard() {
  const response = await api.get('dashboard');
  return response.data;
}
