"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';

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

// Tabs container component
function TabsContainer() {
  const [activeTab, setActiveTab] = useState("gym-rules");
  
  const tabs = [
    { id: "gym-rules", label: "Gym Rules" },
    { id: "payment-terms", label: "Payment Terms" },
    { id: "etiquette", label: "Etiquette Guide" }
  ];
  
  return (
    <div className="bg-gradient-to-r from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-sm">
      {/* Tabs navigation */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-5 font-medium text-sm rounded-t-lg transition-colors duration-200 focus:outline-none ${
              activeTab === tab.id
                ? "bg-white dark:bg-gray-800 border-b-2 border-red-500 text-red-600 dark:text-red-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "gym-rules" && <GymRules />}
        {activeTab === "payment-terms" && <PaymentTerms />}
        {activeTab === "etiquette" && <EtiquetteGuide />}
      </div>
    </div>
  );
}

function GymRules() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-red-600 dark:text-red-500 mr-2">Strike Den</span> 
        Rules
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Welcome to our gym! To ensure a respectful, productive, and safe environment for everyone, please adhere to the following rules:
      </p>
      
      <div className="space-y-6">
        {/* Rule 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
            Punctuality
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Be on time for your sessions.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>The instructor is not obligated to provide extra time for late arrivals.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
            Respect
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Show respect to the instructor and your fellow students at all times.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Any form of profanity, disrespect, shouting, or inappropriate behaviour will not be tolerated.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
            Gear
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Always bring the necessary gear to your sessions, including:</span>
            </li>
            <li className="flex items-start ml-8">
              <span className="text-red-500 mr-2 mt-1">■</span>
              <span>Boxing gloves</span>
            </li>
            <li className="flex items-start ml-8">
              <span className="text-red-500 mr-2 mt-1">■</span>
              <span>Shin pads</span>
            </li>
            <li className="flex items-start ml-8">
              <span className="text-red-500 mr-2 mt-1">■</span>
              <span>Any other required equipment</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 4 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
            Injuries
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If you have injuries, inform the instructor.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>We will help you work around them to ensure you still have a valuable experience.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 5 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5</span>
            Attitude
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Leave your ego, attitude, and personal grudges off the mats.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>This is a space for learning, growth, and mutual respect.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 6 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">6</span>
            Sparring
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Sparring full contact is allowed only after 3 months of training with us.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Participation is always your choice; there is no pressure to spar if you are not ready.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 7 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">7</span>
            During Instruction
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>No talking while the instructor is demonstrating a drill.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If you have questions, wait until the instructor has finished and they will revise the drill for you.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 8 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">8</span>
            During Drills and Sparring
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Avoid talking during drills, sparring, or practice unless it is absolutely necessary.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 9 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">9</span>
            No Call No Show
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If you don't show up or reach out to us for 1 week, you're out.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Your slot will be forfeited and you will be removed from the program.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 10 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">10</span>
            Zero Tolerance for Violence and Unauthorized Fights
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Strictly no organizing, instigating, or participating in fights—inside or outside the gym—unless in clear self-defense. Any involvement in unsanctioned or illegal altercations will result in immediate suspension or termination of membership.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 11 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">11</span>
            Attendance and Membership Termination
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If you miss classes and fail to inform your coach or management, your membership will be terminated.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>Any discounts or paid fees will be forfeited.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If you wish to rejoin, you will be required to pay the full standard price with no exceptions.</span>
            </li>
          </ul>
        </div>
        
        {/* Rule 12 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">12</span>
            Single Student Class Policy
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If only one person is registered for a class, the instructor will wait a maximum of 15 minutes.</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2 mt-1">○</span>
              <span>If the student does not inform the instructor that they will be late or does not show up, the class will be cancelled.</span>
            </li>
          </ul>
        </div>
        
        {/* Conclusion */}
        <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg text-gray-800 dark:text-gray-200">
          <p>
            Following these rules will help maintain a positive and effective training environment. Let us work together to grow stronger, both physically and mentally. See you on the mats!
          </p>
        </div>
      </div>
    </div>
  );
}

