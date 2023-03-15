
let input = document.getElementById("search__input").firstElementChild;
let suggested__container = document.getElementById("movie__cards__grid");
let favourites__container = document.getElementById("my__favourites__list");

const api__key = 93059205;


let suggested__list = []
let favourites__arr = []

displayFavouritesMovies();

input.addEventListener("keyup", (e) => {
    let name = input.value.trim();
    if (name === "") {
        suggested__list = [];
        displaySuggestedMovies();
        return;
    }
    fetchMovies(name);
})

async function fetchMovies(name) {
    let url = `https://www.omdbapi.com/?apikey=${api__key}&t=${name}`;
    let response = await fetch(url)
    let data = await response.json()
    if (data.Response === "False") {
        return;
    }

    let curr__movie = {
                        Title: data.Title, 
                        Poster: data.Poster, 
                        imdbID: data.imdbID, 
                        imdbRating: data.imdbRating,
                        Release: data.Released,
                    };
    
    let isPresent = false;

    suggested__list.forEach(movie => {
        if (movie.imdbID === curr__movie.imdbID) {
            isPresent = true;
        }
    })

    if (!isPresent) {
        suggested__list.push(curr__movie);
    }
    
    displaySuggestedMovies();
}

function displaySuggestedMovies() {
    suggested__container.innerHTML = "";

    let favourites__list;
    if (localStorage.getItem("favourites__arr__key") === null) {
        favourites__list = favourites__arr;
    }else {
        favourites__list = JSON.parse(localStorage.getItem("favourites__arr__key"));
    }

    suggested__list.forEach(movie => {
        const movie__card = document.createElement('div');
        movie__card.setAttribute('class', 'movie__card');

        let isInFavourites = false;
        for (let i = 0; i < favourites__list.length; i++) {
            if (favourites__list[i].imdbID === movie.imdbID) {
                isInFavourites = true;
            }
        }

        movie__card.innerHTML = `
            <div class="card__image">
                <img src="${movie.Poster === "N/A" ? "./assets/imageNotFound.webp" : movie.Poster}" alt="poster image" />
            </div>
            <div class="card__desc">
                <div class="card__desc__ff">
                    <p class="movie__title">${movie.Title}</p>
                    <div class="movie__rating">
                        <i class="fa-solid fa-star"></i>
                        <p class="movie__rating__num">${movie.imdbRating}</p>
                    </div>
                </div>
                <div class="card__desc__ss ${isInFavourites ? " iimport" : ""}" data-id="${movie.imdbID}">
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
            <div class="know__more" data-btn-id="${movie.imdbID}">
                <button class="know__more__button">Know More</button>
            </div>
        `
        suggested__container.prepend(movie__card);
    })
}

document.addEventListener("click", e => {

    if (localStorage.getItem("favourites__arr__key") === null) {
        favourites__list = favourites__arr;
    }else {
        favourites__list = JSON.parse(localStorage.getItem("favourites__arr__key"));
    }

    let target = e.target;
    if (target.classList.contains("fa-heart")) {
        let movie__id = target.parentElement.getAttribute("data-id")
        let isPresent = false;
        let idx = -1;
        for (let i = 0; i < favourites__list.length; i++) {
            if (favourites__list[i].imdbID === movie__id) {
                idx = i;
                isPresent = true;
            }
        }
        if (!isPresent) {
            target.style.color = "red";
            let ii = -1;
            for (let i = 0; i < suggested__list.length; i++) {
                if (suggested__list[i].imdbID === movie__id) {
                    ii = i;
                }
            }
            
            favourites__list.push(suggested__list[ii]);
        } else {
            favourites__list.splice(idx, 1);
            target.style.color = "#000";
        }

        localStorage.setItem("favourites__arr__key", JSON.stringify(favourites__list));

        displayFavouritesMovies();
    } else if (target.classList.contains("fa-trash")) {
        let movie__id = target.parentElement.getAttribute("data-fav-id");
        let ii = -1;
        for (let i = 0; i < favourites__list.length; i++) {
            if (favourites__list[i].imdbID === movie__id) {
                ii = i;
            }
        }

        favourites__list.splice(ii, 1);

        localStorage.setItem("favourites__arr__key", JSON.stringify(favourites__list));

        displayFavouritesMovies();
        displaySuggestedMovies();
    } else if (target.classList.contains("know__more__button")) {
        let movie__id = target.parentElement.getAttribute("data-btn-id");
        localStorage.setItem("movie__id", JSON.stringify(movie__id));
        window.open("./singleMoviePage.html", "_blank");
    }
})

function displayFavouritesMovies() {
    favourites__container.innerHTML = "";

    if (localStorage.getItem("favourites__arr__key") === null) {
        favourites__list = favourites__arr;
    }else {
        favourites__list = JSON.parse(localStorage.getItem("favourites__arr__key"));
    }
    
    favourites__list.forEach(curr__movie => {

        const favourite__card = document.createElement('div');
        favourite__card.setAttribute('class', "favourite__card");
        favourite__card.innerHTML = `
            <div class="favourite__card__ff">
                <div class="f__card__ff__img">
                <img src="${curr__movie.Poster === "N/A" ? "./assets/imageNotFound.webp" : curr__movie.Poster}" alt="poster image" />
                </div>
                <div class="f__card__ff__desc">
                    <p class="f__card__ff__desc__title">${curr__movie.Title}</p>
                    <p class="f__card__ff__desc__yor">${curr__movie.Release}</p>
                </div>
            </div>
            <div class="favourite__card__ss">
                <div class="f__card__ss__icon" data-fav-id="${curr__movie.imdbID}">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `

        favourites__container.prepend(favourite__card);
    })
}

function openNewPage() {
    console.log("hi");
}
