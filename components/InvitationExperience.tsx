"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import ScratchCard from "./ScratchCard";
import BackgroundOverlay from "./BackgroundOverlay";
import Countdown from "./Countdown";
import Divider from "./Divider";
import InvitationSection from "./InvitationSection";
import Venue from "./Venue";

export default function InvitationExperience() {
  const [isScratched, setIsScratched] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });

  return (
    <motion.main
      className="invitation-experience"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      style={{ backgroundColor: "#D4E0D7" }}
    >
      <div
        className="experience-scroll"
        ref={scrollRef}
      >
        {/* Scroll Indicator at the bottom of the screen */}
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A1F2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <BackgroundOverlay />
          </div>
          <div className="invitation-content relative z-10" style={{ paddingBottom: '40px' }}>
            <InvitationSection className="family-section">
              <p className="eyebrow" style={{ transform: "translateY(-5px)" }}>Together with our families</p>
              <h1 className="invitation-title" style={{ transform: "translateY(-5px)" }}>Request the honour<br />of your presence</h1>
              <div className="couple-intro">
                <div>
                  <h2>Sarang</h2>
                  <p>Son of</p>
                  <strong>Mr. Dattatray Yadav</strong>
                  <strong>&amp; Mrs. Suman Yadav</strong>
                </div>
                <p className="with-script">with</p>
                <div>
                  <h2>Aishwarya</h2>
                  <p>Daughter of</p>
                  <strong>Mr. Ravindra Pisal</strong>
                  <strong>&amp; Mrs. Surekha Pisal</strong>
                </div>
              </div>
            </InvitationSection>
          </div>
        </div>

        <div className="invitation-content" style={{ paddingTop: '20px' }}>
          <div className="relative flex flex-col items-center justify-center my-16">
            {/* The Scratch Card */}
            <div className="relative z-10 w-[92%] max-w-md mx-auto">
              <ScratchCard onReveal={() => setIsScratched(true)}>
                <div className="relative w-full rounded-[12px] overflow-hidden flex items-center justify-center bg-white shadow-sm">
                  <img src="/save-the-date-card.png" alt="Save the Date 16th August 2026" className="w-full h-auto block pointer-events-none select-none" />
                </div>
              </ScratchCard>
            </div>
          </div>
          <Divider />
        </div> {/* Close top invitation-content */}

        <motion.div
          initial={false}
          animate={{
            opacity: isScratched ? 1 : 0,
            y: isScratched ? 0 : 36,
            height: isScratched ? "auto" : 0,
            pointerEvents: isScratched ? "auto" : "none"
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden", width: "100%" }}
        >
          <div className="invitation-content" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <InvitationSection>
              <p className="eyebrow" style={{ color: "#FFF0D4", textShadow: "0 2px 6px rgba(0,0,0,0.5)", letterSpacing: "0.15em" }}>Counting down to our celebration</p>
              <Countdown />
              <div style={{ height: "30px" }} aria-hidden="true" />
            </InvitationSection>

            <Divider compact />
            <div style={{ height: "60px" }} aria-hidden="true" />
          </div>

          {/* Powder Blue Section */}
          <div className="w-full bg-[#B5D4DF]">
            <div className="invitation-content" style={{ paddingTop: 0 }}>
              <InvitationSection className="message-section">
                <motion.div style={{ color: "#FFF0D4", textShadow: "0 2px 6px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", gap: "1.00rem", marginTop: "25vh" }}>
                  <p>We eagerly await your gracious presence</p>
                  <p>to bless our special day and celebrate</p>
                  <p>the beginning of a beautiful journey together.</p>
                </motion.div>
              </InvitationSection>

              <div style={{ height: "25vh" }} aria-hidden="true" />

              <InvitationSection>
                <motion.div>
                  <Venue />
                </motion.div>
              </InvitationSection>

              <div style={{ height: "25vh" }} aria-hidden="true" />

              <InvitationSection className="love-section">
                <p className="eyebrow" style={{ color: "#FFF0D4", textShadow: "0 2px 5px rgba(0,0,0,0.45)" }}>With love</p>
                <motion.h2 className="love-names">Sarang <span>&amp;</span> Aishwarya</motion.h2>
                <motion.p className="love-date" style={{ color: "#FFF0D4", textShadow: "0 2px 5px rgba(0,0,0,0.45)" }}>16 August 2026</motion.p>
                <Divider compact />
              </InvitationSection>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
