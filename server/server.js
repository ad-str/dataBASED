const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get("/author/:type", routes.author);
app.get("/artist", routes.artist);
app.get("/random", routes.random);
app.get("/artwork/:id", routes.artwork);
app.get("/artist-descriptors/:artist_id", routes.artist_descriptors);
app.get("/era-descriptors/:start_year/:end_year", routes.era_descriptors);
app.get("/proportion-unknown", routes.proportion_unknown);
app.get("/time-periods", routes.time_periods);
app.get("/top-artists/:location", routes.top_artists);
app.get("/colorful-artists", routes.colorful_artists);
app.get("/unknownArtists", routes.unknown_artists);
app.get("/artwork_materials/:artwork_id", routes.artwork_materials);
app.get("/artwork_description/:artwork_id", routes.artwork_description);
app.get("/three_artworks/:artworkType/:medium", routes.three_artworks);
app.get("/map", routes.map_country);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
