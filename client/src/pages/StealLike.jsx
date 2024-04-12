import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import config from "../config.json";
const url = `http://${config.server_host}:${config.server_port}`;

export default function StealLike() {
  return (
    <>
      <p>
        Coined by Austin Kleon, steal like an aritst is the idea of borrowing
        from what others have crated to create something origina and authentic.
        Use our art generator to indicate which materials you have. Happy art
        making!
      </p>
    </>
  );
}
