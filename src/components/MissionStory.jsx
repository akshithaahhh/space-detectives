import { useEffect, useState } from "react";
import "./MissionStory.css";

const stories = {
  // ==================================
  // APOLLO 11 STORY
  // ==================================
  apollo11: {
    title: "The Mystery of Apollo 11",
    character: "Eagle",
    characterEmoji: "🚀",
    image: "/images/apollo11.jpg",
    imageAlt: "Apollo 11 Lunar Module",
    introduction:
      "Hello, young detective! I am Eagle, the Apollo 11 Lunar Module. I helped carry two astronauts to the Moon in 1969. Are you ready to discover my story?",
    scenes: [
      {
        title: "A Journey Begins",
        text: "On July 16, 1969, Apollo 11 launched from Earth. Three astronauts travelled aboard the spacecraft: Neil Armstrong, Buzz Aldrin and Michael Collins. Their mission was to land humans on the Moon.",
        fact: "Apollo 11 launched from Kennedy Space Center in Florida.",
        period: "July 16, 1969",
      },
      {
        title: "Landing on the Moon",
        text: "On July 20, 1969, I carried Neil Armstrong and Buzz Aldrin towards the lunar surface. We landed in the Sea of Tranquility. It was a historic moment for humanity!",
        fact: "Neil Armstrong became the first human to step onto the Moon.",
        period: "July 20, 1969",
      },
      {
        title: "A Historic Adventure",
        text: "The astronauts explored the lunar surface, collected Moon rocks, took photographs and conducted experiments. They spent about 21 hours and 36 minutes on the lunar surface.",
        fact: "The astronauts collected approximately 21.5 kilograms of lunar material.",
        period: "Moon exploration",
      },
      {
        title: "Why Am I Still Here?",
        text: "After completing the mission, the astronauts returned to their spacecraft. My descent stage was left behind at the landing site. It was not needed for their journey back to lunar orbit.",
        fact: "The Apollo 11 Lunar Module's descent stage remains on the Moon.",
        period: "Mission completed",
      },
      {
        title: "Your Detective Mission",
        text: "Now it is your turn, detective! Look carefully at the Apollo 11 landing site. Can you discover what equipment was left behind and why astronauts could not bring everything home?",
        fact: "Equipment was left behind as part of the mission design and to save weight.",
        period: "Mystery solved?",
      },
    ],
  },

  // ==================================
  // LUNAR ROVER STORY
  // ==================================
  "lunar-rover": {
    title: "The Mystery of the Moon Buggy",
    character: "Moon Buggy",
    characterEmoji: "🚙",
    image: "/images/lunar-rover.jpg",
    imageAlt: "Apollo Lunar Roving Vehicle",
    introduction:
      "Beep beep! I am the Lunar Roving Vehicle, also known as the Moon Buggy. I helped astronauts travel across the Moon. Come along and discover my adventure!",
    scenes: [
      {
        title: "Meet the Moon Buggy",
        text: "I was designed to help astronauts explore places far away from their lunar landing sites. My wheels helped astronauts travel across the rocky Moon surface.",
        fact: "The Lunar Roving Vehicle was battery-powered.",
        period: "Meet the rover",
      },
      {
        title: "My First Mission",
        text: "My first journey was during Apollo 15 in 1971. Astronauts David Scott and James Irwin used me to explore the lunar landscape and collect samples.",
        fact: "Apollo 15 was the first mission to use a Lunar Roving Vehicle.",
        period: "1971",
      },
      {
        title: "Three Lunar Adventures",
        text: "I was used on Apollo 15, Apollo 16 and Apollo 17. Each mission helped astronauts explore more of the Moon than they could on foot.",
        fact: "Three Lunar Roving Vehicles were used during the Apollo missions.",
        period: "1971–1972",
      },
      {
        title: "Why Am I Still Here?",
        text: "After the missions ended, the astronauts returned to Earth. I stayed on the Moon because bringing me home was not part of the mission plan.",
        fact: "The three Apollo Lunar Roving Vehicles remain on the Moon.",
        period: "Mission completed",
      },
      {
        title: "Your Detective Mission",
        text: "Detective, can you find the places where the three Moon Buggies were left? Imagine what stories they could tell us about their adventures!",
        fact: "The rovers were left at the Apollo 15, Apollo 16 and Apollo 17 landing sites.",
        period: "Mystery solved?",
      },
    ],
  },

  // ==================================
  // SOJOURNER MARS ROVER STORY
  // ==================================
  sojourner: {
    title: "The Little Rover That Made History",
    character: "Sojourner",
    characterEmoji: "🤖",
    image: "/images/image.png",
    imageAlt: "NASA Sojourner Mars rover",
    introduction:
      "Hello, Junior Detective! I am Sojourner. I was NASA's first successful Mars rover. I may have been small, but I made a big difference in exploring the Red Planet. Let's discover my story!",
    scenes: [
      {
        title: "A Tiny Explorer",
        text: "I was a small robotic rover developed for NASA's Mars Pathfinder mission. Scientists designed me to explore rocks and soil on Mars.",
        fact: "Sojourner was about the size of a microwave oven.",
        period: "Before 1997",
      },
      {
        title: "Touchdown on Mars",
        text: "On July 4, 1997, I arrived on Mars as part of the Mars Pathfinder mission. My landing site was in a region called Ares Vallis.",
        fact: "Mars Pathfinder landed on Independence Day in the United States.",
        period: "July 4, 1997",
      },
      {
        title: "My Big Adventure",
        text: "I explored Martian rocks and soil, took measurements and sent information back to Earth. I helped scientists understand the Martian surface.",
        fact: "My planned mission lasted 7 sols, but I operated for 83 sols.",
        period: "1997",
      },
      {
        title: "Why Am I Still There?",
        text: "After sending valuable scientific information, I eventually stopped communicating with Earth. I remain on Mars near the Pathfinder lander.",
        fact: "Sojourner's final communication with Earth was on September 27, 1997.",
        period: "Mission completed",
      },
      {
        title: "Your Detective Mission",
        text: "Detective, can you find the Mars Pathfinder landing site? Imagine how much this tiny rover helped future Mars explorers!",
        fact: "Sojourner helped demonstrate that mobile robotic exploration of Mars was possible.",
        period: "Mystery solved?",
      },
    ],
  },

  // ==================================
  // OPPORTUNITY MARS ROVER STORY
  // ==================================
  opportunity: {
    title: "The Mystery of Opportunity",
    character: "Opportunity",
    characterEmoji: "🔴",
    image: "/images/opportunity.jpeg",
    imageAlt: "NASA Opportunity Mars rover",
    introduction:
      "Hello, Earth friend! I am Opportunity. I travelled across Mars for almost 15 years, even though my original mission was planned for just 90 sols. Let's explore my incredible journey!",
    scenes: [
      {
        title: "My Journey Begins",
        text: "I was one of NASA's Mars Exploration Rovers. I launched from Earth in 2003 to investigate the rocks and soil of Mars.",
        fact: "Opportunity was launched on July 7, 2003.",
        period: "2003",
      },
      {
        title: "Landing on the Red Planet",
        text: "I landed on Mars on January 25, 2004, in a region called Meridiani Planum. My twin rover, Spirit, had landed earlier that month.",
        fact: "My original mission was planned to last 90 sols.",
        period: "January 25, 2004",
      },
      {
        title: "Discovering Ancient Water",
        text: "I explored craters, examined rocks and found evidence that liquid water had once affected the Martian environment. My discoveries helped scientists understand Mars's past.",
        fact: "Opportunity discovered geological evidence of ancient water activity.",
        period: "2004–2018",
      },
      {
        title: "The Great Dust Storm",
        text: "In 2018, a huge dust storm covered much of Mars. Dust blocked sunlight from reaching my solar panels, and I could no longer recharge properly. I stopped communicating with Earth.",
        fact: "NASA made its final attempt to contact me on February 13, 2019.",
        period: "2018–2019",
      },
      {
        title: "Your Detective Mission",
        text: "My journey lasted almost 15 years! Detective, can you investigate how a rover designed for 90 sols managed to explore Mars for so long?",
        fact: "Opportunity operated for 5,111 sols, far beyond its planned mission.",
        period: "Mission completed",
      },
    ],
  },
};

