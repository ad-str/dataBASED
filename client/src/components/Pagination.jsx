import { Pagination, Container } from "@mui/material";
import { useEffect, useState } from "react";
// import Service from "../components/Service";
import config from "../config.json";

const pageSize = 10;
const flexFormat = { display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' };
const url = `http://${config.server_host}:${config.server_port}`;

export default function AppPagination({setArtworks}) {
    
    const [artworkCount, setArtworkCount] = useState([]);
    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    });

    useEffect(() => {
        const fetchArtworks = async ({from, to}) => {
            try {
              const response = await fetch(`${url}/unknownArtists`);
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              const data = await response.json();
              const slicedArtworks = data.slice(from, to);
              setArtworks(slicedArtworks);
              setArtworkCount(data.length);
              setPagination({...pagination, count: artworkCount});
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

        fetchArtworks({from: pagination.from, to: pagination.to});
      }, [pagination.from, pagination.to]);

    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination({ ...pagination, from: from, to: to});
    }

    return(
        <Container style={flexFormat}>
            <Pagination
                count = {Math.ceil(pagination.count/pageSize)}
                onChange= {handlePageChange}
            /> 
                
        </Container>
        
    );
};