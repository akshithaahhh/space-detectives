import { useState, useRef, useEffect } from "react";
import "./Mars.css";
import ExplorationMap from "../components/ExplorationMap";
import { useProgress } from "../context/ProgressContext";
import NasaGallery from "../components/NasaGallery";
import SojournerCharacter from "../components/SojournerCharacter";
import OpportunityCharacter from "../components/OpportunityCharacter";
import MissionStory from "../components/MissionStory";

const marsIntroduction =
  "Hello, Junior Detective! Welcome to the amazing Red Planet! " +
  "I am Mars. Many robotic explorers have visited me. " +
  "Some machines are still resting on my surface. " +
  "Can you investigate their stories and discover their secrets? " +
  "Let's begin our Martian adventure!";

const missions = [
  {
    id: "sojourner",
    name: "Sojourner Rover",
    emoji: "🤖",
    period: "1997",
    image: "/images/image.png",
    description:
      "Sojourner was NASA's first successful Mars rover. It explored the Martian surface, examined rocks and soil, and sent valuable information back to Earth.",
    facts: [
      "Sojourner landed on Mars on July 4, 1997.",
      "It was part of NASA's Mars Pathfinder mission.",
      "Its original mission was planned to last 7 sols.",
      "It operated for 83 sols.",
      "It studied Martian rocks and soil."
    ],
    mystery:
      "Why was Sojourner important? Before Sojourner, spacecraft had explored Mars, but this small rover demonstrated that a mobile robot could successfully explore the Martian surface.",
    clue:
      "Sojourner was designed for a 7-sol mission but continued operating for 83 sols!",
    question:
      "How many sols was Sojourner originally planned to operate?",
    options: [
      "7 sols",
      "30 sols",
      "100 sols"
    ],
    answer: "7 sols",
    explanation:
      "Correct! Sojourner was originally planned for 7 sols but operated for 83 sols.",
    credit: "NASA",
    source:
      "https://science.nasa.gov/mission/mars-pathfinder/"
  },
  {
    id: "opportunity",
    name: "Opportunity Rover",
    emoji: "🔴",
    period: "2004–2018",
    image: "/images/opportunity.jpeg",
    description:
      "Opportunity was a NASA Mars Exploration Rover that studied rocks, soil and the history of water on Mars. It worked on the Red Planet for almost 15 years.",
    facts: [
      "Opportunity landed on Mars on January 25, 2004.",
      "Its original mission was planned for 90 sols.",
      "It explored Mars for nearly 15 years.",
      "It found evidence that liquid water existed in ancient Martian environments.",
      "A major dust storm in 2018 prevented its solar panels from receiving enough sunlight."
    ],
    mystery:
      "Why did Opportunity stop communicating with Earth? A massive dust storm covered the Martian sky and reduced sunlight reaching its solar panels. NASA made its final attempt to contact the rover in February 2019.",
    clue:
      "Opportunity was designed for only 90 sols but worked for almost 15 years!",
    question:
      "What was the main reason Opportunity stopped communicating?",
    options: [
      "A dust storm",
      "A collision with a meteor",
      "It ran out of fuel"
    ],
    answer: "A dust storm",
    explanation:
      "Correct! A massive dust storm blocked sunlight from reaching Opportunity's solar panels.",
    credit: "NASA",
    source:
      "https://science.nasa.gov/mission/mer-opportunity/"
  }
];

