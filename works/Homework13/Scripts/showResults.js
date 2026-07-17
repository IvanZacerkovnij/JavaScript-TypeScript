export function showResult(movies) {
    const resultBlock = $("#results");

    resultBlock
        .empty()
        .removeClass("hidden");

    $("#fullInfo")
        .empty()
        .addClass("hidden");

    movies.forEach(function (movie) {
        resultBlock.append(`
                <div class="movie-card">
                    <h2>${movie.Title}</h2>

                    <p>Рік: ${movie.Year}</p>
                    <p>Тип: ${movie.Type}</p>

                    <button
                        type="button"
                        class="details-button"
                        data-id="${movie.imdbID}"
                    >
                        Детальніше
                    </button>
                </div>
            `);
    });
}