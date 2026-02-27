import Section from "@/components/Section";
import ServiceCard from "@/components/ServiceCard";

export default function Services() {
  return (
    <Section title="Our Services">
      <div className="grid md:grid-cols-2 gap-6">
        <ServiceCard
          title="Sunday Worship"
          time="10:00 AM"
          description="Bible teaching, prayer, and fellowship."
        />
        <ServiceCard
          title="Bible Study"
          time="Wednesday 7:30 PM"
          description="In-depth study of Scripture."
        />
      </div>
    </Section>
  );
}