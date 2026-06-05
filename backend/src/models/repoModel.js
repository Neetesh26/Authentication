import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  githubId: { type: Number, required: true },
  githubUsername: { type: String, required: true },
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  description: { type: String, default: '' },
  htmlUrl: { type: String, required: true },
  private: { type: Boolean, default: false },
  language: { type: String, default: '' },
  stargazersCount: { type: Number, default: 0 },
  openIssuesCount: { type: Number, default: 0 },
  defaultBranch: { type: String, default: 'main' },
  healthScore: { type: Number, default: 78 },
  securityIssues: { type: Number, default: 0 },
  outdatedDependencies: { type: Number, default: 0 },
  lintIssues: { type: Number, default: 0 },
  buildPassing: { type: Boolean, default: true },
  lastScannedAt: { type: Date, default: Date.now },
  scanNotes: { type: String, default: '' },
}, {
  timestamps: true,
});

const Repo = mongoose.models.Repo || mongoose.model('Repo', repoSchema);
export default Repo;
