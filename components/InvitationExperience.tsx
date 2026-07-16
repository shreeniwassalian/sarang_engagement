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

  const curveDepth = "clamp(60px, 8vw, 120px)";
  const curveMaskStyle = {
    WebkitMaskImage: `linear-gradient(black, black), url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L1200,0 C900,160 300,160 0,0 Z' fill='black'/%3E%3C/svg%3E")`,
    WebkitMaskPosition: 'top left, bottom left',
    WebkitMaskSize: `100% calc(100% - ${curveDepth}), 100% ${curveDepth}`,
    WebkitMaskRepeat: 'no-repeat, no-repeat',
    maskImage: `linear-gradient(black, black), url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L1200,0 C900,160 300,160 0,0 Z' fill='black'/%3E%3C/svg%3E")`,
    maskPosition: 'top left, bottom left',
    maskSize: `100% calc(100% - ${curveDepth}), 100% ${curveDepth}`,
    maskRepeat: 'no-repeat, no-repeat',
  };

  return (
    <motion.main
      className="invitation-experience"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="experience-scroll"
        ref={scrollRef}
      >
        <div className="w-full relative" style={{ background: "url('/blue-flower-pattern-bg.jpg') center top / 100% auto repeat" }}>
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

        <div className="relative w-full overflow-hidden" style={curveMaskStyle}>
          <div className="absolute inset-0 z-0 pointer-events-none">
            <BackgroundOverlay />
          </div>
          <div className="invitation-content relative z-10" style={{ paddingBottom: 'clamp(80px, 12vw, 140px)' }}>
            <InvitationSection className="family-section">
              <p className="eyebrow" style={{ transform: "translateY(-5px)" }}>Together with our families</p>
              <h1 className="invitation-title" style={{ transform: "translateY(-5px)" }}>Request the<br />honour of your<br />presence</h1>
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
                  <img src="/save-the-date-card-3.png" alt="Save the Date 16th August 2026" className="w-full h-auto block pointer-events-none select-none" style={{ transform: "scale(1.12)" }} />
                </div>
              </ScratchCard>
            </div>
          </div>
        </div> {/* Close top invitation-content */}
        
          {/* Elegant Organic Divider (Mist Green) */}
          <motion.div
            initial={false}
            animate={{ opacity: isScratched ? 1 : 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[-1px] left-0 w-full z-10 pointer-events-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
              className="w-full h-[80px] sm:h-[140px]"
            >
              <defs>
                <filter id="watercolor-blur-2" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.8"/>
                  </feComponentTransfer>
                </filter>
              </defs>
              
              <path 
                d="M0,120 V45 C 50,40 80,65 140,55 C 200,45 230,20 290,35 C 360,50 400,75 470,65 C 530,55 570,30 630,40 C 690,50 740,70 810,60 C 870,50 910,25 970,35 C 1030,45 1080,65 1140,55 C 1170,50 1190,40 1200,45 V120 Z" 
                fill="#D0E6E1" 
                opacity="0.3" 
                filter="url(#watercolor-blur-2)"
              />
              <path 
                d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
                fill="#D0E6E1" 
                opacity="0.6" 
              />
              <path 
                d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
                fill="#D0E6E1" 
              />
            </svg>
          </motion.div>
        </div> {/* Close top background wrapper */}

        <motion.div
          initial={false}
          animate={{
            opacity: isScratched ? 1 : 0,
            y: isScratched ? 0 : 36,
            height: isScratched ? "auto" : 0,
            pointerEvents: isScratched ? "auto" : "none"
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden", width: "100%", backgroundColor: "#D0E6E1", position: "relative" }}
        >
          <div className="invitation-content flex flex-col items-center justify-center" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
            <p className="eyebrow" style={{ color: "#7A1F2B", fontWeight: 700, letterSpacing: "0.15em", marginBottom: '1.5rem', textAlign: 'center' }}>Counting down to our celebration</p>
            <Countdown />
          </div>
          
          {/* Elegant Organic Divider (Peach Blush) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute bottom-[-1px] left-0 w-full h-[80px] sm:h-[140px] z-10 pointer-events-none"
          >
            <defs>
              <filter id="watercolor-blur-4" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.8"/>
                </feComponentTransfer>
              </filter>
            </defs>
            
            <path 
              d="M0,120 V45 C 50,40 80,65 140,55 C 200,45 230,20 290,35 C 360,50 400,75 470,65 C 530,55 570,30 630,40 C 690,50 740,70 810,60 C 870,50 910,25 970,35 C 1030,45 1080,65 1140,55 C 1170,50 1190,40 1200,45 V120 Z" 
              fill="#FCD5CE" 
              opacity="0.3" 
              filter="url(#watercolor-blur-4)"
            />
            <path 
              d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
              fill="#FCD5CE" 
              opacity="0.6" 
            />
            <path 
              d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
              fill="#FCD5CE" 
            />
          </svg>
        </motion.div>

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
          {/* Peach Blush Message Section */}
          <div className="w-full relative bg-[#FCD5CE]">
            <div className="invitation-content" style={{ paddingTop: 0, paddingBottom: 0 }}>
              <InvitationSection className="message-section">
                <motion.div className="text-lg sm:text-xl md:text-2xl" style={{ color: "#1E3A5F", display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "12vh", fontWeight: 500, lineHeight: 1.6 }}>
                  <p>We eagerly await your gracious presence</p>
                  <p>to bless our special day and celebrate</p>
                  <p>the beginning of a beautiful journey together.</p>
                </motion.div>
              </InvitationSection>

              <div style={{ height: "25vh" }} aria-hidden="true" />
            </div>
            
            {/* Elegant Organic Divider (Powder Blue) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
              className="absolute bottom-[-1px] left-0 w-full h-[80px] sm:h-[140px] z-10 pointer-events-none"
            >
              <defs>
                <filter id="watercolor-blur-3" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.8"/>
                  </feComponentTransfer>
                </filter>
              </defs>
              
              <path 
                d="M0,120 V45 C 50,40 80,65 140,55 C 200,45 230,20 290,35 C 360,50 400,75 470,65 C 530,55 570,30 630,40 C 690,50 740,70 810,60 C 870,50 910,25 970,35 C 1030,45 1080,65 1140,55 C 1170,50 1190,40 1200,45 V120 Z" 
                fill="#B5D4DF" 
                opacity="0.3" 
                filter="url(#watercolor-blur-3)"
              />
              <path 
                d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
                fill="#B5D4DF" 
                opacity="0.6" 
              />
              <path 
                d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
                fill="#B5D4DF" 
              />
            </svg>
          </div>

          {/* Powder Blue Section (Venue onwards) */}
          <div className="w-full relative bg-[#B5D4DF]">
            <div className="invitation-content" style={{ paddingTop: 0, paddingBottom: '12vh' }}>
              <InvitationSection>
                <motion.div>
                  <Venue />
                </motion.div>
              </InvitationSection>
            </div>
            
            {/* Elegant Organic Divider */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none"
              className="absolute bottom-[-1px] left-0 w-full h-[80px] sm:h-[140px] z-10 pointer-events-none"
            >
              <defs>
                <filter id="watercolor-blur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.8"/>
                  </feComponentTransfer>
                </filter>
              </defs>
              
              {/* Soft Bleed Layer 1 (Highest and softest) */}
              <path 
                d="M0,120 V45 C 50,40 80,65 140,55 C 200,45 230,20 290,35 C 360,50 400,75 470,65 C 530,55 570,30 630,40 C 690,50 740,70 810,60 C 870,50 910,25 970,35 C 1030,45 1080,65 1140,55 C 1170,50 1190,40 1200,45 V120 Z" 
                fill="#7A1F2B" 
                opacity="0.3" 
                filter="url(#watercolor-blur)"
              />
              
              {/* Deckled Edge Layer 2 */}
              <path 
                d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
                fill="#7A1F2B" 
                opacity="0.6" 
              />
              
              {/* Crisp Floral Canopy Layer 3 */}
              <path 
                d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
                fill="#7A1F2B" 
              />
            </svg>
          </div>

          {/* Burgundy Red Footer Section */}
          <div className="w-full bg-[#7A1F2B]">
            <div className="invitation-content" style={{ paddingTop: '10vh', paddingBottom: '15vh' }}>
              <InvitationSection className="love-section">
                <p className="eyebrow" style={{ color: "#FFF0D4" }}>With love</p>
                <motion.h2 className="love-names" style={{ color: "#FFF0D4" }}>Sarang <span style={{ color: "#E2C478" }}>&amp;</span> Aishwarya</motion.h2>
                <motion.p className="love-date" style={{ color: "#FFF0D4", letterSpacing: "0.15em" }}>16 August 2026</motion.p>
              </InvitationSection>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
