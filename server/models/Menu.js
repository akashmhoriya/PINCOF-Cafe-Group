const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide an item name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide an item description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide an item price'],
      min: [0, 'Price must be greater than or equal to 0'],
    },
    category: {
      type: String,
      required: [true, 'Please provide an item category'],
      enum: [
        'Coffee',
        'Cold Coffee',
        'Tea',
        'Breakfast',
        'Snacks',
        'Desserts',
        'Signature',
      ],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    vegetarian: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Menu', menuSchema);
