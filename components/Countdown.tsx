"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const weddingDate = new Date("2026-08-16T17:00:00+05:30").getTime();

function getTimeLeft() {
  const remaining = Math.max(0, weddingDate - Date.now());
  return {
    Days: Math.floor(remaining / 86_400_000),
    Hours: Math.floor((remaining / 3_600_000) % 24),
    Minutes: Math.floor((remaining / 60_000) % 60),
    Seconds: Math.floor((remaining / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto mt-6" aria-label="Countdown to the engagement celebration">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div 
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-[#3A5B7C] bg-transparent backdrop-blur-md transition-all hover:border-[#3A5B7C]" 
          key={label}
        >
          <div className="overflow-hidden h-9 sm:h-12 flex items-center justify-center">
            <motion.span
              key={value}
              initial={{ opacity: 0.2, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-2xl sm:text-4xl font-serif font-bold text-[#3A5B7C] leading-none"
              style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {String(value).padStart(2, "0")}
            </motion.span>
          </div>
          <span className="mt-1.5 text-[0.65rem] sm:text-xs tracking-[0.2em] font-semibold text-[#3A5B7C] uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
