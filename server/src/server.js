const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const config = require("./config/config");
const { logger } = require("./utils/logger");
const cron = require("./utils/cron");
require("dotenv").config();

const app = express();
const PORT = config.port || 4000;

// Middleware
app.use(cors({origin: [
    'http://localhost:3000',
    'https://mini-project-ii-session-2024-25.vercel.app'
  ], credentials: true }));
app.use(express.json());

// MongoDB URI (from .env or fallback)
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://ankitvermacs22:TifoybwytYEIk6Xk@cluster0.s4dfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error(`MongoDB connection error: ${err}`));

// Mongoose model
const User = mongoose.model("User", {
  email: { type: String, required: true, unique: true },
  password: String,
  preferredNews: String,
});

// Register route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({ message: "Login successful", userId: user._id });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    logger.error("Login error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Save preferred news
app.post("/select-news", async (req, res) => {
  const { userId, preferredNews } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { preferredNews });
    res.status(200).json({ message: "Preference saved" });
  } catch (err) {
    logger.error("Preference update error", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Optional: Load news routes and cron
const routes = require("./routes");
app.use("/news", routes);
cron.start();

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
