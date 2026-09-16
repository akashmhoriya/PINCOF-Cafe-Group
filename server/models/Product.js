const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a product slug'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: [
        'Coffee',
        'Cakes',
        'Pastries',
        'Desserts',
        'Café Favourites',
      ],
      index: true,
    },
    subCategory: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    signature: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: String,
      default: 'Available across participating PINCOF cafés',
      trim: true,
    },
    brandNames: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Active', 'Seasonal', 'Archive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
