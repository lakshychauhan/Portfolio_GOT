import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * AmbientSoundToggle — fixed bottom-left "SOUND" button
 * that plays the GOT ambient audio from public/audio/got-ambient.mp3
 */

export function AmbientSoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number>(0);

  // Create audio element on mount
  useEffect(() => {
    const audio = new Audio("/audio/got-ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  // Smooth fade in/out
  const fadeAudio = useCallback(
    (targetVol: number, duration: number = 1500) => {
      const audio = audioRef.current;
      if (!audio) return;

      const startVol = audio.volume;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        audio.volume = startVol + (targetVol - startVol) * eased;

        if (progress < 1) {
          fadeRef.current = requestAnimationFrame(step);
        }
      };

      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = requestAnimationFrame(step);
    },
    []
  );

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      fadeAudio(0, 800);
      setTimeout(() => audio.pause(), 850);
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          fadeAudio(volume, 1500);
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked — silent fail
        });
    }
  }, [isPlaying, volume, fadeAudio]);

  // Update volume when slider changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.volume = volume;
    }
  }, [volume, isPlaying]);

  return (
    <>
      <div
        className="fixed bottom-6 left-6 z-60 flex items-center gap-3 select-none"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Main toggle button */}
        <button
          type="button"
          onClick={toggleSound}
          className="group relative flex items-center gap-2.5 cursor-pointer bg-stone-950/70 backdrop-blur-md border border-stone-800/60 rounded-full px-4 py-2.5 hover:border-amber-700/50 transition-all duration-300"
          aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
          style={{
            boxShadow: isPlaying
              ? "0 0 20px oklch(0.78 0.16 55 / 0.15), inset 0 0 12px oklch(0.78 0.16 55 / 0.05)"
              : "none",
          }}
        >
          {/* Sound wave bars */}
          <div className="flex items-end gap-[2.5px] h-3.5 w-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-[2.5px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isPlaying
                    ? "oklch(0.78 0.16 55)"
                    : "oklch(0.55 0.03 75)",
                  height: isPlaying ? `${[40, 85, 55][i]}%` : "30%",
                  animation: isPlaying
                    ? `ast-bar-dance ${[0.8, 0.6, 0.9][i]}s ease-in-out ${[0, 0.15, 0.05][i]}s infinite alternate`
                    : "none",
                  boxShadow: isPlaying
                    ? "0 0 6px oklch(0.78 0.16 55 / 0.5)"
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Label */}
          <span
            className="font-display text-[0.6rem] tracking-[0.35em] uppercase transition-colors duration-300"
            style={{
              color: isPlaying
                ? "oklch(0.78 0.16 55)"
                : "oklch(0.55 0.03 75)",
              textShadow: isPlaying
                ? "0 0 10px oklch(0.78 0.16 55 / 0.4)"
                : "none",
            }}
          >
            {isPlaying ? "SOUND ON" : "· · ·  SOUND"}
          </span>

          {/* Subtle pulse ring when playing */}
          {isPlaying && (
            <span
              className="absolute -inset-1 rounded-full pointer-events-none"
              style={{
                border: "1px solid oklch(0.78 0.16 55 / 0.2)",
                animation: "ast-pulse-ring 2.5s ease-in-out infinite",
              }}
            />
          )}
        </button>

        {/* Volume slider — appears on hover */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{
            width: showVolume && isPlaying ? "80px" : "0px",
            opacity: showVolume && isPlaying ? 1 : 0,
          }}
        >
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="ast-volume-slider w-full h-1 appearance-none rounded-full cursor-pointer"
            style={{
              background: `linear-gradient(to right, oklch(0.78 0.16 55) ${volume * 100}%, oklch(0.3 0.02 75) ${volume * 100}%)`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ast-bar-dance {
          0% { height: 25%; }
          50% { height: 90%; }
          100% { height: 40%; }
        }
        @keyframes ast-pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0; }
        }
        .ast-volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: oklch(0.78 0.16 55);
          box-shadow: 0 0 6px oklch(0.78 0.16 55 / 0.6);
          cursor: pointer;
          border: none;
        }
        .ast-volume-slider::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: oklch(0.78 0.16 55);
          box-shadow: 0 0 6px oklch(0.78 0.16 55 / 0.6);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}
