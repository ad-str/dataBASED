import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ArtworkCard from "../components/ArtworkCard";
import axios from "axios";
import { Slider, Typography, Button } from "@mui/material";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtAtlas() {
  const [artworks, setArtworks] = useState([]);
  const [activeCountry, setActiveCountry] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [yearRange, setYearRange] = useState([1900, 2023]);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  const handleCountryClick = async (countryName) => {
    setActiveCountry(countryName);
    const [startYear, endYear] = yearRange.toString().split(",");
    try {
      const response = await axios.get(`${url}/map`, {
        params: {
          country: countryName,
          startYear: startYear,
          endYear: endYear,
        },
      });
      setArtworks(response.data);
    } catch (error) {
      setArtworks([]);
      console.error("Failed to fetch artworks", error);
    }

    try {
      const response = await axios.get(`${url}/top-artists`, {
        params: {
          country: countryName,
          startYear: startYear,
          endYear: endYear,
        },
      });
      setTopArtists(response.data);
    } catch (error) {
      setTopArtists([]);
      console.error("Failed to fetch top artists", error);
    }
  };

  const handleArtworkClick = (artworkID) => {
    setSelectedArtworkID(artworkID);
    setShowArtworkCard(true);
  };

  const handleCloseArtworkCard = () => {
    setShowArtworkCard(false);
  };

  const countryStyles = (countryName) => ({
    default: {
      fill: countryName === activeCountry ? "#E42" : "#4ba44a", // Active country gets a different fill
      stroke: "#FFFFFF",
      strokeWidth: 0.75,
      outline: "none",
    },
    hover: {
      fill: "#F53",
      stroke: "#FFFFFF",
      strokeWidth: 1.5,
      outline: "none",
    },
    pressed: {
      fill: "#E42",
      stroke: "#FFFFFF",
      strokeWidth: 1.5,
      outline: "none",
    },
  });

  const handleMouseMove = (event) => {
    // reference to the map container
    const mapContainer = event.currentTarget; 
    // bounding rectangle of the map container
    const rect = mapContainer.getBoundingClientRect(); 

    setMousePosition({
      // subtract the left and right position of the container
      x: event.clientX - rect.left, 
      y: event.clientY - rect.top, 
    });
  };

  const handleMouseEnter = (countryName) => {
    setHoveredCountry(countryName);
  };

  const handleMouseLeave = () => {
    setHoveredCountry("");
  };

  const handleSliderChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handleSliderChangeCommitted = (event, newValue) => {
    //  update the artworks based on the selected year range
    if (activeCountry) {
      handleCountryClick(activeCountry);
    }
  };

  const regenerateArtworks = () => {
    handleCountryClick(activeCountry);
  };

  return (
    <>
      <h1 class="pt-4 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black flex justify-center">
        Art Atlas
      </h1>

      <p class="pt-2 pl-8 pr-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex justify-center">
        Unveil hidden connections between art and geography, get a new
        perspective on art history, or plan your own art adventure.
      </p>

      {/* The slider container */}
      <div class="m-5">
        <p
          id="range-slider"
          class="pl-4 pr-4 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-700 flex justify-center"
        >
          Year Range
        </p>
        <Slider
          getAriaLabel={() => "Year range"}
          value={yearRange}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          valueLabelDisplay="auto"
          min={-5800}
          max={2023}
          step={1}
          marks={[
            { value: -5800, label: "-5800" },
            { value: 2023, label: "2023" },
          ]}
        />
        <p class="pl-4 pr-4 text-lg font-normal text-gray-700 lg:text-xl dark:text-gray-700 flex justify-center">
          Selected range: {yearRange[0]} to {yearRange[1]}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          height: "100%",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 3,
            position: "relative",
            backgroundColor: "#98d0ef",
            padding: "5px",
            boxSizing: "border-box",
            borderRadius: "60px",
          }}
          onMouseMove={handleMouseMove}
        >
          <ComposableMap class="p-6">
            <Geographies geography="/features.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo.properties.name)}
                    onMouseEnter={() => handleMouseEnter(geo.properties.name)}
                    onMouseLeave={handleMouseLeave}
                    style={countryStyles(geo.properties.name)}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
          {hoveredCountry && (
            <div
              style={{
                position: "absolute",
                left: `${mousePosition.x + 10}px`,
                top: `${mousePosition.y + 10}px`,
                pointerEvents: "none",
                zIndex: 9999,
                padding: "5px",
                background: "white",
                border: "1px solid black",
                borderRadius: "3px",
                fontSize: "0.9em",
                outline: "none",
              }}
            >
              {hoveredCountry}
            </div>
          )}
        </div>

        {/* Top Artists Section */}
        {artworks.length != 0 && (
          <div
            style={{
              flex: 1,
              width: "100%",
              maxWidth: "800px",
              margin: "20px",
              flexDirection: "column",
            }}
          >
            <h1
              class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"
              style={{ fontSize: "30px", margin: "20px" }}
            >
              Prominent Artists in {activeCountry} during this period:
            </h1>
            <ul>
              {topArtists.map((artist) => (
                <li
                  key={artist.name}
                  style={{
                    width: "100%",
                    margin: "20px",
                    flexDirection: "column",
                    fontSize: "20px",
                  }}
                >
                  {artist.name}: {artist.count} pieces
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* The artworks container */}
        <div style={{ flex: 1 }} class="m-4 mt-0">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              id="countryArtworks"
              class="pt-3 mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-black"
            >
              {" "}
              Artworks:{" "}
            </h2>
            {activeCountry && (
              <Button
                style={{ marginLeft: "20px", backgroundColor: "#9ca3af" }}
                variant="contained"
                color="primary"
                onClick={regenerateArtworks}
              >
                Regenerate
              </Button>
            )}
          </div>
          {activeCountry === "" && (
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ">
              Click on any location on the map to get started!
            </p>
          )}
          {artworks.length === 0 && activeCountry && (
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ">
              No artworks found for this country and year range.
            </p>
          )}
          {artworks.map((artwork) => (
            <div key={artwork.id}>
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
                alt={`${artwork.title} Artwork`}
                style={{
                  width: "75%",
                  height: "75%",
                  objectFit: "contain",
                  cursor: "pointer",
                  margin: "30px",
                  marginBottom: "10px",
                  boxShadow: " 0 0 0 5px #98d0ef",
                  borderRadius: "25px",
                }}
                onClick={() => handleArtworkClick(artwork.id)}
              />
              <h4
                key={artwork.id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {artwork.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      <div>
        {showArtworkCard && (
          <ArtworkCard
            artworkID={selectedArtworkID}
            handleClose={handleCloseArtworkCard}
          />
        )}
      </div>
    </>
  );
}
