const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
  try {
    console.log('MongoDB URI:', "mongodb://localhost:27017/My_Final-project");

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
