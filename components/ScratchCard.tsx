"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  children: React.ReactNode;
}

export default function ScratchCard({ children }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#D4AF37', '#FFF0D4', '#7A1F2B', '#ADD8E6']
        });
        confetti({
          particleCount: 5,
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
    }
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Resize canvas to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      
      // Only refill if not revealed
      if (!isRevealed) {
        fillCanvas();
      }
    };

    const fillCanvas = () => {
      ctx.globalCompositeOperation = "source-over";
      
      // Crimson Red background
      ctx.fillStyle = "#7A1F2B";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ivory text
      ctx.fillStyle = "#FFF0D4";
      ctx.font = "bold clamp(1.2rem, 4vw, 1.8rem) 'Cormorant', Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch to reveal", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [isRevealed]);

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
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // Check every 4th byte (alpha channel)
    // To optimize, we check a sample of pixels
    const totalPixels = pixels.length / 4;
    for (let i = 3; i < pixels.length; i += 16) { 
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = transparentPixels / (totalPixels / 4);
    if (percentage > 0.45) {
      setIsRevealed(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="scratch-card-container relative w-full overflow-hidden rounded-2xl"
      style={{
        background: "#ADD8E6", // Light blue background when revealed
        padding: "10px",
        touchAction: "none", // Prevent scrolling while scratching
      }}
    >
      <div className="revealed-content text-center">
        {children}
      </div>

      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: isRevealed ? "none" : "auto" }}
      />
    </div>
  );
}
