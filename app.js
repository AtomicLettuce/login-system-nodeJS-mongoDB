// app.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bodyParser = require('body-parser');
require('dotenv').config();

// Express instance
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express petition routing
app.use(require('./routes/routes'));
app.use('/api/auth', authRoutes);

// DB connection (check ./config/db.js out)
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));