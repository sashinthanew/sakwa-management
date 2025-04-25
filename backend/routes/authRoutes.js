const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Supplier = require("../models/Supplier"); // Add this line


const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log('Received signup request:', req.body); // Debug log

    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      role
    });

    // Save user to database
    await user.save();
    console.log('User saved successfully:', user); // Debug log

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Signup error:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT Token with role
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role 
      }, 
      'your_secret_key', 
      { expiresIn: "1h" }
    );

    // Send response with token
    res.json({ 
      message: "Login Successful", 
      token,
      role: user.role 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;