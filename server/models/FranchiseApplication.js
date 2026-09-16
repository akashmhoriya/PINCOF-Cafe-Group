const mongoose = require('mongoose');

const franchiseApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'Target city is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Target country is required'],
      trim: true,
    },
    investmentRange: {
      type: String,
      required: [true, 'Investment range is required'],
      trim: true,
    },
    preferredBrand: {
      type: String,
      required: [true, 'Preferred brand is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Business background or message is required'],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const FranchiseApplication = mongoose.model('FranchiseApplication', franchiseApplicationSchema);

module.exports = FranchiseApplication;
