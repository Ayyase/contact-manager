const db = require('../config/database');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: error.message
    });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await db.query(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error getting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact',
      error: error.message
    });
  }
};

// Create new contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address || null]
    );
    
    const [newContact] = await db.query(
      'SELECT * FROM contacts WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: newContact[0]
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create contact',
      error: error.message
    });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    
    // Check if contact exists
    const [existing] = await db.query(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (name !== undefined) {
      updates.push('name = ?');
      values.push(name);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      values.push(email);
    }
    if (phone !== undefined) {
      updates.push('phone = ?');
      values.push(phone);
    }
    if (address !== undefined) {
      updates.push('address = ?');
      values.push(address);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }
    
    values.push(id);
    
    await db.query(
      `UPDATE contacts SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    const [updatedContact] = await db.query(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact[0]
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: error.message
    });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if contact exists
    const [existing] = await db.query(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    await db.query('DELETE FROM contacts WHERE id = ?', [id]);
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
