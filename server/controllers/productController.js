const Product = require('../models/Product');

// @desc    Get all products with optional category, featured, and search filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, featured, search } = req.query;
    let query = { status: 'Active' };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subCategory: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true, status: 'Active' }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
      status: 'Active',
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug.toLowerCase(),
      status: 'Active',
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with slug "${req.params.slug}" not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductBySlug,
  createProduct,
};
