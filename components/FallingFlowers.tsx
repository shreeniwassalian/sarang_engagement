"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Flower {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function FallingFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    // Generate some flowers
    const generateFlowers = () => {
      const newFlowers: Flower[] = [];
      for (let i = 0; i < 20; i++) {
        newFlowers.push({
          id: i,
          x: Math.random() * 100, // random x position (vw)
          delay: Math.random() * 5, // random delay before falling
          duration: 10 + Math.random() * 15, // fall duration between 10-25s
          size: 10 + Math.random() * 20, // size 10-30px
          rotation: Math.random() * 360,
        });
      }
      setFlowers(newFlowers);
    };

    generateFlowers();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute text-white/80 top-[-50px]"
          initial={{
            x: `${flower.x}vw`,
            y: "-10vh",
            rotate: flower.rotation,
          }}
          animate={{
            y: "110vh",
            rotate: flower.rotation + 360,
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ fontSize: flower.size }}
        >
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 14.5 7.5 12 11C9.5 7.5 12 2 12 2ZM12 22C12 22 9.5 16.5 12 13C14.5 16.5 12 22 12 22ZM2 12C2 12 7.5 9.5 11 12C7.5 14.5 2 12 2 12ZM22 12C22 12 16.5 14.5 13 12C16.5 9.5 22 12 22 12Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
