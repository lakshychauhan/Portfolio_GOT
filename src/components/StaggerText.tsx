import React, { useState, useEffect, useRef } from "react";

export function StaggerText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-wrap ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-out mr-[0.25em] last:mr-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(12px)",
            transitionDelay: `${delay + i * 40}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
