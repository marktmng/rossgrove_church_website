import Section from "@/components/Section";
import SermonCard from "@/components/SermonCard";

export default function Sermons() {
  return (
    <Section title="Recent Sermons">
      <div className="grid md:grid-cols-3 gap-6">
        <SermonCard
          title="Walking in Faith"
          speaker="John Smith"
          date="Feb 2026"
        />
        <SermonCard
          title="The Love of Christ"
          speaker="David Brown"
          date="Jan 2026"
        />
      </div>
    </Section>
  );
}