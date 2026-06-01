import mongoose from 'mongoose';
import config from './config.js';

async function connectDB() {
  const uri = config.mongoUri;
  if (!uri) {
    throw new Error('MONGO_URI is not configured');
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });

  console.log('Connected to MongoDB');
}

export default connectDB;
