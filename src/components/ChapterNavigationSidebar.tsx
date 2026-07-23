import React, { useState, useEffect } from "react";

interface Chapter {
  id: string;
  symbol: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { id: "top", symbol: "◆", title: "The Throne" },
  { id: "sigils", symbol: "I", title: "Sigils of the Craft" },
  { id: "summary-banners", symbol: "II", title: "Domain Banners" },
  { id: "prophecies", symbol: "III", title: "Scroll of Prophecies" },
  { id: "forge", symbol: "IV", title: "Forge of Banners" },
  { id: "projects", symbol: "V", title: "Projects of the Realm" },
  { id: "experience", symbol: "VI", title: "Experience" },
  { id: "contact", symbol: "VII", title: "Contact" },
];

export function ChapterNavigationSidebar() {
  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section is near center of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    CHAPTERS.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Chapter Navigation"
      className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center gap-3 select-none"
    >
      {/* Decorative vertical line connecting dots */}
      <div className="absolute top-2 bottom-2 w-px bg-stone-800/80 -z-10" />

      {CHAPTERS.map((ch) => {
        const isActive = activeId === ch.id;

        return (
          <div key={ch.id} className="relative group flex items-center justify-end">
            {/* Tooltip Label on Hover (Appears to the left) */}
            <div className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50">
              <div className="bg-stone-950/90 border border-amber-900/40 backdrop-blur-md px-2.5 py-1 rounded shadow-xl flex items-center gap-2">
                <span className="font-display text-[0.65rem] tracking-[0.2em] uppercase text-amber-400">
                  {ch.symbol}
                </span>
                <span className="h-2.5 w-px bg-stone-800" />
                <span className="font-display text-[0.65rem] tracking-[0.15em] text-stone-200 uppercase">
                  {ch.title}
                </span>
              </div>
            </div>

            {/* Chapter Marker Button */}
            <button
              type="button"
              onClick={() => scrollToSection(ch.id)}
              aria-label={`Scroll to ${ch.title}`}
              className={`relative flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isActive
                  ? "w-7 h-7 text-amber-400 font-bold scale-110"
                  : "w-6 h-6 text-stone-500 hover:text-amber-200/80 scale-100"
              }`}
            >
              {/* Outer Glow Halo for Active Section */}
              {isActive && (
                <span className="absolute inset-0 rounded-full border border-amber-500/50 bg-amber-500/10 animate-ping opacity-75 pointer-events-none" />
              )}

              {/* Marker Container */}
              <span
                className={`relative z-10 font-display text-[0.7rem] tracking-tighter flex items-center justify-center w-full h-full rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-stone-950 border border-amber-500/80 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                    : "bg-stone-900/60 border border-stone-800 hover:border-stone-700"
                }`}
              >
                {ch.symbol}
              </span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}
