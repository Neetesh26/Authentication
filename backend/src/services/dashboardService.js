import Repo from '../models/repoModel.js';
import PR from '../models/prModel.js';
import Activity from '../models/activityModel.js';

function deriveMetrics(repos, prs, activities) {
  const reposCount = repos.length;
  const openPRs = prs.filter((pr) => pr.status === 'open').length;
  const mergedPRs = prs.filter((pr) => pr.status === 'merged').length;
  const avgHealth = reposCount ? Math.round(repos.reduce((sum, repo) => sum + (repo.healthScore || 0), 0) / reposCount) : 0;
  const issuesResolved = mergedPRs;

  return {
    reposCount,
    openPRs,
    mergedPRs,
    avgHealth,
    issuesResolved,
    recentActivity: activities.slice(0, 5).map((activity) => ({
      id: activity._id,
      icon: activity.icon,
      title: activity.title,
      sub: activity.details,
      time: activity.createdAt.toISOString(),
      severity: activity.severity,
    })),
    activityFeed: activities.map((activity) => ({
      id: activity._id,
      icon: activity.icon,
      title: activity.title,
      sub: activity.details,
      time: activity.createdAt.toISOString(),
      severity: activity.severity,
    })),
  };
}

async function getDashboard(userId) {
  const repos = await Repo.find({ user: userId }).sort({ lastScannedAt: -1 });
  const prs = await PR.find({ user: userId }).sort({ updatedAt: -1 });
  const activities = await Activity.find({ user: userId }).sort({ createdAt: -1 }).limit(20);

  const metrics = deriveMetrics(repos, prs, activities);

  return {
    repos,
    prs,
    activities,
    metrics,
  };
}

export default {
  getDashboard,
  deriveMetrics,
};
