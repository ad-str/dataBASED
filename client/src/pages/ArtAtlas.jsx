import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtAtlas() {
  const [artworks, setArtworks] = useState([]);

  // useEffect(() => {
  //   fetch(`${url}/artworks-location/united`)
  //     .then((res) => res.json())
  //     .then((resJson) => setLocations(resJson));
  // }, []);

  const handleCountryClick = async (countryName) => {
    try {
      const response = await axios.get(`${url}/map/${countryName}`);
      setArtworks(response.data);
    } catch (error) {
      console.error("Failed to fetch artworks", error);
    }
  };

  return (
    <>
      <h2>What's beautiful about getting to know art through a map?</h2>
      <h3>Unveiling hidden connections:</h3>
      <p>
        Identifying specific artists across geographical locations can reveal
        surprising connections, perhaps a shared or the evolution of a style as
        it traveled through borders.
      </p>
      <h3>A new perspective on art history:</h3>
      <p>
        Maps can challenge the traditional, Eurocentric view of art history. By
        showcasing art from all corners of the world, it allows you to see the
        richness and diversity of artistic expression throughout time.
      </p>
      <h3>Planning your own art adventure:</h3>
      <p>
        See artistic hubs you might not have known abou and build a unique
        travel experince where you can follow a trail of art across specific
        region{" "}
      </p>

      {/*  Commented out temporarily
      <div>
        <h4>Artworks from the United States:</h4>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location.name}</li>
          ))}
        </ul>
      </div> */}

      {/* <h2>View different artwork globally on our interactive map!</h2> */}

      {/* 
      //TODO 
      Necessary:
      -make Name of country text slightly more to left or addd hover feature for name 
      -add image url to either hover or display to the right and left of the map
      -add css styling to color map a preferred colorm, can reference all elements by className = allPaths
      
      Nice to have:
      -Find out how to make map bigger and allow a user to scroll down to use

      */}

      <div id="name">
        <h2 id="countryName">Name of Country :</h2>
        <h2 id="countryArtworks">Artworks :
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
        </h2>
      </div>

      {/* <div id="timeCont">
            <p id="time">Time</p>
          </div> */}

      <div>
        <ComposableMap>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleCountryClick(geo.properties.name)}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
}
