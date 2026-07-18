"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import WaxSeal from "./WaxSeal";

/* ================================================================== */
/*  Constants                                                           */
/* ================================================================== */
const GOLD = "#C9A24B";
const CRIMSON = "#7A1F2B";
const DARK = "#3A3A3A";

function CrownIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" aria-hidden="true">
      <path d="M1.5 8.5L2 3L4.5 5.5L7 1.5L9.5 5.5L12 3L12.5 8.5H1.5Z" />
      <circle cx="2" cy="2" r="1" fill="currentColor" stroke="none" />
      <circle cx="7" cy="0.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="2" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * ENVELOPE CENTER — all four flap fold-lines converge here.
 * Expressed as % of card height (CY) and width (CX).
 * The wax seal sits exactly at this point.
 */
const CX = 50; // horizontal center
const CY = 57; // 57 % from top — places seal in the middle of the card

/* ================================================================== */
/*  Floral Texture                                                      */
/* ================================================================== */
function FloralTexture() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="floral" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <g stroke="#C4BCAB" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10,90 Q40,60 90,10" />
            <path d="M30,70 Q25,55 35,50 Q45,55 45,65Z" fill="#C4BCAB" opacity="0.15" />
            <path d="M50,50 Q45,35 55,30 Q65,35 65,45Z" fill="#C4BCAB" opacity="0.15" />
            <path d="M70,30 Q65,15 75,10 Q85,15 85,25Z" fill="#C4BCAB" opacity="0.15" />
            <path d="M40,60 Q55,65 60,55 Q55,45 45,50Z" fill="#C4BCAB" opacity="0.15" />
            <path d="M60,40 Q75,45 80,35 Q75,25 65,30Z" fill="#C4BCAB" opacity="0.15" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)" />
    </svg>
  );
}

/* ================================================================== */
/*  Full Envelope — all FOUR flap lines converging at (CX%, CY%)      */
/* ================================================================== */
function EnvelopeSVG({ isOpening }: { isOpening: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      <defs>
        {/* Per-flap gradients for depth */}
        <linearGradient id="shadeTB" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C4B47C" stopOpacity="0" />
          <stop offset="100%" stopColor="#C4B47C" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="shadeLR" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B8A870" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#B8A870" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ── TOP flap (lightest — the letter face) ── */}
      <motion.polygon
        points={`0,0 100,0 ${CX},${CY}`}
        fill="#D8CCAA"
        animate={isOpening ? { opacity: 0.04, rotateX: -72, y: -18 } : { opacity: 0.08, rotateX: 0, y: 0 }}
        transition={{ duration: 1.15, delay: 0.28, ease: [0.2, 0.75, 0.25, 1] }}
        style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }}
      />

      {/* ── LEFT flap ── */}
      <polygon
        points={`0,0 0,100 ${CX},${CY}`}
        fill="#C8BC90"
        opacity="0.18"
      />

      {/* ── RIGHT flap ── */}
      <polygon
        points={`100,0 100,100 ${CX},${CY}`}
        fill="#C8BC90"
        opacity="0.18"
      />

      {/* ── BOTTOM flap (darkest) ── */}
      <polygon
        points={`0,100 100,100 ${CX},${CY}`}
        fill="#BAAD82"
        opacity="0.26"
      />

      {/* ── FOUR gold fold-lines — vectorEffect keeps them pixel-perfect ── */}
      {/* Top-left  → center */}
      <line x1="0" y1="0" x2={CX} y2={CY}
        className="gold-line-shimmer"
        stroke={GOLD} strokeWidth="0.8"
        vectorEffect="non-scaling-stroke" opacity="0.72" />
      {/* Top-right → center */}
      <line x1="100" y1="0" x2={CX} y2={CY}
        className="gold-line-shimmer"
        stroke={GOLD} strokeWidth="0.8"
        vectorEffect="non-scaling-stroke" opacity="0.72" />
      {/* Bottom-left  → center */}
      <line x1="0" y1="100" x2={CX} y2={CY}
        className="gold-line-shimmer"
        stroke={GOLD} strokeWidth="0.8"
        vectorEffect="non-scaling-stroke" opacity="0.72" />
      {/* Bottom-right → center */}
      <line x1="100" y1="100" x2={CX} y2={CY}
        className="gold-line-shimmer"
        stroke={GOLD} strokeWidth="0.8"
        vectorEffect="non-scaling-stroke" opacity="0.72" />
    </svg>
  );
}

