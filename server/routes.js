const mysql = require("mysql");
const config = require("./config.json");

// Creates MySQL connection using database credential provided in config.json
// If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect((err) => err && console.log(err));

// GET /author/:type
const author = async function (req, res) {
  
  const team = "dataBASED";
  const names =
    "Adam Streff, Brianna Malcolm, Daunel Augustin and Veronica Polanco";
  // checks the value of type the request parameters
  if (req.params.type === "team") {
    // res.send returns data back to the requester via an HTTP response
    res.send(`Created by ${team}`);
  } else if (req.params.type === "names") {
    res.send(`Created by ${names}`);
  } else {
    // improper request
    res
      .status(400)
      .send(
        `'${req.params.type}' is not a valid author type. Valid types are 'team' and 'names'.`
      );
  }
};


// Route: GET /random
const random = async (req, res) => {
  connection.query(
    `
    SELECT image_id 
    FROM Artwork 
    WHERE image_id IS NOT NULL 
    ORDER BY RAND() 
    LIMIT 0,1`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching random image:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        const imageId = data[0].image_id;
        res.json(imageId);
      }
    }
  );
};

//  GET /artwork/:id
// given an id, returns image id, for testing purposes
const artwork = async (req, res) => {
  connection.query(
    `
    SELECT image_id
    FROM Artwork 
    WHERE id = '${req.params.id}'
    `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching image IDs:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        const imageId = data[0].image_id;
        res.json(imageId);
      }
    }
  );
};

