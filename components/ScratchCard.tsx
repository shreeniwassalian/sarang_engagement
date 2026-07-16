"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  children: React.ReactNode;
  onReveal?: () => void;
}

export default function ScratchCard({ children, onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      if (onReveal) onReveal();
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
  }, [isRevealed, onReveal]);

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
      
      // Champagne Gold Metallic Foil Diagonal Gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, "#F7E7C4");
      grad.addColorStop(0.25, "#E2C478");
      grad.addColorStop(0.5, "#C9A24B");
      grad.addColorStop(0.75, "#E6D095");
      grad.addColorStop(1, "#FAF0D7");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle diagonal metallic glare overlay
      const glare = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
      glare.addColorStop(0, "rgba(255, 255, 255, 0)");
      glare.addColorStop(0.4, "rgba(255, 255, 255, 0.15)");
      glare.addColorStop(0.5, "rgba(255, 255, 255, 0.35)");
      glare.addColorStop(0.6, "rgba(255, 255, 255, 0.15)");
      glare.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glare;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold Foil Border Trim
      ctx.strokeStyle = "rgba(122, 31, 43, 0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Text Shadow for readability
      ctx.shadowColor = "rgba(40, 15, 10, 0.4)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 1;

      // Cover Text: ✦ SCRATCH TO REVEAL ✦
      ctx.fillStyle = "#FFFDF7";
      ctx.font = "600 13px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✦  SCRATCH TO REVEAL  ✦", canvas.width / 2, canvas.height / 2);

      // Reset shadow
      ctx.shadowColor = "transparent";
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
    ctx.arc(x, y, 32, 0, Math.PI * 2);
    ctx.fill();
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
    <div 
      ref={containerRef}
      className="scratch-card-container relative w-full max-w-[420px] mx-auto overflow-hidden rounded-xl border border-[#C9A24B]/60 shadow-xl"
      style={{
        background: "transparent",
        padding: "0",
        touchAction: "none",
      }}
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
    </div>
  );
}
