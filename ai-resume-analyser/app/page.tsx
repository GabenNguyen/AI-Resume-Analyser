/* eslint-disable react-hooks/purity */
"use client";

import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* gradient */}
        <motion.div
          suppressHydrationWarning
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute inset-0 bg-linear-to-r from-blue-200 via-purple-200 to-pink-200 
                     opacity-20 dark:from-gray-700 dark:via-gray-900 dark:to-gray-800 
                     blur-3xl"
        />

        {/* floating blobs */}
        {[...Array(8)].map((_, index) => (
          <motion.div
            suppressHydrationWarning
            key={index}
            animate={{ y: [0, 25, 0], x: [0, 15, 0] }}
            transition={{
              repeat: Infinity,
              ease: "easeInOut",
              duration: 5 + index,
              delay: index,
            }}
            className="absolute w-24 h-24 rounded-full bg-blue-300/20 dark:bg-purple-700/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* main contents */}
      <div className="relative z-10 flex flex-col">
        <Hero />
        <Features />
        <HowItWorks />
        <Footer />
      </div>
    </main>
  );
}
