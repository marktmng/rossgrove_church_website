import ChurchCalendar from "@/components/ChurchCalender";

export default function CalendarPage() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Church Calendar
        </h1>
        <ChurchCalendar />
      </div>
    </section>
  );
}