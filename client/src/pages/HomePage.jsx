import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function HomePage() {
  const [artists, setArtists] = useState([]);
  const [randomImage, setRandomImage] = useState([]);
  const [author, setAuthor] = useState("");

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
    fetch(`${url}/random`)
      .then((res) => res.json())
      .then((resJson) => setRandomImage(resJson));

    fetch(`http://${config.server_host}:${config.server_port}/author/names`)
      .then((res) => res.text())
      .then((resText) => setAuthor(resText));
  }, []);

  return (
    <>
      <div>
        <h1 class="pt-12 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          An art haven for{" "}
          <span class="text-blue-600 dark:text-blue-500">art lovers.</span>
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Explore art from every corner of the globe, honor forgotten artists,
          and unleash your inner artist.
        </p>
      </div>
      <div className="image-container">
        {randomImage.length > 0 && (
          <img
            src={`https://www.artic.edu/iiif/2/${randomImage}/full/200,/0/default.jpg`}
            alt={`Artwork ${randomImage}`}
            class="mx-auto"
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
      <p> {author} </p>
    </>
  );
}
