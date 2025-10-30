import { useState } from "react";
import Confetti from "react-confetti"; // Import Confetti library
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from 'lucide-react';

export function GoalCard({ _id, title, description, progress, day, totalDays, onGoalUpdate }) {
  const [isConfettiActive, setConfettiActive] = useState(false); // For triggering confetti

  const handleCompleteToday = async () => {
    // Increment the day and progress
    const newDay = day + 1;
    const newProgress = Math.floor(progress + (100 / totalDays)); // Rounds down to the nearest integer


    if (newProgress >= 100) {
      setConfettiActive(true); // Trigger confetti when the goal reaches 100%
      // Set a timeout to hide the confetti after 3 seconds
      setTimeout(() => {
        setConfettiActive(false); // Disable confetti after 3 seconds
      }, 10000);
    }

    // Ensure the progress doesn't exceed 100%
    const updatedProgress = newProgress >= 100 ? 100 : newProgress;

    // Prepare the updated goal object
    const updatedGoal = {
      progress: updatedProgress,
      day: newDay, // Update the day
    };

    // Send PUT request to the backend to update the goal progress
    try {
      const response = await fetch(`http://localhost:5000/api/goals/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGoal),
      });

      if (response.ok) {
        const updatedGoalData = await response.json();
        onGoalUpdate(updatedGoalData); // Update the goal state with the new progress and day
      } else {
        console.error("Failed to update goal progress");
      }
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  return (
    <Card className="mb-4 bg-white rounded-lg shadow-lg">
      {isConfettiActive && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200} // Control the number of confetti pieces
          gravity={0.2} // Adjust gravity for confetti movement
          recycle={false} // Set to false to make confetti disappear after a single trigger
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999, // High z-index to ensure it's above other content
          }}
        />
      )}

      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-[#314328]">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="text-sm text-gray-500">
            {day} of {totalDays} {/* Display current day of total days */}
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-[#E5F4DD]" indicatorClassName="bg-[#68835B]" />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="secondary"
            className="bg-[#A9C89A] text-white hover:bg-[#68835B] transition-colors"
            onClick={handleCompleteToday} // Handle the "Complete Today" action
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Complete Today
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
