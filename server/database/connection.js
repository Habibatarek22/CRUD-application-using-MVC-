const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongodb connection string
    const URI = process.env.MONGODB_URL;
    mongoose.connect(URI, { useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
