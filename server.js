import express from "express";
import dotenv from "dotenv";
import controller from "./backend/controller.js";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// Initialize Express app
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"], //  "https://unpkg.com"
        connectSrc: ["'self'", "https://api.groq.com"],
        imgSrc: ["'self'", "https:", "data:"],
        styleSrc: ["'self'"],
        frameAncestors: [
          "'self'",
          "https://yakihonne.com",
          "https://yakihonne.com/sw-playground",
          "https://playground.yakihonne.com",
        ],
        formAction: ["'self'"],
      },
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});


app.use(helmet.referrerPolicy({ policy: "no-referrer" })); // Set referrer policy

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use("/.well-known", express.static("public/.well-known"));
app.use(express.static(path.join(__dirname, "dist")));
// app.use(express.static("public"));

// Set up the translation endpoint
// This endpoint will handle POST requests to translate text
app.post("/api/translate", controller);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
