const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// 🌍 Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// 🧭 Route Imports
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const sideEffectRoutes = require('./routes/sideEffects');
const dashboardRoutes = require('./routes/dashboard');
const activityRoutes = require('./routes/activity');
const visitRoutes = require('./routes/visits');   // Site Visit analytics
const reportRoutes = require('./routes/reports'); // Weekly Reports

// 🧪 MongoDB Connection
const connectMongo = require('./config/mongo');
connectMongo(); // Connect to MongoDB

// 🏠 Root Route
app.get('/', (req, res) => {
  res.json({ message: 'G3MWL API is running' });
});

// 🔍 Health Check (MongoDB version)
app.get('/api/ping', async (req, res) => {
  try {
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB not connected');

    const info = await db.admin().serverStatus();
    res.json({
      message: 'G3MWL backend is alive!',
      ping: true,
      mongoVersion: info.version
    });
  } catch (err) {
    console.error('❌ Health Check Error:', err);
    res.status(500).json({ error: 'Health check failed', details: err.message });
  }
});

// 🚀 API Routes
app.use('/api/auth', authRoutes);               // Registration/Login
app.use('/api/patients', patientRoutes);        // Patients
app.use('/api/side-effects', sideEffectRoutes); // Side Effects
app.use('/api/dashboard', dashboardRoutes);     // Dashboard
app.use('/api/activity', activityRoutes);       // Activity logging
app.use('/api/site-visits', visitRoutes);       // Site Visit analytics
app.use('/api/reports', reportRoutes);          // Weekly Reports

// 🛑 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 🛑 Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Connected to MongoDB');
});

// 🛑 Catch uncaught exceptions
process.on('uncaughtException', err => {
  console.error('❌ Uncaught Exception:', err);
});






