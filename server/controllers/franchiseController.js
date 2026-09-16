const FranchiseApplication = require('../models/FranchiseApplication');

// @desc    Submit a franchise partnership application
// @route   POST /api/franchise
// @access  Public
const submitFranchiseApplication = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      city,
      country,
      investmentRange,
      preferredBrand,
      message,
    } = req.body;

    if (!name || !email || !phone || !city || !country || !investmentRange || !preferredBrand || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required to evaluate your franchise inquiry.',
      });
    }

    const application = await FranchiseApplication.create({
      name,
      email,
      phone,
      city,
      country,
      investmentRange,
      preferredBrand,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your interest in partnering with PINCOF. Our franchise development director will contact you within 48 hours.',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Retrieve all franchise applications (Admin/Audit)
// @route   GET /api/franchise
// @access  Private/Admin
const getFranchiseApplications = async (req, res, next) => {
  try {
    const applications = await FranchiseApplication.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitFranchiseApplication,
  getFranchiseApplications,
};
