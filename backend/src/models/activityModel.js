import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repo: { type: mongoose.Schema.Types.ObjectId, ref: 'Repo', required: false },
  type: { type: String, required: true },
  title: { type: String, required: true },
  details: { type: String, default: '' },
  icon: { type: String, default: '🔧' },
  severity: { type: String, default: 'info' },
}, {
  timestamps: true,
});

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export default Activity;
