const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/coffee-cafe';
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection event error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB connection disconnected.');
});

module.exports = connectDB;
