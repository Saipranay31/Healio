import React, { useState, useEffect } from 'react';
import MoodEntry from '@/app/check-in/MoodEntry';
import NewEntryForm from '@/app/check-in/NewEntryForm';
import axios from 'axios';

function Checkin() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [moodEntries, setMoodEntries] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  useEffect(() => {
    // Fetch mood entries from the backend API
    const fetchMoodEntries = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:5000/api/mood-entries');
        console.log('Fetched mood entries:', response.data); // Log the response for debugging
        
        // Sort entries by date in descending order
        const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMoodEntries(sortedEntries);
      } catch (error) {
        console.error('Error fetching mood entries:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchMoodEntries();
  }, []);

  const openNewEntryForm = () => {
    setShowNewEntry(true);
  };

  const closeNewEntryForm = () => {
    setShowNewEntry(false);
  };

  // Function to update mood entries after a new entry is added
  const handleNewEntryAdded = (newEntry) => {
    setMoodEntries((prevEntries) => {
      const updatedEntries = [newEntry, ...prevEntries];
      return updatedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

    // Format the date into a readable format
    const formatDate = (date) => {
      return new Date(date).toLocaleString("en-US", {
        weekday: 'long', // e.g., 'Monday'
        year: 'numeric', // e.g., '2024'
        month: 'long', // e.g., 'December'
        day: 'numeric', // e.g., '14'
        hour: 'numeric', // e.g., '2 PM'
        minute: 'numeric', // e.g., '2:30 PM'
        second: 'numeric', // e.g., '2:30:45 PM'
      });
    };

  return (
    <div className="font-montreal flex min-h-screen bg-[#E5F4DD]">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-medium text-[#314328] mb-2">
              How Are You Feeling Today?
            </h1>
            <p className="text-gray-600">
              Take a moment to reflect and share your thoughts. Logging your emotions helps you understand
              your patterns and take charge of your mental well-being.
            </p>
          </div>

          {!showNewEntry ? (
            <>
              <button
                onClick={openNewEntryForm}
                className="text-xl w-full mb-6 bg-[#A9C89A] text-white py-3 rounded-lg hover:bg-[#68835B] transition-colors"
              >
                New Entry
              </button>
              <div className="mb-6">
                <h2 className="text-2xl font-medium mb-4 ">Past Entries</h2>
                {loading ? (
                  <p>Loading past entries...</p>
                ) : (
                  moodEntries.length > 0 ? (
                    moodEntries.map((entry, index) => (
                      <MoodEntry
                        key={index}
                        date={formatDate(entry.date)}
                        mood={entry.mood}
                        sleep={entry.sleep}
                        anxiety={entry.anxiety}
                        stress={entry.stress}
                        activities={entry.activities}
                        description={entry.note} // Pass description here
                      />
                    ))
                  ) : (
                    <p>No mood entries found.</p>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
                <NewEntryForm onClose={closeNewEntryForm} onEntryAdded={handleNewEntryAdded} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkin;
