const Contact = require('../models/modeleContact');

// Create a new contact (POST)
exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    // Save the contact to the database
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

// Get all contacts (GET)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts); // Make sure this line sends JSON
  } catch (error) {
    console.error('Error fetching contacts:', error.message);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};


// Delete a contact by ID (DELETE)
exports.deleteContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};