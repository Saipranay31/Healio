const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mood: { type: Number, required: true },
  sleep: {
    hours: { type: Number, required: true },
    quality: { type: Number, required: true },
  },
  anxiety: { type: Number, required: true },
  stress: { type: Number, required: true },
  activities: { type: [String], default: [] },
  note: { type: String, default: '' },
});


const MoodEntry = mongoose.model('MoodEntry', moodEntrySchema);

module.exports = MoodEntry;
