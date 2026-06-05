import api from './axiosInstance.js';

export async function approvePR(prId) {
  const response = await api.post(`/prs/${encodeURIComponent(prId)}/approve`);
  return response.data;
}
