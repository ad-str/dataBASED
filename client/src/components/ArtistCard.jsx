import { Box, Button, Modal } from "@mui/material";


export default function ArtistCard({ artistInfo, handleClose }) {

  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        p={3}
        style={{
          background: "white",
          borderRadius: "16px",
          border: "2px solid #000",
          width : "1000px",
          height : "500px",
          marginTop : "100px",
          overflowY: "scroll"
        }}
      >
        
        <div>
          <h2 className="text-2xl font-style:font-bold dark:text-black">
            <b>Artist:</b> {artistInfo.name}
          </h2>
          <p
            className="font-normal text-gray-500"
            style={{ marginTop: "10px" }} 
          >
            <b>Biography:</b> {artistInfo.biography}
          </p>
        </div>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
}
