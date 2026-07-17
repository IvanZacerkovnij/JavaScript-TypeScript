import {showResult} from "./showResults.js";

import {apiKeyForOMDB} from "./apiKeyForOMDB.js";

export function searchForOMDB(title, type) {
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