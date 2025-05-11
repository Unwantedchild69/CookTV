document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("movie-container");

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    const movie = movieData[movieId];
    if (!movie) {
        container.innerHTML = `<h2>Movie not found.</h2>`;
        return;
    }

    container.innerHTML = `
        <div class="movie-details">
            <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.title}" />
            </div>
            <div class="movie-info">
                <h1>${movie.title}</h1>
                <p><strong>Release Year:</strong> ${movie.releaseYear}</p>
                <p><strong>Rating:</strong> ⭐ ${movie.rating}/10</p>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p>${movie.description}</p>
                <a href="#" class="watch-button">▶ Watch Now</a>
            </div>
        </div>
        <div class="trailer">
            <h2>Trailer</h2>
            <iframe src="${movie.trailer}" allowfullscreen></iframe>
        </div>
    `;
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const form = document.querySelector('.search-form');

    if (searchInput && searchResults && form) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            searchResults.innerHTML = '';

            if (query === '') {
                searchResults.style.display = 'none';
                return;
            }

            const results = Object.entries(movieData).filter(([id, movie]) =>
                movie.title.toLowerCase().includes(query)
            );

            if (results.length > 0) {
                results.forEach(([id, movie]) => {
                    const link = document.createElement('a');
                    link.href = `movie.html?id=${id}`;
                    link.textContent = movie.title;
                    searchResults.appendChild(link);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<p>No results found</p>';
                searchResults.style.display = 'block';
            }
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
        });

        document.addEventListener('click', e => {
            if (!form.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
});

