import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    message: "",
    date: "",
    time: "",
    method: "email",
  });
  const [reminders, setReminders] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/reminders", form);
    setForm({ message: "", date: "", time: "", method: "email" });
    fetchReminders();
  };

  const fetchReminders = async () => {
    const res = await axios.get("http://localhost:5000/api/reminders");
    setReminders(res.data);
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Remind Me Later</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            type="text"
            placeholder="Enter message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
          <select
            className="w-full border p-2 rounded"
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
          >
            <option value="email">Email</option>
            {/* we can add in futute if you want to send message via SMS*/}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Reminder
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-bold mb-2">All Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-gray-500">No reminders yet.</p>
          ) : (
            reminders.map((r) => (
              <div key={r._id} className="p-3 bg-gray-100 rounded mb-2">
                <p>
                  <strong>Message:</strong> {r.message}
                </p>
                <p>
                  <strong>At:</strong> {new Date(r.remindAt).toLocaleString()}
                </p>
                <p>
                  <strong>Method:</strong> {r.method}
                </p>
                <p>
                  <strong>Status:</strong> {r.sent ? "✅ Sent" : "⏳ Pending"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
