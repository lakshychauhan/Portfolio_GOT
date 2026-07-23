import React, { useState, useRef, useCallback, useEffect } from "react";
import { Flame, Sparkles, Shield, Cpu, Code2, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DomainBanner {
  id: string;
  house: string;
  title: string;
  sigil: string;
  motto: string;
  color: string;
  accentGlow: string;
  icon: React.ReactNode;
  summary: string;
  skills: string[];
  highlight: string;
}

const DOMAIN_BANNERS: DomainBanner[] = [
  {
    id: "stark",
    house: "House Stark",
    title: "Frontend Warden",
    sigil: "🐺",
    motto: "Winter-Proof User Interfaces",
    color: "#38bdf8", // Ice Blue
    accentGlow: "rgba(56, 189, 248, 0.4)",
    icon: <Code2 className="w-5 h-5 text-sky-400" />,
    summary: "Crafting fluid, high-performance web applications with hardware-accelerated CSS, OKLCH color spaces, and modern reactive frameworks.",
    skills: ["React 19", "JavaScript", "TanStack Router", "Tailwind CSS", "UI/UX Architecture"],
    highlight: "60fps Smooth Scroll & Particle Timelines",
  },
  {
    id: "targaryen",
    house: "House Targaryen",
    title: "AI & RAG Khaleesi",
    sigil: "🐉",
    motto: "Fire & Semantic Embeddings",
    color: "#f97316", // Fire Orange
    accentGlow: "rgba(249, 115, 22, 0.4)",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    summary: "Building intelligent Retrieval-Augmented Generation (RAG) search engines over complex document archives using vector databases and LLMs.",
    skills: ["Gemini API", "pgvector", "Next.js", "NestJS", "Prompt Engineering"],
    highlight: "Natural-Language Semantic Vector Indexing",
  },
  {
    id: "baratheon",
    house: "House Baratheon",
    title: "Backend Stormlord",
    sigil: "👑",
    motto: "Ours is the Concurrency",
    color: "#eab308", // Gold
    accentGlow: "rgba(234, 179, 8, 0.4)",
    icon: <Database className="w-5 h-5 text-yellow-400" />,
    summary: "Engineering concurrent-safe database engines, rate-limited REST/GraphQL APIs, real-time WebSockets, and zero-lock WAL storage.",
    skills: ["Node.js", "Express", "PostgreSQL", "SQLite (WAL)", "Redis", "Socket.io"],
    highlight: "Lock-Free SQLite WAL & Token Rotation JWT",
  },
  {
    id: "lannister",
    house: "House Lannister",
    title: "Systems Guardian",
    sigil: "🦁",
    motto: "Golden Foundations of CS",
    color: "#ef4444", // Crimson Gold
    accentGlow: "rgba(239, 68, 68, 0.4)",
    icon: <Cpu className="w-5 h-5 text-red-400" />,
    summary: "Rooted in foundational computer science, object-oriented design, operating systems, and network protocols for maximum stability.",
    skills: ["C++", "Python", "SQL", "OOPS", "DBMS", "Operating Systems", "Computer Networks"],
    highlight: "Algorithmic Precision & Clean Architecture",
  },
];

// ── Ember Particle System ──
interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

function useEmberCanvas(color: string, isActive: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const embersRef = useRef<Ember[]>([]);
  const rafRef = useRef<number>(0);
  const hasSpawnedRef = useRef(false);

  const spawnEmbers = useCallback(() => {
    const embers: Ember[] = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
      const speed = 1.5 + Math.random() * 3.5;
      embers.push({
        x: 0.5 + (Math.random() - 0.5) * 0.3,
        y: 0.5 + (Math.random() - 0.5) * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.6,
        size: 1.5 + Math.random() * 3,
        color,
      });
    }
    embersRef.current = embers;
  }, [color]);

  useEffect(() => {
    if (isActive && !hasSpawnedRef.current) {
      hasSpawnedRef.current = true;
      spawnEmbers();
    }
    if (!isActive) {
      hasSpawnedRef.current = false;
    }
  }, [isActive, spawnEmbers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const animate = () => {
      if (!running) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const embers = embersRef.current;
      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx * 0.008;
        e.y += e.vy * 0.008;
        e.vy += 0.03; // gravity
        e.life -= 0.015 / e.maxLife;

        if (e.life <= 0) {
          embers.splice(i, 1);
          continue;
        }

        const alpha = e.life * 0.9;
        const px = e.x * w;
        const py = e.y * h;

        // Glow
        ctx.beginPath();
        ctx.arc(px, py, e.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${e.color}${Math.floor(alpha * 40).toString(16).padStart(2, "0")}`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 200, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return canvasRef;
}

// ── Main Component ──
export function DragonfireSummaryBanners() {
  const [activeMelt, setActiveMelt] = useState<string | null>(null);

  return (
    <section id="summary-banners" className="relative py-24 px-4 md:px-8 bg-slate-950 border-t border-b border-stone-800 overflow-hidden">
      {/* Background Dark Fire Chamber */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.06),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 select-none">
          <p className="font-display text-[0.65rem] tracking-[0.4em] uppercase text-amber-500/70">
            ✦ Executive Summary ✦
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-[0.2em] uppercase text-stone-100 text-glow-fire mt-2">
            Domain Banners of the Realm
          </h2>
          <p className="font-body italic text-stone-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            "Four Pillars of Engineering forged under dragonfire. Hover or tap any banner to blast the iron shield and reveal core expertise."
          </p>
        </div>

        {/* 4 Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOMAIN_BANNERS.map((banner) => (
            <BannerCard
              key={banner.id}
              banner={banner}
              isMelted={activeMelt === banner.id}
              onActivate={() => setActiveMelt(banner.id)}
              onDeactivate={() => setActiveMelt(null)}
            />
          ))}
        </div>
      </div>

      {/* Inline keyframes for dragonfire animations */}
      <style>{`
        @keyframes df-shockwave {
          0% { transform: scale(0.3); opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes df-flash {
          0% { opacity: 0; }
          10% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes df-molten-border {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        @keyframes df-sigil-ignite {
          0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          20% { transform: scale(1.4) rotate(-8deg); filter: brightness(2.5) drop-shadow(0 0 12px var(--sigil-color, #f59e0b)); }
          50% { transform: scale(1.15) rotate(4deg); filter: brightness(1.6) drop-shadow(0 0 8px var(--sigil-color, #f59e0b)); }
          100% { transform: scale(1) rotate(0deg); filter: brightness(1) drop-shadow(0 0 0px transparent); }
        }
        @keyframes df-icon-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 var(--icon-glow, rgba(245,158,11,0.4)); }
          30% { transform: scale(1.15); box-shadow: 0 0 20px 6px var(--icon-glow, rgba(245,158,11,0.4)); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 transparent; }
        }
        @keyframes df-highlight-slide {
          0% { transform: translateX(-100%); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes df-fire-sweep {
          0% { transform: translateY(100%) scaleY(0.3); opacity: 0; }
          20% { opacity: 0.6; }
          60% { transform: translateY(-20%) scaleY(1); opacity: 0.3; }
          100% { transform: translateY(-100%) scaleY(0.5); opacity: 0; }
        }
        @keyframes df-ember-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-30px) scale(0); opacity: 0; }
        }
        @keyframes df-border-breathe {
          0%, 100% { border-color: rgba(245,158,11,0.5); box-shadow: 0 0 15px var(--glow-color, rgba(245,158,11,0.2)); }
          50% { border-color: rgba(245,158,11,0.9); box-shadow: 0 0 35px var(--glow-color, rgba(245,158,11,0.5)); }
        }
        @keyframes df-rod-ignite {
          0% { filter: brightness(1); }
          15% { filter: brightness(2.5) drop-shadow(0 0 8px rgba(255,200,50,0.8)); }
          100% { filter: brightness(1); }
        }
        @keyframes df-title-reveal {
          0% { letter-spacing: 0.3em; opacity: 0.6; text-shadow: 0 0 0px transparent; }
          40% { letter-spacing: 0.1em; opacity: 1; text-shadow: 0 0 15px var(--title-color, #f59e0b); }
          100% { letter-spacing: 0.12em; opacity: 1; text-shadow: 0 0 8px var(--title-color, rgba(245,158,11,0.5)); }
        }
        @keyframes df-badge-pop {
          0% { transform: scale(0.3) translateY(8px); opacity: 0; }
          60% { transform: scale(1.1) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

// ── Individual Banner Card ──
function BannerCard({
  banner,
  isMelted,
  onActivate,
  onDeactivate,
}: {
  banner: DomainBanner;
  isMelted: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const canvasRef = useEmberCanvas(banner.color, isMelted);
  const [strikeKey, setStrikeKey] = useState(0);

  // Trigger a fresh "strike" animation key each time this card becomes active
  useEffect(() => {
    if (isMelted) {
      setStrikeKey((k) => k + 1);
    }
  }, [isMelted]);

  return (
    <div
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={() => (isMelted ? onDeactivate() : onActivate())}
      className="relative group cursor-pointer"
      style={{
        transform: isMelted ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Ember particle canvas */}
      <canvas
        ref={canvasRef}
        width={320}
        height={420}
        className="absolute inset-0 w-full h-full z-30 pointer-events-none"
      />

      {/* Shockwave ring on strike */}
      {isMelted && (
        <div
          key={`shock-${strikeKey}`}
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
        >
          <div
            className="w-24 h-24 rounded-full border-2"
            style={{
              borderColor: banner.color,
              animation: "df-shockwave 0.7s ease-out forwards",
              boxShadow: `0 0 30px ${banner.accentGlow}`,
            }}
          />
        </div>
      )}

      {/* Flash overlay on strike */}
      {isMelted && (
        <div
          key={`flash-${strikeKey}`}
          className="absolute inset-0 z-25 pointer-events-none rounded-b-xl"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${banner.color}66, transparent 70%)`,
            animation: "df-flash 0.5s ease-out forwards",
          }}
        />
      )}

      {/* Banner Rod Top — ignites on strike */}
      <div
        className="w-[104%] -ml-[2%] h-3 bg-gradient-to-r from-amber-950 via-yellow-700 to-amber-950 rounded-full border border-amber-500/40 shadow-md flex items-center justify-between px-1.5 z-20 relative"
        style={{
          animation: isMelted ? "df-rod-ignite 0.8s ease-out" : "none",
        }}
      >
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isMelted ? banner.color : "#fbbf24",
            boxShadow: isMelted ? `0 0 8px ${banner.color}` : "none",
          }}
        />
        <div
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isMelted ? banner.color : "#fbbf24",
            boxShadow: isMelted ? `0 0 8px ${banner.color}` : "none",
          }}
        />
      </div>

      {/* Banner Shield Body */}
      <div
        className="mt-1 p-6 rounded-b-xl border relative overflow-hidden bg-stone-900/90 backdrop-blur-md"
        style={
          isMelted
            ? {
                borderColor: `${banner.color}aa`,
                animation: `df-border-breathe 1.8s ease-in-out infinite`,
                ["--glow-color" as string]: banner.accentGlow,
                boxShadow: `0 0 30px ${banner.accentGlow}, inset 0 0 20px rgba(0,0,0,0.3)`,
                transition: "all 0.4s ease",
              }
            : {
                borderColor: "rgb(41 37 36 / 1)", // stone-800
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                transition: "all 0.4s ease",
              }
        }
      >
        {/* Molten border glow trail */}
        {isMelted && (
          <div
            className="absolute inset-0 rounded-b-xl pointer-events-none z-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${banner.color}33, ${banner.color}66, ${banner.color}33, transparent)`,
              backgroundSize: "300% 100%",
              animation: "df-molten-border 2s linear infinite",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "2px",
            }}
          />
        )}

        {/* Dragonfire sweep — fire rising through the card */}
        {isMelted && (
          <div
            key={`sweep-${strikeKey}`}
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: `linear-gradient(to top, ${banner.color}40, ${banner.color}15, transparent)`,
              animation: "df-fire-sweep 0.9s ease-out forwards",
            }}
          />
        )}

        {/* Floating ember dots along edges */}
        {isMelted && (
          <div className="absolute inset-0 pointer-events-none z-[2]">
            {[...Array(8)].map((_, i) => (
              <div
                key={`ember-${i}-${strikeKey}`}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: banner.color,
                  left: `${10 + Math.random() * 80}%`,
                  bottom: `${5 + Math.random() * 20}%`,
                  boxShadow: `0 0 6px ${banner.color}`,
                  animation: `df-ember-rise ${0.8 + Math.random() * 0.6}s ease-out ${i * 0.08}s forwards`,
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        )}

        {/* Watermark Sigil — ignites on strike */}
        <div
          className="absolute -bottom-4 -right-4 text-7xl pointer-events-none select-none"
          style={
            isMelted
              ? {
                  opacity: 0.3,
                  ["--sigil-color" as string]: banner.color,
                  animation: "df-sigil-ignite 0.8s ease-out",
                  transition: "opacity 0.4s ease",
                }
              : {
                  opacity: 0.1,
                  transition: "opacity 0.4s ease",
                }
          }
        >
          {banner.sigil}
        </div>

        {/* Header & Icon — icon container pulses on strike */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div
            className="p-2.5 rounded-lg bg-stone-950 border border-stone-800"
            style={
              isMelted
                ? {
                    ["--icon-glow" as string]: banner.accentGlow,
                    animation: "df-icon-pulse 0.7s ease-out",
                    borderColor: `${banner.color}88`,
                  }
                : {}
            }
          >
            {banner.icon}
          </div>
          <span
            className="text-3xl"
            style={
              isMelted
                ? {
                    ["--sigil-color" as string]: banner.color,
                    animation: "df-sigil-ignite 0.8s ease-out",
                  }
                : {}
            }
          >
            {banner.sigil}
          </span>
        </div>

        {/* House & Title — title expands on strike */}
        <div className="relative z-10 mb-3">
          <span className="font-display text-[0.65rem] tracking-widest uppercase text-stone-400">
            {banner.house}
          </span>
          <h3
            className="font-display text-lg font-bold tracking-wider text-stone-100 uppercase mt-0.5"
            style={
              isMelted
                ? {
                    ["--title-color" as string]: banner.color,
                    animation: "df-title-reveal 0.6s ease-out forwards",
                  }
                : {}
            }
          >
            {banner.title}
          </h3>
          <p
            className="font-body italic text-xs font-medium mt-1 transition-all duration-300"
            style={{
              color: banner.color,
              textShadow: isMelted ? `0 0 10px ${banner.color}` : "none",
            }}
          >
            "{banner.motto}"
          </p>
        </div>

        {/* Summary Text */}
        <p
          className="font-body text-xs leading-relaxed relative z-10 mb-4 transition-colors duration-400"
          style={{
            color: isMelted ? "rgb(214 211 209)" : "rgb(168 162 158)", // stone-200 vs stone-400ish
          }}
        >
          {banner.summary}
        </p>

        {/* Highlight Ribbon — slides in on strike */}
        <div
          className="relative z-10 mb-4 p-2 rounded border text-[0.7rem] font-display tracking-wider flex items-center gap-1.5 overflow-hidden"
          style={
            isMelted
              ? {
                  backgroundColor: `${banner.color}11`,
                  borderColor: `${banner.color}44`,
                  color: banner.color,
                  animation: `df-highlight-slide 0.5s ease-out forwards`,
                }
              : {
                  backgroundColor: "rgba(9, 9, 11, 0.8)",
                  borderColor: "rgb(41 37 36 / 0.8)",
                  color: "rgba(252,211,77,0.9)",
                }
          }
        >
          <Flame
            className="w-3.5 h-3.5 shrink-0 transition-all duration-300"
            style={{
              color: isMelted ? banner.color : "#fbbf24",
              filter: isMelted ? `drop-shadow(0 0 6px ${banner.color})` : "none",
            }}
          />
          <span>{banner.highlight}</span>
        </div>

        {/* Skills Pills — staggered pop-in on strike */}
        <div className="relative z-10 pt-3 border-t border-stone-800/80">
          <div className="flex flex-wrap gap-1.5">
            {banner.skills.map((skill, idx) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-[0.65rem] px-2 py-0.5 transition-all duration-300"
                style={
                  isMelted
                    ? {
                        backgroundColor: `${banner.color}15`,
                        color: banner.color,
                        borderColor: `${banner.color}55`,
                        animation: `df-badge-pop 0.4s ease-out ${idx * 0.06}s both`,
                        boxShadow: `0 0 8px ${banner.color}22`,
                      }
                    : {
                        backgroundColor: "rgba(9, 9, 11, 0.6)",
                        color: "rgb(168 162 158)",
                        borderColor: "rgb(41 37 36)",
                      }
                }
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
