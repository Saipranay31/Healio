const mongoose = require("mongoose");

const GratitudeEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now, // Automatically set the date
  },
  gratitude: {
    type: String,
    required: true, // Ensure the gratitude field is always provided
  },
});

module.exports = mongoose.model("GratitudeEntry", GratitudeEntrySchema);
