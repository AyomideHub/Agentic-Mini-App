import express from "express";
import dotenv from "dotenv";
import controller from "./backend/controller.js";
dotenv.config();
// Initialize Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Set up the translation endpoint
// This endpoint will handle POST requests to translate text
app.post("/api/translate", controller);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
