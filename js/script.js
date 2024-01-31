const global = {
	currentPage: window.location.pathname,
};

// Display top 20 movies by popularity
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
            alt="${movie.title}"
            />`
						: `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
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

// Display top 20 tv shows by popularity
async function displayPopularShows() {
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
                alt="${show.name}"
              />`
								: `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
						}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">First Air Date: ${
								show.first_air_date
							}</small>
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

	showSpinner();

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`,
	);
	const data = await response.json();

	hideSpinner();

	return data;
}

function showSpinner() {
	document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
	document.querySelector('.spinner').classList.remove('show');
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
			displayPopularShows();
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
