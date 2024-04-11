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
app.get('/artist-descriptors/:artist_id', routes.artistDescriptors);
app.get('/era-descriptors/:start_year/:end_year', routes.eraDescriptors);
app.get('/proportion-unknown', routes.proportionUnknown);
app.get('/time-periods', routes.timePeriods);
app.get('/artworks-locations/:location', routes.artworksLocation);
app.get('/colorful-artists', routes.colorfulArtists);
app.get('/minimalViews', routes.minimalViews);
app.get('/unknownArtists', routes.unknownArtists);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
