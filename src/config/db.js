const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined in environment variables. ' +
      'Please set it in your .env file or hosting platform.'
    );
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,  // fail fast (5s) instead of hanging
    socketTimeoutMS: 45000,          // close sockets after 45s of inactivity
  });

  console.log('✅ MongoDB connected:', uri.replace(/:\/\/.*@/, '://***@')); // hide credentials in logs
}

module.exports = connectDB;
