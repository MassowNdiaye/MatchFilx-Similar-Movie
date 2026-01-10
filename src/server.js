const express = require("express");
require("dotenv").config(); //Allow Hide API Key
const path = require("path");
const hbs = require("hbs");

const searchMovie = require("./utils/searchMovie");
const getSimilarMovies = require("./utils/similarMovie");

const app = express();
app.use(express.json());

//Setting Paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setting user view
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

//Default Page
app.get("", (req, res) => {
  res.render("index"); //res -> Render -> index (index.hbs)
});

app.get("/movies/:title/similar", (req, res) => {
  const title = req.params.title; //Pull movie title from URL
  if (!title) return res.status(400).json({ error: "Movie title is required" });

  // Movie ID search
  searchMovie(title, (err, movieId) => {
    if (err) return res.status(500).json({ error: err });

    //Using previous Movie ID to find similar
    getSimilarMovies(movieId, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      res.json(data); //Sending response to client side(data)
    });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
