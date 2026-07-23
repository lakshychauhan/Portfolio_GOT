import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import heroThrone from "@/assets/hero-throne.jpg";
import projectQuasar from "@/assets/quasar.png";
import projectPortfolio from "@/assets/portfolio.png";
import projectPaperVault from "@/assets/papervault.png";
import ironThroneForge from "@/assets/iron-throne-forge.png";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveBannerWeaver } from "@/components/InteractiveBannerWeaver";
import { DragonfireSummaryBanners } from "@/components/DragonfireSummaryBanners";
import { AmbientSoundToggle } from "@/components/AmbientSoundToggle";
import { ChapterNavigationSidebar } from "@/components/ChapterNavigationSidebar";
import { GoldStarfieldBackground } from "@/components/GoldStarfieldBackground";
import { StaggerText } from "@/components/StaggerText";

export const Route = createFileRoute("/")({
  component: Index,
});

const HOUSES = [
  {
    name: "Jon Snow",
    role: "Frontend Warden",
    quote: "The night is dark and full of bugs.",
    tone: "ice" as const,
  },
  {
    name: "Daenerys",
    role: "Backend Khaleesi",
    quote: "APIs, blood, and fire.",
    tone: "fire" as const,
  },
  {
    name: "The Night King",
    role: "Deployment Wraith",
    quote: "Winter deploys are coming.",
    tone: "ice" as const,
  },
];

const PROJECTS = [
  {
    name: "QUASAR 2026",
    house: "House Baratheon",
    tech: ["Node.js", "Express", "SQLite", "Clerk", "Three.js"],
    body: "An inter-college sports fest registration and payment platform. Implemented secure Clerk auth, concurrent-safe SQLite (WAL mode), magic-byte file verification, and robust admin panels with automated backups. Styled with an immersive Three.js WebGL grid and Lenis smooth-scroll.",
    image: projectQuasar,
    sigil: "⚔",
    tone: "ice" as const,
    liveUrl: "https://github.com/lakshychauhan/QUASAR.git",
    githubUrl: "https://github.com/lakshychauhan/QUASAR.git",
    highlightTitle: "MAESTER CODEX: CONCURRENCY",
    highlightText: "Deploys SQLite in Write-Ahead Logging (WAL) mode for simultaneous admin queries and guest registrations without locks.",
  },
  {
    name: "PaperVault",
    house: "House Targaryen",
    tech: ["Next.js", "NestJS", "PostgreSQL", "pgvector", "Gemini API"],
    body: "An AI-powered college paper sharing platform featuring a RAG pipeline utilizing pgvector and Gemini embeddings for natural-language search. Designed a 16-model Prisma schema, with real-time Socket.io notifications, Redis-backed rate limiting, and Cloudflare R2 storage.",
    image: projectPaperVault,
    sigil: "🐉",
    tone: "fire" as const,
    liveUrl: "https://github.com/lakshychauhan/Papervault.git",
    githubUrl: "https://github.com/lakshychauhan/Papervault.git",
    highlightTitle: "MAESTER CODEX: EMBEDDINGS",
    highlightText: "Leverages pgvector hierarchical cosine similarity indexing to map semantic relationships across uploaded research scrolls.",
  },
  {
    name: "Game of Thrones Developer Portfolio",
    house: "House Stark",
    tech: ["React 19", "TypeScript", "TanStack Router", "Tailwind CSS"],
    body: "A cinematic, GoT-themed developer portfolio built using TanStack Start with file-based routing and React 19. Crafted with custom OKLCH color tokens, Radix UI primitives, dynamic ambient particle effects, and an animated intro sequence.",
    image: projectPortfolio,
    sigil: "❄",
    tone: "ice" as const,
    liveUrl: "https://github.com/lakshychauhan/LakshyChauhan_Portfolio.git",
    githubUrl: "https://github.com/lakshychauhan/LakshyChauhan_Portfolio.git",
    highlightTitle: "MAESTER CODEX: OPTIMIZATION",
    highlightText: "Drives scroll timelines via hardware-accelerated CSS custom properties on body, maintaining a fluid 60fps render cycle.",
  },
];

const CHRONICLES = [
  {
    year: "June 2025 — July 2025",
    title: "Code Caffeine · Web Dev Intern",
    stack: "HTML · CSS · JavaScript",
    deeds: [
      "Forged responsive pages that render true across every raven-glass browser.",
      "Sharpened UI/UX with clean layouts and interactive smallfolk components.",
      "Debugged the frontend keep, tightening performance below the walls.",
      "Rode with the team using Git under industry-standard banners.",
    ],
  },
  {
    year: "June 2024 — July 2024",
    title: "TechnoHacks EduTech · Intern",
    stack: "HTML · CSS · JS · React",
    deeds: [
      "Constructed a calculator of ledgers and levies.",
      "Raised a responsive landing hall for a growing house.",
      "Illuminated a personal portfolio site of my own making.",
    ],
  },
  {
    year: "May 2024",
    title: "IITB Spoken Tutorial · Training",
    stack: "C · C++ · Python",
    deeds: [
      "Trained in the elder tongues of C, C++, and Python with hands-on rites.",
    ],
  },
];

const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "Python", hint: "Scripting, automation, and machine learning" },
      { name: "C++", hint: "Performance, system software, and structures" },
      { name: "JavaScript", hint: "Dynamic scripting and frontend/backend logic" },
      { name: "SQL", hint: "Structured database query language" },
      { name: "HTML / CSS", hint: "Web page structure and styles" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "React", hint: "Component-based declarative UI library" },
      { name: "Node.js", hint: "Server-side JavaScript runtime environment" },
      { name: "Next.js", hint: "React framework for production with SSR" },
      { name: "NestJS", hint: "Scalable backend Node.js framework" },
      { name: "Express", hint: "Minimal and flexible Node.js web app framework" },
    ],
  },
  {
    category: "Databases & Tools",
    items: [
      { name: "PostgreSQL", hint: "Powerful open-source relational database" },
      { name: "MongoDB", hint: "NoSQL document-based database" },
      { name: "SQLite", hint: "Self-contained serverless SQL database engine" },
      { name: "Redis", hint: "In-memory data structure store / cache" },
      { name: "Git", hint: "Distributed version control system" },
      { name: "Docker", hint: "Containerization platform" },
      { name: "PM2", hint: "Production process manager for Node.js" },
    ],
  },
  {
    category: "AI / LLM Technologies",
    items: [
      { name: "Claude", hint: "Anthropic's conversational and coding LLM" },
      { name: "Gemini API", hint: "Accessing Google's generative models" },
      { name: "ChatGPT", hint: "OpenAI's large language model" },
      { name: "Prompt Engineering", hint: "Designing optimized inputs for LLMs" },
    ],
  },
  {
    category: "Core CS Concepts",
    items: [
      { name: "OOPS", hint: "Object-Oriented Programming principles" },
      { name: "DBMS", hint: "Database Management Systems" },
      { name: "Operating Systems", hint: "Operating system internals and concepts" },
      { name: "Computer Networks", hint: "Computer networking and protocols" },
    ],
  },
];

const NAV_LINKS = ["Projects", "Experience", "Skills", "Contact"];

