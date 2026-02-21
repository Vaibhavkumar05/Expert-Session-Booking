const { Schema, model } = require('mongoose');

const BookingSchema = new Schema(
  {
    expert: {
      type: Schema.Types.ObjectId,
      ref: 'Expert',
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: { type: String, required: true, trim: true },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    timeSlot: { type: String, required: true, trim: true, index: true },
    notes: { type: String, default: '', trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

BookingSchema.index({ expert: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = model('Booking', BookingSchema);
