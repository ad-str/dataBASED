import { AppBar, Container, Toolbar, Typography } from "@mui/material";
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
  return (
    <AppBar position="static" style={{ background: "transparent" }}>
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <NavText href="/stories" text="The Artist's Story" />
          <NavText href="/map" text="Art Atlas" />
          <NavText href="/" text="ArtBased" isMain />
          <NavText href="/unknown" text="The Nameless" />
          <NavText href="/steal" text='"Steal Like An Arist"' />
        </Toolbar>
      </Container>
    </AppBar>
  );
}