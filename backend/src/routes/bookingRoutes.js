const express = require('express');
const {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail,
} = require('../controllers/bookingController');
const {
  bookingValidation,
  bookingStatusValidation,
  bookingEmailValidation,
} = require('../middlewares/validators');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post('/', bookingValidation, validateRequest, createBooking);
router.patch('/:id/status', bookingStatusValidation, validateRequest, updateBookingStatus);
router.get('/', bookingEmailValidation, validateRequest, getBookingsByEmail);

module.exports = router;
