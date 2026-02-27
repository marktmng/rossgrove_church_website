export default function ServiceCard({
  title,
  time,
  description,
}: {
  title: string;
  time: string;
  description: string;
}) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{time}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}