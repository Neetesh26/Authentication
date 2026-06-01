import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const JWT_SECRET = config.jwtSecret || 'change-me-in-production';
const JWT_EXPIRES_IN = '2h';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export default {
  generateToken,
  verifyToken,
};
