const { z } = require('zod');

// Schema untuk validasi contact
const contactSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters'),
  
  email: z.string()
    .email('Invalid email format')
    .max(100, 'Email must not exceed 100 characters'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must not exceed 20 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Phone number can only contain numbers and symbols'),
  
  address: z.string()
    .max(500, 'Address must not exceed 500 characters')
    .optional()
});

// Schema untuk update (semua field optional)
const updateContactSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .optional(),
  
  email: z.string()
    .email('Invalid email format')
    .max(100, 'Email must not exceed 100 characters')
    .optional(),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(20, 'Phone number must not exceed 20 characters')
    .regex(/^[0-9+\-\s()]+$/, 'Phone number can only contain numbers and symbols')
    .optional(),
  
  address: z.string()
    .max(500, 'Address must not exceed 500 characters')
    .optional()
});

// Middleware untuk validasi
const validateContact = (req, res, next) => {
  try {
    contactSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }
};

const validateUpdateContact = (req, res, next) => {
  try {
    updateContactSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.errors.map(err => ({
        field: err.path[0],
        message: err.message
      }))
    });
  }
};

module.exports = {
  validateContact,
  validateUpdateContact
};