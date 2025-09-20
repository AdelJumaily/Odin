"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleDuration?: number;
  revealDuration?: number;
  delay?: number;
}

export const ScrambleText = ({
  text,
  className,
  scrambleDuration = 2000,
  revealDuration = 3000,
  delay = 0,
}: ScrambleTextProps) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  const scrambleText = (targetText: string) => {
    return targetText
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join("");
  };

  const [displayText, setDisplayText] = useState("");
  const [isScrambling, setIsScrambling] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);

  // Initialize with scrambled text
  useEffect(() => {
    setDisplayText(scrambleText(text));
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScrambling(false);
      setIsRevealing(true);
    }, delay + scrambleDuration);

    return () => clearTimeout(timer);
  }, [delay, scrambleDuration]);

  useEffect(() => {
    if (!isScrambling && !isRevealing) return;

    let interval: NodeJS.Timeout;

    if (isScrambling) {
      interval = setInterval(() => {
        setDisplayText(scrambleText(text));
      }, 50);
    } else if (isRevealing) {
      // Descramble: replace scrambled characters with real ones one by one
      let currentIndex = 0;
      const revealInterval = revealDuration / text.length;
      
      interval = setInterval(() => {
        if (currentIndex < text.length) {
          const currentScrambled = scrambleText(text);
          const revealedPart = text.substring(0, currentIndex + 1);
          const remainingScrambled = currentScrambled.substring(currentIndex + 1);
          setDisplayText(revealedPart + remainingScrambled);
          currentIndex++;
        } else {
          setDisplayText(text);
          clearInterval(interval);
        }
      }, revealInterval);
    }

    return () => clearInterval(interval);
  }, [isScrambling, isRevealing, text, revealDuration]);

  return (
    <span className={cn("font-bold", className)}>
      {displayText}
      {(isScrambling || isRevealing) && <span className="animate-pulse">|</span>}
    </span>
  );
};
