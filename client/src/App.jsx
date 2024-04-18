import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import config from "./config.json"; // Import the config JSON file from client folder
import NavBar from "./components/NavBar"; // Import Navigation bar
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Styling from HW2 - we can change this

// Import Pages
import HomePage from "./pages/HomePage";
import ArtAtlas from "./pages/ArtAtlas";
import StealLike from "./pages/StealLike";
import ArtistStories from "./pages/ArtistStories";
import Nameless from "./pages/Nameless";

const url = `http://${config.server_host}:${config.server_port}`;

function App() {
  // console.log(images[0])
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stories" element={<ArtistStories />} />
          <Route path="/map" element={<ArtAtlas />} />
          <Route path="/nameless" element={<Nameless />} />
          <Route path="/steal" element={<StealLike />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
