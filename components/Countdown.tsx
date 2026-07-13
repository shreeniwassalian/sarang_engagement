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
    <div className="countdown-grid" aria-label="Countdown to the engagement celebration">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <motion.span
            key={value}
            initial={{ opacity: 0.45, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}
