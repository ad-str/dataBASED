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

function App() {
  return (
    <div className="min-h-screen flex justify-center p-5 items-center">
      <NavBar />
      <div className="space-y-5 text-center gap-5">
        <h1 className="lg:text-4xl text-2xl  font-bold">
          Welcome to ArtBased
        </h1>
        <p className="max-w-lg text-sm leading-6">
          This was created to highlight the countless artists that don't get the recognition 
          they deserve. We see you and we honor you.
        </p>
        <button className="px-5 py-3 bg-neutral-300 rounded-md text-sm text-stone-800">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
