import { useEffect, useRef, useState } from "react";
import "./MoonBuggyCharacter.css";

function MoonBuggyCharacter() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const utteranceRef = useRef(null);

  const narration =
    "Hey there, Junior Detective! I'm the Lunar Roving Vehicle, but you can call me Moon Buggy! I was designed to help astronauts explore much farther across the Moon than they could walk. I first travelled across the lunar surface during Apollo 15 in 1971. Astronauts David Scott and James Irwin drove me around the Moon. I was also used during Apollo 16 and Apollo 17. I carried astronauts, tools and scientific equipment across the lunar landscape. I did not need petrol because I used batteries for power. After the missions, I was left on the Moon. Even today, my wheels are still resting near the Apollo landing sites. What an incredible adventure! Keep investigating, Junior Detective!";

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support speech narration.");
      return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(narration);

    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.pitch = 1.15;
    utterance.volume = isMuted ? 0 : 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const toggleMute = () => {
    setIsMuted((previous) => {
      const next = !previous;

      if (utteranceRef.current) {
        utteranceRef.current.volume = next ? 0 : 1;
      }

      return next;
    });
  };

  useEffect(() => {
    return () => window.speechSynthesis?.cancel();
  }, []);

  return (
    <section className="moonbuggy-story">
      <div className="moonbuggy-intro">
        <span className="moonbuggy-label">
          MEET YOUR LUNAR EXPLORER
        </span>

        <h2>Hey, I'm Moon Buggy! 🌙</h2>

        <p>
          I helped astronauts explore the Moon.
          Ready to discover my incredible journey?
        </p>
      </div>

      <div className="moonbuggy-character-area">
        <div
          className={`moonbuggy-character ${
            isSpeaking && !isPaused ? "moonbuggy-talking" : ""
          }`}
        >
          <div className="moonbuggy-antenna" />

          <div className="moonbuggy-camera">
            <div className="moonbuggy-camera-lens" />
          </div>

          <div className="moonbuggy-head">
            <div className="moonbuggy-eye">
              <span />
            </div>

            <div className="moonbuggy-eye">
              <span />
            </div>

            <div className="moonbuggy-mouth" />
          </div>

          <div className="moonbuggy-panel">
            <div className="moonbuggy-panel-grid" />
          </div>

          <div className="moonbuggy-body">
            <div className="moonbuggy-body-light" />
            <span>MOON BUGGY</span>
          </div>

          <div className="moonbuggy-frame" />

          <div className="moonbuggy-wheels">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="moonbuggy-wheel" key={index}>
                <div className="moonbuggy-wheel-center" />
              </div>
            ))}
          </div>
        </div>

        <div className="moonbuggy-shadow" />

        <div className="moonbuggy-speech">
          {isSpeaking && !isPaused
            ? "Wheee! Let's explore the Moon! 🚀"
            : isPaused
            ? "Taking a little lunar break! 🌙"
            : "Ready for a Moon adventure? 👋"}
        </div>
      </div>

      <div className="moonbuggy-controls">
        <button
          className="moonbuggy-play"
          onClick={speak}
        >
          ▶ Hear My Story
        </button>

        {isSpeaking && !isPaused && (
          <button onClick={pauseSpeech}>
            ⏸ Pause
          </button>
        )}

        {isSpeaking && isPaused && (
          <button onClick={resumeSpeech}>
            ▶ Resume
          </button>
        )}

        <button onClick={toggleMute}>
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>

        <button onClick={stopSpeech}>
          ⏹ Stop
        </button>
      </div>
    </section>
  );
}

export default MoonBuggyCharacter;