// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database.js'); // Ensures DB connection & table setup
const userRoutes = require('./routes/users.js');

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// ✅ API Routes
app.use('/api/users', userRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to User Management API 🚀" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
