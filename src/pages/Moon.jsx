import { useState, useRef, useEffect } from "react";
import "./Moon.css";
import ExplorationMap from "../components/ExplorationMap";
import { useProgress } from "../context/ProgressContext";
import NasaGallery from "../components/NasaGallery";
import MissionStory from "../components/MissionStory";
import MoonBuggyCharacter from "../components/MoonBuggyCharacter";

const moonIntroduction =
  "Hello, Junior Detective! Welcome to my beautiful Moon. " +
  "I have a secret to share. Humans visited me many years ago, " +
  "and they left some amazing machines behind. Can you investigate " +
  "their stories and discover why they are still here? Let's begin!";

const missions = [
  {
    id: "apollo11",
    name: "Apollo 11 Lunar Module",
    emoji: "🚀",
    period: "1969",
    image: "/images/apollo11.jpg",
    description:
      "The Apollo 11 Lunar Module, named Eagle, carried Neil Armstrong and Buzz Aldrin to the Moon. Its descent stage remained on the lunar surface after the astronauts returned to lunar orbit.",
    facts: [
      "Apollo 11 landed on the Moon on July 20, 1969.",
      "The landing site was called the Sea of Tranquility.",
      "The Lunar Module was named Eagle.",
      "The descent stage remained on the Moon.",
      "The ascent stage carried the astronauts back to lunar orbit."
    ],
    mystery:
      "Why was part of the Lunar Module left behind? The descent stage helped the astronauts land safely. It was not needed for their journey back to lunar orbit, so it remained on the Moon.",
    clue:
      "The Eagle had two main parts: the descent stage for landing and the ascent stage for returning to lunar orbit!",
    question:
      "Which part of the Apollo 11 Lunar Module remained on the Moon?",
    options: [
      "Ascent stage",
      "Descent stage",
      "Command Module"
    ],
    answer: "Descent stage",
    explanation:
      "Correct! The descent stage remained on the lunar surface after the astronauts departed.",
    credit: "NASA",
    source:
      "https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11ov.html"
  },
  {
    id: "lunar-rover",
    name: "Lunar Roving Vehicle",
    emoji: "🚙",
    period: "1971–1972",
    image: "/images/lunar-rover.jpg",
    description:
      "The Lunar Roving Vehicle was a battery-powered electric vehicle used by Apollo astronauts to travel across the Moon and explore places far from their landing sites.",
    facts: [
      "The first Lunar Roving Vehicle was used during Apollo 15 in 1971.",
      "It was a four-wheeled electric vehicle.",
      "It carried astronauts, tools and scientific equipment.",
      "It was also used during Apollo 16 and Apollo 17.",
      "The three Apollo lunar rovers remain on the Moon."
    ],
    mystery:
      "Why did astronauts need a Moon buggy? Walking alone limited how far astronauts could explore. The rover helped them travel farther and collect more scientific samples.",
    clue:
      "Three Lunar Roving Vehicles were driven on the Moon during Apollo 15, 16 and 17. All three remain there!",
    question:
      "During which mission was the Lunar Roving Vehicle first used?",
    options: [
      "Apollo 11",
      "Apollo 15",
      "Apollo 17"
    ],
    answer: "Apollo 15",
    explanation:
      "Correct! Apollo 15 was the first mission to use the Lunar Roving Vehicle in 1971.",
    credit: "NASA",
    source:
      "https://www.nasa.gov/image-article/taking-ride-moon-lunar-roving-vehicle/"
  }
];

