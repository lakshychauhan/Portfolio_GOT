import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, Check, Flame, Shield, Hammer, Download } from "lucide-react";

interface HouseOption {
  id: string;
  name: string;
  motto: string;
  sigil: string;
  color: string;
  glow: string;
  bgGradient: string;
  borderAccent: string;
}

const HOUSES: HouseOption[] = [
  {
    id: "stark",
    name: "House Stark",
    motto: "Winter is Coding",
    sigil: "🐺",
    color: "#38bdf8", // Ice Blue
    glow: "rgba(56, 189, 248, 0.4)",
    bgGradient: "from-slate-900 via-sky-950/40 to-slate-950",
    borderAccent: "border-sky-500/40",
  },
  {
    id: "targaryen",
    name: "House Targaryen",
    motto: "Fire, APIs & RAG",
    sigil: "🐉",
    color: "#f97316", // Fire Orange
    glow: "rgba(249, 115, 22, 0.4)",
    bgGradient: "from-stone-950 via-amber-950/40 to-stone-950",
    borderAccent: "border-amber-500/40",
  },
  {
    id: "baratheon",
    name: "House Baratheon",
    motto: "Ours is the Concurrency",
    sigil: "👑",
    color: "#eab308", // Valyrian Gold
    glow: "rgba(234, 179, 8, 0.4)",
    bgGradient: "from-stone-950 via-yellow-950/30 to-stone-950",
    borderAccent: "border-yellow-500/40",
  },
  {
    id: "lannister",
    name: "House Lannister",
    motto: "A Dev Always Pays His Tech Debt",
    sigil: "🦁",
    color: "#ef4444", // Crimson Gold
    glow: "rgba(239, 68, 68, 0.4)",
    bgGradient: "from-red-950/40 via-stone-950 to-stone-950",
    borderAccent: "border-red-500/40",
  },
  {
    id: "greyjoy",
    name: "House Greyjoy",
    motto: "What is Compiled May Never Crash",
    sigil: "🐙",
    color: "#14b8a6", // Sea Teal
    glow: "rgba(20, 184, 166, 0.4)",
    bgGradient: "from-teal-950/30 via-slate-950 to-stone-950",
    borderAccent: "border-teal-500/40",
  },
];

