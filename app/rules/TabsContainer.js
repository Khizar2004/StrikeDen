"use client";
import React, { useState } from "react";
import { useTheme } from "../../components/ThemeProvider";

export default function TabsContainer() {
  const [activeTab, setActiveTab] = useState("gym-rules");
  const { theme, mounted } = useTheme();

  if (!mounted) return null;

  const isDark = theme === "dark";
  const textColor = isDark ? "#EDEBE6" : "#1A1A1A";
  const mutedColor = isDark ? "rgba(237,235,230,0.6)" : "rgba(15,15,15,0.55)";
  const dividerColor = isDark ? "rgba(237,235,230,0.08)" : "rgba(0,0,0,0.06)";

  const tabs = [
    { id: "gym-rules", label: "Gym Rules" },
    { id: "payment-terms", label: "Payment Terms" },
    { id: "etiquette", label: "Etiquette Guide" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 mb-16" style={{ borderBottom: `1px solid ${dividerColor}` }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="pb-4 px-5 text-xs uppercase tracking-widest font-bold transition-colors duration-200"
            style={{
              color: activeTab === tab.id ? "#E50914" : mutedColor,
              borderBottom: activeTab === tab.id ? "2px solid #E50914" : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "gym-rules" && <GymRules textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} />}
      {activeTab === "payment-terms" && <PaymentTerms textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} />}
      {activeTab === "etiquette" && <EtiquetteGuide textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} />}
    </div>
  );
}

