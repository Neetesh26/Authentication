import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function Dashboard({ token, userName, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      return;
    }

    async function fetchProfile() {
      try {
        const response = await api.get('/protected/profile', token);
        setProfile(response);
      } catch (err) {
        setError(err.message || 'Unable to load profile');
      }
    }

    fetchProfile();
  }, [token]);

  return (
    <div className="dashboard">
      <p>Welcome, <strong>{userName}</strong></p>
      <button className="logout" onClick={onLogout}>Logout</button>
      {error && <div className="error">{error}</div>}
      {profile ? (
        <div className="profile-card">
          <h2>Profile</h2>
          <p><strong>Email:</strong> {profile.user.email}</p>
          <p><strong>Name:</strong> {profile.user.name}</p>
          <p><strong>Message:</strong> {profile.message}</p>
        </div>
      ) : (
        <p>Loading profile…</p>
      )}
    </div>
  );
}
