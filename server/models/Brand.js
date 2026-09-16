const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Brand slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    concept: {
      type: String,
      required: [true, 'Concept philosophy is required'],
    },
    category: {
      type: String,
      required: [true, 'Brand category is required'],
      enum: [
        'Specialty Coffee',
        'Coffee & Bakery',
        'Modern Café',
        'Contemporary Coffee House',
        'Neighborhood Café',
      ],
    },
    logo: {
      type: String,
      default: '',
    },
    heroImage: {
      type: String,
      required: [true, 'Hero image URL is required'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    websiteUrl: {
      type: String,
      default: '',
    },
    locations: [
      {
        name: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true },
      },
    ],
    franchiseAvailable: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Active', 'Coming Soon', 'Coming Soon / Franchise'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.index({ category: 1 });
brandSchema.index({ featured: 1 });

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
