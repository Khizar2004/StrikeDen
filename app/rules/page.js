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
      <section className="relative py-24 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/images/cta-background.jpg')",
            backgroundPosition: "center 30%"
          }}
        ></div>

        <div className="container-padded relative z-20 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter">
            Gym Rules
          </h1>
          <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
            Guidelines to ensure a respectful, productive, and safe training environment
          </p>
        </div>
      </section>

      {/* Main content with tabs */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-padded max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <TabsContainer />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
          style={{
            backgroundImage: "url('/images/group1.jpg')"
          }}
        ></div>

        <div className="container-padded relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">START YOUR JOURNEY TODAY</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Experience world-class martial arts training in a supportive community environment
          </p>

          <Link
            href="/contact"
            className="btn-primary text-lg px-8 py-4"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
