import githubService from '../services/githubService.js';

export async function getGithubUser(req, res, next) {
  try {
    const { username } = req.params;
    const user = await githubService.fetchGithubUser(username);
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function getGithubRepos(req, res, next) {
  try {
    const { username } = req.params;
    const repos = await githubService.fetchGithubUserRepos(username);
    res.json({ repos });
  } catch (error) {
    next(error);
  }
}

export async function verifyGithubEmail(req, res, next) {
  try {
    const { username, email } = req.body;
    const result = await githubService.verifyGithubEmail({ username, email });
    res.json(result);
  } catch (error) {
    next(error);
  }
}
