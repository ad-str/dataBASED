/*import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import config from "./config.json"; // Import the config JSON file from client folder
import NavBar from "./components/NavBar"; // Import Navigation bar
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "tailwindcss/tailwind.css";

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
*/

/*
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";


// import pages
import Welcome from './pages/Welcome';
import HomePage from "./pages/HomePage";
import ArtAtlas from "./pages/ArtAtlas";
import Nameless from "./pages/Nameless";
import StealLike from "./pages/StealLike";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<ArtAtlas />} />
          <Route path="/nameless" element={<Nameless />} />
          <Route path="/steal" element={<StealLike />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
*/

import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import HomePage from "./pages/HomePage";
import ArtAtlas from "./pages/ArtAtlas";
import Nameless from "./pages/Nameless";
import StealLike from "./pages/StealLike";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/map" element={<ArtAtlas />} />
            <Route path="/nameless" element={<Nameless />} />
            <Route path="/steal" element={<StealLike />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