interface Mote {
  id: number;
  isEmber: boolean;
  size: number;
  left: number;
  drift: number;
  duration: number;
  delay: number;
}

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [typedName, setTypedName] = useState("");
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0 });
  const [motes, setMotes] = useState<Mote[]>([]);
  const motesRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("citadel");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (sessionStorage.getItem("lc_intro_seen")) {
      setIntroDone(true);
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finishIntro = () => {
    sessionStorage.setItem("lc_intro_seen", "1");
    document.body.style.overflow = "";
    setIntroDone(true);
  };

  // Sync active tab with URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#skills") {
        setActiveTab("arts");
      } else if (hash === "#citadel") {
        setActiveTab("citadel");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange, { passive: true });
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Quill typewriter animation
  useEffect(() => {
    const fullName = "Lakshy Chauhan";
    let i = 0;
    const timer = setInterval(() => {
      setTypedName(fullName.substring(0, i + 1));
      i++;
      if (i >= fullName.length) {
        clearInterval(timer);
        setTimeout(() => {
          setShowCursor(false);
        }, 1500);
      }
    }, 85);
    return () => clearInterval(timer);
  }, []);

  // Ambient embers / frost motes
  useEffect(() => {
    const isMobile = window.innerWidth < 560;
    const count = isMobile ? 20 : 40;
    const generated: Mote[] = [];
    for (let n = 0; n < count; n++) {
      const isEmber = n % 2 === 0;
      generated.push({
        id: n,
        isEmber,
        size: 2 + Math.random() * 3,
        left: Math.random() * 94 + 3,
        drift: Math.random() * 50 - 25,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 10,
      });
    }
    setMotes(generated);
  }, []);

  // Mousemove parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setParallaxPos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll-linked background shift and ember/frost intensity — fire at top, ice at bottom
  useEffect(() => {
    const updateScrollDynamics = () => {
      const el = motesRef.current;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      // Update motes intensities
      if (el) {
        el.style.setProperty("--ember-intensity", String(1 - progress * 0.82));
        el.style.setProperty("--frost-intensity", String(0.1 + progress * 0.9));
        el.style.setProperty("--mote-brightness", String(1 + progress * 0.5));
      }

      // Calculate background color shift from warm gold-obsidian to deep ice blue-black
      // Top: oklch(0.14 0.012 60) -> Bottom: oklch(0.09 0.02 245)
      const bgLightness = 0.14 - progress * 0.05;
      const bgChroma = 0.012 + progress * 0.008;
      const bgHue = 60 + progress * 185;

      // Glow 1: Sunset/Fire orange at top (L=0.35, C=0.09, H=40) -> Cold blue (L=0.18, C=0.04, H=240)
      const glow1Lightness = 0.35 - progress * 0.17;
      const glow1Chroma = 0.09 - progress * 0.05;
      const glow1Hue = 40 + progress * 200;
      const glow1Opacity = 0.28 - progress * 0.08;

      // Glow 2: Deep blue at bottom (L=0.33, C=0.12, H=220)
      const glow2Lightness = 0.28 + progress * 0.05;
      const glow2Chroma = 0.07 + progress * 0.05;
      const glow2Hue = 230 - progress * 10;
      const glow2Opacity = 0.28 + progress * 0.17;

      // Set values directly on body to trigger background shift without react renders
      const bodyStyle = document.body.style;
      bodyStyle.setProperty("--background-dynamic", `oklch(${bgLightness} ${bgChroma} ${bgHue})`);
      bodyStyle.setProperty("--bg-glow-1", `oklch(${glow1Lightness} ${glow1Chroma} ${glow1Hue} / ${glow1Opacity})`);
      bodyStyle.setProperty("--bg-glow-2", `oklch(${glow2Lightness} ${glow2Chroma} ${glow2Hue} / ${glow2Opacity})`);
    };

    window.addEventListener("scroll", updateScrollDynamics, { passive: true });
    updateScrollDynamics();
    return () => window.removeEventListener("scroll", updateScrollDynamics);
  }, []);


  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-background text-foreground">
        {!introDone && <ColdOpen onDone={finishIntro} />}

        {/* Global Gold Ember / Starfield Background */}
        <GoldStarfieldBackground />

        {/* Global scroll-linked ember / frost motes */}
        <div className="motes-global" ref={motesRef} aria-hidden="true">
          <div className="motes-ember-layer">
            {motes
              .filter((m) => m.isEmber)
              .map((m) => (
                <span
                  key={m.id}
                  className="mote ember"
                  style={
                    {
                      width: `${m.size}px`,
                      height: `${m.size}px`,
                      left: `${m.left}%`,
                      "--drift": `${m.drift}px`,
                      animationDuration: `${m.duration}s`,
                      animationDelay: `${m.delay}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
          </div>
          <div className="motes-frost-layer">
            {motes
              .filter((m) => !m.isEmber)
              .map((m) => (
                <span
                  key={m.id}
                  className="mote frost"
                  style={
                    {
                      width: `${m.size}px`,
                      height: `${m.size}px`,
                      left: `${m.left}%`,
                      "--drift": `${m.drift}px`,
                      animationDuration: `${m.duration}s`,
                      animationDelay: `${m.delay}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
          </div>
        </div>

        {/* Top raven bar */}
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-background/85 backdrop-blur-md border-b border-border"
              : "bg-transparent"
          }`}
        >
          <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <a
              href="#top"
              className="font-display text-lg tracking-[0.3em] text-bronze"
            >
              L·C
            </a>
            <ul className="hidden md:flex gap-10 font-display text-xs tracking-[0.35em] uppercase text-muted-foreground">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="hover:text-parchment transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden md:flex gap-4">
              <Button
                variant="ghost"
                asChild
                className="text-muted-foreground hover:text-parchment font-display text-[0.68rem] tracking-[0.3em] uppercase rounded-none h-auto py-2"
              >
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Scroll</a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-bronze/50 text-bronze font-display text-[0.68rem] tracking-[0.3em] uppercase hover:bg-bronze/10 rounded-none h-auto py-2"
              >
                <a href="mailto:lakshychauhan076@gmail.com">Send Raven</a>
              </Button>
            </div>

            {/* Mobile nav — Sheet component */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-bronze"
                  aria-label="Open navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-background/95 backdrop-blur-lg border-border"
              >
                <SheetHeader>
                  <SheetTitle className="font-display text-lg tracking-[0.3em] text-bronze">
                    L·C
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-6">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l}
                      href={`#${l.toLowerCase()}`}
                      onClick={() => setSheetOpen(false)}
                      className="font-display text-sm tracking-[0.35em] uppercase text-muted-foreground hover:text-parchment transition-colors"
                    >
                      {l}
                    </a>
                  ))}
                  <Separator className="bg-border/50" />
                  <Button
                    variant="outline"
                    asChild
                    className="border-bronze/50 text-bronze font-display text-[0.68rem] tracking-[0.3em] uppercase hover:bg-bronze/10 rounded-none w-full"
                  >
                    <a href="mailto:lakshychauhan076@gmail.com">Send Raven</a>
                  </Button>
                  <Button
                    variant="ghost"
                    asChild
                    className="text-muted-foreground hover:text-parchment font-display text-[0.68rem] tracking-[0.3em] uppercase rounded-none w-full"
                  >
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Scroll (CV)</a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </nav>
        </header>

        {/* HERO */}
        <section
          id="top"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >

          {/* Hero background image - optimized to load a blank 0-byte stub on screens under 640px for mobile performance */}
          <picture>
            <source media="(max-width: 640px)" srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
            <img
              src={heroThrone}
              alt="Iron tome of House Stark on a stone table before the Iron Throne"
              width={1920}
              height={1088}
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          </picture>
          <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/30 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_85%)]" />

          <div
            className="relative z-10 max-w-5xl px-6 text-center transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${parallaxPos.x}px, ${parallaxPos.y}px)`,
            }}
          >
            <p className="font-display text-xs md:text-sm tracking-[0.6em] uppercase text-bronze animate-flicker">
              ✦ The Chronicle of ✦
            </p>
            <h1 className="mt-8 font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] min-h-[1.95em]">
              <span className="block text-parchment text-glow-fire">
                {typedName.split(" ")[0] || "\u00A0"}
              </span>
              <span className="block text-parchment text-glow-ice mt-2 md:mt-0">
                {typedName.split(" ")[1] || "\u00A0"}
                {showCursor && <span className="typing-cursor" aria-hidden="true">&nbsp;</span>}
              </span>
            </h1>
            <Separator className="mx-auto mt-8 w-40 bg-linear-to-r from-transparent via-bronze to-transparent" />
            <p className="mt-6 font-body italic text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              "A maester of the web, sworn to React and Node, keeper of scrolls
              in HTML, CSS, and the elder tongue of JavaScript."
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-4 md:gap-6">
              <PlaqueLink href="#projects" gem="fire" label="Projects" />
              <PlaqueLink href="#experience" gem="ice" label="Experience" />
              <PlaqueLink href="#contact" gem="fire" label="Contact" />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-[0.65rem] tracking-[0.5em] uppercase text-muted-foreground animate-flicker">
            Scroll · Enter the Archive
          </div>
        </section>

        {/* HOUSES / SPECIALTIES */}
        <section id="sigils" className="relative py-16 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeading kicker="The Great Houses" title="Sigils of the Craft" />
            <BattleFormation />
          </div>
        </section>

        {/* DOMAIN SUMMARY BANNERS */}
        <DragonfireSummaryBanners />

        {/* SCROLL OF PROPHECIES */}
        <ScrollOfProphecies />

        {/* FORGE OF THE IRON THRONE */}
        <InteractiveBannerWeaver />

        {/* PROJECTS */}
        <IronGateReveal>
        <section id="projects" className="relative py-16 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeading
              kicker="Chapter I"
              title="Projects of the Realm"
              subtitle="Keeps built, dragons trained, and ledgers kept in the archives."
            />
            <div className="mt-20 space-y-24">
              {PROJECTS.map((p, i) => (
                <ScrollReveal key={p.name}>
                  <ParallaxProjectCard
                    image={p.image}
                    title={p.name}
                    tone={p.tone}
                    house={p.house}
                    sigil={p.sigil}
                    tech={p.tech}
                    body={p.body}
                    liveUrl={p.liveUrl}
                    githubUrl={p.githubUrl}
                    reverse={i % 2 === 1}
                    highlightTitle={p.highlightTitle}
                    highlightText={p.highlightText}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        </IronGateReveal>

        {/* EXPERIENCE */}
        <IronGateReveal>
        <section
          id="experience"
          className="relative py-16 md:py-32 px-6 bg-linear-to-b from-transparent via-obsidian/40 to-transparent"
        >
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              kicker="Chapter II"
              title="The Chronicles"
              subtitle="Oaths sworn, banners raised, and lessons learned across the years."
            />
            <UnfurlingTimeline>
              {CHRONICLES.map((c) => (
                <TimelineItem
                  key={c.title}
                  year={c.year}
                  title={c.title}
                  stack={c.stack}
                  deeds={c.deeds}
                />
              ))}
            </UnfurlingTimeline>

            {/* Education, Skills & Extracurriculars — Tabs */}
            <ScrollReveal>
              <div className="mt-24">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" id="skills">
                  <TabsList className="w-full bg-card/60 border border-border rounded-none h-auto p-1 overflow-x-auto">
                    <TabsTrigger
                      value="citadel"
                      className="font-display text-[0.55rem] sm:text-xs tracking-widest sm:tracking-[0.2em] uppercase rounded-none data-[state=active]:bg-bronze/20 data-[state=active]:text-bronze whitespace-nowrap"
                    >
                      The Citadel
                    </TabsTrigger>
                    <TabsTrigger
                      value="arts"
                      className="font-display text-[0.55rem] sm:text-xs tracking-widest sm:tracking-[0.2em] uppercase rounded-none data-[state=active]:bg-bronze/20 data-[state=active]:text-bronze whitespace-nowrap"
                    >
                      Sworn Arts
                    </TabsTrigger>
                    <TabsTrigger
                      value="deeds"
                      className="font-display text-[0.55rem] sm:text-xs tracking-widest sm:tracking-[0.2em] uppercase rounded-none data-[state=active]:bg-bronze/20 data-[state=active]:text-bronze whitespace-nowrap"
                    >
                      Beyond the Wall
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="citadel">
                    <Card className="border-border bg-card/60 backdrop-blur-sm rounded-none">
                      <CardContent className="pt-6">
                        <p className="font-display text-sm tracking-[0.2em] uppercase text-bronze">
                          B K Birla Institute of Engineering &amp; Technology
                        </p>
                        <p className="mt-2 italic text-muted-foreground">
                          B.Tech · Artificial Intelligence · 2023 — 2027
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Pilani, India
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="arts">
                    <WesterosSkillsMap active={activeTab === "arts"} />
                  </TabsContent>

                  <TabsContent value="deeds">
                    <Card className="border-border bg-card/60 backdrop-blur-sm rounded-none">
                      <CardContent className="pt-6">
                        <ul className="space-y-3 text-parchment/85">
                          <li>◈ Coordinator — BASANT 2026, Cultural Fest at BKBIET Pilani</li>
                          <li>
                            ◈ Coordinator — QUASAR 2024 &amp; 2025, Sports Fest at BKBIET Pilani
                          </li>
                          <li>◈ Event Manager — NSCC BKBIET</li>
                          <li>◈ Cinematic Lead — DSC BKBIET</li>
                          <li>
                            ◈ Rider in the lists: Code Cubicle, Beast Mode, Kalash Creative
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollReveal>
          </div>
        </section>
        </IronGateReveal>

        {/* CONTACT */}
        <section id="contact" className="relative py-16 md:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading kicker="Final Rite" title="Send a Raven" />
            <p className="mt-8 font-body italic text-lg text-muted-foreground max-w-xl mx-auto">
              "A lord who lets his devs be idle is no lord at all. Summon me for
              quests of code, commissions, or council."
            </p>

            {/* Dynamic Raven Postbox mock UI sequence */}
            <RavenInboxMock />

            <RavenFlightContainer>
              <ContactStone
                label="Raven"
                value="lakshychauhan076@gmail.com"
                href="mailto:lakshychauhan076@gmail.com"
                tone="fire"
              />
              <ContactStone
                label="Scrolls"
                value="github.com/lakshychauhan"
                href="https://github.com/lakshychauhan"
                tone="ice"
              />
              <ContactStone
                label="Court"
                value="linkedin.com/in/lakshychauhan"
                href="https://linkedin.com/in/lakshychauhan"
                tone="fire"
              />
            </RavenFlightContainer>


          </div>
        </section>

        {/* AMBIENT SOUND TOGGLE & CHAPTER NAVIGATION SIDEBAR */}
        <AmbientSoundToggle />
        <ChapterNavigationSidebar />


        <footer className="border-t border-border py-10 text-center">
          <p className="font-display text-[0.65rem] tracking-[0.5em] uppercase text-muted-foreground">
            Valar Morghulis · Valar Dohaeris
          </p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            Sworn &amp; scribed by Lakshy Chauhan, {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </TooltipProvider>
  );
}

function PlaqueLink({
  href,
  label,
  gem,
}: {
  href: string;
  label: string;
  gem: "fire" | "ice";
}) {
  return (
    <Button
      variant="outline"
      asChild
      className="group relative h-auto px-8 py-4 border-bronze/60 bg-linear-to-b from-card/80 to-obsidian/60 backdrop-blur-sm hover:border-bronze transition-all duration-300 hover:-translate-y-0.5 rounded-none"
    >
      <a href={href}>
        <span
          className={`inline-block w-2.5 h-2.5 rotate-45 animate-flicker ${
            gem === "fire" ? "bg-fire shadow-[0_0_12px_var(--color-fire)]" : "bg-ice shadow-[0_0_12px_var(--color-ice)]"
          }`}
        />
        <span className="font-display text-xs md:text-sm tracking-[0.35em] uppercase text-parchment">
          {label}
        </span>
        <span
          className={`inline-block w-2.5 h-2.5 rotate-45 animate-flicker ${
            gem === "fire" ? "bg-fire" : "bg-ice"
          }`}
        />
      </a>
    </Button>
  );
}

function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={containerRef} className="text-center select-none py-4">
      {/* Kicker with fading ornaments */}
      <p className="font-display text-[0.7rem] tracking-[0.6em] uppercase text-bronze flex items-center justify-center gap-2">
        <span className={`transition-opacity duration-700 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>✦</span>
        <span className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>{kicker}</span>
        <span className={`transition-opacity duration-700 delay-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>✦</span>
      </p>

      {/* Quill-written Title */}
      <h2 className="mt-5 font-display font-bold text-4xl md:text-5xl text-parchment flex flex-wrap justify-center overflow-hidden py-1">
        {title.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block whitespace-pre ${isVisible ? "quill-letter-active" : "quill-letter"}`}
            style={{
              animationDelay: `${index * 0.035}s`,
            }}
          >
            {char}
          </span>
        ))}
      </h2>

      {/* Expanding Separator line */}
      <div 
        className={`mx-auto mt-6 h-px w-32 bg-linear-to-r from-transparent via-bronze to-transparent origin-center transition-transform duration-1000 delay-500 ${
          isVisible ? "scale-x-100" : "scale-x-0"
        }`}
      />

      {/* Fading Subtitle */}
      {subtitle && (
        <p className={`mt-6 italic text-muted-foreground max-w-xl mx-auto transition-all duration-1000 delay-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}


function ContactStone({
  label,
  value,
  href,
  tone,
}: {
  label: string;
  value: string;
  href: string;
  tone: "fire" | "ice";
}) {
  const isExternal = href.startsWith("http");
  return (
    <Card className="rounded-none border-bronze/50 bg-card/60 hover:border-bronze transition group">
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={`${label}: ${value}`}
        className="block p-6"
      >
        <p
          className={`font-display text-[0.65rem] tracking-[0.4em] uppercase ${
            tone === "fire" ? "text-fire text-glow-fire" : "text-ice text-glow-ice"
          }`}
        >
          {label}
        </p>
        <p className="mt-3 text-sm break-all text-parchment/90 group-hover:text-parchment">
          {value}
        </p>
      </a>
    </Card>
  );
}

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 filter-none"
          : "opacity-0 translate-y-14 scale-[0.97] blur-[2px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}


function IronGateReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOpen(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={ref} className={`iron-gate-section ${className}`}>
      {children}
      <div
        className={`iron-gate iron-gate-left ${isOpen ? "gate-open" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`iron-gate iron-gate-right ${isOpen ? "gate-open" : ""}`}
        aria-hidden="true"
      />
      <div
        className={`gate-light ${isOpen ? "gate-light-active" : ""}`}
        aria-hidden="true"
      />
    </div>
  );
}

function UnfurlingTimeline({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const activeY = viewportHeight * 0.65; // line draws down to 65% of viewport height

      // Calculate progress based on relative position to activeY
      const progress = Math.min(Math.max((activeY - rect.top) / rect.height, 0), 1);
      el.style.setProperty("--timeline-progress", String(progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ol ref={containerRef} className="mt-20 relative pl-8 space-y-16 unfurling-timeline">
      {/* Background timeline line (gray/dim) */}
      <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-bronze/15 -translate-x-1/2" />
      {/* Animated timeline line (drawn) */}
      <div
        className="absolute left-0 top-2 bottom-2 w-0.5 bg-linear-to-b from-bronze via-fire to-ice origin-top transition-transform duration-150 ease-out -translate-x-1/2"
        style={{ transform: `scaleY(var(--timeline-progress, 0))` }}
      />
      {children}
    </ol>
  );
}

function TimelineItem({ year, title, stack, deeds }: { year: string; title: string; stack: string; deeds: string[] }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -35% 0px", // triggers when element reaches 65% of the viewport from top
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <li ref={itemRef} className={`relative timeline-item ${isRevealed ? "revealed" : ""}`}>
      {/* Diamond border */}
      <span className={`absolute -left-10.25 top-2 w-4 h-4 rotate-45 border border-bronze bg-background timeline-diamond ${isRevealed ? "ignited" : "scale-50 opacity-40"}`} />
      {/* Glowing inner fire dot */}
      <span className={`absolute -left-9.25 top-2.5 w-2 h-2 rotate-45 bg-fire timeline-glow ${isRevealed ? "opacity-100 scale-100 animate-flicker" : "opacity-0 scale-50"}`} />
      
      {/* Written text content */}
      <div className="timeline-content">
        <p className="font-display text-[0.7rem] tracking-[0.4em] uppercase text-bronze">
          {year}
        </p>
        <h3 className="mt-2 font-display text-2xl">{title}</h3>
        <p className="mt-1 text-sm italic text-muted-foreground">
          {stack}
        </p>
        <ul className="mt-5 space-y-2 text-parchment/80">
          {deeds.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="text-fire mt-1.5 shrink-0">✧</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function ParallaxProjectCard({
  image,
  title,
  tone,
  house,
  sigil,
  tech,
  body,
  liveUrl,
  githubUrl,
  reverse,
  highlightTitle,
  highlightText,
}: {
  image: string;
  title: string;
  tone: "fire" | "ice";
  house: string;
  sigil: string;
  tech: string[];
  body: string;
  liveUrl?: string;
  githubUrl?: string;
  reverse: boolean;
  highlightTitle?: string;
  highlightText?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.4);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Distance from center of viewport
      const distanceFromCenter = elementCenter - viewportCenter;

      // Slow scroll parallax translation
      const offset = distanceFromCenter * 0.08;
      setTranslateY(offset);

      // Intensify glow behind the image as it nears the center
      const maxDistance = viewportHeight / 2 + rect.height / 2;
      const normalizedDistance = Math.min(Math.abs(distanceFromCenter) / maxDistance, 1);
      const intensity = 0.35 + (1 - normalizedDistance) * 0.45;
      setGlowIntensity(intensity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`relative py-8 overflow-visible md:overflow-visible ${isRevealed ? "blueprint-active" : ""}`}>
      {/* Blueprint SVG Line (Only shown on Desktop md: and above) */}
      {highlightTitle && (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block overflow-visible"
          preserveAspectRatio="none"
        >
          {reverse ? (
            <path
              d="M 54 34 L 46 -10 L 38 -10"
              fill="none"
              className="blueprint-path"
            />
          ) : (
            <path
              d="M 46 34 L 54 -10 L 62 -10"
              fill="none"
              className="blueprint-path"
            />
          )}
        </svg>
      )}

      {/* Floating Blueprint Badge */}
      {highlightTitle && highlightText && (
        <div
          className={`absolute hidden md:flex flex-col z-30 max-w-52.5 bg-card/95 border border-bronze/50 p-3 rounded-none shadow-lg blueprint-badge pointer-events-none`}
          style={{
            top: "-10%",
            left: reverse ? "18%" : "62%",
            transform: "translateY(0)",
          }}
        >
          <div className="flex items-center gap-1.5 border-b border-border pb-1 mb-1.5">
            <span className="w-1.5 h-1.5 bg-bronze animate-pulse" />
            <span className="font-display text-[0.55rem] tracking-wider text-bronze uppercase">
              {highlightTitle}
            </span>
          </div>
          <p className="font-body text-[0.68rem] italic text-muted-foreground leading-relaxed">
            {highlightText}
          </p>
        </div>
      )}

      <article
        className={`grid md:grid-cols-2 gap-10 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image Container with Parallax & Glow */}
        <div className="relative group overflow-hidden border border-bronze/40">
          <div
            className={`absolute -inset-4 blur-3xl transition-opacity duration-300 pointer-events-none ${
              tone === "fire" ? "bg-fire" : "bg-ice"
            }`}
            style={{ opacity: glowIntensity }}
          />
          <div
            className="w-full aspect-square overflow-hidden relative"
            style={{
              transform: `translateY(${translateY}px) scale(1.08)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <img
              src={image}
              alt={`${title} diorama`}
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-full object-cover grayscale-15 hover:grayscale-0 transition duration-700"
            />
          </div>
        </div>

        {/* Text Container */}
        <div className="z-10 bg-background/40 backdrop-blur-xs p-4 md:p-6 border border-transparent hover:border-bronze/20 transition-all duration-500">
          <p className="font-display text-xs tracking-[0.5em] uppercase text-bronze">
            {house}
          </p>
          <h3
            className={`mt-3 font-display text-3xl md:text-4xl ${
              tone === "fire" ? "text-glow-fire" : "text-glow-ice"
            }`}
          >
            <span className="mr-3">{sigil}</span>
            {title}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="border-bronze/40 text-muted-foreground font-display text-[0.65rem] tracking-[0.2em] uppercase rounded-none"
              >
                {t}
              </Badge>
            ))}
          </div>
          <Separator className="mt-6 w-24 bg-bronze/60" />
          <p className="mt-6 text-lg leading-relaxed text-parchment/80">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {liveUrl && (
              <Button
                variant="outline"
                asChild
                className="border-bronze/50 text-bronze font-display text-[0.65rem] tracking-[0.25em] uppercase hover:bg-bronze/10 rounded-none h-auto py-2.5 px-5"
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  ◈ Enter Keep
                </a>
              </Button>
            )}
            {githubUrl && (
              <Button
                variant="ghost"
                asChild
                className="text-muted-foreground hover:text-parchment font-display text-[0.65rem] tracking-[0.25em] uppercase rounded-none h-auto py-2.5 px-5"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  View Scrolls
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

function WesterosSkillsMap({ active }: { active: boolean }) {
  // Mobile rendering falls back to clean, list-based layout
  const mobileList = (
    <Card className="border-border bg-card/60 backdrop-blur-sm rounded-none">
      <CardContent className="pt-6 space-y-6">
        {SKILLS.map((cat) => (
          <div key={cat.category} className="space-y-2">
            <h4 className="font-display text-[0.7rem] tracking-[0.25em] uppercase text-bronze">
              {cat.category}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 font-body">
              {cat.items.map((s) => (
                <Tooltip key={s.name}>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 text-parchment/90 cursor-default hover:text-bronze transition-colors">
                      <span className="text-fire text-[0.6rem]">◆</span>
                      <span>{s.name}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-card border border-bronze/40 text-parchment font-body z-50 max-w-xs"
                  >
                    {s.hint}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            <Separator className="bg-border/30 last:hidden" />
          </div>
        ))}
      </CardContent>
    </Card>
  );

  if (!active) return null;

  const REGIONS = [
    {
      category: "Languages",
      title: "The North (Winterfell)",
      x: "20%",
      y: "15%",
      tone: "ice" as const,
      items: SKILLS[0].items,
    },
    {
      category: "Frameworks",
      title: "The Riverlands (Riverrun)",
      x: "20%",
      y: "45%",
      tone: "ice" as const,
      items: SKILLS[1].items,
    },
    {
      category: "Databases & Tools",
      title: "Stormlands & East",
      x: "65%",
      y: "58%",
      tone: "fire" as const,
      items: SKILLS[2].items,
    },
    {
      category: "AI / LLM Technologies",
      title: "Dragonstone",
      x: "70%",
      y: "28%",
      tone: "fire" as const,
      items: SKILLS[3].items,
    },
    {
      category: "Core CS Concepts",
      title: "The Reach (Oldtown)",
      x: "32%",
      y: "78%",
      tone: "fire" as const,
      items: SKILLS[4].items,
    },
  ];

  return (
    <div 
      className="w-full overflow-x-auto overflow-y-hidden scrollbar-thin border border-border bg-card/25 backdrop-blur-xs rounded-none relative" 
      key={active ? "map-active" : "map-inactive"}
    >
      {/* Mobile Swipe Guidance Banner */}
      <div className="md:hidden sticky left-0 right-0 top-0 bg-bronze/15 border-b border-bronze/20 text-center py-1.5 text-[0.55rem] tracking-[0.2em] uppercase text-bronze z-30 flex items-center justify-center gap-2 select-none pointer-events-none">
        Swipe ↔ to explore the Map of Westeros
      </div>
      
      <div className="skills-map-container shrink-0 min-w-195 md:w-full h-145 rounded-none">
          {/* Animated cartographic grid and coastlines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 600"
            preserveAspectRatio="none"
          >
            {/* West Coastline */}
            <path
              d="M 120 0 C 140 100, 80 180, 130 250 C 180 320, 90 400, 110 500 C 130 550, 70 580, 100 600"
              fill="none"
              stroke="var(--color-bronze)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              className="map-line"
            />

            {/* The Wall */}
            <line
              x1="5%"
              y1="5%"
              x2="95%"
              y2="5%"
              stroke="var(--color-ice)"
              strokeWidth="3.5"
              strokeDasharray="6 4"
              className="map-line"
            />

            {/* Castle Trade Routes (Dynamic connections) */}
            <path d="M 160 90 L 160 270" fill="none" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 160 270 L 560 168" fill="none" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 160 270 L 256 468" fill="none" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 560 168 L 520 348" fill="none" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 520 348 L 256 468" fill="none" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />
            <path d="M 560 168 L 256 468" fill="none" stroke="var(--border)" strokeWidth="0.8" strokeDasharray="3 3" />

            {/* Map Compasses */}
            <circle cx="90%" cy="85%" r="20" fill="none" stroke="var(--color-bronze)" strokeWidth="0.8" strokeDasharray="2 3" />
            <line x1="90%" y1="80%" x2="90%" y2="90%" stroke="var(--color-bronze)" strokeWidth="0.8" />
            <line x1="87%" y1="85%" x2="93%" y2="85%" stroke="var(--color-bronze)" strokeWidth="0.8" />
          </svg>

          {/* Region Nodes */}
          {REGIONS.map(({ category, title, x, y, tone, items }) => (
            <div
              key={category}
              className={`map-region-node border border-bronze/40 bg-card/90 backdrop-blur-xs p-3.5 rounded-none w-45 shadow-sm ${
                tone === "fire"
                  ? "hover:border-fire hover:shadow-[0_0_15px_var(--color-fire)]"
                  : "hover:border-ice hover:shadow-[0_0_15px_var(--color-ice)]"
              }`}
              style={{ left: x, top: y }}
            >
              <div className="flex items-center gap-2 border-b border-border pb-1.5 mb-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    tone === "fire"
                      ? "bg-fire shadow-[0_0_6px_var(--color-fire)] animate-flicker"
                      : "bg-ice shadow-[0_0_6px_var(--color-ice)] animate-flicker"
                  }`}
                />
                <span className="font-display text-[0.62rem] tracking-wider text-bronze uppercase truncate">
                  {title}
                </span>
              </div>
              <div className="flex flex-col gap-1 font-body text-xs text-parchment/80">
                {items.map((s, idx) => (
                  <Tooltip key={s.name}>
                    <TooltipTrigger asChild>
                      <div
                        className={`flex items-center gap-1.5 cursor-default hover:text-bronze transition-colors skill-pin skill-pin-${
                          idx + 1
                        }`}
                      >
                        <span className="text-[0.55rem] opacity-50">◆</span>
                        <span className="truncate">{s.name}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-card border border-bronze/40 text-parchment font-body z-50 max-w-xs"
                    >
                      {s.hint}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

function BattleFormation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`mt-16 grid md:grid-cols-3 gap-8 w-full battle-field ${
        isActive ? "battle-field-active" : ""
      }`}
    >
      {HOUSES.map((h, i) => {
        let alignClass = "";
        let glowColor = "var(--fire)";

        if (i === 0) {
          alignClass = "house-card-north"; // Jon Snow slides from left (North)
          glowColor = "var(--color-ice)";
        } else if (i === 1) {
          alignClass = "house-card-east";  // Dany slides from right (East)
          glowColor = "var(--color-fire)";
        } else if (i === 2) {
          alignClass = "house-card-top";   // Night King descends from top (Beyond the Wall)
          glowColor = "var(--color-ice)";
        }

        return (
          <div
            key={h.name}
            className={`house-soldier ${alignClass}`}
            style={{ "--card-glow-color": glowColor } as React.CSSProperties}
          >
            <TiltCard tone={h.tone} sigilType={i === 0 ? "stark" : i === 1 ? "targaryen" : "walker"}>
              <Card className="group relative border-border bg-card/50 backdrop-blur-sm hover:border-bronze transition-all duration-500 animate-drift rounded-none h-full preserve-3d">
                <div
                  className={`absolute -top-3 left-8 px-3 py-1 text-[0.6rem] font-display tracking-[0.3em] uppercase ${
                    h.tone === "fire"
                      ? "bg-background text-fire text-glow-fire"
                      : "bg-background text-ice text-glow-ice"
                  }`}
                  style={{ transform: "translateZ(15px)" }}
                >
                  {h.tone === "fire" ? "◈ Fire" : "❄ Ice"}
                </div>
                <CardHeader className="pb-0" style={{ transform: "translateZ(30px)" }}>
                  <CardTitle className="font-display text-2xl tracking-widest">
                    {h.name}
                  </CardTitle>
                  <p className="mt-2 text-sm text-bronze tracking-[0.2em] uppercase font-display">
                    {h.role}
                  </p>
                </CardHeader>
                <CardContent style={{ transform: "translateZ(20px)" }}>
                  <Separator className="my-6 bg-border" />
                  <p className="italic text-muted-foreground leading-relaxed">
                    "{h.quote}"
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </div>
        );
      })}
    </div>
  );
}

function RavenFlightContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flightActive, setFlightActive] = useState(false);
  const [crossIndex, setCrossIndex] = useState(-1); // -1: not started, 0: crossed card 1, 1: crossed card 2, 2: crossed card 3

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlightActive(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // Sync intervals to simulate raven crossing each card at 2.4s flight duration
  useEffect(() => {
    if (!flightActive) return;

    // Card 1 lights up at 0.5s
    const t0 = setTimeout(() => setCrossIndex(0), 450);
    // Card 2 lights up at 1.1s
    const t1 = setTimeout(() => setCrossIndex(1), 1100);
    // Card 3 lights up at 1.7s
    const t2 = setTimeout(() => setCrossIndex(2), 1700);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [flightActive]);

  return (
    <div ref={containerRef} className="relative mt-14 w-full overflow-hidden py-6">
      {/* Animated flying raven silhouette */}
      {flightActive && (
        <div className="animate-raven-flight">
          <svg
            viewBox="0 0 100 100"
            className="w-14 h-14 fill-bronze animate-raven-wings"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Detailed silhouette of a flying raven */}
            <path d="M50 20 C42 35 12 38 2 42 C18 46 32 45 42 38 C38 52 30 78 45 82 C50 82 42 55 52 40 C62 45 76 46 92 42 C82 38 52 35 50 20 Z" />
          </svg>
        </div>
      )}

      {/* Render children/cards passing down the reveal index state */}
      <div className="grid sm:grid-cols-3 gap-4">
        {React.Children.map(children, (child, idx) => {
          const revealed = crossIndex >= idx;
          return (
            <div
              className={`transition-all duration-800 transform ${
                revealed
                  ? "opacity-100 translate-y-0 scale-100 contact-stone-revealed"
                  : "opacity-0 translate-y-6 scale-95 pointer-events-none"
              }`}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TiltCard({
  children,
  tone,
  sigilType,
}: {
  children: React.ReactNode;
  tone: "fire" | "ice";
  sigilType: "stark" | "targaryen" | "walker";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; size: number; duration: number; driftX: number }[]>([]);

  useEffect(() => {
    if (isHovered) {
      const list = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 85 + 7,
        size: Math.random() * 3 + 2.5,
        delay: Math.random() * 1.2,
        duration: Math.random() * 1.5 + 1.2,
        driftX: (Math.random() - 0.5) * 55,
      }));
      setParticles(list);
    } else {
      setParticles([]);
    }
  }, [isHovered]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - viewportHeight / 2) * 0.05;
      setParallaxY(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const normalizedX = x / width - 0.5;
    const normalizedY = y / height - 0.5;

    setRotateX(-normalizedY * 12);
    setRotateY(normalizedX * 12);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const getSigilSVG = () => {
    const strokeColor = tone === "fire" ? "var(--color-fire)" : "var(--color-ice)";
    if (sigilType === "stark") {
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute right-2 bottom-2 w-28 h-28 opacity-10 transition-all duration-300 pointer-events-none group-hover:opacity-25"
          style={{ transform: `translateY(${parallaxY}px) translateZ(25px)` }}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
        >
          <path d="M30 35 L40 20 L50 32 L60 32 L70 20 L80 35 L85 50 Q80 70 50 80 Q20 70 15 50 Z" />
          <path d="M45 50 L40 58 L48 60" />
          <path d="M60 50 L65 58 L57 60" />
          <path d="M48 70 Q50 74 52 70" />
        </svg>
      );
    }
    if (sigilType === "targaryen") {
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute right-2 bottom-2 w-28 h-28 opacity-10 transition-all duration-300 pointer-events-none group-hover:opacity-25"
          style={{ transform: `translateY(${parallaxY}px) translateZ(25px)` }}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.2"
        >
          <path d="M50 15 C30 25 15 45 15 65 C15 80 35 85 50 85 C65 85 85 80 85 65 C85 45 70 25 50 15 Z" />
          <path d="M30 45 C35 50 40 50 50 45 C60 50 65 50 70 45" />
          <path d="M50 45 L50 85" strokeDasharray="2 3" />
          <path d="M25 60 C35 65 65 65 75 60" />
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 100 100"
        className="absolute right-2 bottom-2 w-28 h-28 opacity-10 transition-all duration-300 pointer-events-none group-hover:opacity-25"
        style={{ transform: `translateY(${parallaxY}px) translateZ(25px)` }}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.2"
      >
        <path d="M50 50 A 10 10 0 1 0 60 50 A 20 20 0 1 0 50 70 A 30 30 0 1 0 20 50 A 40 40 0 1 0 50 90" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="4" fill={strokeColor} />
      </svg>
    );
  };

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative w-full h-full group preserve-3d" style={{ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`, transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" }}>
      {children}
      {getSigilSVG()}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`sparkle-particle ${tone === "fire" ? "sparkle-fire" : "sparkle-ice"}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            "--drift-x": `${p.driftX}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

function ScrollOfProphecies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const start = rect.top + window.scrollY;
      const totalScroll = sectionHeight - viewportHeight;
      const currentScroll = window.scrollY - start;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const OATHS = [
    {
      kicker: "The First Oath",
      text: "A developer who does not test is like a ranger without a sword. The code must hold against the winter winds of production.",
    },
    {
      kicker: "The Second Oath",
      text: "Simplicity is the shield of the builder. Complex structures crumble like Harrenhal; write code that stands the test of ages.",
    },
    {
      kicker: "The Third Oath",
      text: "The web must load swift as a shadowcat. A slow keep is easily besieged, and users will flee to other realms.",
    },
    {
      kicker: "The Fourth Oath",
      text: "Tech debt is a Lannister debt; it always collects interest in blood. Pay your code debts early, lest your keep collapse.",
    },
  ];

  const unrollProgress = Math.min(scrollProgress * 6.6, 1);
  const readingProgress = scrollProgress >= 0.15 ? (scrollProgress - 0.15) / 0.85 : 0;
  const activeIndex = scrollProgress >= 0.15 ? Math.min(Math.floor(readingProgress * OATHS.length), OATHS.length - 1) : -1;

  return (
    <section id="prophecies" ref={containerRef} className="relative h-[300vh] bg-background border-t border-b border-border/10">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_40%,#020617_90%) pointer-events-none" />
        <div className="relative flex flex-col items-center justify-center w-full max-w-xl px-6 h-120">
          {/* Top Wooden Rod */}
          <div
            className="absolute z-30 w-[95%] sm:w-125 h-6 rounded-full scroll-rod flex items-center justify-between px-3"
            style={{
              transform: `translateY(${-150 * unrollProgress}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="w-3 h-8 rounded-sm scroll-rod-cap -ml-4" />
            <div className="w-3 h-8 rounded-sm scroll-rod-cap -mr-4" />
          </div>

          {/* Parchment Sheet Body */}
          <div
            className="absolute z-20 w-[90%] sm:w-120 parchment-sheet overflow-hidden flex flex-col items-center justify-center"
            style={{
              height: `${300 * unrollProgress}px`,
              top: `calc(50% - ${150 * unrollProgress}px)`,
              transition: "height 0.1s ease-out, top 0.1s ease-out",
            }}
          >
            <div className="absolute inset-0 opacity-[0.03] bg-contain bg-center bg-no-repeat pointer-events-none flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-64 h-64 fill-stone-900">
                <path d="M50 10 L60 35 L85 35 L65 50 L75 75 L50 60 L25 75 L35 50 L15 35 L40 35 Z" />
              </svg>
            </div>
            <div className="relative w-full h-full px-8 py-6 select-none">
              {OATHS.map((oath, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`prophecy-text-line text-center px-4 ${isActive ? "active" : ""}`}
                  >
                    <p className="font-display text-[0.62rem] tracking-[0.3em] uppercase text-stone-600 mb-3">
                      ◈ {oath.kicker} ◈
                    </p>
                    <p className="font-body italic text-sm sm:text-base leading-relaxed text-stone-800 font-medium">
                      "{oath.text}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Wooden Rod */}
          <div
            className="absolute z-30 w-[95%] sm:w-125 h-6 rounded-full scroll-rod flex items-center justify-between px-3"
            style={{
              transform: `translateY(${150 * unrollProgress}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="w-3 h-8 rounded-sm scroll-rod-cap -ml-4" />
            <div className="w-3 h-8 rounded-sm scroll-rod-cap -mr-4" />
          </div>
        </div>
        <div
          className={`absolute bottom-8 font-display text-[0.6rem] tracking-[0.4em] uppercase text-muted-foreground transition-opacity duration-500 ${
            scrollProgress > 0.9 ? "opacity-0" : "opacity-75 animate-flicker"
          }`}
        >
          Scroll down to unroll the prophecy
        </div>
      </div>
    </section>
  );
}

function RavenInboxMock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center items-center h-65 relative mb-4 mt-8 select-none">
      {/* Outer Envelope Wrapper */}
      <div className={`relative w-70 h-25 border border-bronze/30 bg-card/40 backdrop-blur-sm rounded-sm`}>
        
        {/* Envelope back flap details */}
        <div className="absolute inset-0 bg-linear-to-b from-stone-900/40 to-stone-950/20 pointer-events-none" />

        {/* Flying Raven landing on seal */}
        <div className={`absolute -top-12 left-1/2 -translate-x-1/2 z-40 opacity-0 pointer-events-none ${isActive ? "inbox-raven" : ""}`}>
          <svg viewBox="0 0 100 100" className="w-12 h-12 fill-bronze animate-raven-wings">
            <path d="M50 20 C42 35 12 38 2 42 C18 46 32 45 42 38 C38 52 30 78 45 82 C50 82 42 55 52 40 C62 45 76 46 92 42 C82 38 52 35 50 20 Z" />
          </svg>
        </div>

        {/* Scroll Letter sliding out */}
        <div 
          className={`absolute left-1/2 z-10 w-62.5 bg-[#ecdcb9] border border-stone-850 px-4 py-3 rounded-xs shadow-md overflow-hidden flex flex-col justify-center items-center pointer-events-none opacity-0 ${
            isActive ? "inbox-letter" : ""
          }`}
          style={{ transform: "translate(-50%, -40px)" }}
        >
          {/* Scribe message */}
          <div className={`text-center ${isActive ? "inbox-text-active" : "opacity-0"}`}>
            <p className="font-display text-[0.55rem] tracking-[0.2em] uppercase text-stone-600 mb-1">
              ◈ Scribe Notification ◈
            </p>
            <p className="font-body italic text-[0.72rem] leading-relaxed text-stone-800 font-semibold px-1">
              "A raven has landed from the Citadel. Select a scroll below to establish contact with the Maester."
            </p>
          </div>
        </div>

        {/* Envelope Front triangular flap */}
        <div 
          className="absolute inset-x-0 bottom-0 top-0 bg-linear-to-t from-stone-900/30 to-stone-900/10 border-t border-bronze/10 pointer-events-none" 
          style={{ clipPath: "polygon(0 0, 50% 65%, 100% 0, 100% 100%, 0 100%)" }}
        />

        {/* Split Red Wax Seals */}
        {/* Left half */}
        <div 
          className={`absolute left-1/2 top-8.75 -translate-x-full -translate-y-1/2 z-30 w-5 h-10 bg-red-800 border border-red-950 rounded-l-full flex items-center justify-end pr-0.5 shadow-md ${
            isActive ? "inbox-seal-left" : ""
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-650" />
        </div>
        {/* Right half */}
        <div 
          className={`absolute left-1/2 top-8.75 z-30 w-5 h-10 bg-red-800 border border-red-950 rounded-r-full flex items-center justify-start pl-0.5 shadow-md ${
            isActive ? "inbox-seal-right" : ""
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-650" />
        </div>

      </div>
    </div>
  );
}

function ForgeOfThrone() {
  return <InteractiveBannerWeaver />;
}

function SwordSVG({ color, glow }: { color: string; glow?: string }) {
  return (
    <svg
      viewBox="0 0 40 120"
      className="w-10 h-28"
      style={{ filter: glow ? `drop-shadow(0 0 10px ${glow})` : "none" }}
    >
      <path d="M20 10 L23 20 L22 95 L18 95 L17 20 Z" fill={color} stroke="none" />
      <line x1="20" y1="18" x2="20" y2="92" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />
      <path d="M10 95 L30 95 L30 99 L10 99 Z" fill="var(--color-bronze)" />
      <path d="M18 99 L22 99 L22 112 L18 112 Z" fill="#2b1a11" />
      <circle cx="20" cy="115" r="3.5" fill="var(--color-bronze)" />
    </svg>
  );
}


function ThreeEyedRavenProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Identify active section based on bounding rect offsets
      const sectionIds = ["top", "sigils", "prophecies", "forge", "projects", "experience", "contact"];
      let current = "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "top", label: "Top" },
    { id: "sigils", label: "Sigils" },
    { id: "prophecies", label: "Oaths" },
    { id: "forge", label: "Forge" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "History" },
    { id: "contact", label: "Raven" },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center select-none pointer-events-none">
      <div className="relative w-12 h-64 flex justify-center items-center">
        {/* Vertical trunk line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-bronze/20 rounded-full" />

        {/* Animated blood-red drawn line */}
        <div
          className="absolute top-0 w-0.5 bg-blood origin-top transition-transform duration-75"
          style={{ height: "100%", transform: `scaleY(${scrollProgress})` }}
        />

        {/* Floating Glowing Eye (Three-Eyed Raven) */}
        <div
          className="absolute w-4 h-4 rounded-full bg-blood shadow-[0_0_12px_var(--color-blood)] border border-parchment flex items-center justify-center transition-all duration-75"
          style={{ top: `${scrollProgress * 100}%`, transform: "translateY(-50%)" }}
        >
          {/* Inner eye pupil */}
          <div className="w-1.5 h-1.5 rounded-full bg-parchment animate-pulse" />
        </div>

        {/* Section Leaf Node Markers & Labels */}
        {sections.map((sec, idx) => {
          const positionPercent = (idx / (sections.length - 1)) * 100;
          const isActive = activeSection === sec.id;

          return (
            <div
              key={sec.id}
              className="absolute left-1/2 -translate-x-1/2 flex items-center group pointer-events-auto cursor-pointer"
              style={{ top: `${positionPercent}%`, transform: "translate(-50%, -50%)" }}
              onClick={() => {
                const el = document.getElementById(sec.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {/* Weirwood Leaf (red when active, bronze-dim when inactive) */}
              <div
                className={`w-3.5 h-3.5 rotate-45 border transition-all duration-500 flex items-center justify-center ${
                  isActive
                    ? "bg-blood border-blood shadow-[0_0_10px_var(--color-blood)] scale-110"
                    : "bg-background border-bronze/40 scale-90 hover:border-bronze"
                }`}
              >
                {/* Midrib detail */}
                <div className="w-px h-2.5 bg-parchment/30 -rotate-45" />
              </div>

              {/* Text Label (shown on hover, or always highlighted when active) */}
              <span
                className={`absolute right-6 font-display text-[0.55rem] tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-blood opacity-100 translate-x-0"
                    : "text-muted-foreground opacity-0 translate-x-2 group-hover:opacity-85 group-hover:translate-x-0"
                }`}
              >
                {sec.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}






function ColdOpen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"play" | "out" | "gone">("play");
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase("out"), 4600);
    const t2 = window.setTimeout(() => {
      setPhase("gone");
      onDone();
    }, 5400);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        setPhase("gone");
        onDone();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDone]);
  if (phase === "gone") return null;
  return (
    <div
      className={`fixed inset-0 z-100 bg-obsidian overflow-hidden transition-opacity duration-700 ${
        phase === "out" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Intro sequence"
    >
      {/* Thunder flash */}
      <div className="absolute inset-0 bg-parchment animate-co-thunder pointer-events-none mix-blend-screen" />
      {/* Radial vignette + smoke */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#000_85%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.35 0.09 40 / 0.55), transparent 45%), radial-gradient(circle at 80% 70%, oklch(0.28 0.12 230 / 0.5), transparent 50%)",
        }}
      />
      {/* Sigil */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative animate-co-sigil">
          <svg
            viewBox="0 0 300 300"
            className="w-[52vmin] h-[52vmin]"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="co-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.82 0.18 55)" stopOpacity="0.9" />
                <stop offset="60%" stopColor="oklch(0.55 0.2 25)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="150" cy="150" r="145" fill="url(#co-glow)" />
            <circle cx="150" cy="150" r="130" fill="none" stroke="oklch(0.72 0.14 60)" strokeWidth="1" />
            <circle cx="150" cy="150" r="110" fill="none" stroke="oklch(0.72 0.14 60)" strokeWidth="0.6" strokeDasharray="2 5" />
            {/* Stylised direwolf head */}
            <g fill="none" stroke="oklch(0.88 0.06 75)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
              <path d="M100 105 L120 75 L140 100 L160 100 L180 75 L200 105 L210 145 Q200 195 150 215 Q100 195 90 145 Z" />
              <path d="M130 140 L120 155 L135 158" />
              <path d="M170 140 L180 155 L165 158" />
              <path d="M145 178 Q150 185 155 178" />
              <path d="M138 195 L150 205 L162 195" />
            </g>
          </svg>
          {/* Shockwave ring */}
          <div className="absolute inset-0 rounded-full border border-fire/70 animate-co-shock" />
          <div
            className="absolute inset-0 rounded-full border border-ice/60 animate-co-shock"
            style={{ animationDelay: "2.75s" }}
          />
        </div>
      </div>
      {/* Sword slash */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.75 bg-linear-to-r from-transparent via-parchment to-transparent animate-co-slash pointer-events-none mix-blend-screen" />
      <div
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3.5 bg-linear-to-r from-transparent via-fire/60 to-transparent animate-co-slash blur-md pointer-events-none"
        style={{ animationDelay: "2.42s" }}
      />
      {/* Split gates (reveal the app underneath) */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-obsidian border-b border-bronze/40 animate-co-split-top pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-obsidian border-t border-bronze/40 animate-co-split-bottom pointer-events-none" />
      {/* Typographic reveal — sits above the gates */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <p
          className="font-display text-[0.6rem] md:text-xs tracking-[0.7em] uppercase text-bronze animate-co-word"
          style={{ animationDelay: "1.2s" }}
        >
          ✦ House Chauhan Presents ✦
        </p>
        <div
          className="mt-6 h-px w-40 bg-linear-to-r from-transparent via-bronze to-transparent origin-center animate-co-line"
          style={{ transform: "scaleX(0)" }}
        />
        <h1
          className="mt-8 font-display font-black text-3xl md:text-6xl lg:text-7xl text-parchment animate-co-word"
          style={{ animationDelay: "1.6s", textShadow: "0 0 30px oklch(0.62 0.22 30 / 0.6)" }}
        >
          THE REALM AWAITS
        </h1>
        <p
          className="mt-6 font-body italic text-sm md:text-lg text-parchment/70 animate-co-word"
          style={{ animationDelay: "2s" }}
        >
          Winter is coding.
        </p>
      </div>
      {/* Skip */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={() => {
          setPhase("gone");
          onDone();
        }}
        className="absolute bottom-8 right-8 z-20 font-display text-[0.65rem] tracking-[0.4em] uppercase text-bronze/80 hover:text-parchment border border-bronze/40 hover:border-bronze px-4 py-2 transition-colors cursor-pointer"
      >
        Skip Intro →
      </button>
    </div>
  );
}
