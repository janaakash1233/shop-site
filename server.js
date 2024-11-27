import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import session from "express-session";
import path from "path";
import { body, validationResult } from "express-validator";

// Load environment variables from .env
dotenv.config();

const app = express();
const __dirname = path.resolve();

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// In-memory user store (replace with a database in production)
const users = [];

// Helper function to find a user by email
const findUserByEmail = (email) => users.find((user) => user.email === email);

// ####### SIGNUP #######
app.get("/signup", (req, res) => {
  res.sendFile("signup.html", { root: path.join(__dirname, "public") });
});

app.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ email, password: hashedPassword });

    // Redirect to login page after successful sign up
    res.status(201).json({ message: "Sign up successful! Redirecting to login page.", redirect: '/login' });
  }
);

// ####### LOGIN #######
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "public") });
});

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password").exists().withMessage("Password is required."),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = findUserByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user; // Store user in the session

      // Redirect to index.html after successful login
      return res.json({ message: "Login successful!", redirect: '/index.html' });
    } else {
      return res.status(401).json({ message: "Invalid credentials. Please try again." });
    }
  }
);

// ####### LOGOUT #######
// ####### LOGOUT #######
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login?logout=true");
});


// Serve the home page
app.get("/", (req, res) => {
  if (req.session.user) {
    res.send("Welcome to the home page, " + req.session.user.email);
  } else {
    res.redirect("/login");
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
