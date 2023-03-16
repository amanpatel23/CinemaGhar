
// getting the html elements in javascript
// getting the movie__info div
let movie__info = document.getElementById("movie__info");

// my api key that I got from omdb
const api__key = 93059205;

// getting the movie id from local storage
const movie__id = JSON.parse(localStorage.getItem("movie__id"));

// function used to fetch movie details 
async function fetchMovie() {
    let url = `https://www.omdbapi.com/?apikey=${api__key}&i=${movie__id}`;
    let response = await fetch(url)
    let data = await response.json()

    // calling the function to display movie details
    displayMovieDetails(data);
}

// function to display the movie details in a html div
function displayMovieDetails(data) {

    // creaing an html element
    let movie__info__container = document.createElement('div');
    // assigining class to it
    movie__info__container.setAttribute('id', 'movie__info__container');
    movie__info__container.innerHTML = 
        `
        <div id="movie__info__ff">
            <div id="movie__info__ff__ff">
                <div id="movie__title">
                    <p>${data.Title}</p>
                </div>
                <div id="movie__yor__duration">
                    <p>${data.Year}</p>
                    <p>${data.Runtime}</p>
                </div>
            </div>
            <div id="movie__info__ff__ss">
                <div id="movie__rating__text">
                    <p>Rating</p>
                </div>
                <div id="movie__rating__data">
                    <i class="fa-solid fa-star"></i>
                    <p>${data.imdbRating} / 10</p>
                </div>
            </div>
        </div>
        <div id="movie__info__ss">
            <div id="movie__info__ss__ff">
                <img src="${data.Poster === "N/A" ? "./assets/imageNotFound.webp" : data.Poster}" alt="poster image" />
            </div>
            <div id="movie__info__ss__ss">
                <div id="plot">
                    <p id="plot__text" class="cBlue">Plot</p>
                    <p id="plot__desc">${data.Plot}</p>
                </div>
                <div id="directors" class="dFlex">
                    <p id="directors__text" class="cBlue">Directors: &nbsp;</p>
                    <p id="directors__name">${data.Director}</p>
                </div>
                <div id="cast" class="dFlex">
                    <p id="cast__text" class="cBlue">Cast: &nbsp;</p>
                    <p id="cast__name">${data.Actors}</p>
                </div>
                <div id="genre" class="dFlex">
                    <p id="genre__text" class="cBlue">Genre: &nbsp;</p>
                    <p id="genre__name">${data.Genre}</p>
                </div>
            </div>
        </div>
        `
        // appending the card to the movie__info
        movie__info.prepend(movie__info__container)
}

// calling the fetchMovie function
fetchMovie();