function PaymentTerms() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-blue-600 dark:text-blue-500 mr-2">Payment</span> 
        Terms and Conditions
      </h2>
      
      <div className="space-y-6">
        {/* Payment Term 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
            Missed Sessions Policy
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">-</span>
              <span> If you miss a session, we are not responsible.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">-</span>
              <span>Students cannot make up for missed classes under any circumstances.</span>
            </li>
          </ul>
        </div>
        
        {/* Payment Term 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
            Refund Policy
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">-</span>
              <span>No refunds will be provided under any circumstances.</span>
            </li>
          </ul>
        </div>
        
        {/* Payment Term 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
            Due Clearance
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">-</span>
              <span>Payment reminders will be sent on the following schedule:</span>
            </li>
            <li className="flex items-start ml-8">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span>1st of the month — First reminder.</span>
            </li>
            <li className="flex items-start ml-8">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span>5th of the month — Second reminder.</span>
            </li>
            <li className="flex items-start ml-8">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span>10th of the month — Final reminder.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2 mt-1">-</span>
              <span>If dues are not cleared by the 15th of the month, you will not be permitted to attend any further classes until payment is made according to your payment cycle.</span>
            </li>
          </ul>
        </div>
        
        {/* Conclusion */}
        <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30 text-gray-800 dark:text-gray-200 text-sm">
          <p>By adhering to these terms, we can ensure a smooth and consistent experience for everyone. Thank you for your cooperation.</p>
        </div>
      </div>
    </div>
  );
}

function EtiquetteGuide() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-green-600 dark:text-green-500 mr-2">Gym</span> 
        Etiquette Guide
      </h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <p className="text-gray-700 dark:text-gray-300">
          Welcome to Strike Den, where we strive to create a respectful, focused, and safe training environment for everyone. Please read and adhere to the following gym etiquette and class rules to ensure a smooth and enjoyable experience for all.
        </p>
      </div>
      
      {/* Class Rules */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pl-2 border-l-4 border-green-500">Class Rules</h3>
      
      <div className="space-y-4 mb-8">
        {/* Class Rule 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
            Punctuality
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Arrive on time for all classes. Late arrivals disrupt the flow of the session.</span>
            </li>
          </ul>
        </div>
        
        {/* Class Rule 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
            Mandatory Warm-Up
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Warm-up is essential for your safety and performance. Participation is mandatory, and any argument regarding this will not be entertained.</span>
            </li>
          </ul>
        </div>
        
        {/* Class Rule 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
            Respect for Others
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Maintain a positive and respectful attitude towards your instructor and fellow students.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Shouting, aggravating, or disrupting others will result in immediate removal from the mats.</span>
            </li>
          </ul>
        </div>
        
        {/* Class Rule 4 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold">4</span>
            Follow Instructions
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Listen carefully to your instructor and follow the instructions given.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Do not argue or deviate from the drill or workout assigned.</span>
            </li>
          </ul>
        </div>
        
        {/* Class Rule 5-7 (collapsed for brevity) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold">5-7</span>
            Other Class Rules
          </h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span><strong>Questions and Clarifications:</strong> Save any questions for after the instructor has finished demonstrating the drill or workout.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span><strong>Equipment Usage:</strong> Respect gym equipment. Return all items to their designated place after use.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span><strong>No Makeup Classes:</strong> Classes missed by students cannot be rescheduled or made up.</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Additional Guidelines */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pl-2 border-l-4 border-green-500">Additional Guidelines</h3>
      
      <div className="space-y-4">
        {/* Additional Guidelines (combined for brevity) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Hygiene & Appearance</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Maintain proper hygiene and ensure your gear is clean for every class.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Nails must be cut short before stepping on the mats for any class.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>A rashguard is mandatory for all judo classes.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>Wear appropriate training attire to ensure comfort and safety.</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Communication</h4>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 mt-1">-</span>
              <span>If you need to leave a class early, inform the instructor beforehand.</span>
            </li>
          </ul>
        </div>
        
        {/* Conclusion */}
        <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/30 text-gray-800 dark:text-gray-200">
          <p>By following these rules, we can create a supportive and disciplined space for everyone to train, grow, and excel. Thank you for your cooperation, and welcome to the mats!</p>
        </div>
      </div>
    </div>
  );
} 