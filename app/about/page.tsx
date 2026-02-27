import Section from "@/components/Section";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
      <Welcome />

      <Section title="Who We Are">
        <p className="text-center max-w-2xl mx-auto text-gray-600">
          We are a Bible-based Christian fellowship in Mt Albert, Auckland,
          committed to teaching Scripture and serving our community.
        </p>
      </Section>

      <Section title="Join Us This Sunday">
        <div className="text-center" >
          <p className="text-lg">Sunday Service – 10:00 AM</p>
          <p className="text-gray-600">
            12 Rossgrove Terrace, Mt Albert
          </p>
        </div>
      </Section>
    </>
  );
}