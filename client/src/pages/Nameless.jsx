import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import config from "../config.json";
import { Box, Container } from '@mui/material';
//import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
//import { DataGrid } from '@mui/x-data-grid';

const url = `http://${config.server_host}:${config.server_port}`;

export default function Nameless() {
  const [artworks, setArtworks] = useState([]);
  //const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${url}/unknownArtists`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArtworks();
  }, []);

  //flexFormat for a UI friendly page formatting
  const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };


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
      <Container style={flexFormat}>
        {artworks.map((artwork) => (
          <Box
          key={artwork.id}
          p={3}
          m={2}
          style={{ background: 'white', borderRadius: '16px', border: '2px solid #000' }}
        >
          {
          <img
            src={`https://www.artic.edu/iiif/2/${artwork.image}/full/200,/0/default.jpg`}
            alt={`${artwork.title} Artwork`}
          />
          }
          <h4 key={artwork.id}> <NavLink to={`/artwork/${artwork.id}`}>{artwork.title}</NavLink></h4>
          </Box>
        ))}
      </Container>
    </>
  );

  /*B- implementing page size
The code snippet uses DataGrid. It might be helpful to use LazyTable component instead?

  <Container>
  <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
  </Container>
  */ 
}

/*B- grabbing images
It would be nice to have the artwork pop up. At a minimum, the image should 
link to a new page. Using this tutorial as a starter:
https://www.codedaily.io/tutorials/Create-a-Modal-Route-with-Link-and-Nav-State-in-React-Router

If we have time to make it sexy, we can use this site as reference:
https://mui.com/material-ui/react-image-list/ */