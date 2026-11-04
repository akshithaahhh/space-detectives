import { useEffect, useState } from "react";
import "./NasaGallery.css";

function NasaGallery({
  searchTerm = "Moon Apollo mission",
  category = "moon"
}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(
          searchTerm
        )}&media_type=image&page_size=50`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("NASA image service is unavailable.");
        }

        const data = await response.json();

        const items = data.collection?.items || [];

        const moonPattern =
          /\b(moon|lunar|apollo|astronaut|survey(?:or)?)\b/i;

        const marsPattern =
          /\b(mars|martian|sojourner|opportunity|spirit|curiosity|perseverance|pathfinder)\b/i;

        const relevantImages = items
          .filter((item) => {
            const info = item.data?.[0];

            if (!info || info.media_type !== "image") return false;

            const searchableText = [
              info.title || "",
              info.description || "",
              ...(info.keywords || [])
            ].join(" ");

            if (category === "moon") {
              return moonPattern.test(searchableText);
            }

            if (category === "mars") {
              return marsPattern.test(searchableText);
            }

            return true;
          })
          .filter((item) =>
            item.links?.some((link) => link.rel === "preview")
          )
          .slice(0, 8)
          .map((item) => {
            const info = item.data[0];

            const imageLink = item.links.find(
              (link) => link.rel === "preview"
            );

            return {
              id: info.nasa_id,
              title: info.title || "NASA Space Image",
              description:
                info.description ||
                "Explore this photograph from NASA's space archive.",
              date: info.date_created || "",
              image: imageLink.href,
              nasaUrl: `https://images.nasa.gov/details/${info.nasa_id}`
            };
          });

        setImages(relevantImages);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load NASA images. Please check your internet connection."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, category]);

  return (
    <section className="nasa-gallery">
      <div className="nasa-gallery-heading">
        <span>OFFICIAL NASA COLLECTION</span>

        <h2>
          🚀 Discover Real {category === "mars" ? "Mars" : "Moon"} Images
        </h2>

        <p>
          Explore real photographs from NASA's space missions.
        </p>
      </div>

      {loading && (
        <p className="nasa-gallery-message">
          🔭 Loading NASA images...
        </p>
      )}

      {error && (
        <p className="nasa-gallery-message">{error}</p>
      )}

      {!loading && !error && images.length === 0 && (
        <p className="nasa-gallery-message">
          No matching images found. Try another search.
        </p>
      )}

      <div className="nasa-image-grid">
        {images.map((item) => (
          <article className="nasa-image-card" key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />

            <div className="nasa-image-info">
              <h3>{item.title}</h3>

              <p>
                {item.description.slice(0, 130)}
                {item.description.length > 130 ? "..." : ""}
              </p>

              <small>
                {item.date
                  ? new Date(item.date).toLocaleDateString()
                  : "NASA Archive"}
              </small>

              <a
                href={item.nasaUrl}
                target="_blank"
                rel="noreferrer"
              >
                View on NASA →
              </a>
            </div>
          </article>
        ))}
      </div>

      <p className="nasa-gallery-credit">
        Images and metadata: NASA Image and Video Library.
      </p>
    </section>
  );
}

export default NasaGallery;