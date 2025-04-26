import React from 'react';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

export const metadata = {
  title: 'Privacy Policy | Strike Den MMA',
  description: 'Our commitment to protecting your privacy and information while using Strike Den MMA services.',
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-300 mt-6 max-w-2xl mx-auto">
            Our commitment to protecting your privacy while providing exceptional martial arts training
          </p>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-padded max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-red-600 dark:text-red-500 mr-2">Privacy Policy</span> 
                for Strike Den MMA
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                    Introduction
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    At Strike Den MMA ("we," "our," or "us"), we respect your privacy and are committed to transparency about the limited data we collect when you visit our website (strikeden.vercel.app).
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                    Information We Collect
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We collect very minimal information through Vercel Analytics:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Basic Analytics Data:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Anonymous usage statistics such as country of origin and browser type.</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <div>
                        <strong className="text-gray-900 dark:text-white">Performance Data:</strong>
                        <span className="text-gray-700 dark:text-gray-300"> Information about how our website performs for different visitors to help us improve site speed and user experience.</span>
                      </div>
                    </li>
                  </ul>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-900/30 text-green-800 dark:text-green-400 text-sm">
                    We do not collect or store any personally identifiable information such as names, email addresses, or phone numbers through our website.
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                    How We Collect Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We use Vercel Analytics, a privacy-friendly analytics tool that provides us with basic, anonymous metrics about our website visitors. This data is aggregated and cannot be used to identify individual users.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
                    How We Use Your Information
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We use the limited data we collect to:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Understand our website's performance</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Identify and resolve technical issues</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Make improvements to our website's usability</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Analyze basic geographic distribution of our visitors</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
                    Cookies and Tracking Technologies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Vercel Analytics uses lightweight, privacy-focused tracking that respects user privacy. It does not use cookies that require consent banners and only collects the minimum information needed to understand basic usage patterns.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</span>
                    Data Sharing and Disclosure
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The anonymous analytics data is processed by Vercel, our hosting provider. We do not sell, trade, or otherwise transfer this information to external parties.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">7</span>
                    Data Security
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Since we collect very minimal data that cannot identify individual users, the privacy risk is extremely low. Vercel maintains industry-standard security practices to protect any data collected through their analytics platform.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">8</span>
                    Your Privacy Rights
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Since we do not collect personally identifiable information, most data protection regulations around individual data access or deletion do not apply. However, we respect your privacy choices, including:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Using browser privacy settings that limit tracking</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Using browser extensions that block analytics</span>
                    </li>
                    <li className="flex items-center">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">Using VPN services if you prefer not to share your country of origin</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">9</span>
                    Children's Privacy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our website is not intended for children under 13 years of age, though the anonymous analytics we collect pose minimal privacy concerns for users of any age.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">10</span>
                    Changes to This Privacy Policy
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or technology. We will post the updated Privacy Policy on this page with a new "Last Updated" date.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-3 flex items-center">
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">11</span>
                    Contact Us
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    If you have questions about our minimal data collection practices, you can reach us at:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-gray-700 dark:text-gray-300">
                    <p className="flex items-center mb-2">
                      <svg className="h-5 w-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <strong className="text-gray-900 dark:text-white mr-2">Phone:</strong> +92 337 2629350
                    </p>
                    <p className="flex items-start">
                      <svg className="h-5 w-5 mr-3 text-red-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        <strong className="text-gray-900 dark:text-white mr-2">Address:</strong> 2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6, Karachi 75500, Pakistan
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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