/* ================================================================== */
/*  Corner Ornaments                                                    */
/* ================================================================== */

/** Shared size — bigger = more prominent */
const CO_SM = "clamp(40px, 10vmin, 78px)";  // top corners
const CO_LG = "clamp(48px, 12vmin, 96px)";  // bottom corners

function CornerTL() {
  return (
    <svg viewBox="0 0 80 80" width={CO_SM} height={CO_SM} aria-hidden="true">
      <g fill={GOLD} stroke={GOLD} strokeLinecap="round">
        {/* L-frame */}
        <line x1="9" y1="9" x2="58" y2="9" strokeWidth="1" />
        <line x1="9" y1="9" x2="9" y2="58" strokeWidth="1" />
        {/* Corner diamond */}
        <rect x="5.5" y="5.5" width="7" height="7" transform="rotate(45 9 9)" />
        {/* End caps */}
        <circle cx="58" cy="9" r="2.5" />
        <circle cx="9" cy="58" r="2.5" />
        {/* Leaf midpoint — horizontal */}
        <path d="M28,9 Q34,3 40,9 Q34,15 28,9Z" />
        {/* Leaf midpoint — vertical */}
        <path d="M9,28 Q3,34 9,40 Q15,34 9,28Z" />
        {/* Tiny inner diamond at corner */}
        <rect x="14" y="14" width="4" height="4" transform="rotate(45 16 16)" opacity="0.6" />
      </g>
    </svg>
  );
}

function CornerTR() {
  return (
    <svg viewBox="0 0 80 80" width={CO_SM} height={CO_SM} aria-hidden="true"
      style={{ transform: "scaleX(-1)" }}>
      <g fill={GOLD} stroke={GOLD} strokeLinecap="round">
        <line x1="9" y1="9" x2="58" y2="9" strokeWidth="1" />
        <line x1="9" y1="9" x2="9" y2="58" strokeWidth="1" />
        <rect x="5.5" y="5.5" width="7" height="7" transform="rotate(45 9 9)" />
        <circle cx="58" cy="9" r="2.5" />
        <circle cx="9" cy="58" r="2.5" />
        <path d="M28,9 Q34,3 40,9 Q34,15 28,9Z" />
        <path d="M9,28 Q3,34 9,40 Q15,34 9,28Z" />
        <rect x="14" y="14" width="4" height="4" transform="rotate(45 16 16)" opacity="0.6" />
      </g>
    </svg>
  );
}

function CornerBL() {
  return (
    <svg viewBox="0 0 96 96" width={CO_LG} height={CO_LG} aria-hidden="true"
      style={{ transform: "scaleY(-1)" }}>
      <g fill={GOLD} stroke={GOLD} strokeLinecap="round">
        {/* L-frame */}
        <line x1="9" y1="9" x2="70" y2="9" strokeWidth="1.1" />
        <line x1="9" y1="9" x2="9" y2="70" strokeWidth="1.1" />
        <rect x="5.5" y="5.5" width="7" height="7" transform="rotate(45 9 9)" />
        <circle cx="70" cy="9" r="2.8" />
        <circle cx="9" cy="70" r="2.8" />
        {/* Two leaves on horizontal */}
        <path d="M28,9 Q34,3 40,9 Q34,15 28,9Z" />
        <path d="M48,9 Q53,4 58,9 Q53,14 48,9Z" opacity="0.75" />
        {/* Two leaves on vertical */}
        <path d="M9,28 Q3,34 9,40 Q15,34 9,28Z" />
        <path d="M9,48 Q4,53 9,58 Q14,53 9,48Z" opacity="0.75" />
        {/* Corner cluster flower */}
        <circle cx="24" cy="24" r="6" />
        <path d="M24,14 Q28,19 24,24 Q20,19 24,14Z" />
        <path d="M24,24 Q28,29 24,34 Q20,29 24,24Z" />
        <path d="M14,24 Q19,20 24,24 Q19,28 14,24Z" />
        <path d="M24,24 Q29,20 34,24 Q29,28 24,24Z" />
        {/* Inner diamond accent */}
        <rect x="20" y="20" width="4" height="4" transform="rotate(45 22 22)" opacity="0.5" />
      </g>
    </svg>
  );
}

