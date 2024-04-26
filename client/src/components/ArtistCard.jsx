import { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { NavLink } from "react-router-dom";
import config from "../config.json";


export default function ArtistCard({artistInfo, handleClose }) {

  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Box
        p={3}
        style={{
          background: "white",
          borderRadius: "16px",
          border: "2px solid #000",
          width: 600,
          height: "auto",
          justifyContent: "center",

        }}
      >
        
        <div>
        <h2 className="text-2xl font-style:font-bold dark:text-black"> <b>Artist</b> {artistInfo.name}</h2>
         <p className="font-normal text-gray-500"> <b>Bio:</b> {artistInfo.biography}</p>
        </div>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}