import React from 'react';
import RangeSlider from '../ui/RangeSlider';

export default function StressAnxietySection({ anxietyValue, stressValue, onAnxietyChange, onStressChange }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <RangeSlider
        label="Anxiety Level"
        value={anxietyValue}
        onChange={onAnxietyChange}
      />
      <RangeSlider
        label="Stress Level"
        value={stressValue}
        onChange={onStressChange}
      />
    </div>
  );
}