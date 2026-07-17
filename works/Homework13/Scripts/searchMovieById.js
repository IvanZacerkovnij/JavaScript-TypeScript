import {showFullInfo} from "./showFullInfo.js";

import {apiKeyForOMDB} from "./apiKeyForOMDB.js";
export function searchByMovieId(id) {
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