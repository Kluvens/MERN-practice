const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/Register');
const jwt = require('jsonwebtoken');


const bcrypt = require('bcryptjs');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    // Send response with token and user data
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find user by ID in database
    const user = await User.findById(req.params.id);

    // If user not found, return error response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user data
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide an email and password' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    res.status(200).json({
      message: 'User registered successfully',
      user: savedUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.redirect("/login");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;