export default function MissionStory({ missionId }) {
  const story = stories[missionId];

  const [sceneIndex, setSceneIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentScene = story?.scenes[sceneIndex];
  const isFinished = sceneIndex === story?.scenes.length - 1;

  useEffect(() => {
    setSceneIndex(0);
    setIsSpeaking(false);
    setIsPaused(false);
    setIsMuted(false);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [missionId]);

  if (!story) {
    return null;
  }

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry! Your browser does not support voice narration.");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
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

    window.speechSynthesis.speak(utterance);
  };

  const playStory = () => {
    speakText(
      `${currentScene.title}. ${currentScene.text}. Detective fact: ${currentScene.fact}`
    );
  };

  const pauseStory = () => {
    if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
      setIsPaused(true);
    }
  };

  const resumeStory = () => {
    if ("speechSynthesis" in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsSpeaking(true);
      setIsPaused(false);
    }
  };

  const stopStory = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
    setIsPaused(false);
  };

  const nextScene = () => {
    stopStory();
    setSceneIndex((previous) =>
      Math.min(previous + 1, story.scenes.length - 1)
    );
  };

  const previousScene = () => {
    stopStory();
    setSceneIndex((previous) => Math.max(previous - 1, 0));
  };

  const restartStory = () => {
    stopStory();
    setSceneIndex(0);
  };

  const toggleMute = () => {
    setIsMuted((previous) => {
      const next = !previous;

      if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
      }

      return next;
    });
  };

  return (
    <section className="mission-story">
      <div className="story-heading">
        <span className="story-label">SPACE DETECTIVES • STORY FILE</span>
        <h2>{story.title}</h2>
        <p>Every forgotten object has a story to tell!</p>
      </div>

      <div className="story-character-area">
        <div
          className={`story-character-avatar ${
            isSpeaking ? "story-talking" : ""
          }`}
        >
          {missionId === "apollo11" ? (
            <img
              src="/images/eagle-character.png"
              alt="Eagle character"
              className="story-character-image"
            />
          ) : (
            <span className="story-character-emoji">
              {story.characterEmoji}
            </span>
          )}
        </div>

        <div className="story-character-message">
          <span className="story-character-name">
            {story.character}
          </span>
          <p>{story.introduction}</p>
        </div>
      </div>

      <div className="story-progress-area">
        <div className="story-progress-label">
          <span>MISSION PROGRESS</span>
          <span>
            Chapter {sceneIndex + 1} of {story.scenes.length}
          </span>
        </div>

        <div className="story-progress-track">
          <div
            className="story-progress-fill"
            style={{
              width: `${((sceneIndex + 1) / story.scenes.length) * 100}%`,
            }}
          />
        </div>

        <div className="story-chapter-dots">
          {story.scenes.map((scene, index) => (
            <button
              key={scene.title}
              className={`story-dot ${
                index <= sceneIndex ? "active" : ""
              }`}
              onClick={() => {
                stopStory();
                setSceneIndex(index);
              }}
              aria-label={`Go to chapter ${index + 1}`}
              title={scene.title}
            />
          ))}
        </div>
      </div>

      <article className="story-scene">
        <div className="story-scene-image">
          <img
            src={story.image}
            alt={story.imageAlt}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <div className="story-image-overlay">
            <span>{currentScene.period}</span>
            <h3>{currentScene.title}</h3>
          </div>
        </div>

        <div className="story-scene-content">
          <span className="story-chapter-label">
            CHAPTER {sceneIndex + 1}
          </span>

          <h3>{currentScene.title}</h3>
          <p>{currentScene.text}</p>

          <div className="story-fact">
            <span>🔎 DETECTIVE FACT</span>
            <p>{currentScene.fact}</p>
          </div>
        </div>
      </article>

      <div className="story-audio-panel">
        <span className="story-audio-label">🎧 STORY NARRATION</span>

        <p>
          {isSpeaking
            ? "Your space explorer is speaking..."
            : isPaused
              ? "Narration paused. Resume when you are ready!"
              : "Listen to this chapter or read it yourself!"}
        </p>

        <div className="story-audio-controls">
          <button onClick={playStory} className="story-control primary">
            ▶ Listen
          </button>

          <button onClick={pauseStory} className="story-control">
            ⏸ Pause
          </button>

          <button onClick={resumeStory} className="story-control">
            ⏵ Resume
          </button>

          <button onClick={stopStory} className="story-control">
            ⏹ Stop
          </button>

          <button onClick={toggleMute} className="story-control">
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>
        </div>
      </div>

      <div className="story-navigation">
        <button
          onClick={previousScene}
          disabled={sceneIndex === 0}
          className="story-nav-button"
        >
          ← Previous
        </button>

        {isFinished ? (
          <button
            onClick={restartStory}
            className="story-nav-button next"
          >
            ↻ Read Again
          </button>
        ) : (
          <button
            onClick={nextScene}
            className="story-nav-button next"
          >
            Next Chapter →
          </button>
        )}
      </div>

      {isFinished && (
        <div className="story-finished">
          <span>🏆</span>
          <h3>Mission Story Completed!</h3>
          <p>
            Amazing work, detective! You discovered the story behind this
            historic space exploration mission.
          </p>
        </div>
      )}
    </section>
  );
}