import { useEffect, useRef, useState } from "react";
import "./SojournerCharacter.css";

function SojournerCharacter() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef(null);

  const narration =
    "Hello, Junior Detective! I'm Sojourner, NASA's first successful Mars rover. I landed on Mars on July 4, 1997, as part of the Pathfinder mission. My original mission was planned to last just seven Martian days, called sols. But guess what? I kept exploring for 83 sols! I studied Martian rocks and soil and helped scientists learn how to explore another planet using a small robotic rover. My mission may be over, but my discoveries are still remembered!";

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
    utterance.rate = 0.85;
    utterance.pitch = 1.25;
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
    <section className="sojourner-story">
      <div className="sojourner-intro">
        <span className="sojourner-label">MEET YOUR MARS GUIDE</span>
        <h2>Hey, I'm Sojourner! 🔴</h2>
        <p>
          A tiny rover with a big story to tell. Come and discover
          my adventure on Mars!
        </p>
      </div>

      <div className="sojourner-character-area">
        <div
          className={`sojourner-character ${
            isSpeaking && !isPaused ? "sojourner-talking" : ""
          }`}
        >
          {/* Camera head */}
          <div className="sojourner-head">
            <div className="sojourner-camera">
              <div className="sojourner-lens" />
            </div>
            <div className="sojourner-eye eye-left">
              <span />
            </div>
            <div className="sojourner-eye eye-right">
              <span />
            </div>
            <div className="sojourner-mouth" />
            <div className="sojourner-antenna" />
          </div>

          {/* Rover body */}
          <div className="sojourner-body">
            <div className="sojourner-panel">
              <span>NASA</span>
              <div className="panel-light" />
            </div>
            <div className="sojourner-body-detail" />
          </div>

          {/* Six wheels */}
          <div className="sojourner-wheels">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="sojourner-wheel" key={index}>
                <div />
              </div>
            ))}
          </div>
        </div>

        <div className="sojourner-shadow" />
        <div className="sojourner-speech-bubble">
          {isSpeaking && !isPaused
            ? "I'm telling my story! 💬"
            : isPaused
            ? "Let's take a little break!"
            : "Tap the button to hear my story! 👋"}
        </div>
      </div>

      <div className="sojourner-controls">
        <button onClick={speak} className="sojourner-play">
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

export default SojournerCharacter;