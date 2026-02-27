import Link from "next/link";

export default function Welcome() {
  return (
    <section
      className="relative h-[85vh] flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/banner.jpg')" }}
    >
      {/* Top Gradient Behind Navbar */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/70 to-transparent" />

      {/* Main Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative max-w-3xl mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-semibold mb-6">
          Welcome to Rossgrove Bible Chapel
        </h1>
        <p className="text-lg md:text-xl text-neutral-200 mb-8">
          A Bible-believing church in Mt Albert, Auckland,
          growing together in faith and truth.
        </p>
        <Link
          href="/contact"
          className="bg-[#82CEC7] hover:bg-[#82CEC7]/80 px-6 py-3 rounded-md font-medium transition"
        >
          Plan Your Visit
        </Link>
      </div>
    </section>
  );
}