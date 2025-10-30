import React, { useState, useEffect } from 'react';
import MoodSlider from './form/MoodSlider';
import SleepSection from './form/SleepSection';
import StressAnxietySection from './form/StressAnxietySection';
import ActivitiesSection from './form/ActivitiesSection';
import { format } from 'date-fns';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"; // Import the useToast hook
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea from shadcn components

export default function NewEntryForm({ onClose, onEntryAdded }) {
  const [mood, setMood] = useState(3);
  const [sleepHours, setSleepHours] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [anxiety, setAnxiety] = useState(3);
  const [stress, setStress] = useState(3);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleActivityToggle = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    );
  };

  const handleSubmit = async () => {
    if (sleepHours <= 0) {
      setError('Please enter a valid number of sleep hours.');
      return;
    }

    const entryData = {
      date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      mood,
      sleep: { hours: sleepHours, quality: sleepQuality },
      anxiety,
      stress,
      activities: selectedActivities,
      note,
    };

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/mood-entries', entryData);
      toast({
        title: 'Entry saved successfully',
        description: "Your mood entry has been recorded.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      if (onEntryAdded) {
        onEntryAdded(response.data);
      }

      onClose();
    } catch (error) {
      console.error('Error saving entry:', error);
      setError('Failed to save entry. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Disable scrolling on the body when the dialog is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = ''; // Reset overflow on cleanup
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* ScrollArea wrapping the dialog */}
      <ScrollArea className="bg-white rounded-lg shadow-lg max-w-4xl w-full h-[80vh] relative overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl z-10"
        >
          &#x2715;
        </button>

        {/* Dialog content */}
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold">How Are You Feeling Today?</h2>

          <MoodSlider value={mood} onChange={(e) => setMood(e.target.value)} />

          <SleepSection
            hoursValue={sleepHours}
            qualityValue={sleepQuality}
            onHoursChange={(e) => setSleepHours(parseInt(e.target.value) || 0)}
            onQualityChange={(e) => setSleepQuality(parseInt(e.target.value) || 3)}
          />

          <StressAnxietySection
            anxietyValue={anxiety}
            stressValue={stress}
            onAnxietyChange={(e) => setAnxiety(parseInt(e.target.value) || 3)}
            onStressChange={(e) => setStress(parseInt(e.target.value) || 3)}
          />

          <ActivitiesSection
            selectedActivities={selectedActivities}
            onActivityToggle={handleActivityToggle}
          />

          <div>
            <label className="block mb-2">Add A Note (Optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-200 outline-none"
              placeholder="Write about what's influencing your mood today..."
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-[#A9C89A] text-white py-3 rounded-lg hover:bg-[#68835B] transition-colors"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </ScrollArea>
    </div>
  );
}
