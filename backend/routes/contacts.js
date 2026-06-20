const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); 
const Contact = require('../models/Contact');

// POST: Create a new contact
router.post('/', auth, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newContact = new Contact({
            name,
            email,
            phone,
            user: req.user.id
        });

        const contact = await newContact.save();
        res.json(contact);

    } catch (error) {
        console.error("Save error:", error);
        res.status(400).json({ message: "Error creating contact", error: error.message });
    }
});

// READ all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Server error retrieving contacts",
      error: error.message,
    });
  }
});

// UPDATE a contact
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(updatedContact);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating contact", error: error.message });
  }
});

// DELETE a contact
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting contact", error: error.message });
  }
});

module.exports = router;
