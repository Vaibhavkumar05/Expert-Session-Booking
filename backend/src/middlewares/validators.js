const { body, param, query } = require('express-validator');

const listExpertsValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be >= 1'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('limit must be between 1 and 50'),
  query('search').optional().isString().trim(),
  query('category').optional().isString().trim(),
];

const expertIdValidation = [param('id').isMongoId().withMessage('Invalid expert id')];

const bookingValidation = [
  body('expertId').isMongoId().withMessage('Valid expertId is required'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('date').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be YYYY-MM-DD'),
  body('timeSlot').trim().notEmpty().withMessage('Time slot is required'),
  body('notes').optional().isString().trim(),
];

const bookingStatusValidation = [
  param('id').isMongoId().withMessage('Invalid booking id'),
  body('status')
    .isIn(['Pending', 'Confirmed', 'Completed'])
    .withMessage('status must be Pending, Confirmed, or Completed'),
];

const bookingEmailValidation = [
  query('email').isEmail().withMessage('Valid email query parameter is required').normalizeEmail(),
];

module.exports = {
  listExpertsValidation,
  expertIdValidation,
  bookingValidation,
  bookingStatusValidation,
  bookingEmailValidation,
};
