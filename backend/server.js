const app = require("./app");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Execptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Execption`);

  process.exit(1);
});

// Connecting to Database
connectDatabase();

const CLOUD_NAME = "dr3lqouuy";
const CLOUD_API_KEY = "725735348775534";
const CLOUD_API_SECRET = "sjrsAxhwTPtHwP3nPQjAejJnDsg";
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});

// Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
