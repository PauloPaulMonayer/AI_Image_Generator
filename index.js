// Load required modules
const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/googleStrategy"); // Google Strategy
const bcrypt = require("bcrypt");
const User = require("./models/userModel"); // User model

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configure session
const MongoStore = require("connect-mongo"); // ייבוא connect-mongo

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // חיבור ל-MongoDB
      collectionName: "sessions", // שם האוסף שבו ישמרו הסשנים
    }),
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  if (req.xhr || req.headers.accept.indexOf("json") > -1) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.redirect("/");
}

// Default route (login page)
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "login.html"));
});

// Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/main.html");
  }
);

// Registration route
app.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("/register.html?error=exists"); // הפניה עם שגיאה אם המשתמש קיים
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.redirect("/register.html?success=true"); // הפניה עם הצלחה
  } catch (error) {
    console.error("Error registering user:", error);
    return res.redirect("/register.html?error=server"); // הפניה עם שגיאה בשרת
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error during login" });
      }

      // ביצוע הפניה לעמוד הראשי
      return res.redirect("/main.html");
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Main page route
app.get("/main.html", ensureAuthenticated, (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "main.html"));
});

// OpenAI Routes (if applicable)
app.use("/openai", require("./routes/openaiRoutes"));

// Handle 404 (Not Found) errors
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.listen(port, () =>
  console.log(`🚀 Server started on http://localhost:${port}`)
);
