import { useEffect, useState } from "react";
import { motion } from "motion/react";

const WORDS = [
  "INTELLIGENCE",
  "SCALABILITY",
  "ARCHITECTURE",
  "AUTOMATION",
  "JOSEPH VARGHESE"
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Animate the progress counter
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 30; // update every 30ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400); // Small pause at 100% for impact
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Synchronize word index with progress
  useEffect(() => {
    // Map progress (0-100) to WORDS length (0-4)
    const idx = Math.min(
      Math.floor((progress / 100) * WORDS.length),
      WORDS.length - 1
    );
    setWordIndex(idx);
  }, [progress]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 bg-background text-foreground select-none overflow-hidden border-b-4 border-foreground"
    >
      {/* Top section: Brand / Logo info */}
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground shrink-0">
            <rect x="2" y="2" width="32" height="32" rx="4" fill="currentColor" />
            <rect x="8" y="10" width="6" height="6" fill="var(--background)" />
            <rect x="22" y="10" width="6" height="6" fill="var(--background)" />
            <path d="M8 22H28V26H8V22Z" fill="var(--background)" />
          </svg>
          <span className="font-extrabold text-xs uppercase tracking-widest text-foreground">
            J.Varghese / Portfolio
          </span>
        </div>
        <span className="font-black text-xs uppercase tracking-widest text-foreground/50">
          SYS_INIT_2026
        </span>
      </div>

      {/* Middle section: Animated words with glitch/decrypt feel */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-24 sm:h-32 flex items-center justify-center overflow-hidden">
          <motion.h2
            key={wordIndex}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight"
          >
            {WORDS[wordIndex]}
          </motion.h2>
        </div>

        {/* Progress bar container (Retro Neo-Brutalist) */}
        <div className="w-full max-w-[280px] sm:max-w-md h-6 bg-card border-2 border-foreground rounded-lg overflow-hidden shadow-brutalist-sm mt-8 relative">
          <motion.div 
            className="h-full bg-primary" 
            style={{ width: `${progress}%` }} 
          />
          <div className="absolute inset-0 flex items-center justify-center mix-blend-difference font-black text-xs text-white">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>

      {/* Bottom section: Loading counter and system details */}
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-foreground/60">
            Current Module
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-foreground">
            {progress < 100 ? `Loading v2.0.${Math.floor(progress)}...` : "System Active"}
          </span>
        </div>

        <div className="text-right">
          <span className="text-4xl sm:text-6xl font-black tracking-tighter">
            {Math.floor(progress).toString().padStart(3, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
