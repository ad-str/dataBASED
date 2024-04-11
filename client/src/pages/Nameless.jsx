import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import config from "../config.json";

export default function Nameless() {
  return (
    <>
      <h2>Why Art History Needs a Rewrite</h2>
      <p>
        The art world hasn't always been a welcoming space. Throughout history,
        prejudice and bias have denied recognition to talented artists,
        particularly women and people of color. Their captivating work might
        have been dismissed as mere "folk art," hidden away in private
        collections or simply not valued by the dominant art establishment.. But
        the true tragedy lies beyond their initial exclusion. Without proper
        records or critical analysis, these artists' legacies faded, their
        stories lost to time. In museums, exhibit labels often bear a silent
        testament to this injustice: "unknown."
      </p>
    </>
  );
}
