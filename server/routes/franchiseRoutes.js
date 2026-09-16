const express = require('express');
const router = express.Router();
const {
  submitFranchiseApplication,
  getFranchiseApplications,
} = require('../controllers/franchiseController');

router.route('/')
  .post(submitFranchiseApplication)
  .get(getFranchiseApplications);

module.exports = router;
