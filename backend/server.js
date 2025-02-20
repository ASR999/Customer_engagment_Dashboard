require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const dashboardRoutes = require('./routes/dashboard');
const usersRoutes = require('./routes/users');
const aiInsightsRoutes = require('./routes/aiInsights');

const app = express();

// Connect to MongoDB Atlas


app.use(cors());
app.use(express.json());

connectDB();

// API Routes
app.use('/api', dashboardRoutes);
app.use('/api', usersRoutes);
app.use('/api', aiInsightsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
