const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  userName: { type: String, required: true }, // Store user's display name
  userImage: { type: String, required: true }, // Store user's photo URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Discussion", discussionSchema);
