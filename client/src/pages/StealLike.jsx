import React, { useEffect, useState } from "react";
import ArtworkDropdown from "../components/DropdownButton";
import config from "../config.json";
import { Box, Container } from "@mui/material";

const url = `http://${config.server_host}:${config.server_port}`;

export default function StealLike() {
  const artwork = [
    {
      type: "Drawing and Watercolor",
      mediums: ["watercolor", "pencil and pen", "crayon and chalk"],
    },
    {
      type: "Photograph",
      mediums: ["portrait"],
    },
    {
      type: "Sculpture",
      mediums: [
        "earthenware",
        "figure",
        "wood",
        "porcelain",
        "marble",
        "bronze",
        "textile",
      ],
    },
    {
      type: "Painting",
      mediums: ["oil", "acrylic"],
    },
    {
      type: "Ceramics",
      mediums: ["vase", "bowl", "teapot", "drinking vessel", "everything else"],
    },
  ];

  const [ArtworkType, setArtworkType] = useState("--Artwork Type--");
  const [mediumType, setMediumType] = useState("--Medium--");
  const [mediums, setMediums] = useState([]);
  // const [classification, setClasification] = useState([]);
  const [artworks, setArtworks] = useState([]);

  const changeArtworkType = (event) => {
    const selectedType = event.target.value;
    console.log("Selected Artwork Type:", selectedType);
    setArtworkType(selectedType);
    setMediums(artwork.find((ctr) => ctr.type === selectedType).mediums);
  };

  const changeMediumType = (event) => {
    const selectedType = event.target.value;
    setMediumType(selectedType);
    console.log("Selected Medium Type:", selectedType);
  };

  useEffect(() => {
    const fetchThreePieces = async () => {
      try {
        const response = await fetch(
          `${url}/three_artworks/${ArtworkType}/${mediumType}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchThreePieces();
  }, [ArtworkType, mediumType]);

  const flexFormat = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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
      <div className="Cascading">
        <h2> Select Artwork Type & Medium </h2>
        <select
          className="form-control"
          value={ArtworkType}
          onChange={changeArtworkType}
        >
          <option>--Artwork Type--</option>
          {artwork.map((ctr) => (
            <option value={ctr.type}>{ctr.type}</option>
          ))}
        </select>
        <br />
        <select
          className="form-control"
          value={mediumType}
          onChange={changeMediumType}
        >
          <option>--Medium--</option>
          {mediums.map((medium) => (
            <option value={medium}>{medium}</option>
          ))}
        </select>
      </div>
      <div>
        <h3> Pick an art piece below </h3>
      </div>
      <Container style={flexFormat}>
        {artworks.map((artwork) => (
          <img
            src={`https://www.artic.edu/iiif/2/${artwork.image}/full/200,/0/default.jpg`}
          />
        ))}
      </Container>
    </>
  );
}
