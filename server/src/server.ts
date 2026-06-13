import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDatabase from './config/database';
import apiRoutes from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
// CORS: restrict by FRONTEND_ORIGIN if set
const frontendOrigin = process.env.FRONTEND_ORIGIN || '*';
app.use(cors({ origin: frontendOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting (configurable)
const rateWindow = Number(process.env.RATE_LIMIT_WINDOW_MS || String(60 * 1000));
const rateMax = Number(process.env.RATE_LIMIT_MAX || '120');
app.use(
  rateLimit({
    windowMs: rateWindow,
    max: rateMax,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Simple request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api', apiRoutes);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error as Error);
    process.exit(1);
  }
};

start();

export default app;
