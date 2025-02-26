const express = require("express");
const dotenv = require("dotenv");
const path = require('path');

// Load env vars - add this before any other code
dotenv.config({ path: path.join(__dirname, '.env') });

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

const connectDB = require("./config/db");
const cors = require("cors");
const Supplier = require("./models/Supplier");
const mongoose = require("mongoose");

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));

// Add more detailed MongoDB connection logging
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  // Attempt to reconnect
  console.log('Attempting to reconnect...');
  setTimeout(() => {
    connectDB();
  }, 5000);
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
  // Attempt to reconnect
  console.log('Attempting to reconnect...');
  setTimeout(() => {
    connectDB();
  }, 5000);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