// GET /artist_descriptors/:artist_id
const artist_descriptors = async (req, res) => {
  connection.query(
    `SELECT descriptor_type, descriptor_title, MAX(count) AS mcount
    FROM (
        SELECT D.aspect AS Descriptor_Type, D.title AS Descriptor_Title, COUNT(*) AS count
        FROM Artist AS A
        JOIN Made M ON A.id = M.artist_id
        JOIN Descriptor D ON M.artwork_id = D.artwork_id
        WHERE A.id = ${req.params.artist_id}
        GROUP BY D.aspect, D.title
         ) AS a
    GROUP BY descriptor_type
    ORDER BY descriptor_type`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching artist descriptors:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET /era_descriptors/:start_year/:end_year
const era_descriptors = async (req, res) => {
  connection.query(
    `WITH DescriptorCounts AS (
      SELECT
          D.aspect AS Descriptor_Type,
          D.title AS Descriptor_Title,
          CAST(COUNT(*) AS FLOAT) / SUM(COUNT(*)) OVER(PARTITION BY D.aspect) AS Fraction
      FROM Artwork A
      JOIN Descriptor D ON A.id = D.artwork_id
      WHERE A.start_year >= ${req.params.start_year} AND A.end_year <= ${req.params.end_year}
      GROUP BY D.aspect, D.title
    )
    SELECT
        Descriptor_Type,
        Descriptor_Title,
        Fraction
    FROM DescriptorCounts
    WHERE Fraction > 0.05
    ORDER BY Descriptor_Type, Fraction DESC`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching era descriptors:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET /proportion_unknown
const proportion_unknown = async (req, res) => {
  connection.query(
    `SELECT
      A.country AS Country,
      SUM(IF(M.artist_id IS NULL, 1, 0)) AS Artworks_Without_Artist,
      COUNT(A.id) AS Total_Artworks,
      (SUM(IF(M.artist_id IS NULL, 1, 0)) / COUNT(A.id)) * 100 AS Proportion_Unknown_Artist
    FROM Artwork A
    LEFT JOIN Made M ON A.id = M.artwork_id
    GROUP BY A.country
    HAVING Total_Artworks > 0
    ORDER BY Proportion_Unknown_Artist DESC`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching proportion unknown:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};


// GET /top_artists 
const top_artists = async (req, res) => {
  const country = req.query.country;
  const startYear = req.query.startYear;
  const endYear = req.query.endYear;

  connection.query(
    `SELECT AR.name as name, COUNT(AT.id) as count
    FROM Artwork AT
    JOIN Made M ON M.artwork_id = AT.id
    JOIN Artist AR ON AR.id = M.artist_id
    WHERE AT.country = '${country}'  AND AR.name NOT LIKE  'Artist unknown'
    AND AR.birth_year <= ${endYear} AND AR.death_year >= ${startYear}
    GROUP BY AR.name
    ORDER BY COUNT(AR.id) DESC
    LIMIT 5;
`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching artworks location:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET /map
// Given a country and a year range, return artworks where the year range overlaps with the specified range in the query
const map_country = async (req, res) => {
  const country = req.query.country;
  const startYear = req.query.startYear;
  const endYear = req.query.endYear;
  connection.query(
    `SELECT title, id, image_id
    FROM Artwork
    WHERE country = '${country}' 
    AND image_id IS NOT NULL 
    AND start_year <= ${endYear} 
    AND end_year >= ${startYear}
    ORDER BY RAND()
    LIMIT 3`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching map country:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET colorful_artists/:colorfulness
const colorful_artists = async (req, res) => {
  const colorfulnessHigh = req.query.colorfulnessHigh ? req.query.colorfulnessHigh : 100;
  const colorfulnessLow = req.query.colorfulnessLow ? req.query.colorfulnessLow  : 50;

  connection.query(
    `SELECT AR.id, AR.image_id
    FROM Artist AS AT
    JOIN Made AS M ON M.artist_id = AT.id
    JOIN Artwork AS AR ON AR.id = M.artwork_id
    WHERE AR.image_id IS NOT NULL
      AND AT.id IN (
        SELECT Artist.id
        FROM Artist
        JOIN Made ON Made.artist_id = Artist.id
        JOIN Artwork ON Artwork.id = Made.artwork_id
        WHERE Artwork.image_id IS NOT NULL
        GROUP BY Artist.id
        HAVING AVG(Artwork.colorfulness) <= ${colorfulnessHigh} AND AVG(Artwork.colorfulness) >= ${colorfulnessLow} 
      )
    ORDER BY RAND()
    LIMIT 4;
`,
    (err, data) => {
      //return empty array for ranges where there are no artist
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching colorful artists:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET featured_artists/:colorfulnessHigh/:colorfulnessLow
const featured_artists = async (req, res) => {
  const colorfulnessHigh = req.query.colorfulnessHigh ? req.query.colorfulnessHigh : 100;
  const colorfulnessLow = req.query.colorfulnessLow ? req.query.colorfulnessLow  : 0;

  // fetches artists bios who are not well known by default when user does not query for color
  if (colorfulnessLow === 0 && colorfulnessHigh ===100){

    
    connection.query(
    `SELECT Artist.name AS name, COUNT(Artwork.id) AS counts, Artwork.country as country, Artist.biography
FROM Artist
JOIN Made ON Made.artist_id = Artist.id
JOIN Artwork ON Artwork.id = Made.artwork_id
WHERE Artist.biography IS NOT NULL
GROUP BY Artist.name, Artwork.country
HAVING COUNT(Artwork.id) <= 10
ORDER BY
RAND() LIMIT 5;
`,
    (err, data) => {
      //return empty array for ranges where there are no artist
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching colorful artists:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );

 
}else{

  // do colorful artist with artist bios if user selects colorfulness options

    connection.query(
    `SELECT AR.id, AR.image_id, AT.biography, AT.name, AR.country
    FROM Artist AS AT
    JOIN Made AS M ON M.artist_id = AT.id
    JOIN Artwork AS AR ON AR.id = M.artwork_id
    WHERE AR.image_id IS NOT NULL
      AND AT.id IN (
        SELECT Artist.id
        FROM Artist
        JOIN Made ON Made.artist_id = Artist.id
        JOIN Artwork ON Artwork.id = Made.artwork_id
        WHERE Artwork.image_id IS NOT NULL AND Artist.biography IS NOT NULL
        GROUP BY Artist.id
        HAVING AVG(Artwork.colorfulness) <= ${colorfulnessHigh} AND AVG(Artwork.colorfulness) >= ${colorfulnessLow} 
      )
    ORDER BY RAND()
    LIMIT 5;
`,
    (err, data) => {
      //return empty array for ranges where there are no artist
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching colorful artists:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );

}
}


// Route: GET /unknown_artists
/*This is a dedicated page for unknown artists. It showcases ones within the last
century. This route implements page functionality for simplified browsing*/
const unknown_artists = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ? req.query.page_size : 10; // default 10 items per page
  const offset = (page - 1) * pageSize; // calculates the appropriate offset amount based on selected page
  const lastCentury = req.query.last_century ?? 1900;

  if (!page) {
    // page not specified
    connection.query(
      `
      WITH MadeArtworkDescriptor AS (
        SELECT art.id AS id, art.image_id AS image, art.title AS title, art.end_year AS year,	art.country AS Location, D.title AS style
        FROM Artwork art
        LEFT JOIN Made made ON art.id = made.artwork_id
        JOIN Descriptor D ON art.id = D.artwork_id
        WHERE D.aspect = 'style' AND made.artist_id is NULL
    )
    SELECT DISTINCT id, image, title, location, year
    FROM MadeArtworkDescriptor
    WHERE year > ${lastCentury} AND image IS NOT NULL
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          console.error("Error fetching unknown artists:", err);
          res.status(500).json({ err: "Internal Server Error" });
        } else {
          res.json(data);
        }
      }
    );
  } else {
    // specified pages
    connection.query(
      `
      WITH MadeArtworkDescriptor AS (
        SELECT art.id AS id, art.image_id AS image, art.title AS title, art.end_year AS year,	art.country AS Location, D.title AS style
        FROM Artwork art
        LEFT JOIN Made made ON art.id = made.artwork_id
        JOIN Descriptor D ON art.id = D.artwork_id
        WHERE D.aspect = 'style' AND made.artist_id is NULL
    )
    SELECT DISTINCT id, image, title, location, year
    FROM MadeArtworkDescriptor
    WHERE year > ${lastCentury} AND image IS NOT NULL    
      LIMIT ${pageSize}
      OFFSET ${offset}
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          console.error("Error fetching unknown artists:", err);
          res.status(500).json({ err: "Internal Server Error" });
        } else {
          res.json(data);
        }
      }
    );
  }
};

/* Given an artworkID get materials */
const artwork_materials = async (req, res) => {
  const artworkID = req.params.artwork_id;

  connection.query(
    `SELECT title AS materials
    FROM Descriptor
    WHERE aspect = 'material' AND artwork_id = ${artworkID}`,
    (err, data) => {
      if (err) {
        console.error("Error fetching artwork materials:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (data.length === 0) {
        res.status(404).json({ error: "No materials found" });
        return;
      }
      res.json(data);
    }
  );
};

// Route: GET /artwork_description/:artwork_id
/* Given an artworkID, get info about piece */
const artwork_description = async (req, res) => {
  const artworkId = req.params.artwork_id;
  connection.query(
    `SELECT AT.title AS title, D.title AS materials, AT.end_year AS year, AR.name AS artist, AT.image_id AS image
    FROM Descriptor AS D
    JOIN Artwork AS AT ON AT.id = D.artwork_id
    JOIN Made AS M ON M.artwork_id = AT.id
    JOIN Artist AS AR ON AR.id = M.artist_id
    WHERE AT.id = ${artworkId}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching artwork description:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// Route: GET /three_artworks/:artworkType/:medium
/* Given an artwork type and medium, get 3 pieces */
const three_artworks = async (req, res) => {
  const artworkType = req.params.artworkType;
  const medium = req.params.medium;

  connection.query(
    `SELECT AT.id AS id, AT.image_id AS image
    FROM Artwork AT
    JOIN Descriptor D1 ON D1.artwork_id = AT.id
    JOIN Descriptor D2 ON D2.artwork_id = AT.id
    WHERE D1.aspect = 'artwork_type' AND D1.title = '${artworkType}' AND D2.aspect = 'classification' AND D2.title LIKE '%${medium}%' AND AT.image_id IS NOT NULL
    ORDER BY RAND()
    LIMIT 3`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching 3 artworks:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

module.exports = {
  author, //for home page
  random, //for home page
  artwork, //selects images for a specifc ID
  artist_descriptors, // unused for now
  era_descriptors, // unused for now
  proportion_unknown, // unused for now
  top_artists, //for ArtAtlas
  colorful_artists, //for home page 
  unknown_artists, // for Nameless page
  artwork_materials, //for Steal Like An Artist
  artwork_description, //for Steal Like An Artist
  three_artworks, //for Steal Like An Artist
  map_country, //for ArtAtlas
  featured_artists, //gets featured artists for home page
};