function MoonCharacter() {
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

    const utterance = new SpeechSynthesisUtterance(moonIntroduction);

    utterance.lang = "en-US";
    utterance.rate = 0.88;
    utterance.pitch = 1.35;
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
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
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
    <section className="moon-character-section">
      <div className="moon-character">
        <div
          className={`moon-face ${isSpeaking ? "moon-speaking" : ""}`}
        >
          <span className="moon-eye moon-eye-left"></span>
          <span className="moon-eye moon-eye-right"></span>
          <span className="moon-cheek moon-cheek-left"></span>
          <span className="moon-cheek moon-cheek-right"></span>
          <span className="moon-mouth"></span>
        </div>

        <div className="moon-character-stars">✨</div>
      </div>

      <div className="moon-character-message">
        <span className="moon-character-label">
          YOUR MOON GUIDE 🌙
        </span>

        <h2>Hello, Junior Detective!</h2>

        <p className="moon-caption">
          "{moonIntroduction}"
        </p>

        <div className="moon-voice-controls">
          <button
            className="moon-voice-button"
            onClick={speakIntroduction}
          >
            <span>▶</span> Play
          </button>

          {isSpeaking && !isPaused && (
            <button
              className="moon-voice-button"
              onClick={pauseSpeaking}
            >
              ⏸ Pause
            </button>
          )}

          {isSpeaking && isPaused && (
            <button
              className="moon-voice-button"
              onClick={resumeSpeaking}
            >
              ▶ Resume
            </button>
          )}

          <button
            className="moon-voice-button"
            onClick={speakIntroduction}
          >
            ↻ Replay
          </button>

          <button
            className="moon-voice-button"
            onClick={toggleMute}
          >
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>

          {isSpeaking && (
            <button
              className="moon-voice-button stop"
              onClick={stopSpeaking}
            >
              ■ Stop
            </button>
          )}
        </div>

        <p className="moon-voice-note">
          {isSpeaking
            ? isPaused
              ? "Your Moon friend is taking a little break."
              : "Your Moon friend is talking to you!"
            : "Press Play to hear your Moon friend's story."}
        </p>
      </div>
    </section>
  );
}

