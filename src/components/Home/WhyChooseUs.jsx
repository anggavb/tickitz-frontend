import SectionHeader from "./SectionHeader";
import FeatureCard from "./FeatureCard";

function WhyChooseUs() {
  return (
    <article className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <SectionHeader
        label="Why Choose Us"
        title="Unleashing the Ultimate Movie Experience"
        className="mb-10"
      />

      <section className="grid gap-8 md:grid-cols-3">
        <FeatureCard title="Guaranteed" />
        <FeatureCard title="Affordable" />
        <FeatureCard title="24/7 Customer Support" type="chat" />
      </section>
    </article>
  );
}

export default WhyChooseUs;
