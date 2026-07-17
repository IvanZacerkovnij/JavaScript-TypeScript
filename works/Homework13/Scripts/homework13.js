$(document).ready(function () {
    const apiKeyForOMDB = "514609b5";

    $("#searchForm").on("submit", function (event) {
        event.preventDefault();

        const title = $("#title").val().trim();
        const type = $("#type").val();

        if (title === "") {
            $("#error")
                .removeClass("hidden")
                .text("Введіть назву фільму");

            $("#results").empty();
            return;
        }

        $("#fullInfo")
            .addClass("hidden")
            .empty();

        searchForOMDB(title, type);
    });

    function searchForOMDB(title, type) {
        const requestData = {
            apikey: apiKeyForOMDB,
            s: title,
            type: type
        };

        $.ajax({
            url: "https://www.omdbapi.com/",
            method: "GET",
            dataType: "json",
            data: requestData,

            success: function (response) {
                if (response.Response === "False") {
                    $("#error")
                        .removeClass("hidden")
                        .text(response.Error);

                    $("#results").empty();
                    return;
                }

                $("#error")
                    .addClass("hidden")
                    .text("");

                showResult(response.Search);
            },

            error: function () {
                $("#results").empty();

                $("#error")
                    .removeClass("hidden")
                    .text("Не вдалося підключитися до сервера");
            }
        });
    }

    function searchByMovieId(id) {
        $.ajax({
            url: "https://www.omdbapi.com/",
            method: "GET",
            dataType: "json",
            data: {
                apikey: apiKeyForOMDB,
                i: id,
                plot: "full"
            },

            success: function (response) {
                if (response.Response === "False") {
                    $("#error")
                        .removeClass("hidden")
                        .text(response.Error);

                    return;
                }

                $("#error")
                    .addClass("hidden")
                    .text("");

                $("#results").addClass("hidden");

                showFullInfo(response);
            },

            error: function () {
                $("#error")
                    .removeClass("hidden")
                    .text("Не вдалося отримати інформацію");
            }
        });
    }

    function showResult(movies) {
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

    $("#results").on("click", ".details-button", function () {
        const movieId = $(this).data("id");

        searchByMovieId(movieId);
    });

    function showFullInfo(movie) {
        const resultBlock = $("#fullInfo");

        resultBlock
            .empty()
            .removeClass("hidden");

        const poster =
            movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "./images/placeholder.jpg";

        const fields = [
            ["Назва", movie.Title],
            ["Рік", movie.Year],
            ["Віковий рейтинг", movie.Rated],
            ["Дата виходу", movie.Released],
            ["Тривалість", movie.Runtime],
            ["Жанр", movie.Genre],
            ["Режисер", movie.Director],
            ["Сценарист", movie.Writer],
            ["Актори", movie.Actors],
            ["Мова", movie.Language],
            ["Країна", movie.Country],
            ["Нагороди", movie.Awards],
            ["Metascore", movie.Metascore],
            ["IMDb рейтинг", movie.imdbRating],
            ["IMDb голоси", movie.imdbVotes],
            ["IMDb ID", movie.imdbID],
            ["Тип", movie.Type],
            ["DVD-реліз", movie.DVD],
            ["Касові збори", movie.BoxOffice],
            ["Виробництво", movie.Production],
            ["Сайт", movie.Website],
            ["Кількість сезонів", movie.totalSeasons],
            ["Сезон", movie.Season],
            ["Епізод", movie.Episode],
            ["ID серіалу", movie.seriesID]
        ];

        let fieldsHTML = "";

        fields.forEach(function (field) {
            const fieldName = field[0];
            const fieldValue = field[1];

            if (fieldValue && fieldValue !== "N/A") {
                fieldsHTML += `
                    <p>
                        <strong>${fieldName}:</strong>
                        ${fieldValue}
                    </p>
                `;
            }
        });

        let ratingsHTML = "";

        if (
            Array.isArray(movie.Ratings) &&
            movie.Ratings.length > 0
        ) {
            ratingsHTML = `
                <div class="ratings">
                    <h3>Рейтинги</h3>

                    ${movie.Ratings.map(function (rating) {
                return `
                            <p>
                                <strong>${rating.Source}:</strong>
                                ${rating.Value}
                            </p>
                        `;
            }).join("")}
                </div>
            `;
        }

        const plotHTML =
            movie.Plot && movie.Plot !== "N/A"
                ? `
                    <div class="movie-plot">
                        <h3>Сюжет</h3>
                        <p>${movie.Plot}</p>
                    </div>
                `
                : "";

        resultBlock.html(`
            <div class="movie-details">
                <div class="movie-details-poster">
                    <img
                        class="movie-poster"
                        src="${poster}"
                        alt="${movie.Title}"
                    >
                </div>

                <div class="movie-details-info">
                    <h2>${movie.Title}</h2>

                    ${fieldsHTML}
                    ${ratingsHTML}
                    ${plotHTML}
                </div>
            </div>
        `);
    }
});