const myApiKey = "7357af0f"
let movieQuery = "Avengers"
let movieHtml, movieIds, movieInfo
let watchlist = []

const searchBtn = document.getElementById("search-button")
const searchForm = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const main = document.getElementById("main")
const modal = document.getElementById("modal")
const modalTxt = document.getElementById("modal-text")

searchInput.focus()

searchForm.addEventListener("submit", function(event){
    event.preventDefault()
    movieQuery = searchInput.value
    if(movieQuery != ""){
        main.innerHTML= ""
        fetch(`https://www.omdbapi.com/?s=${movieQuery}&apikey=${myApiKey}`)
            .then(res => res.json())
            .then(data => {
                data.Search.map(movie=>{
                    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${myApiKey}`)
                    .then(res=>res.json())
                    .then(data=> {
                        // console.log(data)
                        getMovieHtml(data)})
                })
            })
            .catch(error => {
                const message = "Nothing was found"
                getModal(message);
            });
    } else {
        const message = "Please type something to search"
        getModal(message)
        searchInput.focus()
    }
})


function getMovieHtml(movie){
    main.innerHTML+=`
    <div id="movie-container">
        <img class="movie-img" src="${movie.Poster}" />
        <div class="movie-description">
            <div class="flex">
                <h3>${movie.Title}</h3>
                <p></p>
            </div>
            <div class="movie-stats">
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <button id="watchlist-btn" onclick="addWatchlist('${movie.imdbID}')" class="watchlist-btn"><img class="add-movie-icon" src="./images/icon_plus.png" />Watchlist</button>
            </div>
            <p class="movie-text">"${movie.Plot}"</p>
        </div>
    </div>
    `
}

function addWatchlist(movie){
    if(localStorage.getItem("watchlist")){
        watchlist = JSON.parse(localStorage.getItem("watchlist"))
    }
    if(watchlist.indexOf(movie)===-1){
        watchlist.push(movie)
    } else {
        const message = "Movie already in Watchlist"
        getModal(message)
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
}



function getModal(text){
    modalTxt.textContent = text
    modal.style.opacity= 1
    setTimeout(() => modal.style.opacity = 0, 550)
}