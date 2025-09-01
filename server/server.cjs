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

// --- START OF THE CRUCIAL FIX ---
// We are explicitly telling the backend that the frontend at this URL is allowed to make requests.
const corsOptions = {
  origin: 'https://photography-portfolio-three-delta.vercel.app',
  optionsSuccessStatus: 200,
};
console.log('CORS configured for origin:', corsOptions.origin); // For debugging
app.use(cors(corsOptions));
// --- END OF THE CRUCIAL FIX ---

app.use(express.json());

// Make the 'uploads' folder static (though we now use Cloudinary)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/admin', adminRoutes);
app.use('/api/galleries', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/settings', settingsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});