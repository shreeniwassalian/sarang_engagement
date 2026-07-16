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
      for (let i = 0; i < 18; i++) { // Reduced to 18 flowers for a more subtle effect
        newFlowers.push({
          id: i,
          x: Math.random() * 100, // random x position (vw)
          delay: Math.random() * 5, // random delay before falling
          duration: 12 + Math.random() * 18, // fall duration between 12-30s for slow fall
          size: 25 + Math.random() * 25, // size 25-50px
          rotation: Math.random() * 360,
        });
      }
      setFlowers(newFlowers);
    };

    generateFlowers();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {flowers.map((flower) => {
        // Randomize rotation direction and amount based on ID
        const rotationAmount = (flower.id % 2 === 0 ? 1 : -1) * (360 + Math.random() * 360);
        return (
          <motion.div
            key={flower.id}
            className="absolute top-[-50px]"
            initial={{
              x: `${flower.x}vw`,
              y: "-10vh",
              rotate: flower.rotation,
            }}
            animate={{
              y: "110vh",
              rotate: flower.rotation + rotationAmount,
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: flower.size, height: flower.size }}
          >
            <img src="/falling-flower.png" alt="Falling Flower" className="w-full h-full object-contain" />
          </motion.div>
        );
      })}
    </div>
  );
}
