import repoService from '../services/repoService.js';
import dashboardService from '../services/dashboardService.js';

export async function connectRepo(req, res, next) {
  try {
    const { githubUsername, githubEmail, repoFullName } = req.body;
    const repo = await repoService.connectRepo({
      userId: req.user.id,
      githubUsername,
      githubEmail,
      repoFullName,
    });
    const dashboard = await dashboardService.getDashboard(req.user.id);
    res.status(201).json({ repo, dashboard });
  } catch (error) {
    next(error);
  }
}

export async function getRepos(req, res, next) {
  try {
    const repos = await repoService.getUserRepos(req.user.id);
    res.json({ repos });
  } catch (error) {
    next(error);
  }
}

export async function getRepo(req, res, next) {
  try {
    const { repoId } = req.params;
    const repo = await repoService.getRepoById(req.user.id, repoId);
    if (!repo) {
      const error = new Error('Repository not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ repo });
  } catch (error) {
    next(error);
  }
}
