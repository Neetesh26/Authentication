import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import githubRoutes from './routes/githubRoutes.js';
import repoRoutes from './routes/repoRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import prRoutes from './routes/prRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/github', githubRoutes);
app.use('/api/repos', repoRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/prs', prRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
