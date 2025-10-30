// models/GoalEntry.js

const mongoose = require("mongoose");

const GoalEntrySchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Goal title
    description: { type: String },          // Optional description
    totalDays: { type: Number, required: true }, // Total duration in days
    progress: { type: Number, default: 0 },      // Progress percentage
    day: { type: Number, default: 0 },           // Current day in progress
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("GoalEntry", GoalEntrySchema);
