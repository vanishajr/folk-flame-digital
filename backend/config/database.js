const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/folk-flame-digital';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    console.log('Please make sure MongoDB is running on your system');
    console.log('You can install MongoDB or use MongoDB Atlas cloud service');
    process.exit(1);
  }
};

module.exports = connectDB;
