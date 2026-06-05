import config from '../config/config.js';

const GITHUB_API_BASE = 'https://api.github.com';

function getHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
  };

  if (config.githubToken) {
    headers.Authorization = `Bearer ${config.githubToken}`;
  }

  return headers;
}

async function handleGithubResponse(response) {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || `GitHub API request failed with status ${response.status}`;
    const error = new Error(message);
    error.statusCode = response.status === 404 ? 404 : 502;
    throw error;
  }

  return data;
}

async function fetchGithubUser(username) {
  if (!username) {
    const error = new Error('GitHub username is required');
    error.statusCode = 400;
    throw error;
  }

  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}`;
  const response = await fetch(url, { headers: getHeaders() });
  return handleGithubResponse(response);
}

async function fetchGithubUserRepos(username) {
  if (!username) {
    const error = new Error('GitHub username is required');
    error.statusCode = 400;
    throw error;
  }

  const url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`;
  const response = await fetch(url, { headers: getHeaders() });
  return handleGithubResponse(response);
}

async function fetchGithubRepo(fullName) {
  if (!fullName) {
    const error = new Error('GitHub repository full name is required');
    error.statusCode = 400;
    throw error;
  }

  const [owner, repo] = fullName.split('/');
  if (!owner || !repo) {
    const error = new Error('GitHub repository full name must be in the form owner/repo');
    error.statusCode = 400;
    throw error;
  }

  const url = `${GITHUB_API_BASE}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const response = await fetch(url, { headers: getHeaders() });
  return handleGithubResponse(response);
}

async function verifyGithubEmail({ username, email }) {
  if (!username || !email) {
    const error = new Error('Both GitHub username and Gmail address are required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const isGmail = normalizedEmail.endsWith('@gmail.com');
  const githubUser = await fetchGithubUser(username);
  const publicEmail = githubUser.email ? githubUser.email.trim().toLowerCase() : null;
  let verified = false;
  let note = '';

  if (!isGmail) {
    note = 'Please use a valid @gmail.com address.';
  }

  if (publicEmail) {
    verified = publicEmail === normalizedEmail;
    note = verified
      ? 'GitHub public email matches the provided Gmail address.'
      : 'GitHub public email does not match the provided Gmail address.';
  } else if (isGmail) {
    verified = true;
    note = 'GitHub user has no public email, but the provided address is a valid Gmail address.';
  } else {
    verified = false;
    note = 'GitHub user has no public email and the provided address is not a Gmail address.';
  }

  return {
    verified,
    note,
    publicEmail: githubUser.email || null,
    githubUser,
  };
}

export default {
  fetchGithubUser,
  fetchGithubUserRepos,
  fetchGithubRepo,
  verifyGithubEmail,
};
