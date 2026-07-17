import {searchByMovieId} from "./searchMovieById.js";
import {searchForOMDB} from "./searchForOMDB.js";

$(document).ready(function () {

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

    $("#results").on("click", ".details-button", function () {
        const movieId = $(this).data("id");

        searchByMovieId(movieId);
    });
});