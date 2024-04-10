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
    // TODO (TASK 2): edit the else if condition to check if the request parameter is 'pennkey' and if so, send back response 'Created by [pennkey]'
    res.send(`Created by ${names}`);
  } else {
    // we can also send back an HTTP status code to indicate an improper request
    res
      .status(400)
      .send(
        `'${req.params.type}' is not a valid author type. Valid types are 'name' and 'pennkey'.`
      );
  }
};

// Route 2: GET /artists
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
        console.error("Error fetching artist descriptors:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
}

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
        console.error("Error fetching artist descriptors:", err);
        res.status(500).json({ err: "Internal Server Error" });
      } else {
        res.json(data);
      }
    }
  );
}


// Route 3: GET /song/:song_id
const song = async function (req, res) {
  // TODO (TASK 4): implement a route that given a song_id, returns all information about the song
  // Hint: unlike route 2, you can directly SELECT * and just return data[0]
  // Most of the code is already written for you, you just need to fill in the query
  connection.query(
    `
  SELECT *
  FROM Songs
  WHERE song_id = '${req.params.song_id}'
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data[0]);
      }
    }
  );
};

// Route 4: GET /album/:album_id
const album = async function (req, res) {
  // TODO (TASK 5): implement a route that given a album_id, returns all information about the album
  connection.query(
    `
  SELECT *
  FROM Albums
  WHERE album_id = '${req.params.album_id}'
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data[0]);
      }
    }
  ); // replace this with your implementation
};

// Route 5: GET /albums
const albums = async function (req, res) {
  // TODO (TASK 6): implement a route that returns all albums ordered by release date (descending)
  // Note that in this case you will need to return multiple albums, so you will need to return an array of objects
  connection.query(
    `
  SELECT *
  FROM Albums
  ORDER BY release_date DESC
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  ); // replace this with your implementation
};

// Route 6: GET /album_songs/:album_id
const album_songs = async function (req, res) {
  // TODO (TASK 7): implement a route that given an album_id, returns all songs on that album ordered by track number (ascending)
  connection.query(
    `
  SELECT song_id, s.title, number, duration, plays
  FROM Songs s 
  JOIN Albums a ON s.album_id = a.album_id
  WHERE a.album_id = '${req.params.album_id}'
  ORDER BY number 
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json({});
      } else {
        res.json(data);
      }
    }
  ); // replace this with your implementation
};

/************************
 * ADVANCED INFO ROUTES *
 ************************/

// Route 7: GET /top_songs
const top_songs = async function (req, res) {
  const page = req.query.page;
  // TODO (TASK 8): use the ternary (or nullish) operator to set the pageSize based on the query or default to 10
  const pageSize = req.query.page_size ? req.query.page_size : 10;
  const offset = (page - 1) * pageSize; // calculates the appropriate offset amount based on selected page

  if (!page) {
    // TODO (TASK 9)): query the database and return all songs ordered by number of plays (descending)
    // Hint: you will need to use a JOIN to get the album title as well
    connection.query(
      `
    SELECT song_id, s.title, s.album_id, a.title AS album, plays
    FROM Songs s
    JOIN Albums a ON s.album_id = a.album_id
    ORDER BY plays DESC
    `,
      (err, data) => {
        if (err || data.length === 0) {
          console.log(err);
          res.json({});
        } else {
          res.json(data);
        }
      }
    ); // replace this with your implementation
  } else {
    // TODO (TASK 10): reimplement TASK 9 with pagination
    // Hint: use LIMIT and OFFSET (see https://www.w3schools.com/php/php_mysql_select_limit.asp)
    connection.query(
      `
    SELECT song_id, s.title, s.album_id, a.title AS album, plays
    FROM Songs s
    JOIN Albums a ON s.album_id = a.album_id
    ORDER BY plays DESC
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
    ); // replace this with your implementation
  }
};

// Route 8: GET /top_albums
const top_albums = async function (req, res) {
  // TODO (TASK 11): return the top albums ordered by aggregate number of plays of all songs on the album (descending), with optional pagination (as in route 7)
  // Hint: you will need to use a JOIN and aggregation to get the total plays of songs in an album
  const page = req.query.page;
  const pageSize = req.query.page_size ? req.query.page_size : 10;
  const offset = (page - 1) * pageSize; // calculates the appropriate offset amount based on selected page

  if (!page) {
    connection.query(
      `
    SELECT  s.album_id, a.title AS title, SUM(plays) AS plays
    FROM Albums a
    JOIN Songs s ON s.album_id = a.album_id
    GROUP BY s.album_id, a.title
    ORDER BY plays DESC;
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
    connection.query(
      `
    SELECT  s.album_id, a.title AS title, SUM(plays) AS plays
    FROM Albums a
    JOIN Songs s ON s.album_id = a.album_id
    GROUP BY s.album_id, a.title
    ORDER BY plays DESC
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
    ); // replace this with your implementation
  }
};

// CIRCLE BACK HERE
// Route 9: GET /search_albums
const search_songs = async function (req, res) {
  // TODO (TASK 12): return all songs that match the given search query with parameters defaulted to those specified in API spec ordered by title (ascending)
  // Some default parameters have been provided for you, but you will need to fill in the rest
  const title = req.query.title ?? "";
  const durationLow = req.query.duration_low ?? 60;
  const durationHigh = req.query.duration_high ?? 660;
  const playsLow = req.query.plays_low ?? 0;
  const playsHigh = req.query.plays_high ?? 1100000000;
  const danceabilityLow = req.query.danceability_low ?? 0;
  const danceabilityHigh = req.query.danceability_high ?? 1;
  const energyLow = req.query.energy_low ?? 0;
  const energyHigh = req.query.energy_high ?? 1;
  const valenceLow = req.query.valence_low ?? 0;
  const valenceHigh = req.query.valence_high ?? 1;
  const explicit = req.query.explicit === "true" ? 1 : 0;

  connection.query(
    `
  SELECT song_id, album_id, title, number, duration, plays, danceability, energy, valence, tempo, key_mode, explicit
  FROM Songs 
  WHERE (title LIKE '%${title}%')
  AND (explicit <= ${explicit})
  AND (duration >= ${durationLow}) AND (duration <= ${durationHigh})
  AND (plays >= ${playsLow}) AND (plays <= ${playsHigh})
  AND (danceability >= ${danceabilityLow}) AND (danceability <= ${danceabilityHigh})
  AND (energy >= ${energyLow}) AND (energy <= ${energyHigh})
  AND (valence >= ${valenceLow}) AND (valence <= ${valenceHigh})
  ORDER BY title 
  `,
    (err, data) => {
      if (err || data.length === 0) {
        console.log(err);
        res.json([]);
      } else {
        res.json(data);
      }
    }
  ); // replace this with your implementation
};

module.exports = {
  author,
  artist,
  getImages,
  artistDescriptors,
  eraDescriptors,
  proportionUnknown,
};
