"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import InvitationCard from "@/components/InvitationCard";
import InvitationExperience from "@/components/InvitationExperience";

export default function LandingPage() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isOpened ? (
        <motion.main
          className="invitation-shell relative w-screen flex items-center justify-center overflow-hidden"
          style={{ background: "#F5EDDC" }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
        >
          <div className="invitation-card">
            <InvitationCard onOpen={handleOpen} />
          </div>
          <FloatingParticles />
        </motion.main>
      ) : (
        <InvitationExperience />
      )}
    </AnimatePresence>
  );
}
