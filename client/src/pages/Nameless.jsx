import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function Nameless() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${url}/unknownArtists`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <>
      <h2>Why Art History Needs a Rewrite</h2>
      <p>
        The art world hasn't always been a welcoming space. Throughout history,
        prejudice and bias have denied recognition to talented artists,
        particularly women and people of color. Their captivating work might
        have been dismissed as mere "folk art," hidden away in private
        collections or simply not valued by the dominant art establishment.. But
        the true tragedy lies beyond their initial exclusion. Without proper
        records or critical analysis, these artists' legacies faded, their
        stories lost to time. In museums, exhibit labels often bear a silent
        testament to this injustice: "unknown."
      </p>
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <NavLink to={`/artwork/${artwork.id}`}>{artwork.title}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
