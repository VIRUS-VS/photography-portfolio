// Import required packages
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file FIRST
dotenv.config();

const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const photoRoutes = require('./routes/photoRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Make the 'uploads' folder static
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use the API routes
app.use('/api/admin', adminRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/settings', settingsRoutes);

// Define the port the server will run on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});