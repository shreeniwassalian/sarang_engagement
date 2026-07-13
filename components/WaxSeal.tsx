"use client";

import { motion } from "framer-motion";

interface WaxSealProps {
  isPressed?: boolean;
}

export default function WaxSeal({ isPressed = false }: WaxSealProps) {
  return (
    <motion.div
      className="relative select-none"
      style={{
        width: "clamp(120px, 30vmin, 168px)",
        height: "clamp(120px, 30vmin, 168px)",
      }}
      animate={isPressed ? { scale: 0.91, rotateX: 10 } : { scale: 1, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Wax seal with initials S Y"
        role="img"
      >
        <defs>
          <filter id="sealDropShadow" x="-25%" y="-25%" width="150%" height="165%">
            <feDropShadow dx="0" dy="5" stdDeviation="3.4" floodColor="#371015" floodOpacity="0.58" />
          </filter>
          <filter id="waxTexture" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="2" seed="11" result="noise" />
            <feComposite in="noise" in2="SourceGraphic" operator="in" result="grain" />
            <feBlend in="SourceGraphic" in2="grain" mode="soft-light" />
          </filter>
          <radialGradient id="outerWax" cx="34%" cy="24%" r="76%">
            <stop offset="0%" stopColor="#c68682" />
            <stop offset="12%" stopColor="#7d292c" />
            <stop offset="44%" stopColor="#56171c" />
            <stop offset="78%" stopColor="#3a0c12" />
            <stop offset="100%" stopColor="#22060b" />
          </radialGradient>
          <radialGradient id="pressedWax" cx="35%" cy="27%" r="78%">
            <stop offset="0%" stopColor="#f0d7d0" />
            <stop offset="46%" stopColor="#d5a5a1" />
            <stop offset="76%" stopColor="#b66d70" />
            <stop offset="100%" stopColor="#722126" />
          </radialGradient>
          <linearGradient id="rimHighlight" x1="18%" y1="12%" x2="78%" y2="88%">
            <stop offset="0%" stopColor="#f2c7be" stopOpacity="0.92" />
            <stop offset="22%" stopColor="#aa5858" stopOpacity="0.36" />
            <stop offset="56%" stopColor="#32080e" stopOpacity="0" />
            <stop offset="100%" stopColor="#180307" stopOpacity="0.86" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="37%" cy="26%" r="65%">
            <stop offset="0%" stopColor="#fff5ef" stopOpacity="0.58" />
            <stop offset="55%" stopColor="#e8bdb7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#4d1117" stopOpacity="0.22" />
          </radialGradient>
        </defs>

        {/* Raised, irregular wax edge */}
        <path
          d="M50 3.5C60 3.2 66.7 7 75.1 11.4C84.9 16.5 93.7 25.4 95.7 36.2C98.2 48.7 94.5 61.8 87.2 71.8C79.4 82.6 66.2 95.2 51.5 96.4C37.2 97.6 24.3 90.4 14.8 80.8C5.7 71.5 1.8 57.8 3.5 45.1C5.2 32.5 12.5 20.5 22.7 12.8C31 6.5 40.4 3.8 50 3.5Z"
          fill="url(#outerWax)"
          filter="url(#sealDropShadow)"
        />
        <path
          d="M50 6.4C60.3 6.2 68.9 11 77.7 16.4C86.7 22 92.3 31.4 92.2 42.3C92.1 53.8 87.3 64.8 79.3 73C71.4 81.1 61.4 90 50.4 91C38.6 92 27.3 86.8 19.5 77.8C11.7 68.8 7.4 57.5 8.6 45.8C9.8 34.2 15.7 24.3 25.1 17.1C32.5 11.4 40.3 6.6 50 6.4Z"
          fill="none"
          stroke="url(#rimHighlight)"
          strokeWidth="2.2"
          opacity="0.95"
        />

        {/* Pressed centre and inset edge */}
        <circle cx="50" cy="50" r="37.8" fill="#4f1218" opacity="0.9" />
        <circle cx="50" cy="49.4" r="35.3" fill="url(#pressedWax)" filter="url(#waxTexture)" />
        <circle cx="50" cy="49.4" r="35.3" fill="url(#centerGlow)" />
        <circle cx="50" cy="49.4" r="35.3" fill="none" stroke="#441016" strokeWidth="1.25" opacity="0.62" />
        <ellipse cx="39" cy="31" rx="18" ry="8" fill="#fff4ed" opacity="0.16" transform="rotate(-28 39 31)" />

        {/* A lightly embossed, interlaced calligraphic monogram */}
        <g fontFamily="var(--font-great-vibes), cursive" fontSize="41" fontWeight="400" textAnchor="middle">
          <text x="39" y="61.5" fill="#f6d6cf" opacity="0.65" transform="translate(0 1)">S</text>
          <text x="61" y="61.5" fill="#f6d6cf" opacity="0.65" transform="translate(0 1)">Y</text>
          <text x="39" y="61.5" fill="#65171d">S</text>
          <text x="61" y="61.5" fill="#65171d">Y</text>
        </g>
      </svg>
    </motion.div>
  );
}
