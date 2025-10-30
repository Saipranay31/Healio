import React from 'react';
import RangeSlider from '../ui/RangeSlider';

export default function SleepSection({ hoursValue, qualityValue, onHoursChange, onQualityChange }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block mb-2">Hours of Sleep</label>
        <input
          type="number"
          value={hoursValue}
          onChange={onHoursChange}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-200 outline-none"
          placeholder="Enter hours"
        />
      </div>
      <RangeSlider
        label="Sleep Quality"
        value={qualityValue}
        onChange={onQualityChange}
      />
    </div>
  );
}