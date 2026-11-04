import { useEffect, useRef, useState } from "react";
import "./OpportunityCharacter.css";

function OpportunityCharacter() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef(null);

  const narration =
    "Hello, Junior Detective! I'm Opportunity, but my friends call me Oppy! I landed on Mars on January 25, 2004. My original mission was planned to last only 90 Martian days, called sols. But I had a much bigger adventure ahead of me! I explored Mars for almost 15 years. I studied rocks, examined the Martian landscape, and helped scientists discover evidence that liquid water once existed on ancient Mars. In 2018, a huge dust storm covered the sky and blocked sunlight from reaching my solar panels. After many attempts to contact me, NASA officially ended my mission in February 2019. My journey was much longer than anyone expected. Keep exploring, Junior Detective!";

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry! Your browser does not support speech narration.");
      return;
    }

    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(narration);
    utterance.lang = "en-US";
    utterance.rate = 0.82;
    utterance.pitch = 1.05;
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
    <section className="opportunity-story">
      <div className="opportunity-intro">
        <span className="opportunity-label">MEET YOUR MARS EXPLORER</span>
        <h2>Hey, I'm Opportunity! 🌟</h2>
        <p>
          They called me Oppy! I was built for a short mission,
          but my adventure lasted almost 15 years.
        </p>
      </div>

      <div className="opportunity-character-area">
        <div
          className={`opportunity-character ${
            isSpeaking && !isPaused ? "opportunity-talking" : ""
          }`}
        >
          {/* Camera mast */}
          <div className="opportunity-mast">
            <div className="opportunity-camera">
              <div className="opportunity-lens" />
            </div>
          </div>

          {/* Rover head */}
          <div className="opportunity-head">
            <div className="opportunity-eye opportunity-eye-left">
              <span />
            </div>
            <div className="opportunity-eye opportunity-eye-right">
              <span />
            </div>
            <div className="opportunity-mouth" />
          </div>

          {/* Solar panel */}
          <div className="opportunity-solar-panel">
            <div className="opportunity-panel-grid" />
          </div>

          {/* Rover body */}
          <div className="opportunity-body">
            <div className="opportunity-body-top" />
            <div className="opportunity-body-light" />
            <span>OPPORTUNITY</span>
          </div>

          {/* Six wheels */}
          <div className="opportunity-wheels">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="opportunity-wheel" key={index}>
                <div />
              </div>
            ))}
          </div>
        </div>

        <div className="opportunity-shadow" />

        <div className="opportunity-speech-bubble">
          {isSpeaking && !isPaused
            ? "I'm sharing my adventure! 💬"
            : isPaused
            ? "Taking a little rest, Detective!"
            : "Ready to hear my adventure? 👋"}
        </div>
      </div>

      <div className="opportunity-controls">
        <button
          onClick={speak}
          className="opportunity-play"
        >
          ▶ Hear My Story
        </button>

        {isSpeaking && !isPaused && (
          <button onClick={pauseSpeech}>⏸ Pause</button>
        )}

        {isSpeaking && isPaused && (
          <button onClick={resumeSpeech}>▶ Resume</button>
        )}

        <button onClick={toggleMute}>
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>

        <button onClick={stopSpeech}>⏹ Stop</button>
      </div>
    </section>
  );
}

export default OpportunityCharacter;