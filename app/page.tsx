"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import LandingEnvelope from "@/components/LandingEnvelope";
import InvitationExperience from "@/components/InvitationExperience";
import FallingFlowers from "@/components/FallingFlowers";

export default function LandingPage() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden">
      <FallingFlowers />
      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <LandingEnvelope onOpen={handleOpen} />
          </motion.div>
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-0"
          >
            <InvitationExperience />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
