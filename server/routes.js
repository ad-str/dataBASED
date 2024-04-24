const mysql = require("mysql");
const config = require("./config.json");

// Creates MySQL connection using database credential provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
});
connection.connect((err) => err && console.log(err));

// Route 1: GET /author/:type
const author = async function (req, res) {
  // TODO (TASK 1): replace the values of name and pennKey with your own
  const team = "dataBASED";
  const names =
    "Adam Streff, Brianna Malcolm, Daunel Augustin and Veronica Polanco";

  // checks the value of type the request parameters
  // note that parameters are required and are specified in server.js in the endpoint by a colon (e.g. /author/:type)
  if (req.params.type === "team") {
    // res.send returns data back to the requester via an HTTP response
    res.send(`Created by ${team}`);
  } else if (req.params.type === "names") {
    res.send(`Created by ${names}`);
  } else {
    // we can also send back an HTTP status code to indicate an improper request
    res
      .status(400)
      .send(
        `'${req.params.type}' is not a valid author type. Valid types are 'team' and 'names'.`
      );
  }
};

// Route: GET /artist
const artist = async function (req, res) {
  connection.query(
    `
    SELECT *
    FROM Artist
    ORDER BY RAND()
    LIMIT 10
  `,
    (err, data) => {
      if (err || data.length === 0) {
        // If there is an error for some reason, or if the query is empty (this should not be possible)
        // print the error message and return an empty object instead
        console.log(err);
        // Be cognizant of the fact we return an empty object {}. For future routes, depending on the
        // return type you may need to return an empty array [] instead.
        console.error("Error fetching artist:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        // return an array of artists
        res.json(data);
      }
    }
  );
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

// Route: GET /artwork/:id
// given an id, returns all information about the artwork
const artwork = async (req, res) => {
  connection.query(
    `
    SELECT * 
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
      A.place_of_origin AS Country,
      SUM(IF(M.artist_id IS NULL, 1, 0)) AS Artworks_Without_Artist,
      COUNT(A.id) AS Total_Artworks,
      (SUM(IF(M.artist_id IS NULL, 1, 0)) / COUNT(A.id)) * 100 AS Proportion_Unknown_Artist
    FROM Artwork A
    LEFT JOIN Made M ON A.id = M.artwork_id
    GROUP BY A.place_of_origin
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

//camelcase or snake case tis the question?
// GET /time_periods
const time_periods = async (req, res) => {
  // req.query params are optional unless user specifies so this defaults to 0 for birth year and current year for death year
  //front end implementation of this will be a slider i think
  //const deathYear = req.query.deathYear ? req.query.deathYear : new Date().getFullYear() ; TODO later
  const deathYear = req.query.deathYear ? req.query.deathYear : 2024;
  const birthYear = req.query.birthYear ? req.query.birthYear : 0;
  connection.query(
    `SELECT name, id 
    FROM Artist
    WHERE death_year <  ${deathYear} AND birth_year > ${birthYear}`,
    (err, data) => {
      //return empty array for ranges where there are no artist
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching time periods:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET /top_artists/:location
const top_artists = async (req, res) => {
  const location = req.params.location;

  connection.query(
    `SELECT AR.name as name, COUNT(AT.id) as count
    FROM Artwork AT
    JOIN Made M ON M.artwork_id = AT.id
    JOIN Artist AR ON AR.id = M.artist_id
    WHERE AT.place_of_origin LIKE '%${location}%' AND AR.name  IS NOT NULL
    GROUP BY AR.name, AR.id
    ORDER BY COUNT(AR.id) DESC
    LIMIT 5
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
    WHERE place_of_origin LIKE '%${country}%' 
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
  const colorfulness = req.query.color ? req.query.color : 15;

  connection.query(
    `WITH ColorfulArtists AS (
SELECT Artist.name AS Name, Artist.id AS IdNum, AVG(Artwork.colorfulness) AS avg_colorfulness
FROM Artist
JOIN Made ON Made.artist_id = Artist.id JOIN Artwork ON Artwork.id = Made.artwork_id
WHERE Artwork.image_id IS NOT NULL
GROUP BY Artist.id, Artist.name
HAVING AVG(Artwork.colorfulness) >= ${colorfulness})
SELECT AT.name AS ArtistName, AR.title AS Piece, AR.image_id
FROM Artist AS AT JOIN Made AS M ON M.artist_id = AT.id JOIN Artwork AS AR ON AR.id = M.artwork_id
WHERE AT.id IN (SELECT IdNum FROM ColorfulArtists) 
ORDER BY 
RAND()
LIMIT 1;
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
        SELECT art.id AS id, art.image_id AS image, art.title AS title, art.end_year AS year,	art.place_of_origin AS Location, D.title AS style
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
        SELECT art.id AS id, art.image_id AS image, art.title AS title, art.end_year AS year,	art.place_of_origin AS Location, D.title AS style
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
    `SELECT AT.title AS title, AT.end_year AS year, AR.name AS artist, AT.image_id AS image
    FROM Artwork AS AT
    JOIN Made M ON M.artwork_id = AT.id
    JOIN Artist AR ON AR.id = M.artist_id
    WHERE AT.id = ${artworkId}`,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        console.error("Error fetching artwork description:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data[0]);
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
    `SELECT DISTINCT AT.id AS id, AT.image_id AS image
    FROM Artwork AT
    JOIN Descriptor D1 ON D1.artwork_id = AT.id
    JOIN Descriptor D2 ON D2.artwork_id = AT.id
    WHERE D1.aspect = 'artwork_type' AND D1.title = '${artworkType}' AND D2.aspect = 'classification' AND D2.title LIKE '%${medium}%'
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
  artist, //for ArtistStories
  random, //for home page
  artwork, //for everything
  artist_descriptors, // for which page? map?
  era_descriptors, //for which page?
  proportion_unknown, // for which page? we could potentially put this on art atlas page for additional descriptive stats
  time_periods, //for which page?
  top_artists, //for ArtAtlas
  colorful_artists, //for home page and then a checkbox to switch to random images
  unknown_artists, // for Nameless page
  artwork_materials, //for Steal Like An Artist
  artwork_description, //for Steal Like An Artist
  three_artworks, //for Steal Like An Artist
  map_country, //for ArtAtlas
};
