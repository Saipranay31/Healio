"use client";

import React, { useState } from "react"; // Import React and useState
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateGoalDialog({ open, onOpenChange, onGoalAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(null); // For highlighting the selected button

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!title || !totalDays) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create the goal object
    const newGoal = {
      title,
      description,
      totalDays: parseInt(totalDays, 10),
      progress: 0,
      day: 0,
    };

    // Send the goal to the parent function to add it dynamically
    onGoalAdd(newGoal);

    // Close the dialog and reset form fields
    setTitle("");
    setDescription("");
    setTotalDays("");
    setSelectedDuration(null);
    onOpenChange(false);
  };

  const predefinedDurations = [7, 14, 30]; // Predefined durations in days

  const handleDurationClick = (duration) => {
    setTotalDays(duration); // Set the goal duration
    setSelectedDuration(duration); // Highlight the selected button
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white p-6 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium text-[#314328]">
            Share Your Thoughts
          </DialogTitle>
          <p className="text-gray-500 text-sm">
            Write your thoughts, questions, or experiences here.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="goal" className="text-[#314328] font-medium">
              What Do You Want To Achieve? *
            </Label>
            <Input
              id="goal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write your goal here... (e.g., Practice mindfulness for 10 minutes daily)"
              className="border-[#A9C89A] bg-[#E5F4DD]/50 placeholder-[#A9C89A]"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#314328] font-medium">
              Goal Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write relevant description related to your goal."
              className="min-h-[120px] border-[#A9C89A] bg-[#E5F4DD]/50 placeholder-[#A9C89A]"
            />
          </div>

          {/* Duration Input */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-[#314328] font-medium">
              Set Your Goal Duration *
            </Label>
            <div className="flex gap-2">
              {predefinedDurations.map((duration) => (
                <Button
                  key={duration}
                  type="button"
                  variant="outline"
                  className={`flex-1 border-[#A9C89A] text-[#314328] transition-colors ${
                    selectedDuration === duration
                      ? "bg-[#A9C89A] text-white"
                      : "hover:bg-[#E5F4DD] hover:text-[#314328]"
                  }`}
                  onClick={() => handleDurationClick(duration)}
                >
                  {duration} Days
                </Button>
              ))}
            </div>
            <Input
              id="duration"
              type="number"
              value={totalDays}
              onChange={(e) => {
                setTotalDays(e.target.value);
                setSelectedDuration(null); // Deselect button when manual input is used
              }}
              placeholder="Or enter the number of days manually"
              className="mt-2 border-[#A9C89A] bg-[#E5F4DD]/50 placeholder-[#A9C89A]"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full hover:bg-[#A9C89A] hover:text-[#314328] bg-[#68835B] text-white transition-colors py-3 text-lg font-medium"
          >
            Save Entry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
