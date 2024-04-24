import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import ArtworkCard from "../components/ArtworkCard";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function HomePage() {
  const [artists, setArtists] = useState([]);
  const [colorfulImage, setColorfulImage] = useState([]);
  const [author, setAuthor] = useState("");
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);


  useEffect(() => {
    fetch(`${url}/artist`)
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

  return (
    <>
      <div>
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          An art haven for{" "}
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            art lovers.
          </span>
        </h1>
        <p class="p-2 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Explore art from every corner of the globe, honor forgotten artists,
          and unleash your inner artist.
        </p>
      </div>
      <div className="image-container">

      {(colorfulImage.map((artwork) => (
          <div key={artwork.id}>
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
              alt={` 3 Colorful Artworks`}
              style={{
                width: "400px",
                height: "400px",
                objectFit: "contain",
                cursor: "pointer",
                margin: "20px",
                padding: "20px",
                marginBottom: "10px",
                border: "5px solid #3c84f4", 
                borderRadius: "20px",
                background : "#C1c7d0"
              }}
              onClick={() => handleArtworkClick(artwork.id)}
            />
          </div>
        )))}
              {showArtworkCard && (
        <ArtworkCard
          artworkID={selectedArtworkID}
          handleClose={handleCloseArtworkCard}
        />
      )}


      </div>


      {/* <p>Artists to explore:</p>
      <ul>
        {artists.map((artist, index) => (
          //<h4 key={index}>{artist.name}</h4>
          <h4 key={artist.id}>
            {" "}
            <NavLink to={`/artist/${artist.id}`}>{artist.name}</NavLink>
          </h4>
        ))}
      </ul> */}
      <p class="pt-18 text-m font-normal text-black-500 lg:text-xl dark:text-gray-400">
        {" "}
        {author}{" "}
      </p>
    </>
  );
}
