import express from "express";
import bodyParser from "body-parser";
import EXpressErr from "./utils/expressError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";

const app = express();

// CORS setup to allow universal access
app.use(
  cors({
    origin: "*", // Allow any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow cookies (optional)
  })
);

// Middleware to handle body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser("secret_key"));

// Static file serving for images
app.use("/api/images", express.static(path.join("uploads")));

// Handle preflight requests (necessary for some browsers with complex requests)
app.options("*", cors());  // Allow preflight for all routes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

// Root route (for testing purposes)
app.get("/", async (req, res) => {
  res.cookie("greet", "hello", { signed: true });
  res.send("hello");
});

// Error handling middleware
app.all("*", (req, res, next) => {
  next(new EXpressErr(404, "Page Not Found!", false));
});

app.use((err, req, res, next) => {
  let {
    status = 500,
    message = "Internal server issue",
    success = false,
  } = err;
  console.log(err);
  res.status(status).send({ message, success });
});

export default app;
