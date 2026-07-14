"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeIn: number;
  rotation: number;
  rotationSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (startY = -10): Particle => ({
      x: Math.random() * window.innerWidth,
      y: startY,
      size: Math.random() * 1.5 + 0.4,
      speedY: Math.random() * 0.45 + 0.15, // positive = falls downward
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: 0,
      fadeIn: Math.random() * 0.005 + 0.002,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.012,
    });

    // Seed particles spread across height
    for (let i = 0; i < 30; i++) {
      const p = createParticle(Math.random() * window.innerHeight);
      p.opacity = Math.random() * 0.35;
      particles.push(p);
    }

    const draw = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      const s = p.size;
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.2);
      g.addColorStop(0, "#F7E4A0");
      g.addColorStop(0.45, "#C8A24A");
      g.addColorStop(1, "rgba(200,162,74,0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.6);
      ctx.lineTo(s, 0);
      ctx.lineTo(0, s * 1.6);
      ctx.lineTo(-s, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.opacity < 0.45) p.opacity = Math.min(0.45, p.opacity + p.fadeIn);

        // Recycle at bottom
        if (p.y > window.innerHeight + 12) {
          particles.splice(i, 1);
          particles.push(createParticle(-10));
        }
        draw(p);
      }
      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    />
  );
}
