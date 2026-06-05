import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { approvePR } from '../controllers/prController.js';

const router = express.Router();

router.post('/:prId/approve', protect, approvePR);

export default router;
