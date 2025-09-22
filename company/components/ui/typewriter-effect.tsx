"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWordObj = words[currentIndex];
    const currentWordText = currentWordObj.text;
    const delay = isDeleting ? 100 : 200; // Slower typing speed
    const pauseDelay = 3000; // Longer pause between words

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        setCurrentWord(currentWordText.substring(0, currentWord.length - 1));
        if (currentWord === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentWord(currentWordText.substring(0, currentWord.length + 1));
        if (currentWord === currentWordText) {
          setIsPaused(true);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentWord, currentIndex, isDeleting, isPaused, words]);

  return (
    <div className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold", className)}>
      <span className="text-white">
        {words.map((word, index) => {
          if (index <= currentIndex) {
            return (
              <span
                key={index}
                className={cn(
                  "mr-4", // Increased spacing between words
                  word.className
                )}
              >
                {index === currentIndex ? currentWord : word.text}
              </span>
            );
          }
          return null;
        })}
        <span
          className={cn(
            "inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse",
            cursorClassName
          )}
        />
      </span>
    </div>
  );
};

