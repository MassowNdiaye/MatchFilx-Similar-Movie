const getSimilarMovies = (movieId, callback) => {
  const apiKey = process.env.TMDB_TOKEN; //Taking Access token from .env file
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;

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
      if (!data.results) return callback("Movie not found", undefined);

      const results = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
      }));

      callback(undefined, results);
    })
    .catch((err) => callback("Unable to get similar movies", undefined));
};

module.exports = getSimilarMovies; //Exporting to allow usage in server.js
