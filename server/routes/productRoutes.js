const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductBySlug,
  createProduct,
} = require('../controllers/productController');

// Featured products
router.get('/featured', getFeaturedProducts);

// Category filtering
router.get('/category/:category', getProductsByCategory);

// General listing and creation
router.route('/').get(getProducts).post(createProduct);

// Slug-based single product
router.route('/:slug').get(getProductBySlug);

module.exports = router;
