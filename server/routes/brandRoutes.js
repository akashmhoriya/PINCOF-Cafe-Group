const express = require('express');
const router = express.Router();
const {
  getBrands,
  getFeaturedBrands,
  getBrandBySlug,
  getBrandsByCategory,
  createBrand,
} = require('../controllers/brandController');

router.route('/').get(getBrands).post(createBrand);
router.route('/featured').get(getFeaturedBrands);
router.route('/category/:category').get(getBrandsByCategory);
router.route('/:slug').get(getBrandBySlug);

module.exports = router;
