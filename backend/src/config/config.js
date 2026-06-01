import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authdb',
};
