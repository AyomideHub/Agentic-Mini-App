import express from "express";
import dotenv from "dotenv";
import controller from "./backend/controller.js";
dotenv.config();
import cors from "cors";
import helmet from "helmet";  

// Initialize Express app
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "frame-ancestors": ["'self'", "https://yakihonne.com", "https://yakihonne.com/sw-playground"], // For testing, allow all. For production, restrict as needed.
      },
    },
  })
);
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use('/.well-known', express.static('public/.well-known'));
app.use(express.static("public"));

// Set up the translation endpoint
// This endpoint will handle POST requests to translate text
app.post("/api/translate", controller);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
