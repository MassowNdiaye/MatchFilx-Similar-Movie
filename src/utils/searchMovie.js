const searchMovie = (title, callback) => {
  const apiKey = process.env.TMDB_TOKEN; //Taking Access token from .env file

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    title
  )}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        return callback("Movie not found", undefined);
      }
      const movieId = data.results[0].id;
      callback(undefined, movieId);
    })
    .catch((err) => callback("Unable to connect to API server", undefined));
};

module.exports = searchMovie; //Exporting to allow usage in server.js
