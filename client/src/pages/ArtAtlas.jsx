import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ArtworkCard from "../components/ArtworkCard";
import axios from "axios";
import { Slider, Typography, Button} from "@mui/material";
//import Slider from 'rc-slider';
//import 'rc-slider/assets/index.css';

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

// old content, unsure if we want to keep:
// <h2>What's beautiful about getting to know art through a map?</h2>
//       <h3>Unveiling hidden connections:</h3>
//       <p>
//         Identifying specific artists across geographical locations can reveal
//         surprising connections, perhaps a shared or the evolution of a style as
//         it traveled through borders.
//       </p>
//       <h3>A new perspective on art history:</h3>
//       <p>
//         Maps can challenge the traditional, Eurocentric view of art history. By
//         showcasing art from all corners of the world, it allows you to see the
//         richness and diversity of artistic expression throughout time.
//       </p>
//       <h3>Planning your own art adventure:</h3>
//       <p>
//         See artistic hubs you might not have known abou and build a unique
//         travel experince where you can follow a trail of art across specific
//         region{" "}
//       </p>

export default function ArtAtlas() {
  const [artworks, setArtworks] = useState([]);
  const [activeCountry, setActiveCountry] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [yearRange, setYearRange] = useState([-5800, 2023]);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);
  const [topArtists, setTopArtists] = useState([]);

  const handleCountryClick = async (countryName) => {
    setActiveCountry(countryName);
    try {
      const [startYear, endYear] = yearRange.toString().split(",");
      const response = await axios.get(`${url}/map`, {
        params: {
          country: countryName,
          startYear: startYear,
          endYear: endYear,
        }
      });
      setArtworks(response.data);

      // gets the top artists for the selected country
      const topArtistsResponse = await axios.get(`${url}/top-artists/${countryName}`);
      setTopArtists(topArtistsResponse.data);
      console.log(topArtistsResponse.data)
    } catch (error) {
      console.error("Failed to fetch artworks", error);
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
      fill: countryName === activeCountry ? "#E42" : "#00c04b", // Active country gets a different fill
      stroke: "#FFFFFF", 
      strokeWidth: 0.75 ,
      outline: "none"
    },
    hover: { 
      fill: "#F53", 
      stroke: "#FFFFFF", 
      strokeWidth: 1.5 ,
      outline: "none"
    },
    pressed: { 
      fill: "#E42", 
      stroke: "#FFFFFF", 
      strokeWidth: 1.5,
      outline: "none"
    }

  });  

  const handleMouseMove = (event) => {
    const mapContainer = event.currentTarget; // Get the reference to the map container
    const rect = mapContainer.getBoundingClientRect(); // Get bounding rectangle of the map container
  
    setMousePosition({
      x: event.clientX - rect.left, // Subtract the left position of the container
      y: event.clientY - rect.top  // Subtract the top position of the container
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
    // Call the function to update the artworks based on the selected year range
    if (activeCountry) {
      handleCountryClick(activeCountry);
    }
  };

  const regenerateArtworks = () => {
    handleCountryClick(activeCountry);
  };

  return (
    <>
      <h1 class="pt-3 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Art Atlas
      </h1>

      {/* The slider container */}
      <div style={{ margin: '10px 0' }}>
        <Typography id="range-slider" gutterBottom>
          Year Range
        </Typography>
        <Slider
          getAriaLabel={() => 'Year range'}
          value={yearRange}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
          valueLabelDisplay="auto"
          min={-5800}
          max={2023}
          step={1}
          marks={[
            { value: -5800, label: '-5800' },
            { value: 2023, label: '2023' }
          ]}
        />
        <Typography>
          Selected range: {yearRange[0]} to {yearRange[1]}
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%',  padding: "10px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
        <div style={{ display: 'flex' ,flex: 3, position: 'relative',  backgroundColor: "blue", padding: "20px", boxSizing: "border-box",  borderRadius: "10px", }} onMouseMove={handleMouseMove}>
          <ComposableMap>
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
            <div style={{
              position: 'absolute',
              left: `${mousePosition.x + 10}px`,
              top: `${mousePosition.y + 10}px`,
              pointerEvents: 'none',
              zIndex: 9999,
              padding: '5px',
              background: 'white',
              border: '1px solid black',
              borderRadius: '3px',
              fontSize: '0.9em',
              outline: 'none'
            }}>
              {hoveredCountry}
            </div>
          )}
        </div>

        {/* The artworks container */}
        <div style={{ flex: 1}} class="m-4 mt-0">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <h2 id="countryArtworks" style={{ marginRight: "30px", fontFamily: "Fira Sans", fontWeight: "bold", fontSize: "2em", textDecoration: "none", }}> Artworks: </h2>
            {activeCountry && <Button style={{marginLeft: '20px'}} variant="contained" color="primary" onClick={regenerateArtworks}>Regenerate</Button>}
          </div>
        {/* <h2 class="text-2xl mb-2 mt-0 text-left leading-none tracking-tight text-gray-900 dark:text-white">Artworks:</h2> */}
        {activeCountry === "" && <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 " >Click on any location on the map to get started!</p>}
        {artworks.length === 0 && activeCountry && <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 ">No artworks found for this country and year range.</p>}
        {artworks.map((artwork) => (
          <div key={artwork.id}>
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
              alt={`${artwork.title} Artwork`}
              style={{ width: "75%", height: "75%", objectFit: "contain" , cursor: "pointer", margin : "30px", marginBottom: "10px"}}
              onClick={() => handleArtworkClick(artwork.id)}
            />
            <h4 key={artwork.id} class="mt-0">
              {artwork.title}
            </h4>
          </div>
        ))}
        </div>
      </div>
      
      {showArtworkCard && (
        <ArtworkCard
          artworkID={selectedArtworkID}
          handleClose={handleCloseArtworkCard}
        />
      )}

      {/* TODO 
      - move this section to be underneath the map
      - delete artists count
      -if  we have time make a bar chart using the counts?
      */}
                        {/* Top Artists Section */}
                        <div style={{ flex: 1, width: '100%', maxWidth: '800px', marginTop: '20px' }}>
        <h2 class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400" >Prominent Artists in {activeCountry}:</h2>
        <ul>
          {topArtists.map((artist) => (
            <li key={artist.name}>
              {artist.name} {artist.count} pieces
            
            </li>
          ))}
        </ul>
        </div>
    </>
  );
}
