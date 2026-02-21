const Expert = require('../models/Expert');
const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');

const enrichExpertSlots = async (expertDoc) => {
  const expert = expertDoc.toObject();
  const bookings = await Booking.find({ expert: expert._id }).select('date timeSlot');

  const bookedSet = new Set(bookings.map((b) => `${b.date}|${b.timeSlot}`));

  expert.availableSlotsByDate = expert.availableSlots.map((slotRow) => ({
    date: slotRow.date,
    slots: slotRow.slots.map((slot) => ({
      time: slot,
      booked: bookedSet.has(`${slotRow.date}|${slot}`),
    })),
  }));

  return expert;
};

const getExperts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 6, 1), 50);
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }

  if (req.query.category) {
    query.category = req.query.category;
  }

  const [experts, total] = await Promise.all([
    Expert.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Expert.countDocuments(query),
  ]);

  res.json({
    data: experts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  });
});

const getExpertById = asyncHandler(async (req, res) => {
  const expert = await Expert.findById(req.params.id);

  if (!expert) {
    const err = new Error('Expert not found');
    err.status = 404;
    throw err;
  }

  const enriched = await enrichExpertSlots(expert);
  res.json(enriched);
});

module.exports = {
  getExperts,
  getExpertById,
};
