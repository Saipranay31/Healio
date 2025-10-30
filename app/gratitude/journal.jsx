import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { NewEntryDialog } from "@/app/gratitude/components/new-entry-dialog";

export default function GratitudePage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch entries from the API
  useEffect(() => {
    async function fetchEntries() {
      try {
        const response = await fetch("http://localhost:5000/api/gratitude-entries");
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching gratitude entries:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  // Add a new entry
  const addNewEntry = async (entry) => {
    console.log("Adding new entry:", entry); // Log the entry

    try {
      const response = await fetch("http://localhost:5000/api/gratitude-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      const savedEntry = await response.json();
      console.log("Saved entry:", savedEntry); // Log the saved entry
      setEntries((prev) => [savedEntry, ...prev]); // Add the new entry to the list
    } catch (err) {
      console.error("Error saving gratitude entry:", err);
    }
  };

  return (
    <div className="font-montreal flex min-h-screen bg-[#E5F4DD]">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-medium text-[#314328] mb-2">
              Reflect On The Good Things In Life
            </h1>
            <p className="text-gray-600">
              Taking a moment to express gratitude can help shift your focus to
              the positive and improve your overall well-being.
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-6">
            <Card className="p-6 bg-white rounded-lg shadow-lg">
              <NewEntryDialog onSave={addNewEntry} />
            </Card>
          </div>

          {/* Previous Entries Section */}
          <div className="mb-6">
            <Card className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-medium text-[#314328] mb-4">
                Previous Entries
              </h2>
              {loading ? (
                <p>Loading entries...</p>
              ) : (
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <Card key={entry._id} className="p-4 bg-[#F9FDF7] rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-gray-500" />
                          <span className="text-gray-500">
                            {new Date(entry.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{entry.gratitude}</p>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
