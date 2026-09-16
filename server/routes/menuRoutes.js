const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  getMenuItemById,
  getMenuItemsByCategory,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

router.route('/')
  .get(getAllMenuItems)
  .post(createMenuItem);

router.get('/category/:category', getMenuItemsByCategory);

router.route('/:id')
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

module.exports = router;
