export default function SermonCard({
  title,
  speaker,
  date,
}: {
  title: string;
  speaker: string;
  date: string;
}) {
  return (
    <div className="border rounded-lg p-6 hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">
        {speaker} | {date}
      </p>
      <button className="mt-3 text-blue-600 hover:underline">
        Listen
      </button>
    </div>
  );
}