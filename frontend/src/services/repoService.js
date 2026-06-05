import api from './axiosInstance.js';

export async function connectRepo(payload) {
  const response = await api.post('repos/connect', payload);
  console.log('connectRepo response:', response.data);
  return response.data;
}

export async function getRepos() {
  const response = await api.get('repos');
  return response.data;
}
