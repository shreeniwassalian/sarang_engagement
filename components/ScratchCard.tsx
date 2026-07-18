"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  children: React.ReactNode;
  onReveal?: () => void;
}

export default function ScratchCard({ children, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const coverImageRef = useRef<HTMLImageElement | null>(null);
  const lastVibrateRef = useRef<number>(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload cover image
  useEffect(() => {
    const img = new Image();
    img.src = "/scratch-cover.png";
    img.onload = () => {
      coverImageRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (isRevealed && !hasFiredRef.current) {
      hasFiredRef.current = true;
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([40, 40, 80, 40, 120]);
        } catch (err) {}
      }
      if (onReveal) onReveal();
      
      setTimeout(() => {
        const duration = 2500;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 },
            colors: ['#D4AF37', '#FFF0D4', '#7A1F2B', '#ADD8E6']
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 },
            colors: ['#D4AF37', '#FFF0D4', '#7A1F2B', '#ADD8E6']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }, 1000);
    }
  }, [isRevealed, onReveal]);

  const fillCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";

    if (coverImageRef.current) {
      ctx.drawImage(coverImageRef.current, 0, 0, canvas.width, canvas.height);
    } else {
      // Fallback while loading
      ctx.fillStyle = "#C0C0C0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      if (!isRevealed) {
        fillCanvas();
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(resizeCanvas);
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener("resize", resizeCanvas);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isRevealed, imageLoaded, fillCanvas]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    setIsDrawing(true);
    scratch(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isRevealed) return;
    scratch(e);
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    checkReveal();
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();

    // Haptic vibration feedback while scratching
    const now = Date.now();
    if (now - lastVibrateRef.current > 60) {
      if (typeof window !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(15);
        } catch (err) {}
      }
      lastVibrateRef.current = now;
    }
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    const totalPixels = pixels.length / 4;
    for (let i = 3; i < pixels.length; i += 16) { 
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = transparentPixels / (totalPixels / 4);
    if (percentage > 0.45) {
      setIsRevealed(true);
      if (onReveal) {
        onReveal();
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef as any}
      className="relative w-full max-w-[420px] mx-auto overflow-hidden rounded-xl border-2"
      style={{
        background: "transparent",
        padding: "0",
        touchAction: "none",
      }}
      animate={{
        boxShadow: [
          "0 0 0 1px rgba(180, 180, 180, 0.4), inset 0 0 10px rgba(180, 180, 180, 0.1), 0 0 15px rgba(255, 255, 255, 0.2)",
          "0 0 15px 2px rgba(180, 180, 180, 0.8), inset 0 0 20px rgba(180, 180, 180, 0.4), 0 0 35px rgba(255, 255, 255, 0.7)",
          "0 0 0 1px rgba(180, 180, 180, 0.4), inset 0 0 10px rgba(180, 180, 180, 0.1), 0 0 15px rgba(255, 255, 255, 0.2)"
        ],
        borderColor: [
          "rgba(180, 180, 180, 0.4)",
          "rgba(210, 210, 210, 1)",
          "rgba(180, 180, 180, 0.4)"
        ]
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Decorative Revealed Card Inner Frame Removed to allow 100% fill */}
      <div className="w-full h-full rounded-xl flex flex-col items-center justify-center relative bg-transparent overflow-hidden">
        <div className="revealed-content w-full h-full z-0 flex items-center justify-center">
          {children}
        </div>
      </div>

      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-pointer rounded-xl"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: isRevealed ? "none" : "auto" }}
      />
    </motion.div>
  );
}
