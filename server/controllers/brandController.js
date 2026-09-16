const Brand = require('../models/Brand');

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrands = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (featured !== undefined) {
      query.featured = featured === 'true' || featured === true;
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { tagline: searchRegex },
        { description: searchRegex },
        { concept: searchRegex },
      ];
    }

    const brands = await Brand.find(query).sort({ featured: -1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch featured brands
// @route   GET /api/brands/featured
// @access  Public
const getFeaturedBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({ featured: true }).sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single brand by slug
// @route   GET /api/brands/:slug
// @access  Public
const getBrandBySlug = async (req, res, next) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug.toLowerCase() });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: `Brand with slug '${req.params.slug}' not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch brands by category
// @route   GET /api/brands/category/:category
// @access  Public
const getBrandsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    let query = {};

    if (category.toLowerCase() !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    const brands = await Brand.find(query).sort({ featured: -1, createdAt: 1 });
    res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBrands,
  getFeaturedBrands,
  getBrandBySlug,
  getBrandsByCategory,
  createBrand,
};