function CornerBR() {
  return (
    <svg viewBox="0 0 96 96" width={CO_LG} height={CO_LG} aria-hidden="true"
      style={{ transform: "scale(-1,-1)" }}>
      <g fill={GOLD} stroke={GOLD} strokeLinecap="round">
        <line x1="9" y1="9" x2="70" y2="9" strokeWidth="1.1" />
        <line x1="9" y1="9" x2="9" y2="70" strokeWidth="1.1" />
        <rect x="5.5" y="5.5" width="7" height="7" transform="rotate(45 9 9)" />
        <circle cx="70" cy="9" r="2.8" />
        <circle cx="9" cy="70" r="2.8" />
        <path d="M28,9 Q34,3 40,9 Q34,15 28,9Z" />
        <path d="M48,9 Q53,4 58,9 Q53,14 48,9Z" opacity="0.75" />
        <path d="M9,28 Q3,34 9,40 Q15,34 9,28Z" />
        <path d="M9,48 Q4,53 9,58 Q14,53 9,48Z" opacity="0.75" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24,14 Q28,19 24,24 Q20,19 24,14Z" />
        <path d="M24,24 Q28,29 24,34 Q20,29 24,24Z" />
        <path d="M14,24 Q19,20 24,24 Q19,28 14,24Z" />
        <path d="M24,24 Q29,20 34,24 Q29,28 24,24Z" />
        <rect x="20" y="20" width="4" height="4" transform="rotate(45 22 22)" opacity="0.5" />
      </g>
    </svg>
  );
}

/* ================================================================== */
/*  Small ornament helpers                                              */
/* ================================================================== */
function TopOrnament() {
  return (
    <svg viewBox="0 0 220 26" width="clamp(110px,50vw,220px)" height="26" aria-hidden="true">
      <g fill={GOLD} stroke={GOLD}>
        <line x1="4" y1="13" x2="84" y2="13" strokeWidth="0.8" strokeLinecap="round" />
        <rect x="1" y="10.5" width="5" height="5" transform="rotate(45 4 13)" />
        <circle cx="89" cy="13" r="2" />

        {/* Center fleur */}
        <path d="M110,4 Q114,9 110,13 Q106,9 110,4Z" />
        <path d="M103,13 Q99,9 101.5,6.5 Q106,11 110,11 Q107,12.5 103,13Z" />
        <path d="M117,13 Q121,9 118.5,6.5 Q114,11 110,11 Q113,12.5 117,13Z" />
        <rect x="108.5" y="12.5" width="3" height="4" rx="1.5" />
        <rect x="103.5" y="15.5" width="13" height="1.5" rx="0.75" />
        <circle cx="110" cy="10" r="2.5" />

        <circle cx="131" cy="13" r="2" />
        <line x1="136" y1="13" x2="216" y2="13" strokeWidth="0.8" strokeLinecap="round" />
        <rect x="213" y="10.5" width="5" height="5" transform="rotate(45 216 13)" />
      </g>
    </svg>
  );
}

