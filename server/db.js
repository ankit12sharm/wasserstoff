const uri =
  "mongodb+srv://demo:demo@democluster.zaf8swi.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// db.js

const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
    return mongoDBConnection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
};

module.exports = { connectToDatabase, closeDatabaseConnection };
