import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  speedY: number;
  speedX: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isEmber: boolean;
}

export function GoldStarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Color palette for GOT gold/fire starfield
    const colors = [
      "245, 158, 11", // Amber 500
      "251, 191, 36", // Amber 400
      "217, 119, 6",  // Amber 600
      "252, 211, 77", // Yellow 300
      "239, 68, 68",  // Red 500 (rare fire ember)
      "255, 248, 220", // Parchment gold-white
    ];

    const particleCount = Math.floor(Math.min(width, 1920) / 12); // ~120-160 particles
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isEmber = Math.random() > 0.4;
      const baseAlpha = isEmber ? 0.15 + Math.random() * 0.45 : 0.05 + Math.random() * 0.25;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isEmber ? 1 + Math.random() * 2.2 : 0.6 + Math.random() * 1.2,
        alpha: baseAlpha,
        baseAlpha,
        speedY: isEmber ? -(0.2 + Math.random() * 0.5) : -(0.05 + Math.random() * 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        twinkleSpeed: 0.01 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        isEmber,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particles upward
        p.y += p.speedY;
        p.x += p.speedX;

        // Twinkle calculation
        p.twinklePhase += p.twinkleSpeed;
        const opacity = Math.max(
          0.02,
          p.baseAlpha + Math.sin(p.twinklePhase) * (p.baseAlpha * 0.5)
        );

        // Wrap around screens
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.isEmber && p.size > 1.5) {
          // Glow halo for larger embers
          ctx.fillStyle = `rgba(${p.color}, ${opacity * 0.3})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        } else {
          ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2] mix-blend-screen opacity-85"
      aria-hidden="true"
    />
  );
}
