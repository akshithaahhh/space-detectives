import { useState, useEffect } from "react";
import "./JuniorDetective.css";

function JuniorDetective() {
  const [message, setMessage] = useState(
    "Hey, Junior Detective! I'm NOVA! Ready for an exciting space adventure?"
  );
  const [speaking, setSpeaking] = useState(false);

  const messages = [
    "Let's explore the Moon and Mars together!",
    "Did you know? Some NASA machines are still on the Moon!",
    "Every abandoned machine has an amazing story.",
    "You're doing amazing, Junior Detective!",
    "Keep exploring. Every clue brings us closer to discovery!"
  ];

  const speak = (text = message) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.3;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const giveHint = () => {
    const next =
      messages[Math.floor(Math.random() * messages.length)];

    setMessage(next);
    speak(next);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <section className="nova-section">
      <div className="nova-character">
        <div className="nova-stars">✦</div>
        <div className="nova-antenna">
          <span />
        </div>

        <div className="nova-head">
          <div className="nova-glass">
            <div className="nova-eye left-eye" />
            <div className="nova-eye right-eye" />
            <div className={`nova-mouth ${speaking ? "talking" : ""}`} />
            <div className="nova-blush left-blush" />
            <div className="nova-blush right-blush" />
          </div>
        </div>

        <div className="nova-neck" />

        <div className="nova-body">
          <div className="nova-chest">
            <span>🚀</span>
            <small>NOVA</small>
          </div>
        </div>

        <div className="nova-arm left-arm" />
        <div className="nova-arm right-arm" />
        <div className="nova-leg left-leg" />
        <div className="nova-leg right-leg" />
      </div>

      <div className="nova-message-card">
        <span className="nova-label">
          ✨ YOUR SPACE BUDDY
        </span>

        <h2>Heyyy! I'm NOVA 👩‍🚀</h2>

        <p>{message}</p>

        <div className="nova-buttons">
          <button onClick={() => speak()}>
            🔊 Listen
          </button>

          <button onClick={giveHint}>
            💡 Give me a hint
          </button>

          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              setSpeaking(false);
              setMessage("See you on our next discovery, Detective! 🌟");
            }}
          >
            ✋ Stop
          </button>
        </div>

        <small className="nova-note">
          {speaking
            ? "NOVA is talking to you! 💬"
            : "Your adventure buddy is always ready!"}
        </small>
      </div>
    </section>
  );
}

export default JuniorDetective;