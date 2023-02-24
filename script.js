let searchTerm = document.getElementById('movie-term');
searchTerm.addEventListener("change", movieList);

function movieList() {
    fetch(`http://www.omdbapi.com/?apikey=a9a6768&s=${searchTerm.value}&plot=full`)
        .then(res => res.json())
        .then(data => {
            let movies = data.Search;
            let output = "";
            movies.forEach(showMovieList);

            function showMovieList(movie) {
                output += `
                <div class="movie-list-card">
                    <img src="${movie.Poster}">
                    <a onclick="movieSelected('${movie.imdbID}')" href="#selected-movie">${movie.Title}</a>
                </div>`;
            }

            document.getElementById("movie-list-container").innerHTML = output;
        })
        .catch(err => {
            alert("error")     });
}

function movieSelected(movieId) {
    fetch(`http://www.omdbapi.com/?apikey=a9a6768&i=${movieId}`)
        .then(res => res.json())
        .then(data => {
            let movie = data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="img-thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Genre: </strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released: </strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated: </strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating: </strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director: </strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer: </strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors: </strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row pt-4">
                    <div class="card">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-dark">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            `;
            
            document.getElementById("selected-movie").innerHTML = output;
         })
        .catch(err => {
            alert("error");
        });
}
