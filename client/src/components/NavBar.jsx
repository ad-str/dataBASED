/*import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";

function NavText({ href, text, isMain }) {
  return (
    <Typography
      variant={isMain ? "h5" : "h7"}
      noWrap
      style={{
        marginRight: "30px",
        fontFamily: "Fira Sans",
        fontWeight: "bold",
        //color: "inherit",
        textDecoration: "none",
        // letterSpacing: ".3rem",
      }}
    >
      <NavLink
        to={href}
        style={{
          color: "black",
          textDecoration: "none",
        }}
      >
        {text}
      </NavLink>
    </Typography>
  );
}
// Need to decide // change name of website
export default function NavBar() {
  const theme = useTheme();
  return (
    <AppBar position="static" style={{ background: "transparent" }}>
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <NavText href="/" text="ArtBased" isMain />
          <NavText href="/map" text="Art Map" />
          <NavText href="/nameless" text="Nameless Artists" />
          <NavText href="/steal" text="Steal Like An Artist" />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
*/

import { NavMobile } from "./NavMobile";
import { NavDesktop } from "./NavDesktop";

export const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-neutral-950 border-b border-neutral-700">
      <nav className="container flex items-center justify-between py-1 lg:py-5">
        <span className="text-lg">ArtBased⚡️</span>
        <NavMobile />
        <NavDesktop />
      </nav>
    </div>
  );
};