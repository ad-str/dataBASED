import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import config from "../config.json";

export default function ArtAtlas() {
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
    </>
  );
}
