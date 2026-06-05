import api from './axiosInstance.js';

export async function getProfile() {
  const response = await api.get('protected/profile');
  return response.data;
}
