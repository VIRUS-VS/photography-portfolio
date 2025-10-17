// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');
// const adminRoutes = require('./routes/adminRoutes');
// const galleryRoutes = require('./routes/galleryRoutes');
// const uploadRoutes = require('./routes/uploadRoutes');
// const photoRoutes = require('./routes/photoRoutes');
// const settingsRoutes = require('./routes/settingsRoutes');

// dotenv.config();
// connectDB();

// const app = express();

// // --- START OF THE CRUCIAL FIX ---
// // This is our whitelist of all trusted domains
// const allowedOrigins = [
//   'https://photography-portfolio-three-delta.vercel.app', // Your Vercel domain
//   'https://theluxevows.com',                            // Your custom domain
//   'https://www.theluxevows.com'                         // The 'www' version of the custom domain
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like Postman) or from our whitelist
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// // --- END OF THE CRUCIAL FIX ---

// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // API Routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/galleries', galleryRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/photos', photoRoutes);
// app.use('/api/settings', settingsRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
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
// This is our whitelist of all trusted domains
const allowedOrigins = [
  'https://photography-portfolio-three-delta.vercel.app', // Your Vercel domain
  'https://theluxevows.com',                            // Your custom domain
  'https://www.theluxevows.com'                         // The 'www' version of the custom domain
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman) or from our whitelist
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// --- END OF THE CRUCIAL FIX ---

app.use(express.json());

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