function MarsCharacter() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef(null);

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = null;
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const speakIntroduction = () => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry! Your browser does not support voice narration.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      marsIntroduction
    );

    utterance.lang = "en-US";
    utterance.rate = 0.88;
    utterance.pitch = 1.3;
    utterance.volume = isMuted ? 0 : 1;

    const voices = window.speechSynthesis.getVoices();

    const englishVoice = voices.find((voice) =>
      voice.lang.toLowerCase().startsWith("en")
    );

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeaking = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeaking = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (utteranceRef.current) {
      utteranceRef.current.volume = nextMuted ? 0 : 1;
    }
  };

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section className="mars-character-section">
      <div className="mars-character">
        <div
          className={`mars-face ${
            isSpeaking ? "mars-speaking" : ""
          }`}
        >
          <span className="mars-eye mars-eye-left"></span>
          <span className="mars-eye mars-eye-right"></span>
          <span className="mars-cheek mars-cheek-left"></span>
          <span className="mars-cheek mars-cheek-right"></span>
          <span className="mars-mouth"></span>
        </div>

        <span className="mars-character-stars">✨</span>
      </div>

      <div className="mars-character-message">
        <span className="mars-character-label">
          YOUR MARS GUIDE 🔴
        </span>

        <h2>Hello, Junior Detective!</h2>

        <p className="mars-caption">
          "{marsIntroduction}"
        </p>

        <div className="mars-voice-controls">
          <button
            className="mars-voice-button"
            onClick={speakIntroduction}
          >
            ▶ Play
          </button>

          {isSpeaking && !isPaused && (
            <button
              className="mars-voice-button"
              onClick={pauseSpeaking}
            >
              ⏸ Pause
            </button>
          )}

          {isSpeaking && isPaused && (
            <button
              className="mars-voice-button"
              onClick={resumeSpeaking}
            >
              ▶ Resume
            </button>
          )}

          <button
            className="mars-voice-button"
            onClick={speakIntroduction}
          >
            ↻ Replay
          </button>

          <button
            className="mars-voice-button"
            onClick={toggleMute}
          >
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>

          {isSpeaking && (
            <button
              className="mars-voice-button"
              onClick={stopSpeaking}
            >
              ■ Stop
            </button>
          )}
        </div>

        <p className="mars-voice-note">
          {isSpeaking
            ? isPaused
              ? "Mars is taking a little break."
              : "Your Mars friend is talking to you!"
            : "Press Play to hear your Mars friend's story."}
        </p>
      </div>
    </section>
  );
}

