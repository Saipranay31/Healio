import React from "react";
import RangeSlider from "../ui/RangeSlider";

const moodLabels = [
  "Extremely Sad",
  "Sad",
  "Neutral",
  "Happy",
  "Extremely Happy",
];

export default function MoodSlider({ value, onChange }) {
  return (
    <RangeSlider
      label="Mood"
      value={value}
      onChange={onChange}
      labels={moodLabels}
    />
  );
}
