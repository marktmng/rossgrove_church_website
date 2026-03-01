"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  image: string | null;
  title: string;
  description: string | null;
  date: string;
  createdAt: string;
};

export default function EventBoard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  // Load events
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  // Create Event
  async function addEvent() {
    if (!title || !date) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });

    const created = await res.json();
    setEvents((prev) => [...prev, created]);

    setTitle("");
    setDescription("");
    setDate("");
    setImageFile(null);
  }

  // Delete
  async function deleteEvent(id: string) {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  // Update
  async function updateEvent() {
    if (!selectedEvent) return;

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    formData.append("date", editDate);

    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    const res = await fetch(`/api/events/${selectedEvent.id}`, {
      method: "PATCH",
      body: formData,
    });

    const updated = await res.json();

    setEvents((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );

    setSelectedEvent(null);
    setEditImageFile(null);
  }

  return (
    <div className="mt-10 space-y-10">

      {/* CREATE EVENT */}
      <div className="bg-white p-8 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-[#82CEC7]">
          Create Event
        </h2>

        <div className="flex flex-col gap-4 text-gray-700">

          <input
            type="file"
            accept="image/*"
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          <input
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            placeholder="Event title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            className="border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#82CEC7] focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            onClick={addEvent}
            className="bg-[#82CEC7] text-white py-3 font-medium hover:opacity-90 transition"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* EVENT LIST */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              setSelectedEvent(event);
              setEditTitle(event.title);
              setEditDescription(event.description || "");
              setEditDate(event.date.split("T")[0]);
            }}
            className="cursor-pointer bg-white p-7 shadow-md hover:shadow-lg transition flex flex-col gap-4"
          >

            {/* IMAGE DISPLAY */}
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#82CEC7]">
                {event.title}
              </h3>

              {event.description && (
                <p className="text-gray-600 text-sm">
                  {event.description}
                </p>
              )}

              <div className="inline-block bg-[#82CEC7]/10 text-[#82CEC7] text-xs font-medium px-3 py-1 rounded-full">
                {new Date(event.date).toLocaleDateString()}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteEvent(event.id);
              }}
              className="text-sm bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition w-full"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 shadow-xl w-full max-w-md space-y-4 text-gray-700">

            <h3 className="text-xl font-semibold text-[#82CEC7]">
              Edit Event
            </h3>

            <input
              type="file"
              accept="image/*"
              className="border px-4 py-2 w-full"
              onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
            />

            <input
              className="border px-4 py-2 w-full"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <textarea
              className="border px-4 py-2 w-full"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <input
              type="date"
              className="border px-4 py-2 w-full"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 border hover:bg-gray-100 transition"
              > 
                Cancel
              </button>

              <button
                onClick={updateEvent}
                className="px-4 py-2 bg-[#82CEC7] hover:bg-[#82CEC7]/80 text-white"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}