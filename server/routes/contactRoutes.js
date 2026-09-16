const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getAllContactMessages,
} = require('../controllers/contactController');

router.post('/', submitContactMessage);
router.get('/', getAllContactMessages);

module.exports = router;
