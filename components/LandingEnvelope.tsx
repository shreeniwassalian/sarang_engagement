"use client";

import React from "react";
import { motion } from "framer-motion";

interface LandingEnvelopeProps {
  onOpen: () => void;
}

export default function LandingEnvelope({ onOpen }: LandingEnvelopeProps) {
  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "#E3F2FD" }}>
      


      {/* Envelope Container */}
      <motion.div
        className="relative cursor-pointer z-10"
        style={{
          width: "clamp(260px, 70vw, 400px)", // Small, centered rectangle
          aspectRatio: "3 / 2", // Standard envelope ratio
        }}
        whileHover={{ scale: 1.05, filter: "drop-shadow(0 15px 30px rgba(76, 97, 120, 0.25))" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onOpen}
      >
        <img
          src="/envelope.png"
          alt="Envelope"
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </motion.div>

      {/* Typography Below Envelope */}
      <div className="mt-12 text-center flex flex-col items-center z-10 pointer-events-none">
        <h1 
          style={{ 
            color: "#4C6178", 
            fontFamily: "var(--font-alex-brush), cursive",
            fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
            lineHeight: 1,
            margin: "0 0 10px 0",
            textShadow: "0 2px 8px rgba(76, 97, 120, 0.15)"
          }}
        >
          You're Invited
        </h1>
        <p 
          style={{ 
            color: "#607489", 
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
            letterSpacing: "0.15em",
            fontWeight: 500,
            textTransform: "uppercase"
          }}
        >
          Tap the envelope to open your invitation
        </p>
      </div>

    </div>
  );
}
