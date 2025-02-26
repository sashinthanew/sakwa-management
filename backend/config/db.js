const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Set up connection event handlers
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      setTimeout(connectDB, 5000);
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err);
    });

    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    // If the error is related to authentication
    if (error.message.includes('Authentication failed')) {
      console.error('Please check your MongoDB username and password');
      process.exit(1);
    }
    
    // If the error is related to connection
    if (error.message.includes('ECONNREFUSED')) {
      console.log('Connection refused. Retrying in 5 seconds...');
      setTimeout(() => {
        connectDB();
      }, 5000);
      return;
    }

    console.error('Fatal MongoDB connection error');
    process.exit(1);
  }
};

module.exports = connectDB;