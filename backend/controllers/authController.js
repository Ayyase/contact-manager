const db = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Get admin from database
    const [admins] = await db.query(
      'SELECT * FROM admins WHERE username = ?',
      [username]
    );

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const admin = admins[0];

    // Check password
    // TEMPORARY: Plain text comparison (untuk demo)
    // PRODUCTION: Gunakan bcrypt.compare()
    const isPasswordValid = password === admin.password;
    
    // For production with hashed password:
    // const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        name: admin.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name
        },
        token: token
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Get current admin info
const getProfile = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const [admins] = await db.query(
      'SELECT id, username, name, created_at FROM admins WHERE id = ?',
      [adminId]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      data: admins[0]
    });

  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message
    });
  }
};

// Register new admin (optional - untuk buat admin baru)
const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    // Validation
    if (!username || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if username already exists
    const [existing] = await db.query(
      'SELECT id FROM admins WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    // Hash password
    // TEMPORARY: Plain text (untuk demo)
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password; // Plain text untuk demo

    // Insert new admin
    const [result] = await db.query(
      'INSERT INTO admins (username, password, name) VALUES (?, ?, ?)',
      [username, hashedPassword, name]
    );

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        id: result.insertId,
        username: username,
        name: name
      }
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

module.exports = {
  login,
  getProfile,
  register
};