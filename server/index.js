const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const MoodEntry = require('./models/MoodEntry');  // <-- Import the MoodEntry model
const GoalEntry = require("./models/GoalEntry");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://saipranayt314:saipranay12@cluster0.maeisbq.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Get mood entries from the database
app.get('/api/mood-entries', async (req, res) => {
  try {
    const entries = await MoodEntry.find();  // Fetch all mood entries
    res.json(entries);
  } catch (err) {
    console.error('Error fetching mood entries:', err);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
});

// Create a new mood entry
app.post('/api/mood-entries', async (req, res) => {
    const { date, mood, sleep, anxiety, stress, activities, note } = req.body;
    try {
      const newEntry = new MoodEntry({ date, mood, sleep, anxiety, stress, activities, note });
      await newEntry.save();
      res.status(200).json(newEntry);
    } catch (error) {
      console.error('Error saving entry:', error); // Log the full error
      res.status(500).json({ message: 'Failed to save entry. Please try again later.' });
    }
  });
  


  const GratitudeEntry = require('./models/GratitudeEntry'); // Import the GratitudeEntry model

 // Get all gratitude entries
app.get("/api/gratitude-entries", async (req, res) => {
  try {
    const entries = await GratitudeEntry.find().sort({ date: -1 }); // Sort by date (latest first)
    console.log("Fetched entries:", entries); // Log the fetched entries
    res.json(entries);
  } catch (err) {
    console.error("Error fetching gratitude entries:", err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

// Create a new gratitude entry
app.post("/api/gratitude-entries", async (req, res) => {
  const { gratitude } = req.body;

  if (!gratitude) {
    return res.status(400).json({ message: "Gratitude text is required" });
  }

  console.log("Received gratitude:", gratitude); // Log received gratitude

  try {
    const newEntry = new GratitudeEntry({ gratitude });
    await newEntry.save();
    console.log("Saved entry:", newEntry); // Log saved entry
    res.status(200).json(newEntry);
  } catch (err) {
    console.error("Error saving gratitude entry:", err);
    res.status(500).json({ message: "Failed to save entry" });
  }
});
  
// ---------------- Goal Entry Endpoints -----------------

// Get all goal entries
app.get("/api/goals", async (req, res) => {
  try {
    const goals = await GoalEntry.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    console.error("Error fetching goal entries:", err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

// Create a new goal entry
app.post("/api/goals", async (req, res) => {
  const { title, description, totalDays, progress, day } = req.body;

  console.log("Received goal data:", req.body);  // Log the incoming data

  // Ensure the required fields are present
  if (!title || !totalDays) {
    return res.status(400).json({ error: "Title and totalDays are required" });
  }

  try {
    const newGoal = new GoalEntry({ title, description, totalDays, progress, day });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    console.error("Error saving goal:", err);
    res.status(500).json({ error: "Failed to save the goal" });
  }
});


// Update progress of a specific goal entry
app.put("/api/goals/:id", async (req, res) => {
  const { id } = req.params;
  const { progress } = req.body;

  try {
    const goal = await GoalEntry.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    goal.progress = progress;
    await goal.save();
    res.json(goal); // Return the updated goal
  } catch (err) {
    console.error("Error updating progress:", err);
    res.status(500).json({ error: "Failed to update progress" });
  }
});

const CommunityEntry = require("./models/CommunityEntry");

// Get all discussions
app.get("/api/discussions", async (req, res) => {
  try {
    const discussions = await CommunityEntry.find().sort({ createdAt: -1 });
    res.status(200).json(discussions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch discussions." });
  }
});

// Add a new discussion
app.post("/api/discussions", async (req, res) => {
  try {
    const { title, description, userName, userImage } = req.body;

    // Validate inputs
    if (!title || !description || !userName || !userImage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newDiscussion = new CommunityEntry({
      title,
      description,
      userName,
      userImage,
    });

    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create discussion." });
  }
});

// Upvote a discussion
app.patch("/api/discussions/:id/upvote", async (req, res) => {
  try {
    const discussion = await CommunityEntry.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: "Error upvoting the discussion" });
  }
});

// Downvote a discussion
app.patch("/api/discussions/:id/downvote", async (req, res) => {
  try {
    const discussion = await CommunityEntry.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ error: "Error downvoting the discussion" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
