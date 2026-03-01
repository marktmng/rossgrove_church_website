"use client";

import "@/styles/calendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";

export default function ChurchCalendar() {
  const events = [
    { title: "Sunday Worship", date: "2026-03-01" },
    { title: "Bible Study", date: "2026-03-04" },
    { title: "Youth Fellowship", date: "2026-03-07" },
  ];

  return (
    <div className="church-calendar bg-white shadow-lg p-8">
      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  );
}