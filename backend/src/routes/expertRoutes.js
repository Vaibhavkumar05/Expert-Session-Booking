const express = require('express');
const { getExperts, getExpertById } = require('../controllers/expertController');
const {
  listExpertsValidation,
  expertIdValidation,
} = require('../middlewares/validators');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.get('/', listExpertsValidation, validateRequest, getExperts);
router.get('/:id', expertIdValidation, validateRequest, getExpertById);

module.exports = router;
