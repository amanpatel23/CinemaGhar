# CinemaGhar
## About
CinemaGhar is an IMDB clone app, made with the help of OMDB API, which allows users to search for movies while giving search suggetions. 
When a user clicks on a particular movie card, it opens up a new movie page containing more information about the movie.
Users can also add any movie to their favourites list, which stores the movies in local storage of the browser.

### Screenshots
![Screenshot__1](./assets/CinemaGharScreenshot__1.png)
***
![Screenshot__2](./assets/CinemaGharScreenshot__2.png)

### Hosted Link: [CinemaGhar](https://amanpatel23.github.io/CinemaGhar/)

## Tools Used:
* HTML
* CSS
* JavaScript
* OMDB API

## Functionality:
* Search movies with suggetions
* Click on a movie card for more information
* Add a movie to the favourite list
* Remove a movie from the favourite list

## Data:
* suggested__list - an array which contains movies based on the searched keyword
* favourites__list - an array which contains movies from the local storage
* movie__id - local storage item which contains the imdbID of the clicked movie

## Functions (in code):
* fetchMovies
* displaySuggestedMovies
* displayFavouritesMovies
