import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProgressDashboard from "../components/ProgressDashboard";

function JuniorDetective() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const greeting =
    "Hello, Junior Detective! I'm Astro, your space buddy. Are you ready to explore the Moon and Mars, discover forgotten machines, and solve exciting mysteries? Let's begin our mission!";

  const speakGreeting = () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry! Voice is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(greeting);
    speech.rate = 0.9;
    speech.pitch = 1.3;

    speech.onstart = () => setIsSpeaking(true);
    speech.onend = () => setIsSpeaking(false);
    speech.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(speech);
  };

  const stopGreeting = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  return (
    <div className="hero-visual">
      <div className="space-orbit orbit-one"></div>
      <div className="space-orbit orbit-two"></div>

      <div className="floating-planet moon-decoration">
        🌕
      </div>

      <div className="floating-planet mars-decoration">
        🔴
      </div>

      <div className="floating-planet star-decoration">
        ⭐
      </div>

      <div className="astronaut-character">
        👩‍🚀
      </div>

      <div className="astronaut-message">
        <span>
          Hi, Detective! 👋
          <br />
          Ready for an adventure?
        </span>

        <button
          className="astro-voice-button"
          onClick={isSpeaking ? stopGreeting : speakGreeting}
        >
          {isSpeaking ? "🔇 Stop Astro" : "🔊 Talk to Astro"}
        </button>
      </div>

      <div className="floating-star star-one">✨</div>
      <div className="floating-star star-two">⭐</div>
      <div className="floating-star star-three">✦</div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();

  const startMission = () => {
    document.getElementById("planets")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <a href="/" className="logo">
          <span className="logo-icon">🚀</span>
          SPACE DETECTIVES
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#planets">Explore</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-stars">
          <span>✦</span>
          <span>✧</span>
          <span>✨</span>
          <span>✦</span>
          <span>✧</span>
          <span>⭐</span>
        </div>

        <div className="hero-content">
          <div className="mission-label">
            ✨ YOUR SPACE ADVENTURE STARTS HERE
          </div>

          <h1>
            The Universe
            <br />
            Needs a <span>Detective!</span>
          </h1>

          <p className="hero-description">
            Forgotten machines. Mysterious planets.
            Incredible discoveries!

            Become a Junior Space Detective and uncover
            the secrets of NASA's Moon and Mars missions.
          </p>

          <button
            className="start-button"
            onClick={startMission}
          >
            Start Your Mission 🚀
          </button>

          <div className="hero-note">
            ⭐ Explore • 🔍 Investigate • 🏆 Discover
          </div>
        </div>

        <JuniorDetective />
      </section>

      <ProgressDashboard />

      <section className="planet-section" id="planets">
        <div className="section-heading">
          <span>🪐 CHOOSE YOUR DESTINATION</span>
          <h2>Where Shall We Explore?</h2>
          <p>
            Two mysterious worlds are waiting for you, Junior Detective!
          </p>
        </div>

        <div className="planet-grid">
          <article
            className="planet-card moon-card"
            onClick={() => navigate("/moon")}
          >
            <div className="planet-card-top">
              <span>DESTINATION 01</span>
              <span>🌙</span>
            </div>

            <div className="planet-icon moon-floating">
              🌕
            </div>

            <h3>Explore the Moon</h3>

            <p>
              Discover lunar rovers, Apollo equipment
              and forgotten machines left behind by astronauts.
            </p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate("/moon");
              }}
            >
              Let's Visit the Moon →
            </button>
          </article>

          <article
            className="planet-card mars-card"
            onClick={() => navigate("/mars")}
          >
            <div className="planet-card-top">
              <span>DESTINATION 02</span>
              <span>🔭</span>
            </div>

            <div className="planet-icon mars-floating">
              🔴
            </div>

            <h3>Explore Mars</h3>

            <p>
              Meet brave Mars rovers, discover ancient secrets
              and investigate the Red Planet.
            </p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate("/mars");
              }}
            >
              Let's Visit Mars →
            </button>
          </article>
        </div>
      </section>

      <section className="adventure-section">
        <div className="adventure-content">
          <span>🕵️ YOUR MISSION</span>
          <h2>Every Machine Has a Story!</h2>

          <p>
            Travel through space history, solve mysteries,
            collect clues and discover how NASA equipment
            helped scientists explore other worlds.
          </p>

          <div className="adventure-steps">
            <div>🔍 <strong>Investigate</strong></div>
            <div>🧩 <strong>Find Clues</strong></div>
            <div>🏆 <strong>Earn Rewards</strong></div>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-emoji">🌎</div>
        <h2>Curiosity Has No Limits!</h2>

        <p>
          Space Detectives is an interactive learning adventure
          inspired by NASA's Moon and Mars missions.
          Every forgotten machine has a story waiting to be discovered!
        </p>
      </section>

      <footer>
        <div className="footer-logo">🚀 SPACE DETECTIVES</div>
        <p>NASA Space Apps Challenge Project</p>
        <small>Made for curious young explorers ⭐</small>
      </footer>
    </div>
  );
}

export default Home;