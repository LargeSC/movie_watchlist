const myApiKey = "7357af0f"
const watchlistMain = document.getElementById("watchlist-main")
let watchlist


renderWatchlist()

function renderWatchlist(){
    watchlistMain.innerHTML=""
    if(localStorage.getItem("watchlist")){
        watchlist = JSON.parse(localStorage.getItem("watchlist"))
        watchlist.map(id=>{
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=${myApiKey}`)
            .then(res=>res.json())
            .then(data=>getWatchlistHtml(data))
        })
        // console.log(watchlist)
    } else {
        console.log("No movies saved")
    }
}



function getWatchlistHtml(movie){
    watchlistMain.innerHTML+=`
    
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
                <button id="watchlist-btn" onclick="removeWatchlist('${movie.imdbID}')" class="watchlist-btn"><img class="add-movie-icon" src="./images/icon_minus.png" />Watchlist</button>
            </div>
            <p class="movie-text">"${movie.Plot}"</p>
        </div>
    </div>
    `
}

function removeWatchlist(id){
    watchlist.splice(watchlist.indexOf(id),1)
    localStorage.setItem("watchlist",JSON.stringify(watchlist))
    renderWatchlist()
}