function MiddleDivider() {
  return (
    <svg viewBox="0 0 150 14" width="clamp(80px,35vw,150px)" height="14" aria-hidden="true">
      <g fill={GOLD} stroke={GOLD}>
        <line x1="0" y1="7" x2="54" y2="7" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="61" cy="7" r="2.2" />
        <rect x="72" y="4" width="6" height="6" transform="rotate(45 75 7)" />
        <circle cx="89" cy="7" r="2.2" />
        <line x1="96" y1="7" x2="150" y2="7" strokeWidth="0.7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function HeartOrnament() {
  return (
    <svg viewBox="0 0 90 14" width="clamp(56px,20vw,90px)" height="14" aria-hidden="true">
      <g fill={GOLD} stroke={GOLD}>
        <line x1="0" y1="7" x2="32" y2="7" strokeWidth="0.7" strokeLinecap="round" />
        <circle cx="38" cy="7" r="1.8" />
        <path d="M45,10 Q42,6 45,4 Q48,6 45,10Z M45,10 Q48,6 51,4 Q54,7 51,9 Q48,11 45,10Z" />
        <circle cx="52" cy="7" r="1.8" />
        <line x1="58" y1="7" x2="90" y2="7" strokeWidth="0.7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function AndDivider() {
  return (
    <div className="flex items-center" style={{ gap: "var(--ic-and-gap, clamp(8px,2.5vw,16px))", margin: "var(--ic-margin-and, clamp(2px,0.7vh,7px) 0)" }}>
      <span style={{ display: "block", width: "var(--ic-and-line-w, clamp(22px,8vw,50px))", height: "0.5px", background: GOLD, opacity: 0.7 }} />
      <em
        style={{
          fontFamily: "var(--font-alex-brush), cursive",
          fontSize: "var(--ic-font-and, clamp(1.15rem,3.8vmin,1.8rem))",
          color: GOLD,
          fontStyle: "italic",
          lineHeight: 1,
        }}
      >
        and
      </em>
      <span style={{ display: "block", width: "var(--ic-and-line-w, clamp(22px,8vw,50px))", height: "0.5px", background: GOLD, opacity: 0.7 }} />
    </div>
  );
}

function TapLeaf({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 14"
      width="38"
      height="18"
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <g fill={GOLD}>
        <path d="M2,7 Q10,2 24,7 Q10,12 2,7Z" opacity="0.88" />
        <line x1="24" y1="7" x2="29" y2="7" stroke={GOLD} strokeWidth="1.1" strokeLinecap="round" />
        <line x1="4" y1="7" x2="22" y2="7" stroke="#F5EDDC" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
      </g>
    </svg>
  );
}

function BottomFleur() {
  return (
    <svg viewBox="0 0 60 32" width="clamp(38px,10vw,56px)" height="32" aria-hidden="true">
      <g fill={GOLD}>
        <path d="M30,2 Q34,8 30,14 Q26,8 30,2Z" />
        <path d="M22,14 Q18,8 20.5,5.5 Q26,11 30,11 Q27,12 22,14Z" />
        <path d="M38,14 Q42,8 39.5,5.5 Q34,11 30,11 Q33,12 38,14Z" />
        <circle cx="30" cy="10" r="4.5" />
        <rect x="28.5" y="14" width="3" height="5" rx="1.5" />
        <rect x="22" y="19" width="16" height="1.8" rx="0.9" />
        <path d="M22,20 Q18,25 20,28 Q24,22 22,20Z" />
        <path d="M38,20 Q42,25 40,28 Q36,22 38,20Z" />
      </g>
    </svg>
  );
}

/* ================================================================== */
/*  InvitationCard                                                      */
/* ================================================================== */
interface InvitationCardProps {
  onOpen?: () => void;
  stage?: "sealed" | "envelope-opened" | "text-hiding" | "door-splitting" | "done";
}

export default function InvitationCard({ onOpen, stage = "sealed" }: InvitationCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [internalOpening, setInternalOpening] = useState(false);

  // Card is considered opening/opened if tapped, OR if the external sequence is advanced.
  const isOpening = internalOpening || stage !== "sealed";

  const handleTap = useCallback(() => {
    if (isOpening) return;
    setInternalOpening(true);
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 240);
    // Immediately notify parent so it can start the sequence timers
    onOpen?.();
  }, [isOpening, onOpen]);

  return (
    <div
      className="relative w-full h-full overflow-hidden select-none"
      style={{ background: "#EDE8D8", cursor: "pointer" }}
      onClick={handleTap}
    >
      {/* ── Floral background texture ── */}
      <FloralTexture />

      {/* ── Warm centre glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 45%, rgba(255,252,244,0.55) 0%, transparent 70%)",
          zIndex: 2,
        }}
      />

      {/* ── Full envelope: all 4 flap lines converging at (CX%, CY%) ── */}
      <EnvelopeSVG isOpening={isOpening} />

      {/* ── Gold borders (outer + inner) ── */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: "clamp(8px,2vmin,14px)", border: `1px solid ${GOLD}`, zIndex: 6, opacity: 0.88 }}
      />
      <div
        className="absolute pointer-events-none gold-border-inner"
        style={{ inset: "clamp(14px,3.5vmin,22px)", border: `0.5px solid ${GOLD}`, zIndex: 6, opacity: 0.45 }}
      />

      {/* ── Center Crowns ── */}
      <div className="absolute pointer-events-none" style={{ top: "clamp(12px, 2.5vmin, 18px)", left: "50%", transform: "translate(-50%, 0)", zIndex: 8, color: GOLD }}>
        <CrownIcon />
      </div>
      <div className="absolute pointer-events-none" style={{ bottom: "clamp(12px, 2.5vmin, 18px)", left: "50%", transform: "translate(-50%, 0) rotate(180deg)", zIndex: 8, color: GOLD }}>
        <CrownIcon />
      </div>

      {/* ── Corner ornaments ── */}
      <div className="absolute pointer-events-none"
        style={{ top: "clamp(3px,1vmin,8px)", left: "clamp(3px,1vmin,8px)", zIndex: 8 }}>
        <CornerTL />
      </div>
      <div className="absolute pointer-events-none"
        style={{ top: "clamp(3px,1vmin,8px)", right: "clamp(3px,1vmin,8px)", zIndex: 8 }}>
        <CornerTR />
      </div>
      <div className="absolute pointer-events-none"
        style={{ bottom: "clamp(3px,1vmin,8px)", left: "clamp(3px,1vmin,8px)", zIndex: 8 }}>
        <CornerBL />
      </div>
      <div className="absolute pointer-events-none"
        style={{ bottom: "clamp(3px,1vmin,8px)", right: "clamp(3px,1vmin,8px)", zIndex: 8 }}>
        <CornerBR />
      </div>

      {/* ================================================================ */}
      {/* UPPER SECTION — invitation text, lives in the top flap area      */}
      {/* Vertically centered inside the top (CY %) of the card           */}
      {/* ================================================================ */}
      <motion.div
        className="absolute inset-x-0 top-0 flex flex-col items-center justify-center"
        style={{
          height: `${CY}%`,
          paddingLeft: "var(--ic-upper-pad-x, clamp(22px,7vw,52px))",
          paddingRight: "var(--ic-upper-pad-x, clamp(22px,7vw,52px))",
          paddingTop: "var(--ic-upper-pad-y-top, clamp(12px,3.5vh,30px))",
          paddingBottom: "var(--ic-upper-pad-y-bottom, clamp(6px,2vh,18px))",
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={isOpening ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
        transition={{ duration: isOpening ? 0.45 : 0.55, delay: isOpening ? 0 : 0.15, ease: "easeInOut" }}
      >
        {/* Top ornament */}
        <TopOrnament />

        {/* ── "Together with our families" ── */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "var(--ic-font-families, clamp(0.85rem,2.5vmin,1.05rem))",
            letterSpacing: "0.34em",
            color: DARK,
            textTransform: "uppercase",
            margin: "var(--ic-margin-families, clamp(12px,2vh,20px) 0 clamp(8px,1.5vh,16px) 0)",
            textAlign: "center",
            fontWeight: 500,
            lineHeight: 1.3,
            textShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          Together with our families
        </p>

        {/* ── YOU ARE INVITED ── */}
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "var(--ic-font-invited, clamp(2.6rem,11vmin,4.4rem))",
            fontWeight: 900,
            color: CRIMSON,
            textAlign: "center",
            lineHeight: 0.9,
            margin: "var(--ic-margin-invited, clamp(10px,2vh,20px) 0 clamp(10px,2vh,20px) 0)",
            letterSpacing: "-0.01em",
            textShadow: "0 1px 3px rgba(0,0,0,0.15)",
          }}
        >
          YOU ARE
          <br />
          INVITED
        </h1>

        {/* ── "To celebrate our" ── */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "var(--ic-font-celebrate, clamp(0.85rem,2.5vmin,1.05rem))",
            letterSpacing: "0.32em",
            color: DARK,
            textTransform: "uppercase",
            margin: "var(--ic-margin-celebrate, clamp(8px,1.5vh,16px) 0 0 0)",
            textAlign: "center",
            fontWeight: 500,
            lineHeight: 1.3,
            textShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          To celebrate our
        </p>

        {/* ── Engagement (script) ── */}
        <h2
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            fontSize: "var(--ic-font-engagement, clamp(2.15rem,8vmin,4.0rem))",
            color: CRIMSON,
            fontWeight: 400,
            margin: "var(--ic-margin-engagement, clamp(4px,0.8vh,10px) 0 clamp(12px,2.2vh,24px) 0)",
            lineHeight: 1.05,
            textAlign: "center",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Engagement
        </h2>

        {/* ── Divider ── */}
        <MiddleDivider />
      </motion.div>

      {/* ================================================================ */}
      {/* WAX SEAL — exactly at the convergence point of all 4 fold lines  */}
      {/* ================================================================ */}
      <motion.div
        className="absolute pointer-events-none"
        initial={stage === "sealed" ? { opacity: 0, x: "-50%", y: "40%", scale: 0.94 } : false}
        animate={
          stage === "text-hiding" || stage === "door-splitting"
            ? { opacity: 0, clipPath: "inset(0 50% 0 50%)", x: "-50%", y: "-50%", scale: 1 }
            : isOpening 
            ? { opacity: 1, clipPath: "inset(0 0% 0 0%)", x: "-50%", y: "-50%", scale: 1 } 
            : { opacity: 0, clipPath: "inset(0 0% 0 0%)", x: "-50%", y: "40%", scale: 0.94 }
        }
        transition={{ 
          duration: stage === "text-hiding" ? 1.5 : 1.35, 
          delay: isOpening && stage === "sealed" ? 0.42 : 0, 
          ease: [0.18, 0.8, 0.22, 1] 
        }}
        style={{
          left: "50%",
          top: "50%",
          width: "74%",
          aspectRatio: "1 / 1",
          background: "linear-gradient(135deg, #fffaf0, #ead8b1)",
          border: "1px solid rgba(200,162,74,0.8)",
          boxShadow: "0 20px 32px rgba(67,42,18,0.28)",
          zIndex: 15,
        }}
      >
        <div className="flex h-full flex-col items-center justify-center" style={{ padding: "var(--ic-inner-pad, clamp(16px,4vmin,28px))", textAlign: "center" }}>
          <p style={{ margin: 0, color: CRIMSON, fontFamily: "var(--font-cormorant)", letterSpacing: "0.22em", fontSize: "var(--ic-font-inner-celebration, clamp(0.62rem,1.8vmin,0.82rem))", textTransform: "uppercase", fontWeight: 800, textAlign: "center", textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}>Engagement celebration</p>
          <p style={{ margin: "var(--ic-margin-inner-names, clamp(10px,2vmin,16px) 0)", color: CRIMSON, fontFamily: "var(--font-alex-brush), cursive", fontSize: "var(--ic-font-inner-names, clamp(2rem,7vmin,3.4rem))", lineHeight: 0.9, textAlign: "center" }}>Sarang &amp; Aishwarya</p>
          <span style={{ width: "38%", height: "1px", background: GOLD, opacity: 0.7 }} />
        </div>
      </motion.div>

      <div
        className="absolute"
        style={{
          left: "50%",
          top: `${CY}%`,
          transform: "translate(-50%, -50%)",
          zIndex: 20,
        }}
      >
        <motion.div
          initial={stage === "sealed" ? { opacity: 0, scale: 0.6 } : false}
          animate={
            isOpening
              ? { opacity: 0, scale: 0.64, rotate: -12, y: -10 }
              : {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [0, -5, 0],
                }
          }
          transition={
            isOpening
              ? { duration: 0.62, delay: 0.22, ease: "easeInOut" }
              : {
                  y: {
                    repeat: Infinity,
                    duration: 3.5,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.55, delay: 0.45, ease: "easeInOut" },
                  scale: { duration: 0.55, delay: 0.45, ease: "easeInOut" },
                  rotate: { duration: 0.55, delay: 0.45, ease: "easeInOut" },
                }
          }
        >
          <WaxSeal isPressed={isPressed} />
        </motion.div>
      </div>

      {/* ================================================================ */}
      {/* LOWER SECTION — names + CTA, lives below the seal               */}
      {/* ================================================================ */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center"
        style={{
          top: `${CY}%`,
          // Push content below the seal (seal half-height + small gap)
          paddingTop: "var(--ic-lower-pad-y-top, clamp(72px, 19vmin, 110px))",
          paddingBottom: "var(--ic-lower-pad-y-bottom, clamp(12px,3.5vh,30px))",
          zIndex: 10,
        }}
        initial={stage === "sealed" ? { opacity: 0, y: 8 } : false}
        animate={isOpening ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
        transition={{ duration: isOpening ? 0.45 : 0.55, delay: isOpening ? 0 : 0.75, ease: "easeInOut" }}
      >
        {/* Sarang */}
        <p
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            fontSize: "var(--ic-font-names, clamp(2rem, 7vmin, 3.4rem))",
            color: DARK,
            margin: "var(--ic-margin-names, clamp(4px,0.8vh,10px) 0)",
            fontWeight: 400,
            lineHeight: 0.9,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Sarang
        </p>

        {/* —— and —— */}
        <AndDivider />

        {/* Aishwarya */}
        <p
          style={{
            fontFamily: "var(--font-alex-brush), cursive",
            fontSize: "var(--ic-font-names, clamp(2rem, 7vmin, 3.4rem))",
            color: DARK,
            margin: "var(--ic-margin-names, clamp(4px,0.8vh,10px) 0)",
            fontWeight: 400,
            lineHeight: 0.9,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          Aishwarya
        </p>

        {/* ◆ Heart ornament */}
        <div style={{ margin: "var(--ic-margin-heart, clamp(5px,1.4vh,13px) 0)" }}>
          <HeartOrnament />
        </div>

        {/* ❧ TAP TO OPEN ❧ */}
        <motion.div
          className="flex items-center"
          style={{ gap: "var(--ic-tap-gap, clamp(8px,2.5vmin,16px))" }}
          animate={
            isOpening
              ? { scale: 0.93, opacity: 0.65 }
              : { scale: [1, 1.05, 1] }
          }
          transition={
            isOpening
              ? { duration: 0.2 }
              : {
                  scale: {
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.55, delay: 0.75, ease: "easeInOut" }
                }
          }
        >
          <TapLeaf />
          <p
            className="tap-to-open-text"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "var(--ic-font-tap, clamp(1.05rem,2.8vmin,1.35rem))",
              color: DARK,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              margin: 0,
              fontWeight: 700,
              textShadow: "0 1px 3px rgba(0,0,0,0.25)",
            }}
          >
            Tap to Open
          </p>
          <TapLeaf flip />
        </motion.div>

        {/* Bottom fleur */}
        <div style={{ marginTop: "var(--ic-margin-fleur, clamp(6px,1.6vh,16px))" }}>
          <BottomFleur />
        </div>
      </motion.div>
    </div>
  );
}
