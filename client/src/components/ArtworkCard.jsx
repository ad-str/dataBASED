import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { NavLink } from "react-router-dom";
import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtworkCard({ artworkID, handleClose }) {
  const [artworkImageId, setArtworkImageId] = useState(0);
  const [artworkInfo, setArtworkInfo] = useState([]);
  const [artworkMaterials, setArtworkMaterials] = useState([]);
  const title = artworkInfo.length > 0 ? artworkInfo[0].title : "Unknown Title";
  const year = artworkInfo.length > 0 && artworkInfo[0].year ? artworkInfo[0].year : "Unknown Year";
  const artist = artworkInfo.length > 0 && artworkInfo[0].artist ? artworkInfo[0].artist : "Unknown Artist";


  useEffect(() => {
    const fetchImageId = async () => {
      try {
        const response = await fetch(`${url}/artwork/${artworkID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworkImageId(data);
        console.log("Artwork image ID:", data);
      } catch (error) {
        console.error("Error fetching artwork image:", error);
      }
    };

    fetchImageId();
  }, [artworkID]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`${url}/artwork_description/${artworkID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworkInfo(data);
      } catch (error) {
        console.error("Error fetching artwork info:", error);
      }
    };

    fetchInfo();
  }, [artworkID]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        console.log("Artwork ID for materials:", artworkID);
        const response = await fetch(`${url}/artwork_materials/${artworkID}`);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) {
            setArtworkMaterials(["Unknown"]);
          } else {
            throw new Error(data.error || "Error fetching materials");
          }
        } else {
          setArtworkMaterials(data);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, [artworkID]);

  const [isArtworkInfoFetched, setIsArtworkInfoFetched] = useState(false);

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
        <div class="d-flex flex-column align-items-center" style={{ maxHeight: '50vh', overflow: 'auto' }}>
          <img
            src={`https://www.artic.edu/iiif/2/${artworkImageId}/full/200,/0/default.jpg`}
            style={{
              cursor: "pointer",
              width: "70%",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "70vh",
            }}
          />
        </div>
        <div class="d-flex flex-column align-items-center">
          <h2 class="text-2xl font-style: italic font-bold dark:text-black">
            {title}
          </h2>
          <h4>
            {year}
          </h4>
          <h4>
            {artist}
          </h4>
        </div>
        <h2 class="pt-2 font-bold">Descriptors:</h2>
        <ul>
          {artworkInfo.length === 0 ||
          artworkInfo[0].materials === "Unknown" ? (
            <li>Unknown Materials</li> // I think we should add logic that puts this on same line as materials: if its unknown
          ) : (
            artworkInfo.map((material, index) => (
              <li key={index}>{material.materials}</li>
            ))
          )}
        </ul>

        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}
