import { useRef } from "react";

const keySoundFiles = [
  "/sounds/keyboard/1.mp3",
  "/sounds/keyboard/2.mp3",
  "/sounds/keyboard/3.mp3",
  "/sounds/keyboard/4.mp3",
];

export const useKeyboardSound = () => {
  // Preload audio elements once
  const audioRefs = useRef<HTMLAudioElement[]>(
    keySoundFiles.map((src) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      return audio;
    })
  );

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * audioRefs.current.length);
    const audio = audioRefs.current[randomIndex];

    try {
      audio.currentTime = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("🔇 Audio playback blocked by browser:", err);
        });
      }
    } catch (error) {
      console.error("❌ Failed to play keyboard sound:", error);
    }
  };

  return { playRandomSound };
};
