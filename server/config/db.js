const mongoose = require("mongoose");

// Directly specify the MongoDB URI here
const MONGO_URI = "mongodb+srv://sivamanik:A12345678b@cluster0.kj5bszs.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI directly
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
