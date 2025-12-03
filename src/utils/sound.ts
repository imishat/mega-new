/* eslint-disable @typescript-eslint/no-explicit-any */
// soundUtils.ts
export const playingTune = (audio: HTMLAudioElement): Promise<string> => {
    return new Promise((resolve, reject) => {
      audio.currentTime = 0; // Reset to start in case it's been played before
  
      audio.play()
        .then(() => {
          resolve("🔊 Sound played successfully");
        })
        .catch(() => {
          console.warn("⚠️ Autoplay blocked, waiting for interaction...");
  
          const enableAudio = () => {
            audio.currentTime = 0;
            audio.play()
              .then(() => resolve("🔓 Sound unlocked after user interaction"))
              .catch(reject);
  
            // Clean up listeners after attempting to play
            window.removeEventListener("click", enableAudio);
            window.removeEventListener("keydown", enableAudio);
          };
  
          // Add listeners to wait for user interaction
          window.addEventListener("click", enableAudio, { once: true });
          window.addEventListener("keydown", enableAudio, { once: true });
  
          reject("Permission to play sound is blocked. Waiting for user interaction.");
        });
    });
  };
  
  export const playNotificationSound = async() => {
            try {
                const audio = new Audio('information.mp3');
                await audio.play()
            } catch (error:any) {
                console.error('Failed to play notification',error.message)
            }
              };