import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu } from "lucide-react";
import heroThrone from "@/assets/hero-throne.jpg";
import projectQuasar from "@/assets/quasar.png";
import projectPortfolio from "@/assets/portfolio.png";
import projectPaperVault from "@/assets/papervault.png";

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
    liveUrl: "https://github.com/lakshychauhan",
    githubUrl: "https://github.com/lakshychauhan",
  },
  {
    name: "PaperVault",
    house: "House Targaryen",
    tech: ["Next.js", "NestJS", "PostgreSQL", "pgvector", "Gemini API"],
    body: "An AI-powered college paper sharing platform featuring a RAG pipeline utilizing pgvector and Gemini embeddings for natural-language search. Designed a 16-model Prisma schema, with real-time Socket.io notifications, Redis-backed rate limiting, and Cloudflare R2 storage.",
    image: projectPaperVault,
    sigil: "🐉",
    tone: "fire" as const,
    liveUrl: "https://github.com/lakshychauhan",
    githubUrl: "https://github.com/lakshychauhan",
  },
  {
    name: "Game of Thrones Developer Portfolio",
    house: "House Stark",
    tech: ["React 19", "TypeScript", "TanStack Router", "Tailwind CSS"],
    body: "A cinematic, GoT-themed developer portfolio built using TanStack Start with file-based routing and React 19. Crafted with custom OKLCH color tokens, Radix UI primitives, dynamic ambient particle effects, and an animated intro sequence.",
    image: projectPortfolio,
    sigil: "❄",
    tone: "ice" as const,
    liveUrl: "https://github.com/lakshychauhan/Portfolio-GOT",
    githubUrl: "https://github.com/lakshychauhan/Portfolio-GOT",
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
  const [activeTab, setActiveTab] = useState("citadel");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("lc_intro_seen")) {
      setIntroDone(true);
      return;
    }
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
    const count = isMobile ? 14 : 26;
    const generated: Mote[] = [];
    for (let n = 0; n < count; n++) {
      const isEmber = n % 2 === 0;
      generated.push({
        id: n,
        isEmber,
        size: 2 + Math.random() * 3,
        left: isEmber ? 55 + Math.random() * 38 : 7 + Math.random() * 38,
        drift: Math.random() * 40 - 20,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 8,
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


  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-background text-foreground">
        {!introDone && <ColdOpen onDone={finishIntro} />}
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
          {/* Motes particle layer */}
          <div className="motes" aria-hidden="true">
            {motes.map((m) => (
              <span
                key={m.id}
                className={`mote ${m.isEmber ? "ember" : "frost"}`}
                style={{
                  width: `${m.size}px`,
                  height: `${m.size}px`,
                  left: `${m.left}%`,
                  "--drift": `${m.drift}px`,
                  animationDuration: `${m.duration}s`,
                  animationDelay: `${m.delay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>

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
        <section className="relative py-16 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeading kicker="The Great Houses" title="Sigils of the Craft" />
            <ScrollReveal>
              <div className="mt-16 grid md:grid-cols-3 gap-8">
                {HOUSES.map((h, i) => (
                  <Card
                    key={h.name}
                    className="group relative border-border bg-card/50 backdrop-blur-sm hover:border-bronze transition-all duration-500 animate-drift rounded-none"
                    style={{ animationDelay: `${i * 0.7}s` }}
                  >
                    <div
                      className={`absolute -top-3 left-8 px-3 py-1 text-[0.6rem] font-display tracking-[0.3em] uppercase ${
                        h.tone === "fire"
                          ? "bg-background text-fire text-glow-fire"
                          : "bg-background text-ice text-glow-ice"
                      }`}
                    >
                      {h.tone === "fire" ? "◈ Fire" : "❄ Ice"}
                    </div>
                    <CardHeader className="pb-0">
                      <CardTitle className="font-display text-2xl tracking-widest">
                        {h.name}
                      </CardTitle>
                      <p className="mt-2 text-sm text-bronze tracking-[0.2em] uppercase font-display">
                        {h.role}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Separator className="my-6 bg-border" />
                      <p className="italic text-muted-foreground leading-relaxed">
                        "{h.quote}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* PROJECTS */}
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
                  <article
                    className={`grid md:grid-cols-2 gap-10 items-center ${
                      i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative group">
                      <div
                        className={`absolute -inset-2 blur-2xl opacity-40 transition group-hover:opacity-70 ${
                          p.tone === "fire" ? "bg-fire" : "bg-ice"
                        }`}
                      />
                      <img
                        src={p.image}
                        alt={`${p.name} diorama`}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="relative w-full aspect-square object-cover border border-bronze/40 grayscale-15 hover:grayscale-0 transition duration-700"
                      />
                    </div>
                    <div>
                      <p className="font-display text-xs tracking-[0.5em] uppercase text-bronze">
                        {p.house}
                      </p>
                      <h3
                        className={`mt-3 font-display text-3xl md:text-4xl ${
                          p.tone === "fire" ? "text-glow-fire" : "text-glow-ice"
                        }`}
                      >
                        <span className="mr-3">{p.sigil}</span>
                        {p.name}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tech.map((t) => (
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
                        {p.body}
                      </p>
                      <div className="mt-8 flex flex-wrap gap-4">
                        {p.liveUrl && (
                          <Button
                            variant="outline"
                            asChild
                            className="border-bronze/50 text-bronze font-display text-[0.65rem] tracking-[0.25em] uppercase hover:bg-bronze/10 rounded-none h-auto py-2.5 px-5"
                          >
                            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer">
                              ◈ Enter Keep
                            </a>
                          </Button>
                        )}
                        {p.githubUrl && (
                          <Button
                            variant="ghost"
                            asChild
                            className="text-muted-foreground hover:text-parchment font-display text-[0.65rem] tracking-[0.25em] uppercase rounded-none h-auto py-2.5 px-5"
                          >
                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                              View Scrolls
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
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
            <ScrollReveal>
              <ol className="mt-20 relative border-l border-bronze/40 pl-8 space-y-16">
                {CHRONICLES.map((c) => (
                  <li key={c.title} className="relative">
                    <span className="absolute -left-10.25 top-2 w-4 h-4 rotate-45 border border-bronze bg-background" />
                    <span className="absolute -left-9.25 top-2.5 w-2 h-2 rotate-45 bg-fire animate-flicker" />
                    <p className="font-display text-[0.7rem] tracking-[0.4em] uppercase text-bronze">
                      {c.year}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{c.title}</h3>
                    <p className="mt-1 text-sm italic text-muted-foreground">
                      {c.stack}
                    </p>
                    <ul className="mt-5 space-y-2 text-parchment/80">
                      {c.deeds.map((d) => (
                        <li key={d} className="flex gap-3">
                          <span className="text-fire mt-1.5 shrink-0">✧</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </ScrollReveal>

            {/* Education, Skills & Extracurriculars — Tabs */}
            <ScrollReveal>
              <div className="mt-24">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" id="skills">
                  <TabsList className="w-full bg-card/60 border border-border rounded-none h-auto p-1 overflow-x-auto">
                    <TabsTrigger
                      value="citadel"
                      className="font-display text-[0.55rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase rounded-none data-[state=active]:bg-bronze/20 data-[state=active]:text-bronze whitespace-nowrap"
                    >
                      The Citadel
                    </TabsTrigger>
                    <TabsTrigger
                      value="arts"
                      className="font-display text-[0.55rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase rounded-none data-[state=active]:bg-bronze/20 data-[state=active]:text-bronze whitespace-nowrap"
                    >
                      Sworn Arts
                    </TabsTrigger>
                    <TabsTrigger
                      value="deeds"
                      className="font-display text-[0.55rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase rounded-none data-[state=active]:bg-bronze/20 data-[state=active]:text-bronze whitespace-nowrap"
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
                    <Card className="border-border bg-card/60 backdrop-blur-sm rounded-none">
                      <CardContent className="pt-6 space-y-6">
                        {SKILLS.map((cat) => (
                          <div key={cat.category} className="space-y-2">
                            <h4 className="font-display text-[0.7rem] tracking-[0.25em] uppercase text-bronze">
                              {cat.category}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 font-body">
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
                                    className="bg-card border border-bronze/40 text-parchment font-body"
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

        {/* CONTACT */}
        <section id="contact" className="relative py-16 md:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading kicker="Final Rite" title="Send a Raven" />
            <p className="mt-8 font-body italic text-lg text-muted-foreground max-w-xl mx-auto">
              "A lord who lets his devs be idle is no lord at all. Summon me for
              quests of code, commissions, or council."
            </p>

            <ScrollReveal>
              <div className="mt-14 grid sm:grid-cols-3 gap-4">
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
              </div>
            </ScrollReveal>


          </div>
        </section>

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
  return (
    <div className="text-center">
      <p className="font-display text-[0.7rem] tracking-[0.6em] uppercase text-bronze">
        ✦ {kicker} ✦
      </p>
      <h2 className="mt-5 font-display font-bold text-4xl md:text-5xl text-parchment">
        {title}
      </h2>
      <Separator className="mx-auto mt-6 w-32 bg-linear-to-r from-transparent via-bronze to-transparent" />
      {subtitle && (
        <p className="mt-6 italic text-muted-foreground max-w-xl mx-auto">
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
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
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
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
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
