import { useEffect, useState } from "react";
import config from "../config.json";
import { Pagination, Box, Container } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

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
        Art history has gaps. Many talented artists, particularly women and
        people of color, weren't recognized for their work. It might have been
        undervalued or dismissed as folk art. Without proper documentation,
        their stories and contributions faded over time. Museums sometimes label
        these artists as simply "unknown."
      </p>
      <h3 class="text-2xl pl-8 pr-8 font-extrabold flex justify-center">
        Explore below to break from the traditional focus on the same well-known
        artists!
      </h3>
      <Container sx={flexFormat}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {artworks.map((artwork) => (
          <ImageListItem
            key={artwork.id}
          >
            {
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image}/full/200,/0/default.jpg`}
                alt={`${artwork.title} Artwork`}
                style={{ cursor: "pointer", marginRight: "10px" }}
                loading="lazy"
              />
            }
          <ImageListItemBar position="below" title={artwork.title}/>
        </ImageListItem>
        ))}
        </ImageList> 
      </Container>
      <Box display="flex" justifyContent="center">
          <Pagination
            count = {79}
            onChange= {handlePageChange}
          />     
        </Box> 
    </>
  );
}

/*B- grabbing images
It would be nice to have the artwork pop up. At a minimum, the image should 
link to a new page. Using this tutorial as a starter:
https://www.codedaily.io/tutorials/Create-a-Modal-Route-with-Link-and-Nav-State-in-React-Router

If we have time to make it sexy, we can use this site as reference:
https://mui.com/material-ui/react-image-list/ */
