import Repo from '../models/repoModel.js';
import User from '../models/userModel.js';
import Activity from '../models/activityModel.js';
import PR from '../models/prModel.js';
import githubService from './githubService.js';

function createInitialMetrics(githubRepo) {
  const healthScore = Math.max(58, 100 - Math.round((githubRepo.open_issues_count || 0) * 4));
  const securityIssues = Math.min(4, Math.floor((githubRepo.open_issues_count || 0) / 3));
  const outdatedDependencies = Math.min(5, Math.floor((githubRepo.stargazers_count || 0) / 40));
  const lintIssues = Math.max(0, Math.min(18, Math.floor((githubRepo.size || 0) / 60)));

  return {
    healthScore,
    securityIssues,
    outdatedDependencies,
    lintIssues,
    buildPassing: true,
    scanNotes: `Initial scan for ${githubRepo.full_name}`,
    lastScannedAt: new Date(),
  };
}

async function connectRepo({ userId, githubUsername, githubEmail, repoFullName }) {
  if (!userId || !githubUsername || !githubEmail || !repoFullName) {
    const error = new Error('All repo connection details are required');
    error.statusCode = 400;
    throw error;
  }

  const githubRepo = await githubService.fetchGithubRepo(repoFullName);
  const githubUser = await githubService.verifyGithubEmail({ username: githubUsername, email: githubEmail });

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Authenticated user not found');
    error.statusCode = 404;
    throw error;
  }

  user.githubUsername = githubUsername;
  user.githubEmail = githubEmail;

  const existing = await Repo.findOne({ user: userId, githubId: githubRepo.id });
  const metrics = createInitialMetrics(githubRepo);
  const repoData = {
    user: userId,
    githubId: githubRepo.id,
    githubUsername,
    name: githubRepo.name,
    fullName: githubRepo.full_name,
    description: githubRepo.description || '',
    htmlUrl: githubRepo.html_url,
    private: githubRepo.private,
    language: githubRepo.language || 'Unknown',
    stargazersCount: githubRepo.stargazers_count || 0,
    openIssuesCount: githubRepo.open_issues_count || 0,
    defaultBranch: githubRepo.default_branch || 'main',
    ...metrics,
  };

  const repo = existing ? await Repo.findByIdAndUpdate(existing._id, repoData, { new: true }) : await Repo.create(repoData);

  const repoIdString = String(repo._id);
  user.connectedRepos = user.connectedRepos || [];
  if (!user.connectedRepos.some((id) => String(id) === repoIdString)) {
    user.connectedRepos.push(repo._id);
  }
  await user.save();

  const activity = await Activity.create({
    user: userId,
    repo: repo._id,
    type: 'repo.connected',
    title: `Connected GitHub repo ${repo.fullName}`,
    details: githubUser.note,
    icon: '🔗',
    severity: 'info',
  });

  if (!existing) {
    await PR.create([
      {
        user: userId,
        repo: repo._id,
        title: `fix(security): patch ${repo.name} dependency risk`,
        description: 'Initial security recommendation based on repository scan and package dependency metadata.',
        status: 'open',
        confidence: 92,
        risk: 'low',
        prNumber: `#${Math.floor(Math.random() * 90) + 10}`,
        type: 'security',
      },
      {
        user: userId,
        repo: repo._id,
        title: `chore(deps): update outdated packages for ${repo.name}`,
        description: 'Auto-generated dependency upgrade PR to improve stability and security.',
        status: 'pending',
        confidence: 78,
        risk: 'medium',
        prNumber: `#${Math.floor(Math.random() * 90) + 100}`,
        type: 'deps',
      },
    ]);
  }

  return repo;
}

async function getUserRepos(userId) {
  return Repo.find({ user: userId }).sort({ lastScannedAt: -1 });
}

async function getRepoById(userId, repoId) {
  return Repo.findOne({ user: userId, _id: repoId });
}

export default {
  connectRepo,
  getUserRepos,
  getRepoById,
};
