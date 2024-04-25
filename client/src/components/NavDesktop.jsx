import { NavLink } from "react-router-dom";
import { Container, Box } from '@mui/material'

export const NavDesktop = () => {
  return (
    <Container className="hidden lg:flex lg:items-center gap-5 text-sm">
      <Box>
          <NavLink to="/"
          > </NavLink>
          <NavLink to="/home" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > ArtBased </NavLink>
          <NavLink to="/map" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > Art Map </NavLink>
          <NavLink to="/nameless" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > Nameless Artists </NavLink>
          <NavLink to="/steal" className="flex items-center gap-1 hover:text-neutral-400 transition-all"
          > Steal Like An Artist </NavLink>
      </Box>
    </Container>
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