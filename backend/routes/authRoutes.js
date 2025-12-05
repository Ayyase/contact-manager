const express = require('express');
const router = express.Router();
const { login, getProfile, register } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes (perlu token)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;