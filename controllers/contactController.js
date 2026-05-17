const ContactModel = require("../models/contactModel");

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.listContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.findAll();
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "name, email and message are required",
      });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const contact = await ContactModel.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({ success: true, data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const deleted = await ContactModel.remove(req.params.contactId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
