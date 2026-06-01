import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import tokenService from './tokenService.js';

const SALT_ROUNDS = 10;

async function register({ email, password, name }) {
  if (!email || !password || !name) {
    const error = new Error('Name, email, and password are required');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ email: email.toLowerCase(), password: hashedPassword, name });

  return user;
}

async function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  return {
    token: tokenService.generateToken({ id: user._id, email: user.email, name: user.name }),
    user: { id: user._id, email: user.email, name: user.name },
  };
}

export default {
  register,
  login,
};
