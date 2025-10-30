import React from 'react';

export default function RangeSlider({ label, min = 1, max = 5, value, onChange, labels }) {
  return (
    <div>
      <label className="block mb-2">{label}</label>
      <div className="bg-green-50 p-4 rounded-lg">
        <input
          type="range"
          className="w-full"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
        />
        {labels && (
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            {labels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}