const keySoundFiles = [
  "/sounds/keyboard/1.mp3",
  "/sounds/keyboard/2.mp3",
  "/sounds/keyboard/3.mp3",
  "/sounds/keyboard/4.mp3",
];

export const useKeyboardSound = () => {
  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * keySoundFiles.length);
    const audioSrc = keySoundFiles[randomIndex];

    try {
      const audio = new Audio(audioSrc);
      audio.currentTime = 0;

      // Ensure audio is allowed to play (some browsers require user interaction)
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Audio playback blocked by browser:", err);
        });
      }
    } catch (error) {
      console.error("Failed to play keyboard sound:", error);
    }
  };

  return { playRandomSound };
};
