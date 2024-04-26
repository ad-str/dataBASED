import { useEffect, useState } from "react";
import config from "../config.json";
import { Pagination, Box, Container } from "@mui/material";

/**
 * Handy video guide to material UI pagination!
 * https://www.youtube.com/watch?v=37xPlDBaA4A
 */
const pageSize = 10;
import ArtworkCard from "../components/ArtworkCard";

const url = `http://${config.server_host}:${config.server_port}`;

export default function Nameless() {
  const [artworks, setArtworks] = useState([]);
  const [showArtworkCard, setShowArtworkCard] = useState(false);
  const [selectedArtworkID, setSelectedArtworkID] = useState(null);
  const [artworkCount, setArtworkCount] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    const fetchArtworks = async ({ from, to }) => {
      try {
        const response = await fetch(`${url}/unknownArtists`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const slicedArtworks = data.slice(from, to);
        setArtworks(slicedArtworks);
        setArtworkCount(data.length);
        setPagination({ ...pagination, count: artworkCount });
      } catch (error) {
        console.error("Error fetching unknown artists:", error);
      }
    };

    fetchArtworks({ from: pagination.from, to: pagination.to });
  }, [pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  };

  const handleArtworkClick = (artworkID) => {
    setSelectedArtworkID(artworkID);

    setShowArtworkCard(true);
  };

  const handleCloseArtworkCard = () => {
    setShowArtworkCard(false);
  };

  //flexFormat for a UI friendly page formatting
  const flexFormat = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };

  // error fetching artwork description
  return (
    <>
      <h1 class="pt-8 mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black flex justify-center">
        Why Art History Needs a Rewrite
      </h1>
      <p class="pl-8 pr-8 pb-4 flex jtext-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 flex justify-centerustify-center">
        The art world hasn't always been a welcoming space. Throughout history,
        prejudice and bias have denied recognition to talented artists,
        particularly women and people of color. Their work might have been
        dismissed as "folk art," or simply not valued. Without proper records or
        critical analysis, these artists' legacies faded, their stories lost to
        time. Museums exhibit often label these artists as 'unkown.'"
      </p>
      <h3 class="pl-8 pr-8 font-extrabold flex justify-center">
        Explore below to break from the traditional focus on the same well-known
        artists!
      </h3>
      <Container style={flexFormat}>
        {artworks.map((artwork) => (
          <Box
            key={artwork.id}
            p={3}
            m={2}
            style={{
              background: "white",
              borderRadius: "16px",
              border: "2px solid #000",
            }}
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
      </Container>
      <Box display="flex" justifyContent="center">
        <Pagination count={79} onChange={handlePageChange} />
      </Box>
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
