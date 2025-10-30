"use client";

import { useState, useEffect } from "react";
import { GoalCard } from "./components/goalcard";
import { CreateGoalDialog } from "./components/creategoaldialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GoalsPage() {
  const [open, setOpen] = useState(false);
  const [goals, setGoals] = useState([]); // State for fetched goals
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Fetch goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const response = await fetch("http://localhost:5000/api/goals");
        if (response.ok) {
          const data = await response.json();
          setGoals([]); // Reset goals state before setting new goals
          setGoals(data); // Set the fetched goals
        } else {
          console.error("Failed to fetch goals.");
        }
      } catch (err) {
        console.error("Error fetching goals:", err);
      } finally {
        setLoading(false); // Set loading to false when fetching is complete
      }
    };
  
    fetchGoals();
  }, []); // This runs only once when the page is mounted
  

  // Add a new goal dynamically
  const handleAddGoal = async (newGoal) => {
    try {
      const response = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });
  
      if (response.ok) {
        const savedGoal = await response.json();
  
        // Ensure no duplicates are added to the state
        setGoals((prevGoals) => {
          if (!prevGoals.some((goal) => goal._id === savedGoal._id)) {
            return [savedGoal, ...prevGoals];
          }
          return prevGoals; // Avoid adding duplicate
        });
      } else {
        console.error("Failed to save the goal");
      }
    } catch (err) {
      console.error("Error saving the goal:", err);
    }
  };
  
  

  // Update the goal's progress when it's completed
  const handleGoalUpdate = (updatedGoal) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal._id === updatedGoal._id ? updatedGoal : goal
      )
    );
  };

  return (
    <div className="font-montreal flex min-h-screen bg-[#E5F4DD]">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-medium text-[#314328] mb-2">
              Set Goals, Track Progress, Achieve Growth
            </h1>
            <p className="text-gray-600">
              Break Your Goals Into Manageable Steps, Track Your Journey, And Celebrate Your Wins—Big Or Small.
            </p>
          </div>

          <Button
            className="text-xl w-full mb-6 bg-[#A9C89A] text-white py-3 rounded-lg hover:bg-[#68835B] transition-colors"
            onClick={() => setOpen(true)}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create A New Goal
          </Button>

          <div className="mb-6">
            <h2 className="text-2xl font-medium mb-4">Recent Goals</h2>
          </div>

          {/* Display Loading State */}
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading goals...</div>
          ) : (
            <div className="space-y-4">
              {goals.length === 0 ? (
                <div className="text-center text-lg text-gray-500">No goals found.</div>
              ) : (
                goals.map((goal) => (
                  <GoalCard
                    key={goal._id}
                    {...goal}
                    onGoalUpdate={handleGoalUpdate} // Pass handleGoalUpdate to GoalCard
                  />
                ))
              )}
            </div>
          )}

          <CreateGoalDialog open={open} onOpenChange={setOpen} onGoalAdd={handleAddGoal} />
        </div>
      </div>
    </div>
  );
}
