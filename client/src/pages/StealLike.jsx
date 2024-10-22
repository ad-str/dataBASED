import React, { useEffect, useState } from "react";
import config from "../config.json";
import { Box, Container } from "@mui/material";
import ArtworkCard from "../components/ArtworkCard";
const url = `http://${config.server_host}:${config.server_port}`;
import many_versions_gif from "../assets/many_versions.gif";

export default function StealLike() {
  const artwork = [
    {
      type: "Drawing and Watercolor",
      mediums: [
        "Watercolor",
        "Graphite",
        "Pen and Ink",
        "Charcoal",
        "Crayon",
        "Chalk",
      ],
    },
    {
      type: "Photograph",
      mediums: [
        "Gelatin Silver",
        "Color",
        "Dye Imbibition",
        "Silver Dye",
        "Platinum",
        "Stereograph",
        "Portrait",
      ],
    },
    {
      type: "Sculpture",
      mediums: [
        "Earthenware",
        "Figure",
        "Wood",
        "Porcelain",
        "Marble",
        "Bronze",
        "Textile",
      ],
    },
    {
      type: "Painting",
      mediums: ["Oil", "Acrylic"],
    },
    {
      type: "Ceramics",
      mediums: ["Vase", "Bowl", "Teapot", "Drinking Vessel"],
    },
  ];

  const artwork_classification = {
    Watercolor: "watercolor",
    Graphite: "graphite",
    "Pen and Ink": "pen and ink",
    Charcoal: "charcoal",
    Crayon: "crayon",
    Chalk: "chalk",
    "Gelatin Silver": "gelatin silver",
    Color: "color",
    "Dye Imbibition": "dye imbibition",
    "Silver Dye": "silver-dye",
    Platinum: "platinum",
    Stereograph: "stereograph",
    Portrait: "portrait",
    Earthenware: "earthenware",
    Figure: "figure",
    Wood: "wood",
    Porcelain: "porcelain",
    Marble: "marble",
    Bronze: "bronze",
    Textile: "textile",
    Oil: "oil",
    Acrylic: "acrylic",
    Vase: "vase",
    Bowl: "bowl",
    Teapot: "teapot",
    "Drinking Vessel": "drinking vessel",
  };

  const [ArtworkType, setArtworkType] = useState("--Artwork Type--");
  const [mediumType, setMediumType] = useState("--Medium--");
  const [mediums, setMediums] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);
  const [mediumClassification, setMediumClassification] = useState(null);

  const changeArtworkType = (event) => {
    const selectedType = event.target.value;
    console.log("Selected Artwork Type:", selectedType);
    setArtworkType(selectedType);
    setMediums(artwork.find((ctr) => ctr.type === selectedType).mediums);
  };

  const changeMediumType = (event) => {
    const selectedType = event.target.value;
    setMediumType(selectedType);
    setMediumClassification(artwork_classification[selectedType]);
    console.log("Selected Medium Type:", selectedType);
  };

  useEffect(() => {
    const fetchThreePieces = async () => {
      try {
        const startTime = performance.now();
        const response = await fetch(
          `${url}/three_artworks/${ArtworkType}/${mediumClassification}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworks(data);
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        console.log(`Request took ${elapsedTime} milliseconds`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchThreePieces();
  }, [ArtworkType, mediumClassification]);

  const handleArtworkClick = (artworkID) => {
    setSelectedArtworkID(artworkID);

    setShowArtworkCard(true);
  };

  const handleCloseArtworkCard = () => {
    setShowArtworkCard(false);
  };

  const [paintingImage, setPaintingImage] = useState(null);

  const flexFormat = {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "space-evenly",
  };

  return (
    <>
      <div>
        <div>
          <h2 class=" pt-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black flex justify-center">
            Steal Like An Artist
          </h2>

          <p class="pt-2 pl-10 pr-10 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex justify-center">
            Coined by Austin Kleon, 'steal like an artist' highlights how
            artists draw inspiration from each other, creating a continuous flow
            of creativity.{" "}
          </p>
        </div>
        <div>
          <img
            class="h-auto max-w-lg mx-auto flex justify-center"
            src={many_versions_gif}
            alt="Your GIF"
            width="375"
          ></img>
        </div>
      </div>
      <div>
        <div>
          <h2 class="pt-6 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black flex justify-center">
            Use the artwork generator
          </h2>
          <p class="pl-10 pr-10 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex justify-center">
            {" "}
            Indicate your preferred art type and medium. Use the artwork as
            inspiration and mimic materials if they are known.
          </p>
        </div>
        <div>
          <div className="p-4 pb-4 w-100 mt-5n">
            <h5 class="text-lg font-bold dark:text-black flex justify-center">
              {" "}
              Select Artwork Type & Medium{" "}
            </h5>
            <div class="pl-10 pr-10 pt-4 flex justify-center">
              <select
                className="form-control"
                value={ArtworkType}
                style={{ width: "200px", textAlign: "center" }}
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
                style={{ width: "200px", textAlign: "center" }}
                onChange={changeMediumType}
              >
                <option>--Medium--</option>
                {mediums.map((medium) => (
                  <option value={medium}>{medium}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <h5 class="text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black flex justify-center">
        Click on a piece
      </h5>
      <Container style={flexFormat}>
        {artworks.map((artwork) => (
          <img
            class="flex justify-center"
            key={artwork.id}
            src={`https://www.artic.edu/iiif/2/${artwork.image}/full/200,/0/default.jpg`}
            onClick={() => handleArtworkClick(artwork.id)}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              maxWidth: "300px",
              height: "auto",
            }}
          />
        ))}
      </Container>
      {showArtworkCard && (
        <ArtworkCard
          artworkID={selectedArtworkID}
          handleClose={handleCloseArtworkCard}
        />
      )}
    </>
  );
}
