"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import ScratchCard from "./ScratchCard";
import BackgroundOverlay from "./BackgroundOverlay";
import FloatingParticles from "./FloatingParticles";
import Countdown from "./Countdown";
import Divider from "./Divider";
import InvitationSection from "./InvitationSection";
import Venue from "./Venue";

export default function InvitationExperience() {
  const [isScratched, setIsScratched] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scratchCardRef = useRef<HTMLDivElement>(null);
  const isScratchCardInView = useInView(scratchCardRef, { root: scrollRef, margin: "-15% 0px" });
  const opacityAfterScratch = useTransform(scrollYProgress, [0, 0.9, 0.98], [1, 1, 0]);



  return (
    <motion.main
      className="invitation-experience"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      style={{ backgroundColor: "transparent" }}
    >
      <FloatingParticles />
      <div
        className="experience-scroll"
        ref={scrollRef}
      >
        <div className="w-full relative" style={{ backgroundColor: "#D7E9F3" }}>
        {/* Scroll Indicator at the bottom of the screen */}
        {((!isScratched && !isScratchCardInView) || isScratched) && (
          <motion.div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
            style={{ opacity: isScratched ? opacityAfterScratch : 1 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="bg-[#D4AF37] text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-full shadow-[0_4px_14px_0_rgba(212,175,55,0.4)] border border-[#C9A24B]">
              SCROLL
            </div>
          </motion.div>
        )}

        <div className="relative w-full aspect-[941/1672] md:aspect-[3/2]">
          <div className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-hidden" style={{ bottom: '-40px' }}>
            <BackgroundOverlay />
          </div>
          <div className="invitation-content relative z-10" style={{ paddingBottom: 'clamp(80px, 12vw, 140px)' }}>
            <InvitationSection className="family-section" style={{ minHeight: 0, background: 'none' }}>
              {/* Text is now part of the background image */}
            </InvitationSection>
          </div>

          {/* Elegant Organic Divider (Top section to Scratch card) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
            className="absolute left-0 w-full h-[80px] sm:h-[140px] z-10 pointer-events-none block overflow-hidden"
            style={{ bottom: '-40px' }}
          >
            <defs>
              <filter id="watercolor-blur-top" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.8"/>
                </feComponentTransfer>
              </filter>
            </defs>
            
            <path 
              d="M0,200 V45 C 50,40 80,65 140,55 C 200,45 230,20 290,35 C 360,50 400,75 470,65 C 530,55 570,30 630,40 C 690,50 740,70 810,60 C 870,50 910,25 970,35 C 1030,45 1080,65 1140,55 C 1170,50 1190,40 1200,45 V200 Z" 
              fill="#D7E9F3" 
              opacity="0.3" 
              filter="url(#watercolor-blur-top)"
            />
            <path 
              d="M0,200 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V200 Z" 
              fill="#D7E9F3" 
              opacity="0.6" 
            />
            <path 
              d="M0,200 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V200 Z" 
              fill="#D7E9F3" 
            />
          </svg>
        </div>

        <div className="invitation-content" style={{ paddingTop: '20px' }}>
          <div ref={scratchCardRef} className="relative flex flex-col items-center justify-center my-16">
            {/* The Scratch Card */}
            <div className="relative z-10 w-[85%] max-w-[320px] sm:max-w-[360px] mx-auto">
              <ScratchCard onReveal={() => setIsScratched(true)}>
                <div className="relative w-full rounded-[12px] overflow-hidden flex items-center justify-center bg-white shadow-sm">
                  <img src="/save-the-date-new.png" alt="Save the Date 16th August 2026" className="w-full h-auto block pointer-events-none select-none" style={{ transform: "scale(1.12) translate(-1.5%, 0)" }} />
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
                fill="#BEDAEA" 
                opacity="0.3" 
                filter="url(#watercolor-blur-2)"
              />
              <path 
                d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
                fill="#BEDAEA" 
                opacity="0.6" 
              />
              <path 
                d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
                fill="#BEDAEA" 
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
          style={{ overflow: "hidden", width: "100%", backgroundColor: "#BEDAEA", position: "relative" }}
        >
          <div className="invitation-content flex flex-col items-center justify-center" style={{ paddingTop: '60px', paddingBottom: '180px' }}>
            <p className="eyebrow" style={{ color: "#3A5B7C", fontWeight: 700, letterSpacing: "0.15em", marginBottom: '1.5rem', textAlign: 'center' }}>Counting down to our celebration</p>
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
              fill="#9DC1DA" 
              opacity="0.3" 
              filter="url(#watercolor-blur-4)"
            />
            <path 
              d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
              fill="#9DC1DA" 
              opacity="0.6" 
            />
            <path 
              d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
              fill="#9DC1DA" 
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
          {/* Message Section */}
          <div className="w-full relative bg-[#9DC1DA]">
            <div className="invitation-content" style={{ paddingTop: 0, paddingBottom: 0 }}>
              <InvitationSection className="message-section" style={{ textShadow: "none", background: "none" }}>
                <motion.div className="text-lg sm:text-xl md:text-2xl" style={{ color: "#2A4B72", display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "12vh", fontWeight: 500, lineHeight: 1.6, textShadow: "none" }}>
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
                fill="#729ABD" 
                opacity="0.3" 
                filter="url(#watercolor-blur-3)"
              />
              <path 
                d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
                fill="#729ABD" 
                opacity="0.6" 
              />
              <path 
                d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
                fill="#729ABD" 
              />
            </svg>
          </div>

          {/* Venue Section */}
          <div className="w-full relative bg-[#729ABD]">
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
                fill="#54779D" 
                opacity="0.3" 
                filter="url(#watercolor-blur)"
              />
              
              {/* Deckled Edge Layer 2 */}
              <path 
                d="M0,120 V55 C 40,65 70,45 130,55 C 180,65 220,85 280,75 C 340,65 370,40 430,50 C 490,60 540,80 610,70 C 670,60 700,35 760,45 C 820,55 860,75 920,65 C 980,55 1010,35 1070,45 C 1120,55 1160,70 1200,65 V120 Z" 
                fill="#54779D" 
                opacity="0.6" 
              />
              
              {/* Crisp Floral Canopy Layer 3 */}
              <path 
                d="M0,120 V70 C 30,65 50,85 100,80 C 150,75 180,50 240,60 C 300,70 340,95 400,85 C 460,75 490,55 550,65 C 600,75 640,90 700,80 C 760,70 790,45 850,55 C 910,65 950,85 1010,75 C 1060,65 1090,45 1150,55 C 1180,60 1190,65 1200,70 V120 Z" 
                fill="#54779D" 
              />
            </svg>
          </div>

          {/* Slate Blue Footer Section */}
          <div className="w-full bg-[#54779D]">
            <div className="invitation-content" style={{ paddingTop: '10vh', paddingBottom: '15vh' }}>
              <InvitationSection className="love-section">
                <p className="eyebrow" style={{ color: "#FFF0D4" }}>With love</p>
                <motion.h2 className="love-names" style={{ color: "#FFF0D4", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <span>Sarang</span>
                  <span style={{ color: "#E2C478" }}>&amp;</span>
                  <span>Aishwarya</span>
                </motion.h2>
                <motion.p className="love-date" style={{ color: "#FFF0D4", letterSpacing: "0.15em" }}>16 August 2026</motion.p>
              </InvitationSection>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
