// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { startMonitoring } = require('./workers/monitorWorker');
const { startSSLChecking } = require('./workers/sslChecker');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/targets', require('./routes/targetRoutes'));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Catch-all route handler for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Here  frontend page shoould appear after linking' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start monitoring workers
  startMonitoring();
  startSSLChecking();
});
