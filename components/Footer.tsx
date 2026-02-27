export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Rossgrove Bible Chapel
        <p>12 Rossgrove Terrace, Mt Albert, Auckland</p>
      </div>
    </footer>
  );
}