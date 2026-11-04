import { useState } from "react";
import "./MoonMap.css";

const locations = [
  {
    id: "apollo11",
    name: "Apollo 11 Landing Site",
    region: "Sea of Tranquility",
    year: "1969",
    x: "35%",
    y: "35%",
    description:
      "Apollo 11 landed here on July 20, 1969. The Lunar Module's descent stage remains on the lunar surface.",
    fact: "The first human Moon landing happened here!",
    emoji: "🚀"
  },
  {
    id: "apollo15",
    name: "Apollo 15 Landing Site",
    region: "Hadley–Apennine",
    year: "1971",
    x: "70%",
    y: "65%",
    description:
      "Apollo 15 astronauts explored this region in 1971 using the Lunar Roving Vehicle.",
    fact: "Apollo 15 was the first mission to use the Lunar Roving Vehicle.",
    emoji: "🚙"
  }
];

function MoonMap() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="moon-map-section">
      <div className="moon-map-heading">
        <span>🕵️ DETECTIVE LOCATION TRACKER</span>
        <h2>Explore the Moon Map</h2>
        <p>
          Discover where astronauts explored the lunar surface.
          Click a location to reveal its secret!
        </p>
      </div>

      <div className="moon-map">
        <div className="moon-map-surface">
          <div className="moon-crater crater-one"></div>
          <div className="moon-crater crater-two"></div>
          <div className="moon-crater crater-three"></div>

          {locations.map((location) => (
            <button
              key={location.id}
              className={
                selected?.id === location.id
                  ? "moon-map-marker active"
                  : "moon-map-marker"
              }
              style={{
                left: location.x,
                top: location.y
              }}
              onClick={() => setSelected(location)}
              aria-label={`Explore ${location.name}`}
              title={location.name}
            >
              <span className="marker-dot"></span>
            </button>
          ))}

          <span className="map-caption">
            MOON — ILLUSTRATIVE MAP, NOT TO SCALE
          </span>
        </div>
      </div>

      {selected ? (
        <div className="moon-location-info">
          <span className="location-year">
            SPACE MISSION • {selected.year}
          </span>

          <h3>
            {selected.emoji} {selected.name}
          </h3>

          <h4>{selected.region}</h4>

          <p>{selected.description}</p>

          <div className="location-fact">
            💡 Detective Fact: {selected.fact}
          </div>

          <button
            className="location-close"
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
      ) : (
        <p className="map-instruction">
          👆 Select one of the glowing markers to investigate!
        </p>
      )}
    </section>
  );
}

export default MoonMap;