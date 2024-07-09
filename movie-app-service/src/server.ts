import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app: express.Application = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
import movies from './routes/movieRoutes';
import comments from './routes/commentRoutes';
import favorites from './routes/favoriteRoutes';
import users from './routes/userRoutes';

// Mount routers
app.use('/api/v1/movies', movies);
app.use('/api/v1/comments', comments);
app.use('/api/v1/favorites', favorites);
app.use('/api/v1/users', users);

// Error handler middleware
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '5000', 10);

const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error, promise: Promise<any>) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
