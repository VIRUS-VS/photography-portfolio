const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const photoRoutes = require('./routes/photoRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

dotenv.config();
connectDB();

const app = express();

// --- START OF THE CORRECTED CODE ---
const corsOptions = {
  origin: [
    'https://www.theluxevows.com', // Your new production domain
    'https://theluxevows.com',     // The non-www version
    'https://photography-portfolio-three-delta.vercel.app', // The Vercel preview domain
    'http://localhost:3000'        // For local development
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
// --- END OF THE CORRECTED CODE ---

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/settings', settingsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});