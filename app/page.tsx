import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* WELCOME SECTION */}
      <section className="bg-[#E94B26] text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Welcome to Rossgrove Bible Chapel
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mb-8">
            A Bible-believing church in Mt Albert, Auckland,
            growing together in faith and truth.
          </p>
          <Link
            href="/contact"
            className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-neutral-200 transition"
          >
            Plan Your Visit
          </Link>
        </div>
      </section>


      {/* SERVICE INFO */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Join Us This Sunday
          </h2>
          <p className="text-lg mb-2">
            Sunday Worship – 10:00 AM
          </p>
          <p className="text-neutral-600">
            12 Rossgrove Terrace, Mt Albert, Auckland
          </p>
        </div>
      </section>


      {/* QUICK LINKS */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

          <Link href="/about" className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">About Us</h3>
            <p className="text-neutral-600">
              Learn about our beliefs and community.
            </p>
          </Link>

          <Link href="/services" className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Our Services</h3>
            <p className="text-neutral-600">
              See weekly gatherings and events.
            </p>
          </Link>

          <Link href="/sermons" className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">Sermons</h3>
            <p className="text-neutral-600">
              Listen to recent messages.
            </p>
          </Link>

        </div>
      </section>

    </div>
  );
}