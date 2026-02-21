const Expert = require('../models/Expert');
const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');

const createBooking = asyncHandler(async (req, res) => {
  const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

  const expert = await Expert.findById(expertId);

  if (!expert) {
    const err = new Error('Expert not found');
    err.status = 404;
    throw err;
  }

  const daySlots = expert.availableSlots.find((row) => row.date === date);
  if (!daySlots || !daySlots.slots.includes(timeSlot)) {
    const err = new Error('Selected slot is not available for this expert');
    err.status = 400;
    throw err;
  }

  try {
    const booking = await Booking.create({
      expert: expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes: notes || '',
    });

    req.app.get('io').to(`expert:${expertId}`).emit('slotBooked', {
      expertId,
      date,
      timeSlot,
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      const err = new Error('This slot is already booked');
      err.status = 409;
      throw err;
    }
    throw error;
  }
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    const err = new Error('Booking not found');
    err.status = 404;
    throw err;
  }

  booking.status = req.body.status;
  await booking.save();

  res.json({
    message: 'Booking status updated',
    booking,
  });
});

const getBookingsByEmail = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ email: req.query.email })
    .populate('expert', 'name category')
    .sort({ createdAt: -1 });

  res.json({ data: bookings });
});

module.exports = {
  createBooking,
  updateBookingStatus,
  getBookingsByEmail,
};
