const ContactMessage = require('../models/ContactMessage');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate type and existence
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message.',
      });
    }

    // Email format regex validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will reach out shortly.',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (internal / audit)
// @route   GET /api/contact
// @access  Public (admin/internal)
const getAllContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
  getAllContactMessages,
};