function RuleItem({ num, title, children, textColor, mutedColor, dividerColor, isFirst }) {
  return (
    <>
      {!isFirst && <div className="h-px" style={{ background: dividerColor }} />}
      <div className="grid grid-cols-12 gap-4 py-8 items-baseline">
        <div className="col-span-2 md:col-span-1">
          <span className="font-display" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "#E50914", lineHeight: 1 }}>
            {num}
          </span>
        </div>
        <div className="col-span-10 md:col-span-11">
          <h3 className="font-display uppercase mb-3" style={{ fontSize: "clamp(1.2rem, 2vw, 1.75rem)", lineHeight: 0.95, letterSpacing: "-0.04em", color: textColor }}>
            {title}
          </h3>
          <div className="space-y-2 text-sm" style={{ color: mutedColor }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

function SectionFooter({ children, dividerColor, mutedColor }) {
  return (
    <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${dividerColor}` }}>
      <p className="text-sm" style={{ color: mutedColor }}>{children}</p>
    </div>
  );
}

function GymRules({ textColor, mutedColor, dividerColor }) {
  return (
    <div>
      <p className="mb-10 text-base" style={{ color: mutedColor }}>
        Welcome to our gym! To ensure a respectful, productive, and safe environment for everyone, please adhere to the following rules:
      </p>

      <RuleItem num="01" title="Punctuality" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} isFirst>
        <p>Be on time for your sessions.</p>
        <p>The instructor is not obligated to provide extra time for late arrivals.</p>
      </RuleItem>

      <RuleItem num="02" title="Respect" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Show respect to the instructor and your fellow students at all times.</p>
        <p>Any form of profanity, disrespect, shouting, or inappropriate behaviour will not be tolerated.</p>
      </RuleItem>

      <RuleItem num="03" title="Gear" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Always bring the necessary gear to your sessions, including:</p>
        <p className="ml-4">Boxing gloves, shin pads, and any other required equipment.</p>
      </RuleItem>

      <RuleItem num="04" title="Injuries" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>If you have injuries, inform the instructor.</p>
        <p>We will help you work around them to ensure you still have a valuable experience.</p>
      </RuleItem>

      <RuleItem num="05" title="Attitude" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Leave your ego, attitude, and personal grudges off the mats.</p>
        <p>This is a space for learning, growth, and mutual respect.</p>
      </RuleItem>

      <RuleItem num="06" title="Sparring" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Sparring full contact is allowed only after 3 months of training with us.</p>
        <p>Participation is always your choice; there is no pressure to spar if you are not ready.</p>
      </RuleItem>

      <RuleItem num="07" title="During Instruction" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>No talking while the instructor is demonstrating a drill.</p>
        <p>If you have questions, wait until the instructor has finished and they will revise the drill for you.</p>
      </RuleItem>

      <RuleItem num="08" title="During Drills & Sparring" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Avoid talking during drills, sparring, or practice unless it is absolutely necessary.</p>
      </RuleItem>

      <RuleItem num="09" title="No Call No Show" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>If you don&apos;t show up or reach out to us for 1 week, you&apos;re out.</p>
        <p>Your slot will be forfeited and you will be removed from the program.</p>
      </RuleItem>

      <RuleItem num="10" title="Zero Tolerance for Violence" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Strictly no organizing, instigating, or participating in fights — inside or outside the gym — unless in clear self-defense. Any involvement in unsanctioned or illegal altercations will result in immediate suspension or termination of membership.</p>
      </RuleItem>

      <RuleItem num="11" title="Attendance & Membership" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>If you miss classes and fail to inform your coach or management, your membership will be terminated.</p>
        <p>Any discounts or paid fees will be forfeited.</p>
        <p>If you wish to rejoin, you will be required to pay the full standard price with no exceptions.</p>
      </RuleItem>

      <RuleItem num="12" title="Single Student Class Policy" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>If only one person is registered for a class, the instructor will wait a maximum of 15 minutes.</p>
        <p>If the student does not inform the instructor that they will be late or does not show up, the class will be cancelled.</p>
      </RuleItem>

      <SectionFooter dividerColor={dividerColor} mutedColor={mutedColor}>
        Following these rules will help maintain a positive and effective training environment. Let us work together to grow stronger, both physically and mentally. See you on the mats!
      </SectionFooter>
    </div>
  );
}

function PaymentTerms({ textColor, mutedColor, dividerColor }) {
  return (
    <div>
      <RuleItem num="01" title="Missed Sessions Policy" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} isFirst>
        <p>If you miss a session, we are not responsible.</p>
        <p>Students cannot make up for missed classes under any circumstances.</p>
      </RuleItem>

      <RuleItem num="02" title="Refund Policy" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>No refunds will be provided under any circumstances.</p>
      </RuleItem>

      <RuleItem num="03" title="Due Clearance" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Payment reminders will be sent on the following schedule:</p>
        <p className="ml-4">1st of the month — First reminder.</p>
        <p className="ml-4">5th of the month — Second reminder.</p>
        <p className="ml-4">10th of the month — Final reminder.</p>
        <p>If dues are not cleared by the 15th of the month, you will not be permitted to attend any further classes until payment is made according to your payment cycle.</p>
      </RuleItem>

      <RuleItem num="04" title="Training Fee Adjustment" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>If you have paid for a month of training and are unable to attend during that month, you must inform the management within 15 days of the payment date.</p>
        <p>Failure to do so will result in <strong style={{ color: textColor }}>no adjustment or carry forward of the fee, under any circumstances.</strong></p>
        <p>If you have paid for multiple months, the same rule applies to each individual month.</p>
      </RuleItem>

      <SectionFooter dividerColor={dividerColor} mutedColor={mutedColor}>
        By adhering to these terms, we can ensure a smooth and consistent experience for everyone. Thank you for your cooperation.
      </SectionFooter>
    </div>
  );
}

function EtiquetteGuide({ textColor, mutedColor, dividerColor }) {
  return (
    <div>
      <p className="mb-10 text-base" style={{ color: mutedColor }}>
        Welcome to Strike Den, where we strive to create a respectful, focused, and safe training environment for everyone.
      </p>

      <span className="text-xs uppercase tracking-widest mb-6 block font-bold" style={{ color: "#F8A348" }}>
        Class Rules
      </span>

      <RuleItem num="01" title="Punctuality" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} isFirst>
        <p>Arrive on time for all classes. Late arrivals disrupt the flow of the session.</p>
      </RuleItem>

      <RuleItem num="02" title="Mandatory Warm-Up" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Warm-up is essential for your safety and performance. Participation is mandatory, and any argument regarding this will not be entertained.</p>
      </RuleItem>

      <RuleItem num="03" title="Respect for Others" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Maintain a positive and respectful attitude towards your instructor and fellow students.</p>
        <p>Shouting, aggravating, or disrupting others will result in immediate removal from the mats.</p>
      </RuleItem>

      <RuleItem num="04" title="Follow Instructions" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Listen carefully to your instructor and follow the instructions given.</p>
        <p>Do not argue or deviate from the drill or workout assigned.</p>
      </RuleItem>

      <RuleItem num="05" title="Questions & Equipment" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>Save any questions for after the instructor has finished demonstrating the drill or workout.</p>
        <p>Respect gym equipment. Return all items to their designated place after use.</p>
        <p>Classes missed by students cannot be rescheduled or made up.</p>
      </RuleItem>

      <div className="h-px my-12" style={{ background: dividerColor }} />

      <span className="text-xs uppercase tracking-widest mb-6 block font-bold" style={{ color: "#F8A348" }}>
        Additional Guidelines
      </span>

      <RuleItem num="06" title="Hygiene & Appearance" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor} isFirst>
        <p>Maintain proper hygiene and ensure your gear is clean for every class.</p>
        <p>Nails must be cut short before stepping on the mats for any class.</p>
        <p>A rashguard is mandatory for all judo classes.</p>
        <p>Wear appropriate training attire to ensure comfort and safety.</p>
      </RuleItem>

      <RuleItem num="07" title="Communication" textColor={textColor} mutedColor={mutedColor} dividerColor={dividerColor}>
        <p>If you need to leave a class early, inform the instructor beforehand.</p>
      </RuleItem>

      <SectionFooter dividerColor={dividerColor} mutedColor={mutedColor}>
        By following these rules, we can create a supportive and disciplined space for everyone to train, grow, and excel. Thank you for your cooperation, and welcome to the mats!
      </SectionFooter>
    </div>
  );
}
