import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "../components/ThemeProvider";
import ToastContainerWrapper from "../components/ToastContainerWrapper";
import CursorEffect from "../components/CursorEffect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <CursorEffect />
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
                    <a href="#" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200 relative group">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                      <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-200"></span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200 relative group">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                      <span className="absolute inset-0 rounded-full bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-200"></span>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200 relative group">
                      <span className="sr-only">X (Twitter)</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
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
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Contact</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-600 dark:text-gray-300 flex items-start group">
                      <svg className="h-5 w-5 mr-3 text-red-500 mt-0.5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">+92 82000-60000</span>
                    </li>
                    <li className="text-gray-600 dark:text-gray-300 flex items-start group">
                      <svg className="h-5 w-5 mr-3 text-red-500 mt-0.5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">info@strikeden.com</span>
                    </li>
                    <li className="text-gray-600 dark:text-gray-300 flex items-start group">
                      <svg className="h-5 w-5 mr-3 text-red-500 mt-0.5 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Karachi, Pakistan</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Hours</h3>
                  <ul className="space-y-3">
                    <li className="text-gray-600 dark:text-gray-300 flex justify-between group hover:bg-gray-100 dark:hover:bg-gray-800/30 p-2 rounded-md transition-colors duration-200">
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Monday - Friday</span>
                      <span className="text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">6am - 10pm</span>
                    </li>
                    <li className="text-gray-600 dark:text-gray-300 flex justify-between group hover:bg-gray-100 dark:hover:bg-gray-800/30 p-2 rounded-md transition-colors duration-200">
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Saturday</span>
                      <span className="text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">8am - 8pm</span>
                    </li>
                    <li className="text-gray-600 dark:text-gray-300 flex justify-between group hover:bg-gray-100 dark:hover:bg-gray-800/30 p-2 rounded-md transition-colors duration-200">
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">Sunday</span>
                      <span className="text-red-500 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-200">8am - 6pm</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center transition-colors duration-300">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  © {new Date().getFullYear()} <span className="text-red-500">Strike Den</span>. All rights reserved.
                </p>
                <div className="mt-4 md:mt-0">
                  <ul className="flex space-x-6 text-sm">
                    <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full">Privacy</a></li>
                    <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full">Terms</a></li>
                    <li><a href="#" className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-red-500 after:transition-all hover:after:w-full">Cookies</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          <ToastContainerWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}