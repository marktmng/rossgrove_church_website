export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        {title}
      </h2>
      {children}
    </section>
  );
}