import Link from 'next/link';
import TabsContainer from './TabsContainer';

export const metadata = {
  title: 'Gym Rules — Strike Den',
  description: 'Read Strike Den gym rules, payment terms, and etiquette guidelines for a respectful and productive training environment.',
};

export default function RulesPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="brutalist-hero-blob relative pt-40 md:pt-48 pb-32 md:pb-40 bg-[#FFFFFF] dark:bg-[#0F0F0F]">
        <div className="relative z-10 px-6 md:px-16 max-w-screen-xl mx-auto">
          <h1
            className="font-display uppercase text-[#1A1A1A] dark:text-[#EDEBE6]"
            style={{
              fontSize: "clamp(3rem, 10vw, 10rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            GYM RULES
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[rgba(15,15,15,0.55)] dark:text-[rgba(237,235,230,0.6)]">
            Guidelines to ensure a respectful, productive, and safe training environment
          </p>
        </div>
      </section>

      {/* Main content with tabs */}
      <section className="py-20 bg-[#FFFFFF] dark:bg-[#0F0F0F]">
        <div className="px-6 md:px-16 max-w-4xl mx-auto">
          <TabsContainer />
        </div>
      </section>

      {/* Call to Action */}
      <section className="brutalist-hero-blob relative py-32 bg-[#0A0A0A] dark:bg-[#0A0A0A] overflow-hidden">
        <div className="px-6 md:px-16 max-w-screen-xl mx-auto relative z-10 text-center">
          <h2
            className="font-display uppercase mb-6 text-[#EDEBE6]"
            style={{
              fontSize: "clamp(2rem, 6vw, 5rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            START YOUR JOURNEY <span style={{ color: "#E50914" }}>TODAY</span>
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto" style={{ color: "rgba(237,235,230,0.6)" }}>
            Experience world-class martial arts training in a supportive community environment
          </p>
          <Link href="/contact" className="brutalist-btn">
            <span>Contact Us</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
