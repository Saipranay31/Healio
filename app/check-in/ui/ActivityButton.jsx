import React from 'react';

export default function ActivityButton({ activity, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm ${
        selected
          ? 'bg-green-600 text-white'
          : 'bg-green-50 text-green-600 hover:bg-green-100'
      }`}
    >
      {activity}
    </button>
  );
}