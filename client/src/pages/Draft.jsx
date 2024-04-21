import React, { useEffect, useState } from "react";
import ArtworkDropdown from "../components/DropdownButton";
import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function StealLike() {
  const [selectedArtworkType, setSelectedArtworkType] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const artworkTypes = [
    "Drawing and Watercolor",
    "Photograph",
    "Sculpture",
    "Painting",
    "Ceramics",
  ];

  const getMediumTypes = (artworkType) => {
    switch (artworkType) {
      case "Drawing and Watercolor":
        return ["Watercolor", "Pencil and Pen", "Crayon and Chalk"];
      case "Photograph":
        return ["Portrait", "Not Portrait"];
      case "Painting":
        return ["Oil", "Acrylic", "Other"];
      case "Sculpture":
        return [
          "Earthenware/Terracotta",
          "Figure",
          "Wood",
          "Porcelain",
          "Marble",
          "Bronze",
          "Textile",
        ];
      case "Ceramics":
        return ["vase", "bowl", "teapot", "drinking vessel", "everything else"];
      default:
        return [];
    }
  };

  const handleArtworkTypeSelect = (selectedArtworkType) => {
    setSelectedArtworkType(selectedArtworkType);
    setSelectedMedium("");
  };

  const handleMediumSelect = (medium) => {
    setSelectedMedium(medium);
  };

  return (
    <>
      <p>
        Coined by Austin Kleon, steal like an artist is the idea that all art is
        connected, built off each other. Steal like an artist encourages
        creatives to borrowing from what others have created to make something
        original and authentic. Use our art generator to indicate which type of
        art you want to make and what medium you specialize in. Happy art
        making!
      </p>
      <h2> Select Artwork Type </h2>
      <ArtworkDropdown
        id="artworkTypeDropdown"
        title="Select Artwork Type"
        options={artworkTypes}
        onSelect={handleArtworkTypeSelect} // Added onSelect prop
      />
      {/* {selectedArtworkType && ( // Conditionally render the second dropdown */}
      <div>
        <h2> Select Medium </h2>
        <ArtworkDropdown
          id="mediumDropdown"
          title="Select Medium"
          getMediumOptions={getMediumTypes}
          onSelect={handleMediumSelect} // Added onSelect prop
        />
      </div>
      {/* )} */}
    </>
  );
}
