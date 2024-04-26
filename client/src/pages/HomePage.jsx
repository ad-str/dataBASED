import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";
import ArtistCard from "../components/ArtistCard";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function HomePage() {
  const [artists, setArtists] = useState([]);
  const [colorfulImage, setColorfulImage] = useState([]);
  const [author, setAuthor] = useState("");
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);
  const [showArtistCard, setShowArtistCard] = useState(false);
  const [selectedArtistInfo, setSelectedArtistInfo] = useState(null);
  const [error, setError] = useState("");
  const [colorfulnessRange, setColorfulnessRange] = useState("");

  useEffect(() => {
    fetch(`${url}/featured-artists`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((resJson) => setArtists(resJson))
      .catch((error) => console.error("Error fetching artists:", error));
  }, []);

  useEffect(() => {
    fetch(`${url}/colorful-artists`)
      .then((res) => res.json())
      .then((resJson) => setColorfulImage(resJson));

    fetch(`${url}/author/names`)
      .then((res) => res.text())
      .then((resText) => setAuthor(resText));
  }, []);

  const handleArtworkClick = (artworkID) => {
    setSelectedArtworkID(artworkID);
    setShowArtworkCard(true);
  };

  const handleCloseArtworkCard = () => {
    setShowArtworkCard(false);
  };

  const handleArtistClick = (artist) => {
    setSelectedArtistInfo(artist);
    setShowArtistCard(true);
  };

  const handleCloseArtistCard = () => {
    setShowArtistCard(false);
  };

  const handleColorfulnessRangeChange = (e) => {
    const value = e.target.value;
    setColorfulnessRange(value);
  };

  const handleClick = () => {
    const [lowColor, highColor] = colorfulnessRange.split("-").map(Number);

    if (
      isNaN(lowColor) ||
      isNaN(highColor) ||
      lowColor < 0 ||
      highColor > 170 ||
      lowColor > highColor
    ) {
      setError("Please enter a valid colorfulness range (0-170).");
      return;
    }

    setError("");

    fetch(
      `${url}/colorful-artists?colorfulnessLow=${lowColor}&colorfulnessHigh=${highColor}`
    )
      .then((res) => res.json())
      .then((resJson) => setColorfulImage(resJson))
      .catch((error) =>
        console.error("Error fetching colorful artists:", error)
      );
  };

  return (
    <>
      <div>
        <div class="flex justify-center">
          <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            An art haven for{" "}
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
              art lovers.
            </span>
          </h1>
        </div>
        <p class="pt-2 pl-4 pr-4 pb-4 text-3xl font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex justify-center">
          Explore art from every corner of the globe, honor unknown artists, and
          unleash your inner artist.
        </p>
      </div>
      <div
        className="image-container"
        style={{
          margin: "50px",
        }}
      >
        {colorfulImage.map((artwork) => (
          <div
            key={artwork.id}
            className="flex justify-center"
            style={{
              margin: "50px",
              textAlign: "center",
            }}
          >
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
              alt={` 3 Colorful Artworks`}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "contain",
                cursor: "pointer",
                margin: "0px",
                padding: "0px",
                marginBottom: "10px",
                boxShadow: " 0 0 0 5px #833ab4",
                borderRadius: "20px",
                background: "#f3f4f6",
              }}
              onClick={() => handleArtworkClick(artwork.id)}
            />
          </div>
        ))}
        {showArtworkCard && (
          <ArtworkCard
            artworkID={selectedArtworkID}
            handleClose={handleCloseArtworkCard}
          />
        )}
      </div>

      {/* colorfulness input and button */}
      <div className="input-container flex justify-center">
        <input
          type="text"
          placeholder="Enter colorfulness range between 0 and 170 (e.g., 50-100)"
          value={colorfulnessRange}
          onChange={handleColorfulnessRangeChange}
          style={{
            padding: "10px",
            border: "2px solid #8a8f96",
            borderRadius: "5px",
            margin: "40px",
            width: "450px",
            background: "#f3f4f6",
          }}
        />
        <button
          onClick={handleClick}
          style={{
            padding: "3px 10px", // Adjust padding as needed for a smaller button
            minWidth: "80px", // Set a smaller minimum width
            height: "auto", // Let the height adjust based on content
            backgroundColor: "#fff",
            // border: "1px solid #ddd",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Click me 😊
        </button>
      </div>
      {/* Displays an error message if the user inputs random stuff */}
      {error && <p className="flex justify-center">{error}</p>}

      {/* TODO possibly add artist bios as a component? */}
      <div className="pb-4 flex justify-center">
        <p>Featured Artists to explore: </p>
        <ul>
          {artists.map((artist, index) => (
            <li key={index} onClick={() => handleArtistClick(artist)}>
              {artist.name}
            </li>
          ))}
        </ul>
        {showArtistCard && (
          <ArtistCard
            artistInfo={selectedArtistInfo}
            handleClose={handleCloseArtistCard}
          />
        )}
      </div>
      <p class="pt-10 pb-10 text-m font-normal text-black-500 lg:text-xl dark:text-gray-400 flex justify-center">
        {" "}
        {author}{" "}
      </p>
    </>
  );
}
