import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "../components/ThemeProvider";
import ToastContainerWrapper from "../components/ToastContainerWrapper";
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

// Using Inter font as a replacement for Geist, with similar modern sans-serif characteristics
const inter = Inter({
  variable: "--font-geist-sans", // Keeping the same variable name for compatibility
  subsets: ["latin"],
  display: 'swap',
});

// Using Roboto Mono as a replacement for Geist Mono
const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono", // Keeping the same variable name for compatibility
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Strike Den MMA | Premier MMA Gym in Karachi",
  description: "Strike Den offers world-class MMA training with expert coaches, state-of-the-art facilities, and a supportive community. Join us for boxing, kickboxing, and MMA classes in Karachi.",
  keywords: ["MMA gym", "boxing classes", "kickboxing", "martial arts", "fitness", "Karachi", "Pakistan"],
  openGraph: {
    title: "Strike Den MMA | Premier MMA Gym in Karachi",
    description: "Train with the best coaches in a state-of-the-art MMA facility",
    url: "https://strikeden.com",
    siteName: "Strike Den MMA",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          
          {/* Background effects */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full bg-red-500/5 dark:bg-red-500/10 blur-[100px] animate-[float_20s_ease-in-out_infinite] opacity-30 dark:opacity-50 transition-opacity duration-300"></div>
            <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full bg-red-500/5 dark:bg-red-500/10 blur-[80px] animate-[float_15s_ease-in-out_infinite_reverse] opacity-30 dark:opacity-50 transition-opacity duration-300"></div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-5 dark:opacity-10 transition-opacity duration-300"></div>
            
            {/* Noise texture */}
            <div className="absolute inset-0 bg-noise opacity-10 dark:opacity-20 mix-blend-overlay transition-opacity duration-300"></div>
          </div>
          
          <div className="flex-grow relative z-10">
            {children}
          </div>
          
          <footer className="bg-white border-t border-gray-200 text-gray-800 py-12 relative overflow-hidden z-10 dark:bg-gray-800 dark:text-white dark:border-gray-700 transition-colors duration-300">
            {/* Background accent */}
            <div className="absolute inset-0 bg-mesh opacity-5 dark:opacity-10 pointer-events-none transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/30 via-red-600/20 to-transparent dark:from-red-500/80 dark:via-red-600/50 transition-colors duration-300"></div>
            
            {/* Animated glow effect */}
            <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-red-500/50 dark:via-red-500/80 to-transparent animate-[gradient-shift_4s_ease_infinite] transition-colors duration-300" 
                   style={{ backgroundSize: '200% 100%' }}></div>
            </div>
            
            <div className="container-padded relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="text-red-600 dark:text-red-500 dark:neon-text">Strike</span>
                    <span className="text-gray-900 dark:text-white">Den</span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Premium MMA training facility in Karachi, Pakistan. 
                    Join our community of fighters and fitness enthusiasts.
                  </p>
                  
                  <div className="mt-6 flex space-x-4">
                      <a 
                        href="https://www.facebook.com/profile.php?id=61570916734685" 
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200 relative group"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">Facebook</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                        <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-200"></span>
                      </a>
                      
                      <a 
                        href="https://www.instagram.com/strikeden.pk/" 
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200 relative group"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">Instagram</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                        <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-200"></span>
                      </a>
                      
                      <a 
                        href="https://api.whatsapp.com/send/?phone=923372629350&text&type=phone_number&app_absent=0" 
                        className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200 relative group"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">WhatsApp</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M20.4054 3.5823C18.1716 1.3484 15.1717 0.1313 12.0145 0.1284C5.52064 0.1284 0.232685 5.4151 0.229758 11.9119C0.228685 13.9273 0.735399 15.8965 1.69658 17.6443L0.152344 23.8755L6.50926 22.3664C8.19177 23.2381 10.0834 23.6986 12.0068 23.6998H12.0145C18.5073 23.6998 23.7964 18.4121 23.7993 11.9155C23.8022 8.76685 22.6392 5.8163 20.4054 3.5823ZM12.0145 21.7022H12.0083C10.2969 21.7011 8.62159 21.2599 7.1672 20.4154L6.80223 20.2068L3.1662 21.1274L4.1049 17.5796L3.87512 17.2005C2.94379 15.6879 2.4462 13.9241 2.44728 12.1114C2.44991 6.51552 6.81381 2.1273 12.0206 2.1273C14.6557 2.1298 17.1298 3.14162 18.9853 4.9989C20.8408 6.8562 21.8482 9.3327 21.8461 11.9683C21.8432 17.5645 17.4796 21.7022 12.0145 21.7022ZM17.441 14.4047C17.1502 14.2594 15.6954 13.5426 15.4284 13.4447C15.1618 13.347 14.9659 13.298 14.7704 13.5887C14.5747 13.8795 14.0058 14.5487 13.8341 14.7443C13.6623 14.94 13.4907 14.9645 13.1999 14.8192C12.9091 14.6739 11.9323 14.3659 10.7822 13.3464C9.8865 12.5519 9.28511 11.5768 9.11341 11.286C8.9418 10.9952 9.09428 10.8375 9.24051 10.6929C9.37156 10.5629 9.53149 10.3539 9.67731 10.1822C9.82313 10.0105 9.87223 9.88846 9.96991 9.69277C10.0676 9.49728 10.0184 9.32558 9.94602 9.18028C9.87351 9.03508 9.27547 7.58011 9.03125 6.99874C8.79444 6.43554 8.55485 6.5078 8.37447 6.49707C8.20286 6.48696 8.00717 6.48613 7.81158 6.48613C7.61599 6.48613 7.30074 6.55865 7.0341 6.84947C6.76735 7.14028 5.99982 7.85706 5.99982 9.31203C5.99982 10.7669 7.05899 12.1742 7.20481 12.3696C7.35064 12.5651 9.28306 15.5429 12.2402 16.8202C12.9668 17.1394 13.5343 17.3323 13.977 17.4776C14.7061 17.7163 15.3702 17.6812 15.8955 17.6064C16.4799 17.5233 17.6459 16.8901 17.8904 16.2123C18.1348 15.5344 18.1348 14.9529 18.0623 14.8202C17.9898 14.6873 17.7941 14.6147 17.441 14.4047Z" clipRule="evenodd" />
                        </svg>
                        <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-200"></span>
                      </a>
                    </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200 flex items-center group">
                        <span className="mr-2 text-red-500 transition-transform duration-200 group-hover:translate-x-1">›</span>
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/about" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200 flex items-center group">
                        <span className="mr-2 text-red-500 transition-transform duration-200 group-hover:translate-x-1">›</span>
                        About
                      </a>
                    </li>
                    <li>
                      <a href="/classes" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200 flex items-center group">
                        <span className="mr-2 text-red-500 transition-transform duration-200 group-hover:translate-x-1">›</span>
                        Classes
                      </a>
                    </li>
                    <li>
                      <a href="/trainers" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200 flex items-center group">
                        <span className="mr-2 text-red-500 transition-transform duration-200 group-hover:translate-x-1">›</span>
                        Trainers
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200 flex items-center group">
                        <span className="mr-2 text-red-500 transition-transform duration-200 group-hover:translate-x-1">›</span>
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="/rules" className="text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200 flex items-center group">
                        <span className="mr-2 text-red-500 transition-transform duration-200 group-hover:translate-x-1">›</span>
                        Gym Rules
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Contact</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-600 dark:text-gray-300 flex items-start group">
                      <svg className="h-7 w-7 mr-3 text-red-500 mt-0.5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">+92 337 2629350</span>
                    </li>

                    <li className="text-gray-600 dark:text-gray-300 flex items-start group">
                      <svg className="h-7 w-7 mr-3 text-red-500 mt-0.5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">2nd Floor, 38-C, Shahbaz Commercial, DHA Phase 6, Karachi 75500, Pakistan</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Hours</h3>
                  <ul className="space-y-4">
                    <li className="text-gray-600 dark:text-gray-300">
                      <div className="font-medium text-gray-900 dark:text-white mb-1">Weekdays (Mon-Fri)</div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-red-500 dark:text-red-400">8am - 10am, 4pm - 10pm</span>
                      </div>
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <div className="font-medium text-gray-900 dark:text-white mb-1">Saturday</div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-red-500 dark:text-red-400">8am - 10am, 4pm - 10pm</span>
                      </div>
                    </li>
                    <li className="text-gray-600 dark:text-gray-300">
                      <div className="font-medium text-gray-900 dark:text-white mb-1">Sunday</div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-red-500 dark:text-red-400 font-medium">Closed</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  © {new Date().getFullYear()} <span className="text-red-500">Strike Den</span>. All rights reserved.
                </p>

              </div>
            </div>
          </footer>
          <ToastContainerWrapper />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}