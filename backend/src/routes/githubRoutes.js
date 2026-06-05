import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getGithubUser, getGithubRepos, verifyGithubEmail } from '../controllers/githubController.js';

const router = express.Router();

router.get('/users/:username', protect, getGithubUser);
router.get('/users/:username/repos', protect, getGithubRepos);
router.post('/verify-email', protect, verifyGithubEmail);

export default router;
