
// getting the html elements to work on
// getting the input search input
let input = document.getElementById("search__input").firstElementChild;

// getting the movie container to show the current movie result
let suggested__container = document.getElementById("movie__cards__grid");

// getting the favourites container to show the favourite movies list
let favourites__container = document.getElementById("my__favourites__list");

// api key that I got from the omdb
const api__key = 93059205;

// array to store the current searched movies
let suggested__list = []

// array to store the current searched movies
let favourites__list;

if (localStorage.getItem("favourites__arr__key") !== null) {
    favourites__list = JSON.parse(localStorage.getItem("favourites__arr__key"));
} else {
    favourites__list = [];
}

// setting the input inner text to empty string on refreshing or loading
input.value = "";

// display the favourite movies list on refreshing or loading
displayFavouritesMovies();

// listen keyup event on the input field
input.addEventListener("keyup", (e) => {
    let name = input.value.trim();
    if (name === "") {
        suggested__list = [];
        displaySuggestedMovies();
        return;
    }

    // calling the fetchMovies function to 
    // fetch the movie details of the movie name typed in the input field
    fetchMovies(name);
})

// async fetchMovies function
async function fetchMovies(name) {
    // api url to fetch the movie details
    let url = `https://www.omdbapi.com/?apikey=${api__key}&t=${name}`;
    let response = await fetch(url)
    let data = await response.json()
    if (data.Response === "False") {
        return;
    }

    // getting the details and storing it as object
    let curr__movie = {
                        Title: data.Title, 
                        Poster: data.Poster, 
                        imdbID: data.imdbID, 
                        imdbRating: data.imdbRating,
                        Release: data.Year,
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
    
    // display the movies in the suggested movies section
    displaySuggestedMovies();
}

function displaySuggestedMovies() {
    suggested__container.innerHTML = "";


    // creating the movie card for each movie in the suggested list array
    suggested__list.forEach(movie => {
        const movie__card = document.createElement('div');
        movie__card.setAttribute('class', 'movie__card');

        let isInFavourites = false;
        for (let i = 0; i < favourites__list.length; i++) {
            if (favourites__list[i].imdbID === movie.imdbID) {
                isInFavourites = true;
            }
        }

        // defining the html body for each card
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
        // appending the card to the suggested container
        suggested__container.prepend(movie__card);
    })
}

// listen for the event listeners on the document
document.addEventListener("click", e => {


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

        // storing the favourites list array in the localstorage
        localStorage.setItem("favourites__arr__key", JSON.stringify(favourites__list));

        // calling the function to display the my favourites movies
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

        // storing the favourites list array in the localstorage
        localStorage.setItem("favourites__arr__key", JSON.stringify(favourites__list));

        // calling the function to display the favourite movies
        displayFavouritesMovies();
        // calling the function to display the current searched movies
        displaySuggestedMovies();

    } else if (target.classList.contains("know__more__button")) {
        let movie__id = target.parentElement.getAttribute("data-btn-id");
        localStorage.setItem("movie__id", JSON.stringify(movie__id));

        // opening single movie page
        window.open("./singleMoviePage.html", "_blank");
    }
})

// function to display favourite movies from the list
function displayFavouritesMovies() {
    favourites__container.innerHTML = "";
    
    // creating the card for each favourite movie in the list
    favourites__list.forEach(curr__movie => {

        if (curr__movie !== null) {
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

            // appending the favourite movie card to favourites movie section
            favourites__container.prepend(favourite__card);
        }
    })
}


