import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtAtlas() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`${url}//artworks-location/united`)
      .then((res) => res.json())
      .then((resJson) => setLocations(resJson));
  }, []);
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
      <div>
        <h4>Artworks from the United States:</h4>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
