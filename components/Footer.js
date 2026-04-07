"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer
      className="relative overflow-hidden pt-20 pb-10 z-10 bg-[#FAFAFA] dark:bg-[#0A0A0A] text-[#1A1A1A] dark:text-[#EDEBE6]"
    >
      {/* Background year */}
      <div
        className="absolute bottom-0 right-0 font-display leading-none select-none pointer-events-none text-[rgba(0,0,0,0.03)] dark:text-[rgba(237,235,230,0.03)]"
        style={{
          fontSize: "20vw",
          letterSpacing: "-0.05em",
        }}
        aria-hidden
      >
        Est. 2022
      </div>

      <div className="relative z-10 px-6 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div
            className="font-display uppercase mb-4 text-[#1A1A1A] dark:text-[#EDEBE6]"
            style={{ fontSize: "2rem", letterSpacing: "-0.03em" }}
          >
            <span style={{ color: "#E50914" }}>Strike</span>Den
          </div>
          <p className="text-sm mb-6 text-[rgba(15,15,15,0.5)] dark:text-[rgba(237,235,230,0.5)]">
            Premium MMA training facility in Karachi, Pakistan. Join our community of fighters.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61570916734685"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/strikeden.pk/"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=923372629350&text&type=phone_number&app_absent=0"
              className="footer-social"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">WhatsApp</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M20.4054 3.5823C18.1716 1.3484 15.1717 0.1313 12.0145 0.1284C5.52064 0.1284 0.232685 5.4151 0.229758 11.9119C0.228685 13.9273 0.735399 15.8965 1.69658 17.6443L0.152344 23.8755L6.50926 22.3664C8.19177 23.2381 10.0834 23.6986 12.0068 23.6998H12.0145C18.5073 23.6998 23.7964 18.4121 23.7993 11.9155C23.8022 8.76685 22.6392 5.8163 20.4054 3.5823ZM12.0145 21.7022H12.0083C10.2969 21.7011 8.62159 21.2599 7.1672 20.4154L6.80223 20.2068L3.1662 21.1274L4.1049 17.5796L3.87512 17.2005C2.94379 15.6879 2.4462 13.9241 2.44728 12.1114C2.44991 6.51552 6.81381 2.1273 12.0206 2.1273C14.6557 2.1298 17.1298 3.14162 18.9853 4.9989C20.8408 6.8562 21.8482 9.3327 21.8461 11.9683C21.8432 17.5645 17.4796 21.7022 12.0145 21.7022ZM17.441 14.4047C17.1502 14.2594 15.6954 13.5426 15.4284 13.4447C15.1618 13.347 14.9659 13.298 14.7704 13.5887C14.5747 13.8795 14.0058 14.5487 13.8341 14.7443C13.6623 14.94 13.4907 14.9645 13.1999 14.8192C12.9091 14.6739 11.9323 14.3659 10.7822 13.3464C9.8865 12.5519 9.28511 11.5768 9.11341 11.286C8.9418 10.9952 9.09428 10.8375 9.24051 10.6929C9.37156 10.5629 9.53149 10.3539 9.67731 10.1822C9.82313 10.0105 9.87223 9.88846 9.96991 9.69277C10.0676 9.49728 10.0184 9.32558 9.94602 9.18028C9.87351 9.03508 9.27547 7.58011 9.03125 6.99874C8.79444 6.43554 8.55485 6.5078 8.37447 6.49707C8.20286 6.48696 8.00717 6.48613 7.81158 6.48613C7.61599 6.48613 7.30074 6.55865 7.0341 6.84947C6.76735 7.14028 5.99982 7.85706 5.99982 9.31203C5.99982 10.7669 7.05899 12.1742 7.20481 12.3696C7.35064 12.5651 9.28306 15.5429 12.2402 16.8202C12.9668 17.1394 13.5343 17.3323 13.977 17.4776C14.7061 17.7163 15.3702 17.6812 15.8955 17.6064C16.4799 17.5233 17.6459 16.8901 17.8904 16.2123C18.1348 15.5344 18.1348 14.9529 18.0623 14.8202C17.9898 14.6873 17.7941 14.6147 17.441 14.4047Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div
            className="text-xs uppercase tracking-widest font-bold mb-5"
            style={{ color: "#F8A348" }}
          >
            Quick Links
          </div>
          <ul className="space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Classes", href: "/classes" },
              { label: "Our Team", href: "/trainers" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Gym Rules", href: "/rules" },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="footer-nav-link text-sm flex items-center gap-2"
                >
                  <span style={{ color: "#E50914" }}>›</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div
            className="text-xs uppercase tracking-widest font-bold mb-5"
            style={{ color: "#F8A348" }}
          >
            Contact
          </div>
          <ul className="space-y-4">
            <li className="text-sm text-[rgba(15,15,15,0.5)] dark:text-[rgba(237,235,230,0.5)]">
              +92 337 2629350
            </li>
            <li className="text-sm leading-relaxed text-[rgba(15,15,15,0.5)] dark:text-[rgba(237,235,230,0.5)]">
              2nd Floor, 38-C, Shahbaz Commercial,<br />
              DHA Phase 6, Karachi 75500
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <div
            className="text-xs uppercase tracking-widest font-bold mb-5"
            style={{ color: "#F8A348" }}
          >
            Hours
          </div>
          <ul className="space-y-4">
            {[
              { day: "Mon – Sat", hours: "6:30am – 10am\n4pm – 10:30pm" },
              { day: "Sunday", hours: "Closed" },
            ].map(({ day, hours }) => (
              <li key={day}>
                <div className="text-xs uppercase tracking-widest mb-1 text-[#1A1A1A] dark:text-[#EDEBE6]">{day}</div>
                <div className="text-sm whitespace-pre-line text-[rgba(15,15,15,0.5)] dark:text-[rgba(237,235,230,0.5)]">{hours}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="relative z-10 px-6 md:px-16 mt-16 pt-6 flex justify-between items-end text-xs text-[rgba(15,15,15,0.35)] dark:text-[rgba(237,235,230,0.35)] border-t border-[rgba(0,0,0,0.08)] dark:border-[rgba(237,235,230,0.1)]"
      >
        <span>
          © {new Date().getFullYear()}{" "}
          <span style={{ color: "#E50914" }}>Strike Den</span>. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
