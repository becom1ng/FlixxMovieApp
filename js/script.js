const global = {
	currentPage: window.location.pathname,
};

async function displayPopularMovies() {
	const { results } = await fetchAPIData('movie/popular');
	console.log(results);

	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
							movie.poster_path
								? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="Movie Title"
              />`
								: `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;
		document.querySelector('#popular-movies').appendChild(div);
	});
}

async function displayPopularTVShows() {
	const { results } = await fetchAPIData('tv/popular');
	console.log(results);

	results.forEach((show) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
            ${
							show.poster_path
								? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="Show Title"
              />`
								: `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Show Title"
            />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>`;
		document.querySelector('#popular-shows').appendChild(div);
	});
}
// Fetch data from API
async function fetchAPIData(endpoint) {
	// Only use this for development or very small projects.
	// Key should be stored and used from a server.
	const API_KEY = '30c944644c462584bb8878ea91643e2c';
	const API_URL = 'https://api.themoviedb.org/3/';

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
	);
	const data = await response.json();

	return data;
}

// Highlight active link
function highlightActiveLink() {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			link.classList.add('active');
		}
	});
}

// Init App - basic route/page detection
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularTVShows();
			break;
		case '/movie-details.html':
			console.log('Movie Details');
			break;
		case '/tv-details.html':
			console.log('TV Details');
			break;
		case '/search.html':
			console.log('Search');
			break;
		default:
			break;
	}

	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
