import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [artists, setArtists] = useState([]);
  const [images, setImages] = useState([]);
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
    fetch(`${url}/images`)
      .then((res) => res.json())
      .then((resJson) => setImages(resJson));

    fetch(`http://${config.server_host}:${config.server_port}/author/names`)
      .then((res) => res.text())
      .then((resText) => setAuthor(resText));
  }, []);

  return (
    <>
      <div>
        <h1>Hello from dataBASED Team</h1>
        <h3>
          Welcome to a haven for art lovers! Explore art from every corner of
          the globe, get inspire from unique stories, honor forgotten artists,
          and unleash your inner artist at our vibrant art base.
        </h3>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Example artist Route is here:</p>
      <ul>
        {artists.map((artist, index) => (
          <li key={index}>{artist.name}</li>
        ))}
      </ul>
      <div className="image-container">
        {images.length > 0 && (
          <img
            src={`https://www.artic.edu/iiif/2/${images}/full/200,/0/default.jpg`}
            alt={`Artwork ${images}`}
            className="artwork-image"
          />
        )}
      </div>
      <p> {author} </p>
    </>
  );
}
