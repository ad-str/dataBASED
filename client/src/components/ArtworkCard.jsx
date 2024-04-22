import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { NavLink } from "react-router-dom";
import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtworkCard({ artworkID, handleClose }) {
  const [artworkInfo, setArtworkInfo] = useState({});
  const [artworkMaterials, setArtworkMaterials] = useState({});

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     try {
  //       const response = await fetch(`${url}/artwork_description/${artworkID}`);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setArtworkInfo(data);
  //     } catch (error) {
  //       console.error("Error fetching artwork info:", error);
  //     }
  //   };

  //   fetchInfo();
  // }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        console.log("Artwork ID for materials:", artworkID);
        const response = await fetch(`${url}/artwork_materials/${artworkID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworkMaterials(data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [artworkID]);

  const [isArtworkInfoFetched, setIsArtworkInfoFetched] = useState(false);

  //   useEffect(() => {
  //     const fetchInfo = async () => {
  //       try {
  //         const response = await fetch(`${url}/artwork_description/${artworkID}`);
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //         setArtworkInfo(data);
  //         setIsArtworkInfoFetched(true);
  //       } catch (error) {
  //         console.error("Error fetching artwork info:", error);
  //       }
  //     };

  //     fetchInfo();
  //   }, [artworkID]);

  //   useEffect(() => {
  //     if (isArtworkInfoFetched && artworkID) {
  //       const fetchMaterials = async () => {
  //         try {
  //           console.log("Artwork ID for materials:", artworkID);
  //           const response = await fetch(`${url}/artwork_materials/${artworkID}`);
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok");
  //           }
  //           const data = await response.json();
  //           setArtworkMaterials(data);
  //         } catch (error) {
  //           console.error("Error fetching materials:", error);
  //         }
  //       };

  //       fetchMaterials();
  //     }
  //   }, [artworkID, isArtworkInfoFetched]);

  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        p={3}
        style={{
          background: "white",
          borderRadius: "16px",
          border: "2px solid #000",
          width: 600,
        }}
      >
        <h2>{artworkInfo.title}</h2>
        <h2>Materials: {artworkMaterials.title}</h2>
        <h4>Artist: {artworkInfo.artist}</h4>
        <h4>Year: {artworkInfo.year}</h4>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}
