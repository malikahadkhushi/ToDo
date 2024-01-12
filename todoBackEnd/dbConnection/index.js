const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    let url = process.env.MONGO_DB_URL;
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB();
