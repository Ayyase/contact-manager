require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./Routes/contactRoutes');
const authRoutes = require('./Routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact Manager API with Authentication',
    endpoints: {
      'POST /api/auth/login': 'Admin login',
      'POST /api/auth/register': 'Register new admin',
      'GET /api/auth/profile': 'Get admin profile (protected)',
      'GET /api/contacts': 'Get all contacts (protected)',
      'GET /api/contacts/:id': 'Get contact by ID (protected)',
      'POST /api/contacts': 'Create new contact (protected)',
      'PUT /api/contacts/:id': 'Update contact (protected)',
      'DELETE /api/contacts/:id': 'Delete contact (protected)'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});