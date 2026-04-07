import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Strike Den MMA',
  description: 'Our commitment to protecting your privacy and information while using Strike Den MMA services.',
};

export default function PrivacyPage() {
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
            PRIVACY POLICY
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[rgba(15,15,15,0.55)] dark:text-[rgba(237,235,230,0.6)]">
            Our commitment to protecting your privacy while providing exceptional martial arts training
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-[#FFFFFF] dark:bg-[#0F0F0F]">
        <div className="px-6 md:px-16 max-w-3xl mx-auto">
          <div className="brutalist-card p-8 md:p-12">
            <h2
              className="font-display uppercase mb-2 text-[#1A1A1A] dark:text-[#EDEBE6]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
            >
              PRIVACY POLICY <span style={{ color: "#E50914" }}>FOR STRIKE DEN MMA</span>
            </h2>
            <p className="text-sm mb-10 text-[rgba(15,15,15,0.45)] dark:text-[rgba(237,235,230,0.4)]">
              Last Updated: March 13, 2026
            </p>

            <div className="space-y-0">
              {[
                {
                  num: "1",
                  title: "Introduction",
                  content: (
                    <p>At Strike Den MMA (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we respect your privacy and are committed to transparency about the data we collect when you visit our website (strikeden.vercel.app).</p>
                  ),
                },
                {
                  num: "2",
                  title: "Information We Collect",
                  content: (
                    <>
                      <p className="mb-4">We collect information through the following services:</p>
                      <ul className="space-y-3">
                        {[
                          { bold: "Vercel Analytics:", text: " Anonymous usage statistics such as country of origin and browser type." },
                          { bold: "Performance Data:", text: " Information about how our website performs for different visitors to help us improve site speed and user experience." },
                          { bold: "Facebook Tracking:", text: " We use Facebook Pixel and Conversions API to collect data about your interactions with our website." },
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-px h-5 mt-1 flex-shrink-0" style={{ background: "#E50914" }} />
                            <span><strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">{item.bold}</strong>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  num: "3",
                  title: "How We Collect Information",
                  content: (
                    <>
                      <p className="mb-4">We use the following tools to collect information:</p>
                      <ul className="space-y-4">
                        <li><strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">Vercel Analytics:</strong> A privacy-friendly analytics tool that provides us with basic, anonymous metrics about our website visitors. This data is aggregated and cannot be used to identify individual users.</li>
                        <li>
                          <strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">Facebook Pixel and Conversions API:</strong> These tools collect information about your visits to our website and how you interact with it. This may include:
                          <ul className="pl-4 mt-2 space-y-1">
                            {["Pages you visit", "Actions you take (such as viewing content or contacting us)", "Device information (browser type, operating system)", "IP address and location information"].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span style={{ color: "#E50914" }}>—</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  num: "4",
                  title: "How We Use Your Information",
                  content: (
                    <>
                      <p className="mb-4">We use the data we collect to:</p>
                      <ul className="space-y-2">
                        {[
                          "Understand our website's performance",
                          "Identify and resolve technical issues",
                          "Make improvements to our website's usability",
                          "Analyze basic geographic distribution of our visitors",
                          "Measure the effectiveness of our marketing campaigns",
                          "Optimize our advertising to reach people who might be interested in our services",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-px h-5 mt-0.5 flex-shrink-0" style={{ background: "#E50914" }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  num: "5",
                  title: "Cookies and Tracking Technologies",
                  content: (
                    <>
                      <p className="mb-4">Our website uses various tracking technologies:</p>
                      <ul className="space-y-4">
                        <li><strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">Vercel Analytics:</strong> Uses lightweight, privacy-focused tracking that respects user privacy. It does not use cookies that require consent banners.</li>
                        <li><strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">Facebook Pixel:</strong> Uses cookies and similar technologies to track your actions on our website. These cookies enable Facebook to show you more relevant ads on their platform based on your interests and interactions with our site.</li>
                      </ul>
                    </>
                  ),
                },
                {
                  num: "6",
                  title: "Data Sharing and Disclosure",
                  content: (
                    <>
                      <p className="mb-4">We share data with the following third parties:</p>
                      <ul className="space-y-4">
                        <li><strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">Vercel:</strong> Anonymous analytics data is processed by Vercel, our hosting provider.</li>
                        <li><strong className="text-[#1A1A1A] dark:text-[#EDEBE6]">Meta/Facebook:</strong> Information collected via Facebook Pixel and Conversions API is shared with Meta (Facebook) and is subject to Meta&apos;s Data Policy. This data helps us measure the effectiveness of our advertising and show you more relevant content.</li>
                      </ul>
                      <div className="mt-4 p-4 border-l-2 border-[#F8A348] text-sm text-[rgba(15,15,15,0.6)] dark:text-[rgba(237,235,230,0.5)]">
                        We do not sell your personal information to other third parties not listed above. Any data sharing is for the specific purposes outlined in this policy.
                      </div>
                    </>
                  ),
                },
                {
                  num: "7",
                  title: "Data Security",
                  content: (
                    <p>We take reasonable precautions to protect your data. Our service providers (Vercel and Meta) maintain industry-standard security practices to protect any data collected through their platforms.</p>
                  ),
                },
                {
                  num: "8",
                  title: "Your Privacy Rights",
                  content: (
                    <>
                      <p className="mb-4">You have several options to control your privacy when using our website:</p>
                      <ul className="space-y-2">
                        {[
                          "Using browser privacy settings that limit tracking",
                          "Using browser extensions that block analytics and tracking cookies",
                          <>Adjusting your Facebook ad preferences at <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer" style={{ color: "#E50914" }} className="hover:underline">facebook.com/adpreferences</a></>,
                          "Using VPN services if you prefer not to share your location information",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-px h-5 mt-0.5 flex-shrink-0" style={{ background: "#E50914" }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ),
                },
                {
                  num: "9",
                  title: "Children's Privacy",
                  content: (
                    <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personally identifiable information from children under 13.</p>
                  ),
                },
                {
                  num: "10",
                  title: "Changes to This Privacy Policy",
                  content: (
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or technology. We will post the updated Privacy Policy on this page with a new &ldquo;Last Updated&rdquo; date.</p>
                  ),
                },
                {
                  num: "11",
                  title: "Contact Us",
                  content: (
                    <>
                      <p className="mb-4">If you have questions about our privacy practices, you can reach us at:</p>
                      <div className="p-4 bg-[#F5F5F5] dark:bg-[#1A1A1A] text-[rgba(15,15,15,0.7)] dark:text-[rgba(237,235,230,0.6)]">
                        <p className="mb-2">
                          <span style={{ color: "#E50914" }} className="font-bold mr-2">T</span>
                          +92 337 2629350
                        </p>
                        <p>
                          <span style={{ color: "#E50914" }} className="font-bold mr-2">A</span>
                          2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6, Karachi 75500, Pakistan
                        </p>
                      </div>
                    </>
                  ),
                },
              ].map((section) => (
                <div key={section.num} className="py-8 border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(237,235,230,0.08)] last:border-b-0">
                  <h3 className="flex items-center gap-4 mb-4">
                    <span
                      className="font-display text-3xl"
                      style={{ color: "#E50914" }}
                    >
                      {section.num}
                    </span>
                    <span className="font-bold uppercase tracking-wide text-sm text-[#1A1A1A] dark:text-[#EDEBE6]">
                      {section.title}
                    </span>
                  </h3>
                  <div className="text-[rgba(15,15,15,0.65)] dark:text-[rgba(237,235,230,0.6)] pl-12">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
