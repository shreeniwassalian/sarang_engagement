"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import InvitationCard from "@/components/InvitationCard";
import InvitationExperience from "@/components/InvitationExperience";

type Stage = "sealed" | "envelope-opened" | "text-hiding" | "door-splitting" | "done";

export default function LandingPage() {
  const [stage, setStage] = useState<Stage>("sealed");

  const handleOpen = useCallback(() => {
    setStage("envelope-opened");
    
    // Wait for the envelope to open and give the user 3.5s to read the inner text
    setTimeout(() => {
      setStage("text-hiding");
      
      // After text hides (1.5s duration), split the door
      setTimeout(() => {
        setStage("door-splitting");
        
        // After the door splits and reveals experience, clean up the card wrapper
        setTimeout(() => {
          setStage("done");
        }, 5800); 
        
      }, 1500); 
    }, 3500);
  }, []);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden">
      {/* ── Base Layer: Experience ── */}
      {/* Mounted early so it animates in behind the envelope and is ready to reveal */}
      {stage !== "sealed" && (
        <div className="absolute inset-0 z-0">
          <InvitationExperience />
        </div>
      )}

      {/* ── Top Layer: The Invitation Card ── */}
      <AnimatePresence>
        {stage !== "done" && (
          <motion.main
            key="envelope-layer"
            className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Re-enable pointer events only for the card itself, but disable them when doors split so the user can scroll underneath */}
            <div className={`absolute inset-0 ${stage === "door-splitting" ? "pointer-events-none" : "pointer-events-auto"}`}>
              {stage === "door-splitting" ? (
                <>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)", background: "#A8B08C" }}
                    initial={{ x: 0 }}
                    animate={{ x: "-100vw" }}
                    transition={{ duration: 5.8, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <FloatingParticles />
                    <div className="invitation-card">
                      <InvitationCard stage={stage} />
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)", background: "#A8B08C" }}
                    initial={{ x: 0 }}
                    animate={{ x: "100vw" }}
                    transition={{ duration: 5.8, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <FloatingParticles />
                    <div className="invitation-card">
                      <InvitationCard stage={stage} />
                    </div>
                  </motion.div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#A8B08C" }}>
                  <FloatingParticles />
                  <div className="invitation-card">
                    <InvitationCard onOpen={handleOpen} stage={stage} />
                  </div>
                </div>
              )}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