const AVAILABLE_TECH = [
  "React 19",
  "JavaScript",
  "Next.js",
  "Node.js",
  "NestJS",
  "Gemini API",
  "pgvector",
  "PostgreSQL",
  "SQLite (WAL)",
  "Redis",
  "C++",
  "Python",
  "Docker",
  "Tailwind CSS",
  "TanStack Router",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export function InteractiveBannerWeaver() {
  const [selectedHouse, setSelectedHouse] = useState<HouseOption>(HOUSES[0]);
  const [selectedTech, setSelectedTech] = useState<string[]>([
    "React 19",
    "TypeScript",
    "Node.js",
    "Gemini API",
  ]);
  const [customTitle, setCustomTitle] = useState("Lakshy of House Stark");
  const [isForging, setIsForging] = useState(false);
  const [isForged, setIsForged] = useState(true);
  const [copied, setCopied] = useState(false);
  const [heatFlash, setHeatFlash] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // Toggle Tech Stack Item
  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      if (selectedTech.length > 1) {
        setSelectedTech(selectedTech.filter((t) => t !== tech));
      }
    } else {
      if (selectedTech.length < 6) {
        setSelectedTech([...selectedTech, tech]);
      }
    }
  };

  // Spark Particles Engine
  const triggerForgeSparks = () => {
    setHeatFlash(true);
    setTimeout(() => setHeatFlash(false), 300);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const centerX = width / 2;
    const centerY = height / 2;

    const colors = [selectedHouse.color, "#f97316", "#ef4444", "#fbbf24", "#ffffff"];

    const newParticles: Particle[] = [];
    for (let i = 0; i < 70; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      newParticles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 3,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 40 + 20,
      });
    }

    particlesRef.current = newParticles;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.life++;
        p.alpha = 1 - p.life / p.maxLife;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      if (particlesRef.current.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    render();
  };

  // Hammer the Anvil Action
  const handleForge = () => {
    setIsForging(true);
    triggerForgeSparks();

    setTimeout(() => {
      setIsForging(false);
      setIsForged(true);
    }, 450);
  };

  // Copy Banner Oath snippet to clipboard
  const handleCopyOath = () => {
    const oath = `🛡️ [Allegiance Sworn: ${selectedHouse.name}]\n" ${selectedHouse.motto} "\nTitle: ${customTitle}\nArsenal: ${selectedTech.join(" · ")}`;
    navigator.clipboard.writeText(oath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download Banner as Image (Canvas Snapshot)
  const handleDownloadBanner = () => {
    if (!bannerRef.current) return;
    const bannerEl = bannerRef.current;

    // Create temporary canvas to draw the banner snapshot
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw Dark Background
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Outer Gold Border
    ctx.strokeStyle = selectedHouse.color;
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Draw Sigil
    ctx.font = "72px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(selectedHouse.sigil, canvas.width / 2, 140);

    // Draw House Name
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 32px Georgia, serif";
    ctx.fillText(selectedHouse.name.toUpperCase(), canvas.width / 2, 220);

    // Draw Motto
    ctx.fillStyle = selectedHouse.color;
    ctx.font = "italic 20px Georgia, serif";
    ctx.fillText(`"${selectedHouse.motto}"`, canvas.width / 2, 270);

    // Draw Title
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "18px Georgia, serif";
    ctx.fillText(customTitle, canvas.width / 2, 320);

    // Separator Line
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 360);
    ctx.lineTo(500, 360);
    ctx.stroke();

    // Draw Tech Stack Header
    ctx.fillStyle = "#94a3b8";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("FORGED TECH ARSENAL", canvas.width / 2, 410);

    // Draw Tech Badges
    selectedTech.forEach((tech, i) => {
      const y = 470 + i * 45;
      ctx.fillStyle = "rgba(30, 41, 59, 0.9)";
      ctx.beginPath();
      ctx.roundRect(150, y - 24, 300, 36, 18);
      ctx.fill();
      ctx.strokeStyle = selectedHouse.color;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#f8fafc";
      ctx.font = "16px sans-serif";
      ctx.fillText(tech, canvas.width / 2, y);
    });

    // Footer
    ctx.fillStyle = "#64748b";
    ctx.font = "12px Georgia, serif";
    ctx.fillText("Forged in the Archives of Lakshy Chauhan", canvas.width / 2, 750);

    // Trigger Download link
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${selectedHouse.id}-developer-banner.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <section id="forge" className="relative py-24 px-4 md:px-8 bg-stone-950 border-t border-b border-amber-900/20 overflow-hidden">
      {/* Background Ambient Heat Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08),transparent_70%)] pointer-events-none" />

      {/* Heat Flash Animation */}
      <div
        className={`absolute inset-0 z-40 bg-amber-500/20 pointer-events-none transition-opacity duration-300 ${
          heatFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 select-none">
          <p className="font-display text-[0.65rem] tracking-[0.4em] uppercase text-amber-500/70">
            ✦ Interactive Armory ✦
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-[0.2em] uppercase text-stone-100 text-glow-fire mt-2">
            The Forge of Banners
          </h2>
          <p className="font-body italic text-stone-400 mt-3 max-w-xl mx-auto text-sm md:text-base">
            "Select your Great House, assemble your tech stack, and strike the anvil to forge your custom Developer Banner."
          </p>
        </div>

        {/* Forge Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-6 space-y-6 bg-stone-900/60 p-6 md:p-8 rounded-xl border border-stone-800 backdrop-blur-md shadow-2xl">
            {/* Step 1: Choose House */}
            <div>
              <label className="flex font-display text-xs tracking-wider uppercase text-amber-500 mb-3 items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" /> Step 1: Select House Allegiance
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {HOUSES.map((house) => {
                  const isSelected = selectedHouse.id === house.id;
                  return (
                    <button
                      key={house.id}
                      type="button"
                      onClick={() => {
                        setSelectedHouse(house);
                        setCustomTitle(`Lakshy of ${house.name}`);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-amber-500/80 bg-stone-800 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.02]"
                          : "border-stone-800 bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{house.sigil}</span>
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: house.color }}
                        />
                      </div>
                      <div className="mt-2">
                        <div className="font-display text-xs text-stone-200 font-semibold truncate">
                          {house.name}
                        </div>
                        <div className="font-body text-[0.65rem] italic text-stone-400 truncate mt-0.5">
                          "{house.motto}"
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Custom House Title */}
            <div>
              <label className="flex font-display text-xs tracking-wider uppercase text-amber-500 mb-2 items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" /> Step 2: Custom Title / Motto
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                maxLength={32}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-stone-200 font-body text-sm focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Enter custom title..."
              />
            </div>

            {/* Step 3: Choose Tech Stack */}
            <div>
              <label className="flex font-display text-xs tracking-wider uppercase text-amber-500 mb-2.5 items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" /> Step 3: Select Tech Arsenal (Max 6)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_TECH.map((tech) => {
                  const isSelected = selectedTech.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`text-xs px-3 py-1.5 rounded-md font-body transition-all duration-150 ${
                        isSelected
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm"
                          : "bg-stone-950 text-stone-400 border border-stone-800 hover:border-stone-700 hover:text-stone-300"
                      }`}
                    >
                      {tech} {isSelected && "✓"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Strike Anvil Button */}
            <div className="pt-2">
              <Button
                onClick={handleForge}
                disabled={isForging}
                className="w-full py-6 bg-linear-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-display text-sm tracking-[0.2em] uppercase font-bold shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 rounded-lg"
              >
                <Hammer className={`w-5 h-5 ${isForging ? "animate-bounce" : ""}`} />
                {isForging ? "Striking the Anvil..." : "Strike Anvil & Forge Banner"}
              </Button>
            </div>
          </div>

          {/* Banner Canvas & Visual Result Column (Right) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-120">
            {/* Spark Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-30"
            />

            {/* The Unrolled Banner Container */}
            <div
              ref={bannerRef}
              className={`relative w-full max-w-sm transition-all duration-500 transform ${
                isForging
                  ? "scale-95 blur-sm opacity-80 rotate-1"
                  : "scale-100 blur-0 opacity-100 rotate-0"
              }`}
            >
              {/* Banner Hanging Rod */}
              <div className="w-[106%] ml-[-3%] h-4 bg-linear-to-r from-amber-900 via-yellow-700 to-amber-900 rounded-full border border-amber-500/50 shadow-lg flex items-center justify-between px-2">
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-md" />
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-md" />
              </div>

              {/* Banner Cloth Body */}
              <div
                className={`mt-1 p-6 md:p-8 rounded-b-2xl border-2 bg-linear-to-b ${selectedHouse.bgGradient} ${selectedHouse.borderAccent} shadow-[0_0_35px_rgba(0,0,0,0.8)] relative overflow-hidden text-center`}
                style={{
                  boxShadow: `0 0 30px ${selectedHouse.glow}`,
                }}
              >
                {/* Background Watermark Sigil */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-10 pointer-events-none select-none">
                  {selectedHouse.sigil}
                </div>

                {/* Banner Header */}
                <div className="relative z-10 space-y-2">
                  <div className="inline-block p-3 rounded-full bg-stone-900/80 border border-stone-700 shadow-inner">
                    <span className="text-4xl">{selectedHouse.sigil}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-widest text-stone-100 uppercase">
                    {selectedHouse.name}
                  </h3>
                  <p
                    className="font-body italic text-sm font-medium"
                    style={{ color: selectedHouse.color }}
                  >
                    "{selectedHouse.motto}"
                  </p>
                </div>

                {/* Custom Title Ribbon */}
                <div className="relative z-10 my-5 py-2 px-4 bg-stone-950/80 border-y border-stone-800 font-display text-xs tracking-widest uppercase text-stone-300">
                  {customTitle}
                </div>

                {/* Tech Arsenal List */}
                <div className="relative z-10 space-y-2">
                  <p className="font-display text-[0.65rem] tracking-[0.25em] text-stone-400 uppercase">
                    Forged Tech Arsenal
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {selectedTech.map((tech) => (
                      <Badge
                        key={tech}
                        className="bg-stone-900/90 text-stone-200 border border-stone-700 text-xs px-2.5 py-1 font-body"
                        style={{ borderColor: `${selectedHouse.color}50` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Bottom Banner Decorative V-Shape */}
                <div className="mt-8 pt-4 border-t border-stone-800/60 font-body text-[0.7rem] text-stone-500 italic flex items-center justify-center gap-2">
                  <span>✦ Realm of Lakshy Chauhan ✦</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Copy Oath & Download Banner */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 w-full max-w-sm">
              <Button
                type="button"
                variant="outline"
                onClick={handleCopyOath}
                className="flex-1 bg-stone-900/80 border-stone-700 hover:border-amber-500 text-stone-200 text-xs font-display tracking-wider uppercase flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Oath Copied!" : "Copy Banner Oath"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadBanner}
                className="flex-1 bg-stone-900/80 border-stone-700 hover:border-amber-500 text-stone-200 text-xs font-display tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                Download PNG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
