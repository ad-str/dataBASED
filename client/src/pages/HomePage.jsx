import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function HomePage() {
  const [count, setCount] = useState(0);
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
        <h1>An art haven for art lovers </h1>
        <h3>
          Explore art from every corner of the globe, get inspiration from
          unique stories, honor forgotten artists, and unleash your inner
          artist.
        </h3>
      </div>
      {/* <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      {/* </div> */}
      <div className="image-container">
        {randomImage.length > 0 && (
          <img
            src={`https://www.artic.edu/iiif/2/${randomImage}/full/200,/0/default.jpg`}
            alt={`Artwork ${randomImage}`}
            className="artwork-image"
          />
        )}
      </div>
      <p>Artists to explore:</p>
      <ul>
        {artists.map((artist, index) => (
          //<h4 key={index}>{artist.name}</h4>
          <h4 key={artist.id}> <NavLink to={`/artist/${artist.id}`}>{artist.name}</NavLink></h4>
        ))}
      </ul>
      <p> {author} </p>
    </>
  );
}
