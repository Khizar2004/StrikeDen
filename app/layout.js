import { Inter, Roboto_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "../components/ThemeProvider";
import ToastContainerWrapper from "../components/ToastContainerWrapper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import FacebookTracker from './FacebookTracker';
import { metadata } from './metadata';

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head />
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <FacebookTracker />
          <Navbar />

          <div className="flex-grow relative z-10">
            {children}
          </div>

          <Footer />
          <ToastContainerWrapper />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
