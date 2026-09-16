const mongoose = require('mongoose');
const Menu = require('../models/Menu');

// Helper to escape special regex characters
const escapeRegex = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// @desc    Get all menu items (with optional filters: ?category=&featured=true&search=)
// @route   GET /api/menu
// @access  Public
const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    const filter = {};

    // Category filter
    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      filter.category = new RegExp(`^${escapeRegex(category.trim())}$`, 'i');
    }

    // Featured filter
    if (featured !== undefined) {
      filter.featured = featured === 'true' || featured === true;
    }

    // Keyword search filter (name or description)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(escapeRegex(search.trim()), 'i');
      filter.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    const items = await Menu.find(filter).sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Invalid menu item ID: ${id}`,
      });
    }

    const item = await Menu.findById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
const getMenuItemsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    if (!category || category.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please specify a category.',
      });
    }

    const filter = {};
    if (category.toLowerCase() !== 'all') {
      filter.category = new RegExp(`^${escapeRegex(category.trim())}$`, 'i');
    }

    const items = await Menu.find(filter).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new menu item
// @route   POST /api/menu
// @access  Public (admin/internal)
const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, image, vegetarian, featured, available } = req.body;

    if (!name || !description || price === undefined || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, description, price, category, and image.',
      });
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number.',
      });
    }

    const newItem = await Menu.create({
      name: name.trim(),
      description: description.trim(),
      price: numericPrice,
      category: category.trim(),
      image: image.trim(),
      vegetarian: vegetarian !== undefined ? Boolean(vegetarian) : true,
      featured: featured !== undefined ? Boolean(featured) : false,
      available: available !== undefined ? Boolean(available) : true,
    });

    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing menu item
// @route   PUT /api/menu/:id
// @access  Public (admin/internal)
const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Invalid menu item ID: ${id}`,
      });
    }

    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Public (admin/internal)
const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: `Invalid menu item ID: ${id}`,
      });
    }

    const item = await Menu.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Menu item with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Menu item '${item.name}' deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
