import { useState } from "react";
import config from "../config.json";
import { Button, Box, Container, FormControlLabel, Grid, Link, TextField } from '@mui/material';

import ArtworkCard from '../components/ArtworkCard';
import AppPagination from "../components/Pagination"; //fetches artwork from here

const url = `http://${config.server_host}:${config.server_port}`;

export default function Nameless() {
  const [artworks, setArtworks] = useState([]);
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);

  // this section is for if we can add a search feature
  //const [title, setTitle] = useState('');
  /*
  const search = () => {
    fetch(`${url}/search_artworks?title=${title}`)
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const artworksWithId = resJson.map((artwork) => ({ id: artwork.id, ...artwork }));
        setArtworks(artworksWithId);
      });
  }
*/
  // add a matrials column?
  /*
  const columns = [
    { field: 'title', headerName: 'Title', width: 300, renderCell: (params) => (
      <Link onClick={() => setSelectedArtworkID(params.row.artwork.id)}>{params.value}</Link>
  ) },
  ]
  */

  const handleArtworkClick = (artworkID) => {
    setSelectedArtworkID(artworkID);
    
    setShowArtworkCard(true);
  };

  const handleCloseArtworkCard = () => {
    setShowArtworkCard(false);
  };



  //flexFormat for a UI friendly page formatting
  const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };

// error fetching artwork description
  return (
    <>
      <h1 class="pt-8 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Why Art History Needs a Rewrite
      </h1>
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
            onClick={() => handleArtworkClick(artwork.id)}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          }
          <h4 key={artwork.id}>{artwork.title}</h4>
          </Box>
        ))}
      <AppPagination setArtworks={(a) => setArtworks(a)}/>  
      </Container>
      {showArtworkCard && (
        <ArtworkCard
          artworkID={selectedArtworkID}
          handleClose={handleCloseArtworkCard}
        />
      )}
    </>
  );
}

/*B- grabbing images
It would be nice to have the artwork pop up. At a minimum, the image should 
link to a new page. Using this tutorial as a starter:
https://www.codedaily.io/tutorials/Create-a-Modal-Route-with-Link-and-Nav-State-in-React-Router

If we have time to make it sexy, we can use this site as reference:
https://mui.com/material-ui/react-image-list/ */


  /*B- implementing a search feature
The code snippet uses DataGrid. It might be helpful to use LazyTable component instead?

      {selectedArtworkID && <ArtworkCard artworkID={selectedArtworkID} handleClose={() => setSelectedArtworkID(null)} />}
      <h2>Search Songs</h2>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
      </Grid>
      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <h2>Results</h2>
      <DataGrid
        rows={artworks}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
  */ 