function Moon() {
  const [selectedMission, setSelectedMission] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [showClue, setShowClue] = useState(false);

  // Load previously collected clues from localStorage
  const [collectedClues, setCollectedClues] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("moonDetectiveClues") || "[]"
      );
    } catch {
      return [];
    }
  });

  const { completeMission, completedMissions } = useProgress();

  // Collect a detective clue
  const collectClue = () => {
    if (!selectedMission) return;

    if (collectedClues.includes(selectedMission.id)) return;

    const updatedClues = [
      ...collectedClues,
      selectedMission.id
    ];

    setCollectedClues(updatedClues);

    localStorage.setItem(
      "moonDetectiveClues",
      JSON.stringify(updatedClues)
    );
  };

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
    <main className="moon-page">
      {/* WELCOME HEADER */}
      <header className="moon-header">
        <div className="moon-planet">🌕</div>

        <h1>Welcome to the Moon!</h1>

        <p>
          Your lunar investigation begins here, Junior Detective.
        </p>
      </header>

      {/* TALKING MOON CHARACTER */}
      <MoonCharacter />

      {/* INTERACTIVE MOON EXPLORATION MAP */}
      <ExplorationMap
        planet="Moon"
        locations={[
          {
            id: 1,
            name: "Apollo 11 Landing Site",
            location: "Sea of Tranquility",
            description:
              "Apollo 11 landed here on July 20, 1969. The Lunar Module's descent stage remains on the lunar surface.",
            x: "35%",
            y: "40%"
          },
          {
            id: 2,
            name: "Apollo 15 Landing Site",
            location: "Hadley-Apennine",
            description:
              "Apollo 15 astronauts explored this region in 1971 using the Lunar Roving Vehicle.",
            x: "65%",
            y: "60%"
          }
        ]}
      />

      {/* MISSION CARDS */}
      {!selectedMission ? (
        <section className="moon-missions">
          <div className="moon-section-heading">
            <span>SPACE DETECTIVE CASE FILES</span>

            <h2>Choose Your Investigation</h2>

            <p>
              Discover the historic machines that humans left on the Moon.
            </p>
          </div>

          <div className="moon-mission-grid">
            {missions.map((mission, index) => (
              <article
                className="moon-mission-card"
                key={mission.id}
              >
                <span className="moon-mission-number">
                  MISSION 0{index + 1}
                </span>

                <div className="moon-mission-emoji">
                  {mission.emoji}
                </div>

                <h3>{mission.name}</h3>

                <p>{mission.description}</p>

                <button
                  className="moon-button"
                  onClick={() => selectMission(mission)}
                >
                  Investigate →
                </button>
              </article>
            ))}
          </div>

          {/* DETECTIVE COLLECTION SUMMARY */}
          <div className="moon-clue-summary">
            <h3>📖 Your Detective Collection</h3>

            <p>
              You have collected {collectedClues.length} of {missions.length} Moon clues.
            </p>

            <div className="moon-clue-progress">
              <div
                className="moon-clue-progress-fill"
                style={{
                  width: `${(collectedClues.length / missions.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </section>
      ) : (
        /* SELECTED MISSION CASE FILE */
        <section className="moon-case-file">
          <div className="moon-case-label">
            <span>🔎 SPACE DETECTIVE</span>
            <span>CLASSIFIED CASE FILE</span>
          </div>

          <h2>
            {selectedMission.emoji} {selectedMission.name}
          </h2>

          <p className="moon-case-period">
            Mission Period: {selectedMission.period}
          </p>

          {/* ANIMATED MOON BUGGY CHARACTER */}
          {selectedMission.id === "lunar-rover" && (
            <MoonBuggyCharacter />
          )}

          {/* ORIGINAL NASA MISSION PHOTOGRAPH */}
          <figure className="moon-image-container">
            <img
              src={selectedMission.image}
              alt={selectedMission.name}
              className="moon-rover-image"
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

          <p className="moon-case-description">
            {selectedMission.description}
          </p>

          {/* CINEMATIC MISSION STORY - APOLLO 11 AND LUNAR ROVER */}
          {(selectedMission.id === "apollo11" ||
            selectedMission.id === "lunar-rover") && (
            <MissionStory missionId={selectedMission.id} />
          )}

          {/* IMPORTANT FACTS */}
          <div className="moon-facts">
            <h3>🔍 Important Discoveries</h3>

            <ul>
              {selectedMission.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>

          {/* DETECTIVE MYSTERY */}
          <div className="moon-mystery">
            <h3>🕵️ Detective Mystery</h3>
            <p>{selectedMission.mystery}</p>
          </div>

          {/* DETECTIVE CLUE COLLECTION */}
          <div className="moon-secret-clue">
            <h3>🔐 Secret Detective Clue</h3>

            {collectedClues.includes(selectedMission.id) ? (
              <>
                <p>🎉 Clue successfully collected!</p>

                <div className="collected-clue">
                  🔎 {selectedMission.clue}
                </div>

                <p>
                  Great work, Detective! This clue is in your collection.
                </p>
              </>
            ) : (
              <>
                <p>
                  A hidden clue is waiting to be discovered.
                  Are you ready to collect it?
                </p>

                <button
                  className="moon-button"
                  onClick={collectClue}
                >
                  🔍 Collect My Clue
                </button>
              </>
            )}
          </div>

          {/* DETECTIVE QUIZ */}
          <div className="moon-quiz">
            <h3>🧠 Detective Challenge</h3>

            <p>{selectedMission.question}</p>

            <div className="moon-quiz-options">
              {selectedMission.options.map((option) => (
                <button
                  key={option}
                  className={
                    quizAnswer === option
                      ? "moon-quiz-option selected"
                      : "moon-quiz-option"
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
                    ? "moon-quiz-feedback correct"
                    : "moon-quiz-feedback incorrect"
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
            className="moon-button moon-back-button"
            onClick={goBack}
          >
            ← Back to Missions
          </button>

          {/* NASA SOURCE */}
          <p className="moon-source">
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

      {/* NASA MOON IMAGE GALLERY */}
      <NasaGallery
        searchTerm="Apollo 11 Moon landing lunar rover"
        category="moon"
      />
    </main>
  );
}

export default Moon;