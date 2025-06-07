// src/controllers/AuthController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const register = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user (name is optional)
    const userId = await User.createUser(email, hashedPassword);
    
    // Generate JWT token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.status(201).json({ 
      message: 'User registered successfully',
      userId,
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ 
      message: 'Login successful',
      token,
      userId: user.id
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed: ' + err.message });
  }
};

module.exports = { register, login };
