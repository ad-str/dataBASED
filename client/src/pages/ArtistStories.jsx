import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import config from "../config.json";
const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtistStories() {
  return (
    <>
      <h2>What can we learn from artists?</h2>
      <p>
        Artist biographies offer a unique window into the minds and hearts of
        creative individuals. By delving into their life stories, we can glean
        valuable lessons that go beyond simply appreciating their art.
      </p>
    </>
  );
}
