import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  githubUsername: {
    type: String,
    trim: true,
    default: '',
  },
  githubEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: '',
  },
  connectedRepos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Repo' }],
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
