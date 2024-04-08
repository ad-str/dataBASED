import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import config from "./config.json"; // Import the config JSON file

const url = `http://${config.server_host}:${config.server_port}`;


function App() {
  const [count, setCount] = useState(0);
  const [artists, setArtists] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${url}/artist`)
      .then((res) => res.json())
      .then((resJson) => setArtists(resJson));
  }, []);

  useEffect(() => {
    fetch(`${url}/images`)
      .then((res) => res.json())
      .then((resJson) => setImages(resJson));
  }, []);

  // console.log(images[0])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h1>Hello dataBASED Team</h1>
      <p>Artists are here:</p>
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
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
