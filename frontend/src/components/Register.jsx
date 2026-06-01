import { useState } from 'react';
import api from '../services/api.js';

export default function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await api.post('/auth/register', { name, email, password });
      setSuccess('Registration successful. Please login.');
      setName('');
      setEmail('');
      setPassword('');
      onRegister();
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </label>
      <label>
        Password
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      </label>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <button type="submit">Register</button>
    </form>
  );
}
