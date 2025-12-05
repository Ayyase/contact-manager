const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');
const {
  validateContact,
  validateUpdateContact
} = require('../validations/contactValidation');

// PUBLIC ROUTES - TIDAK PERLU AUTHENTICATION
// Sesuai requirement brief (CRUD sederhana)

// GET all contacts
router.get('/', getAllContacts);

// GET contact by ID
router.get('/:id', getContactById);

// POST create new contact
router.post('/', validateContact, createContact);

// PUT update contact
router.put('/:id', validateUpdateContact, updateContact);

// DELETE contact
router.delete('/:id', deleteContact);

module.exports = router;