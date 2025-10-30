import React from "react";
import { Calendar, Moon, Wind, Sun, Brain } from "lucide-react";

export default function MoodEntry({
  date,
  mood,
  sleep,
  anxiety,
  stress,
  activities,
  description,
}) {
  // Destructure the sleep object to extract hours and quality
  const { hours, quality } = sleep;

  const stats = [
    { label: "Mood", value: mood, icon: Brain, color: "text-blue-500" }, // Blue for Mood
    {
      label: "Sleep",
      value: `${hours} hours, Quality: ${quality}`,
      icon: Moon,
      color: "text-gray-500",
    }, // Gray for Sleep
    { label: "Anxiety", value: anxiety, icon: Wind, color: "text-yellow-500" }, // Yellow for Anxiety
    { label: "Stress", value: stress, icon: Sun, color: "text-red-500" }, // Red for Stress
  ];

  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
      <div className="flex items-center mb-4">
        <Calendar className="w-5 h-5 text-gray-500 mr-2" />
        <span className="text-gray-600">{date}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center">
            {Icon && <Icon className={`w-4 h-4 ${color} mr-2`} />}
            <span className="text-gray-600">
              {label}: {value}/5
            </span>
          </div>
        ))}
      </div>

      <div>
        <span className="text-gray-600 block mb-2">Activities:</span>
        <div className="flex flex-wrap gap-2">
          {activities.map((activity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {activity}
            </span>
          ))}
        </div>
      </div>

      {/* Show description if available */}
      {description && (
        <div className="mb-4 mt-4">
          <span className="text-gray-600 block mb-2 font-semibold">Description:</span>
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
}
