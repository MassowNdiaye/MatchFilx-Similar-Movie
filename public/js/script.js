// DOM elements
const searchForm = document.getElementById("searchForm");
const movieInput = document.getElementById("movieInput");
const similarMoviesDiv = document.getElementById("similarMovies");

async function loadSimilarMovies(title) {
  if (!title) return;

  try {
    const response = await fetch(
      `/movies/${encodeURIComponent(title)}/similar`
    );
    const data = await response.json(); //This covert response in object/array

    if (data.error) {
      similarMoviesDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    if (data.length === 0) {
      similarMoviesDiv.innerHTML = "<p>No similar movies found</p>";
      return;
    }

    // User side result (mapping loop each item inside the array data)
    // (movie) => Allow me to return one movie at a time after each loop
    similarMoviesDiv.innerHTML = data
      .map(
        (movie) => `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
      </div>
    `
      )
      .join(""); //This combine all movie in one HTML string from the [];
  } catch (err) {
    console.error(err);
    similarMoviesDiv.innerHTML = "<p>Failed to fetch similar movies.</p>";
  }
}

// Creating Default movies
document.addEventListener("DOMContentLoaded", () => {
  const defaultMovie = "Avatar: Fire and Ash";
  loadSimilarMovies(defaultMovie);
});

// Adding submission here to ensure load of default movie before calling loadSimilarMovies()
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = movieInput.value.trim();
  if (!title) {
    alert("Please enter a movie title");
    return;
  }
  loadSimilarMovies(title);
});
