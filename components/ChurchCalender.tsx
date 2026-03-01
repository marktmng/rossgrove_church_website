"use client";

import "@/styles/calendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";

type CalendarItem = {
  id: string;
  title: string;
  start: string;
  type: "event" | "task";
  description?: string | null;
  image?: string | null;
  leading?: string | null;
  speaking?: string | null;
};

export default function ChurchCalendar() {
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsRes, tasksRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/tasks"),
        ]);

        const events = await eventsRes.json();
        const tasks = await tasksRes.json();

        const formattedEvents = events.map((event: any) => ({
          id: `event-${event.id}`,
          title: event.title,
          start: event.date,
          backgroundColor: "#82CEC7",
          borderColor: "#82CEC7",
          extendedProps: {
            id: event.id,
            type: "event",
            description: event.description,
            image: event.image,
          },
        }));

        const formattedTasks = tasks
          .filter((task: any) => task.dueDate)
          .map((task: any) => ({
            id: `task-${task.id}`,
            title: task.title,
            start: task.dueDate,
            backgroundColor: "#E94B26",
            borderColor: "#E94B26",
            extendedProps: {
              id: task.id,
              type: "task",
              leading: task.leading,
              speaking: task.speaking,
            },
          }));

        setCalendarEvents([...formattedEvents, ...formattedTasks]);
      } catch (error) {
        console.error("Calendar error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="church-calendar bg-white shadow-lg p-8">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          height="auto"
          dayMaxEvents={false}
          eventClick={(info) => {
            const event = info.event;

            setSelectedItem({
              id: event.id,
              title: event.title,
              start: event.startStr,
              type: event.extendedProps.type,
              description: event.extendedProps.description,
              image: event.extendedProps.image,
              leading: event.extendedProps.leading,
              speaking: event.extendedProps.speaking,
            });
          }}
        />
      </div>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full shadow-2xl relative overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-[#82CEC7] hover:text-red-500 font-bold z-10"
            >
              ✕
            </button>

            {/* Event Image */}
            {selectedItem.type === "event" && selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-60 object-cover"
              />
            )}

            <div className="p-8 space-y-4">

              <h3 className="text-2xl font-semibold text-[#82CEC7]">
                {selectedItem.title}
              </h3>

              <p className="text-sm text-gray-500">
                {new Date(selectedItem.start).toLocaleDateString()}
              </p>

              {/* Event Description */}
              {selectedItem.type === "event" && selectedItem.description && (
                <p className="text-gray-600">
                  {selectedItem.description}
                </p>
              )}

              {/* Task Info (clean, no complicated logic) */}
              {selectedItem.type === "task" && (
                <div className="space-y-2 text-gray-600">
                  {selectedItem.leading && (
                    <p>
                      <strong>Leading:</strong> {selectedItem.leading}
                    </p>
                  )}

                  {selectedItem.speaking && (
                    <p>
                      <strong>Speaking:</strong> {selectedItem.speaking}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}