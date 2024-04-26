// import { useEffect, useState } from "react";
// import { Box, Button, ButtonGroup, Modal } from "@mui/material";
// import { NavLink } from "react-router-dom";
// import config from "../config.json";

// const url = `http://${config.server_host}:${config.server_port}`;

// export default function ArtistCard({ artistID, handleClose }) {
//   const [artistInfo, setArtistInfo] = useState({});

//   useEffect(() => {
//     const fetchArtistInfo = async () => {
//       try {
//         const response = await fetch(`${url}/artist_bio/${artistID}`); //change fetch
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setArtistInfo(data);
//       } catch (error) {
//         console.error("Error fetching artwork info:", error);
//       }
//     };
//     fetchInfo();
//   }, [artistID]);

//   return (
//     <Modal
//       open={true}
//       onClose={handleClose}
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         // alignItems: "center",
//       }}
//     >
//       <Box
//         p={3}
//         style={{
//           background: "white",
//           borderRadius: "16px",
//           border: "2px solid #000",
//           width: 600,
//         }}
//       >
//         <div>
//           <h2 class="text-2xl font-style:font-bold dark:text-black">
//             {artistInfo.name}
//           </h2>
//           <p class="font-normal text-gray-500">{artistInfo.bio}</p>
//         </div>
//         <Button onClick={handleClose}>Close</Button>
//       </Box>
//     </Modal>
//   );
// }
