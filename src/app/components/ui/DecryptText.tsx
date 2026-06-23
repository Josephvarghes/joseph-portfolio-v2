import { useState, useEffect, useRef } from "react";

interface DecryptTextProps {
  text: string;
  className?: string;
  speed?: number; // millisecond intervals
  scrambleDuration?: number; // higher = scrambles longer before resolving
}

const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?-=[]\\;',./";

export default function DecryptText({
  text,
  className = "",
  speed = 25,
  scrambleDuration = 3
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) {
      let iterations = 0;
      
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split("")
            .map((char, index) => {
              // Once iteration moves past this index, show original char
              if (index < iterations) {
                return text[index];
              }
              // If it's a space, keep it a space
              if (text[index] === " ") {
                return " ";
              }
              // Otherwise, show a random matrix character
              return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
            })
            .join("")
        );

        if (iterations >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        
        // Speed control for resolving characters
        iterations += 1 / scrambleDuration;
      }, speed);
    } else {
      // Instantly restore original text on mouse leave
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text, speed, scrambleDuration]);

  return (
    <span
      className={`cursor-default select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
