import mongoose from 'mongoose';

const prSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repo: { type: mongoose.Schema.Types.ObjectId, ref: 'Repo', required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['open', 'pending', 'merged'], default: 'open' },
  confidence: { type: Number, default: 85 },
  risk: { type: String, enum: ['low', 'medium', 'high', 'none'], default: 'low' },
  prNumber: { type: String, default: '' },
  type: { type: String, default: 'security' },
}, {
  timestamps: true,
});

const PR = mongoose.models.PR || mongoose.model('PR', prSchema);
export default PR;
