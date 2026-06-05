import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { connectRepo, getRepos, getRepo } from '../controllers/repoController.js';

const router = express.Router();

router.post('/connect', protect, connectRepo);
router.get('/', protect, getRepos);
router.get('/:repoId', protect, getRepo);

export default router;
