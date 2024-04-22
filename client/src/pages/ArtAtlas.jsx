import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";

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

  const handleCountryClick = async (countryName) => {
    setActiveCountry(countryName);
    try {
      const response = await axios.get(`${url}/map/${countryName}`);
      setArtworks(response.data);
    } catch (error) {
      console.error("Failed to fetch artworks", error);
    }
  };

  const countryStyles = (countryName) => ({
    default: { 
      fill: countryName === activeCountry ? "#E42" : "#D6D6DA", // Active country gets a different fill
      stroke: "#FFFFFF", 
      strokeWidth: 0.75 
    },
    hover: { 
      fill: "#F53", 
      stroke: "#FFFFFF", 
      strokeWidth: 1.5 
    },
    pressed: { 
      fill: "#E42", 
      stroke: "#FFFFFF", 
      strokeWidth: 1.5 
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '80vh' }}>
      {/* The map container */}
      <div style={{ flex: 3, position: 'relative' }} onMouseMove={handleMouseMove}>
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
            fontSize: '0.9em'
          }}>
            {hoveredCountry}
          </div>
        )}
      </div>

      {/* The artworks container */}
      <div style={{ flex: 1, margin: '1rem', overflowY: 'auto', maxHeight: '80vh'}}>
        <h2 id="countryArtworks">Artworks:</h2>
        {artworks.map((artwork) => (
          <div key={artwork.id}>
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`}
              alt={`${artwork.title} Artwork`}
            />
            <h4 key={artwork.id}>
              <NavLink to={`/artwork/${artwork.id}`}>{artwork.title}</NavLink>
            </h4>
          </div>
        ))}
      </div>

    </div>
  );
}
