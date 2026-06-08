import api from './axiosInstance.js';

export async function getGithubUser(username) {
  const response = await api.get(`github/users/${encodeURIComponent(username)}`);
  return response.data;
}

export async function getGithubRepos(username) {
  const response = await api.get(`github/users/${encodeURIComponent(username)}/repos`);
  return response.data;
}

export async function getAuthenticatedGithubRepos() {
  const response = await api.get('auth/github/repos');
  return response.repos || response.data || response;
}

export async function verifyGithubEmail(payload) {
  const response = await api.post('github/verify-email', payload);
  return response.data;
}
