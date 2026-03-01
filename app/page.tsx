"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  image: string | null;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Fetch events
  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
  }, []);

  function nextSlide() {
    if (events.length === 0) return;
    setCurrentIndex((prev) =>
      prev === events.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    if (events.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? events.length - 1 : prev - 1
    );
  }

  function googleCalendarLink(event: Event) {
    const start = new Date(event.date)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const end = new Date(
      new Date(event.date).getTime() + 2 * 60 * 60 * 1000
    )
      .toISOString()
      .replace(/-|:|\.\d+/g, "");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.description || ""
    )}`;
  }

  return (
    <div className="flex flex-col">

      {/* HERO SECTION */}
      <section
        className="relative h-[85vh] flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-3xl mx-auto text-center px-6 pt-24">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Welcome to Rossgrove Bible Chapel
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 mb-8">
            Growing together in faith and truth.
          </p>
          <Link
            href="/contact"
            className="bg-[#82CEC7] hover:bg-[#82CEC7]/80 px-6 py-3 rounded-md font-medium transition"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>

      {/* EVENTS SECTION */}
      {events.length > 0 && (
        <section className="py-24 bg-white bg-transparent">
          <div className="max-w-2xl  mx-auto px-7 py-12">

            <h2 className="text-3xl font-semibold text-[#82CEC7] mb-12 text-center">
              Upcoming Events
            </h2>

            {events.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              There are no upcoming events at the moment.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              Please check back soon or contact us for more information.
            </p>
          </div>
        ) : (
          <div className="relative overflow-hidden">

              {/* SLIDE TRACK */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="min-w-full flex justify-center"
                  >
                    <div
                      onClick={() => setSelectedEvent(event)}
                      className="w-full max-w-md bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                    >
                      {event.image && (
                        <div>
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-60 object-cover group-hover:scale-105 transition duration-700"
                          />
                        </div>
                      )}

                      <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-semibold text-[#82CEC7]">
                          {event.title}
                        </h3>

                        {event.description && (
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {event.description}
                          </p>
                        )}

                        <div className="inline-block bg-[#82CEC7]/10 text-[#82CEC7] px-4 py-2 text-sm font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* LEFT BUTTON */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#82CEC7] text-white p-3 shadow-md hover:scale-110 transition"
              >
                ←
              </button>

              {/* RIGHT BUTTON */}
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#82CEC7] text-white p-3 shadow-md hover:scale-110 transition"
              >
                →
              </button>

            </div>
        )}
          </div>
        </section>
      )}

      {/* LOCATION SECTION */}
      <section className="py-20 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-semibold mb-12 text-[#82CEC7]">
          Find Us Here
        </h2>

        <iframe
          title="Rossgrove Bible Chapel Location"
          src="https://www.google.com/maps?q=12+Rossgrove+Terrace,+Mt+Albert,+Auckland&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        />
      </section>

      {/* EVENT MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full p-8 space-y-4 relative shadow-2xl">

            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-[#82CEC7] hover:text-red-500 transitionfont-bold"
            >
              ✕
            </button>

            {selectedEvent.image && (
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-57 object-cover"
              />
            )}

            <h3 className="text-2xl font-semibold text-[#82CEC7]">
              {selectedEvent.title}
            </h3>

            <p className="text-gray-600">
              {selectedEvent.description}
            </p>

            <p className="text-sm text-gray-500">
              {new Date(selectedEvent.date).toLocaleString()}
            </p>

            <a
              href={googleCalendarLink(selectedEvent)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#82CEC7] text-white px-6 py-3 hover:bg-[#82CEC7]/80 transition"
            >
              Add to Google Calendar
            </a>

          </div>
        </div>
      )}

    </div>
  );
}