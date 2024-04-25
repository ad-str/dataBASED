import { NavLink } from "react-router-dom";
import { routes } from "../routes";
import { Container, Toolbar } from "@mui/material";

function NavText({ href, text, isMain }) {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}

export const NavDesktop = () => {
  return (
    <ul className="hidden lg:flex lg:items-center gap-5 text-sm">
      {routes.map((route) => {
        const { href, title } = route;
        return (
          <li>
            <a
              href={href}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all"
            >
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

/*
export const NavDesktop = () => {
  return (
    <ul className="hidden lg:flex lg:items-center gap-5 text-sm">
      <Container>
        <Toolbar>
          <NavText href='/' text='ArtBased' isMain />
          <NavText href='/map' text='Art Atlas'/>
          <NavText href='/nameless' text='Nameless Artists'/>
          <NavText href='/steal' text='Steal Like An Artist' />
        </Toolbar>
      </Container>
    </ul>
  );
};
*/