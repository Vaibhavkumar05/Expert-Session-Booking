const { Schema, model } = require('mongoose');

const ExpertSlotSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },
    slots: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { _id: false }
);

const ExpertSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    experience: { type: Number, required: true, min: 0 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    bio: { type: String, default: '' },
    availableSlots: { type: [ExpertSlotSchema], default: [] },
  },
  { timestamps: true }
);

ExpertSchema.index({ name: 'text' });

module.exports = model('Expert', ExpertSchema);
