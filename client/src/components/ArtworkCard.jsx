import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { NavLink } from "react-router-dom";
import config from "../config.json";

const url = `http://${config.server_host}:${config.server_port}`;

export default function ArtworkCard({ artworkID, handleClose }) {
  const [artworkInfo, setArtworkInfo] = useState({});
  const [artworkMaterials, setArtworkMaterials] = useState([]);

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
        <img
          src={`https://www.artic.edu/iiif/2/${artworkInfo.image}/full/200,/0/default.jpg`}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            width: "500px",
            height: "500px",
          }}
        />
        <h2 class="text-2xl 	font-style: italic font-bold dark:text-white">
          {artworkInfo.title}
        </h2>
        <h4>{artworkInfo.year ? artworkInfo.year : "Unknown Year"}</h4>
        <h4>
          Artist: {artworkInfo.artist ? artworkInfo.artist : "Unknown Artist"}
        </h4>
        <h2 class="pt-2 font-bold">Materials:</h2>
        <ul>
          {artworkMaterials.length === 0 ||
          artworkMaterials[0] === "Unknown" ? (
            <li>Unknown Materials</li> // I think we should add logic that puts this on same line as materials: if its unknown
          ) : (
            artworkMaterials.map((material, index) => (
              <li key={index}>{material.materials}</li>
            ))
          )}
        </ul>

        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}
