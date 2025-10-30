import React from 'react';
import ActivityButton from '../ui/ActivityButton';
import { activities } from '@/app/check-in/constants/activities';

export default function ActivitiesSection({ selectedActivities, onActivityToggle }) {
  return (
    <div>
      <label className="block mb-2">Activities Today</label>
      <div className="flex flex-wrap gap-2">
        {activities.map((activity) => (
          <ActivityButton
            key={activity}
            activity={activity}
            selected={selectedActivities.includes(activity)}
            onClick={() => onActivityToggle(activity)}
          />
        ))}
      </div>
    </div>
  );
}