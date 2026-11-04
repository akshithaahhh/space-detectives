import { useState } from "react";
import "./ExplorationMap.css";

function ExplorationMap({ planet, locations }) {
  const [selected, setSelected] = useState(null);

  const craters = [
    "crater-one",
    "crater-two",
    "crater-three",
    "crater-four",
    "crater-five"
  ];

  return (
    <section className="exploration-section">

      <div className="exploration-heading">
        <span>✨ INTERACTIVE EXPLORATION MAP</span>
        <h2>
          {planet === "Moon" ? "🌕" : "🔴"} Explore the Surface of {planet}
        </h2>
        <p>
          Your mission awaits! Tap a glowing marker to
          discover its secret, Junior Detective!
        </p>
      </div>

      <div className={`planet-map ${planet.toLowerCase()}-map`}>

        {/* Floating stars */}
        <div className="map-stars">
          {Array.from({ length: 7 }).map((_, index) => (
            <span key={index}>✦</span>
          ))}
        </div>

        {/* Moon craters */}
        {planet === "Moon" &&
          craters.map((crater) => (
            <div
              key={crater}
              className={`map-crater ${crater}`}
            />
          ))}

        {/* Planet decorations */}
        <span className="map-decoration decoration-one">
          {planet === "Moon" ? "🌑" : "🪨"}
        </span>

        <span className="map-decoration decoration-two">
          ✨
        </span>

        {/* Exploration trail */}
        <div className="map-trail" />

        {/* Compass */}
        <div className="map-compass">N ↑</div>

        {/* Mission markers */}
        {locations.map((location, index) => (
          <button
            key={location.id}
            className={`map-marker ${
              selected?.id === location.id ? "active" : ""
            }`}
            style={{
              left: location.x,
              top: location.y
            }}
            onClick={() => setSelected(location)}
            aria-label={`Explore ${location.name}`}
          >
            <span className="marker-icon">🚀</span>

            <span className="marker-number">
              {index + 1}
            </span>

            <span className="marker-label">
              {location.name}
            </span>
          </button>
        ))}

        <span className="map-label">
          {planet.toUpperCase()} — EXPLORATION ZONE
        </span>
      </div>

      {/* Selected mission details */}
      {selected ? (
        <div className="map-info">
          <div className="map-info-icon">🚀</div>

          <span className="map-info-tag">
            ✨ DISCOVERY UNLOCKED
          </span>

          <h3>{selected.name}</h3>

          <p className="map-location-name">
            📍 {selected.location}
          </p>

          <p>{selected.description}</p>

          <button
            className="map-close"
            onClick={() => setSelected(null)}
          >
            Explore Another Location ↗
          </button>
        </div>
      ) : (
        <p className="map-hint">
          👆 Click a glowing mission marker to investigate!
        </p>
      )}

    </section>
  );
}

export default ExplorationMap;