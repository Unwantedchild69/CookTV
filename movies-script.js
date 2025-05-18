const container = document.getElementById("movie-container");
        const genreFilter = document.getElementById('genreFilter');

        function renderMovies(genre = '') {
            container.innerHTML = '';
            const filteredMovies = Object.entries(movieData).filter(([id, movie]) => {
                return genre === '' || movie.genre.toLowerCase().includes(genre.toLowerCase());
            });

            if (filteredMovies.length === 0) {
                container.innerHTML = '<p style="padding: 20px;">Кино олдсонгүй.</p>';
                return;
            }

            filteredMovies.forEach(([id, movie]) => {
                const card = document.createElement('div');
                card.className = 'movie-card';
                card.innerHTML = `
                    <a href="movie.html?id=${id}">
                        <img src="${movie.image}" alt="${movie.title}">
                        <h3>${movie.title}</h3>
                        <p>${movie.genre}</p>
                        <p>⭐ ${movie.rating}/10</p>
                    </a>
                `;
                container.appendChild(card);
            });
        }

        document.addEventListener("DOMContentLoaded", () => {
            renderMovies();
            genreFilter.addEventListener('change', () => {
                renderMovies(genreFilter.value);
            });
        });
const slider = document.getElementById('heroSlider');
    const indicators = document.getElementById('heroIndicators');

    const movieArray = Object.values(movieData);

    movieArray.forEach((movie, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide${index === 0 ? ' active' : ''}`;
        slide.innerHTML = `
            <img src="${movie.cover}" alt="${movie.title}">
            <div class="hero-content">
                <h1>${movie.title}</h1>
                <p>${movie.description}</p>
                <button>Дэлгэрэнгүй</button>
                <button>+ Дараа үзэх</button>
            </div>
        `;
        slider.appendChild(slide);

        const dot = document.createElement('span');
        dot.className = `dot${index === 0 ? ' active' : ''}`;
        indicators.appendChild(dot);
    });

    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 5000);