function Mars() {
  const [selectedMission, setSelectedMission] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showClue, setShowClue] = useState(false);

  const { completeMission, completedMissions } = useProgress();

  const selectMission = (mission) => {
    setSelectedMission(mission);
    setQuizAnswer("");
    setShowClue(false);
  };

  const goBack = () => {
    setSelectedMission(null);
    setQuizAnswer("");
    setShowClue(false);
  };

  const handleQuizAnswer = (option) => {
    setQuizAnswer(option);

    if (option === selectedMission.answer) {
      completeMission(selectedMission.id, 10);
    }
  };

  const alreadyCompleted = selectedMission
    ? completedMissions.includes(selectedMission.id)
    : false;

  return (
    <main className="mars-page">

      {/* MARS HEADER */}
      <header className="mars-header">
        <div className="mars-planet">🔴</div>

        <h1>Welcome to Mars!</h1>

        <p>
          Your Martian investigation begins here, Junior Detective.
        </p>
      </header>

      {/* CUTE TALKING MARS CHARACTER */}
      <MarsCharacter />

      {/* INTERACTIVE MARS EXPLORATION MAP */}
      <ExplorationMap
        planet="Mars"
        locations={[
          {
            id: 1,
            name: "Sojourner Landing Site",
            location: "Ares Vallis",
            description:
              "Sojourner landed here on July 4, 1997, as part of the Mars Pathfinder mission.",
            x: "35%",
            y: "40%"
          },
          {
            id: 2,
            name: "Opportunity Landing Site",
            location: "Meridiani Planum",
            description:
              "Opportunity landed here on January 25, 2004, and explored the Martian surface for nearly 15 years.",
            x: "65%",
            y: "60%"
          }
        ]}
      />

      {/* MISSION CARDS */}
      {!selectedMission ? (
        <section className="mars-missions">
          <div className="mars-section-heading">
            <span>SPACE DETECTIVE CASE FILES</span>

            <h2>Choose Your Investigation</h2>

            <p>
              Discover the robotic explorers that visited the Red Planet.
            </p>
          </div>

          <div className="mars-mission-grid">
            {missions.map((mission, index) => (
              <article
                className="mars-mission-card"
                key={mission.id}
              >
                <span className="mars-mission-number">
                  MISSION 0{index + 1}
                </span>

                <div className="mars-mission-emoji">
                  {mission.emoji}
                </div>

                <h3>{mission.name}</h3>

                <p>{mission.description}</p>

                <button
                  className="mars-button"
                  onClick={() => selectMission(mission)}
                >
                  Investigate →
                </button>
              </article>
            ))}
          </div>
        </section>
      ) : (
        /* SELECTED MISSION CASE FILE */
        <section className="mars-case-file">

          <div className="mars-case-label">
            <span>🔎 SPACE DETECTIVE</span>
            <span>CLASSIFIED CASE FILE</span>
          </div>

          <h2>
            {selectedMission.emoji} {selectedMission.name}
          </h2>

          <p className="mars-case-period">
            Mission Period: {selectedMission.period}
          </p>

          {/* SOJOURNER ANIMATED CHARACTER */}
          {selectedMission.id === "sojourner" && (
            <SojournerCharacter />
          )}

          {/* OPPORTUNITY ANIMATED CHARACTER */}
          {selectedMission.id === "opportunity" && (
            <OpportunityCharacter />
          )}

          {/* ORIGINAL NASA MISSION PHOTOGRAPH */}
          <figure className="mars-image-container">
            <img
              src={selectedMission.image}
              alt={selectedMission.name}
              className="mars-rover-image"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                console.error(
                  "Image not found:",
                  selectedMission.image
                );
              }}
            />

            <figcaption>
              {selectedMission.name} — Image credit:{" "}
              {selectedMission.credit}
            </figcaption>
          </figure>

          <p className="mars-case-description">
            {selectedMission.description}
          </p>

          {/* CINEMATIC MISSION STORY */}
          <MissionStory missionId={selectedMission.id} />

          {/* IMPORTANT FACTS */}
          <div className="mars-facts">
            <h3>🔍 Important Discoveries</h3>

            <ul>
              {selectedMission.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>

          {/* DETECTIVE MYSTERY */}
          <div className="mars-mystery">
            <h3>🕵️ Detective Mystery</h3>
            <p>{selectedMission.mystery}</p>
          </div>

          {/* SECRET CLUE */}
          <div className="mars-secret-clue">
            <h3>🔐 Secret Detective Clue</h3>

            {!showClue ? (
              <>
                <p>A hidden clue is waiting for you!</p>

                <button
                  className="mars-button"
                  onClick={() => setShowClue(true)}
                >
                  Reveal My Clue
                </button>
              </>
            ) : (
              <p>{selectedMission.clue}</p>
            )}
          </div>

          {/* DETECTIVE QUIZ */}
          <div className="mars-quiz">
            <h3>🧠 Detective Challenge</h3>

            <p>{selectedMission.question}</p>

            <div className="mars-quiz-options">
              {selectedMission.options.map((option) => (
                <button
                  key={option}
                  className={
                    quizAnswer === option
                      ? "mars-quiz-option selected"
                      : "mars-quiz-option"
                  }
                  onClick={() => handleQuizAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {quizAnswer && (
              <div
                className={
                  quizAnswer === selectedMission.answer
                    ? "mars-quiz-feedback correct"
                    : "mars-quiz-feedback incorrect"
                }
              >
                {quizAnswer === selectedMission.answer
                  ? alreadyCompleted
                    ? `🎉 ${selectedMission.explanation} This mission was already completed.`
                    : `🎉 ${selectedMission.explanation} +10 XP earned!`
                  : "❌ Not quite! Try again, Detective."}
              </div>
            )}
          </div>

          {/* BACK BUTTON */}
          <button
            className="mars-button mars-back-button"
            onClick={goBack}
          >
            ← Back to Missions
          </button>

          {/* NASA SOURCE */}
          <p className="mars-source">
            Source: NASA —{" "}
            <a
              href={selectedMission.source}
              target="_blank"
              rel="noreferrer"
            >
              Read More
            </a>
          </p>
        </section>
      )}

      {/* NASA MARS IMAGE GALLERY */}
      <NasaGallery
        searchTerm="Mars Sojourner Opportunity rover"
        category="mars"
      />

    </main>
  );
}

export default Mars;