const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Route files
const movies = require('./routes/movieRoutes');
const comments = require('./routes/commentRoutes');
const favorites = require('./routes/favoriteRoutes');
const users = require('./routes/userRoutes');

// Mount routers
app.use('/api/v1/movies', movies);
app.use('/api/v1/comments', comments);
app.use('/api/v1/favorites', favorites);
app.use('/api/v1/users', users);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});