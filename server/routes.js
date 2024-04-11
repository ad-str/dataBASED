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

// two ways to get routes
// FIRST METHOD //
// const artist = async function (req, res) {
//   connection.query(
//     `SELECT *
//     FROM Artist
//     LIMIT 10`,
//     (err, data) => { // If there is an error for some reason, or if the query is empty
//       if (err || data.length === 0) { // print the error message and return an empty object instead
//         console.log(err);
//         // Be cognizant of the fact we return an empty object {}. For future routes, depending on the
//         // return type you may need to return an empty array [] instead.
//         res.json({});
//       } else {
//         res.json(data); // return an array if query is an array
//       }
//     }
//   );

// SECOND METHOD //

// Route 1: GET /author/:type
const author = async function (req, res) {
  // TODO (TASK 1): replace the values of name and pennKey with your own
  const team = "dataBASED";
  const names =
    "Adam Streff, Daunel Augustin, Veronica Polanco, Brianna Malcolm";

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
    LIMIT 10
  `,
    (err, data) => {
      if (err || data.length === 0) {
        // If there is an error for some reason, or if the query is empty (this should not be possible)
        // print the error message and return an empty object instead
        console.log(err);
        // Be cognizant of the fact we return an empty object {}. For future routes, depending on the
        // return type you may need to return an empty array [] instead.
        res.json({});
      } else {
        // return an array of artists
        res.json(data);
      }
    }
  );
};

// Route: GET /images
const getImages = async (req, res) => {
  connection.query(
    `
    SELECT image_id 
    FROM Artwork 
    WHERE image_id IS NOT NULL 
    ORDER BY RAND() 
    LIMIT 1`,
    (err, data) => {
      if (err || data.length === 0) {
        console.error("Error fetching image IDs:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        const imageId = data[0].image_id;
        res.json(imageId);
      }
    }
  );
};

// GET /artist-descriptors/:artist_id
const artistDescriptors = async (req, res) => {
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
        console.error("Error fetching artist descriptors:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET /era-descriptors/:start_year/:end_year
const eraDescriptors = async (req, res) => {
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
        console.error("Error fetching era descriptors:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

// GET /proportionUnknown
const proportionUnknown = async (req, res) => {
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
        console.error("Error fetching unknown proportions:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
};

//camelcase or snake case tis the question?
// GET /time-periods
const timePeriods = async (req, res) => {
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
      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// GET /artworks-location/:location
const artworksLocation = async (req, res) => {
  const place = req.params.location;

  connection.query(
    `SELECT AR.name, COUNT(AT.id)
     FROM Artwork AT
     JOIN Made M ON M.artwork_id = AT.id
     JOIN Artist AR ON AR.id = M.artist_id
     WHERE AT.place_of_origin LIKE '%${place}%'
     GROUP BY AR.name, AR.id
     ORDER BY COUNT(AR.id) DESC
     LIMIT 10
`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// GET colorful-artists/:location
const colorfulArtists = async (req, res) => {
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
      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        res.json({});
      } else {
        res.json(data);
      }
    }
  );
};

// Route: GET /minimalViews
/*This is a dedicated page for artwork that hasn't been viewed as much and its artist. 
It implements page functionality for simplified browsing*/
const minimalViews = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ? req.query.page_size : 10; // default 10 items per page
  const offset = (page - 1) * pageSize; // calculates the appropriate offset amount based on selected page

  if (!page) {
    // page not specified
    connection.query(
      `
      SELECT a.title, m.artist_id
      FROM Artwork a
      JOIN Made m ON a.artwork_id = m.artwork_id
      WHERE a.has_not_been_viewed_much = TRUE
      
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else {
    // specified pages
    connection.query(
      `
      SELECT a.title, m.artist_id
      FROM Artwork a
      JOIN Made m ON a.artwork_id = m.artwork_id
      WHERE a.has_not_been_viewed_much = TRUE      
      LIMIT ${pageSize}
      OFFSET ${offset}
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  }
};

// Route: GET /unknownArtists
/*This is a dedicated page for unknown artists. It showcases ones within the last
century. This route implements page functionality for simplified browsing*/
const unknownArtists = async function (req, res) {
  const page = req.query.page;
  const pageSize = req.query.page_size ? req.query.page_size : 10; // default 10 items per page
  const offset = (page - 1) * pageSize; // calculates the appropriate offset amount based on selected page
  const lastCentury = req.query.last_century ?? 1900;

  if (!page) {
    // page not specified
    connection.query(
      `
      SELECT DISTINCT id, art.title, date_end,	place_of_origin, field, desc.title
      FROM artworks_df AS art LEFT 
      JOIN made_df AS made ON art.id = made.artwork_id
      JOIN desc_df AS desc ON art.id = desc.artwork_id
      WHERE made.artist_id is NULL AND art.date_end > ${lastCentury}
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  } else {
    // specified pages
    connection.query(
      `
      SELECT DISTINCT id, art.title, date_end,	place_of_origin, field, desc.title
      FROM artworks_df AS art LEFT 
      JOIN made_df AS made ON art.id = made.artwork_id
      JOIN desc_df AS desc ON art.id = desc.artwork_id
      WHERE made.artist_id is NULL AND art.date_end > ${lastCentury}    
      LIMIT ${pageSize}
      OFFSET ${offset}
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    );
  }
};

// const artworksLocation = async (req, res) => {

//   const place = req.params.location
//   connection.query(
//     `SELECT AR.name, COUNT(AT.id)
//      FROM Artwork AT
//      JOIN Made M ON M.artwork_id = AT.id
//      JOIN Artist AR ON AR.id = M.artist_id
//      WHERE AT.place_of_origin LIKE '%${place}%'
//      GROUP BY AR.name, AR.id
//      ORDER BY COUNT(AR.id) DESC
//      LIMIT 10
// `,
//   (err, data) => {
//       if (err) {
//         console.log(err);
//       }else if (data.length === 0){
//          res.json({});
//       }else {
//         res.json(data);
//       }
//     }

//   );
// }

module.exports = {
  author,
  artist,
  getImages,
  artistDescriptors,
  eraDescriptors,
  proportionUnknown,
  timePeriods,
  artworksLocation,
  colorfulArtists,
  minimalViews,
  unknownArtists,
};
