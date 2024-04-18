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
app.get('/images', routes.getImages);
app.get('/artist-descriptors/:artist_id', routes.artist_descriptors);
app.get('/era-descriptors/:start_year/:end_year', routes.era_descriptors);
app.get('/proportion-unknown', routes.proportion_unknown);
app.get('/time-periods', routes.time_periods);
app.get('/artworks-locations/:location', routes.artworks_location);
app.get('/colorful-artists', routes.colorful_artists);
app.get('/minimalViews', routes.minimal_views);
app.get('/unknownArtists', routes.unknown_artists);
app.get('/artwork_materials/:artist_id', routes.artwork_materials);
app.get('/artwork_description/:artwork_id', routes.artwork_description);
app.get('/three_artworks/:artworkType/:medium', routes.three_artworks);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
