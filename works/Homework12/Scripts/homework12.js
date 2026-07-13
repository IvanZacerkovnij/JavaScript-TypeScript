$(document).ready(function () {
    const countryApiKey = "32e7d32fdc7d349413b6ee74070f83a36c0399e4bb2ad76646f1ca8cbf06cf98";
    const weatherApiKey = "009e92c81f657a81ea267314335241fc";

    const countrySelect = $("#country");
    const stateSelect = $("#state");
    const citySelect = $("#city");
    const weatherResult = $("#weatherResult");

    loadCountries();

    function loadCountries() {
        const url = "https://api.countrystatecity.in/v1/countries";

        fetch(url, {
            headers: {
                "X-CSCAPI-KEY": countryApiKey
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `Не вдалося завантажити країни: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(countries => {
                countries.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                countries.forEach(country => {
                    countrySelect.append(`
                        <option value="${country.iso2}">
                            ${country.name}
                        </option>
                    `);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    countrySelect.on("change", function () {
        const countryCode = $(this).val();

        weatherResult.addClass("hidden");

        stateSelect
            .prop("disabled", true)
            .html(`
                <option value="">
                    Завантаження областей...
                </option>
            `);

        citySelect
            .prop("disabled", true)
            .html(`
                <option value="">
                    Спочатку оберіть область
                </option>
            `);

        if (!countryCode) {
            stateSelect.html(`
                <option value="">
                    Спочатку оберіть країну
                </option>
            `);

            return;
        }

        loadStates(countryCode);
    });

    function loadStates(countryCode) {
        const url =
            `https://api.countrystatecity.in/v1/countries/${countryCode}/states`;

        fetch(url, {
            headers: {
                "X-CSCAPI-KEY": countryApiKey
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `Не вдалося завантажити області: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(states => {
                stateSelect.html(`
                    <option value="">Оберіть область</option>
                `);

                if (states.length === 0) {
                    stateSelect.html(`
                        <option value="">
                            Області не знайдено
                        </option>
                    `);

                    return;
                }

                states.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                states.forEach(state => {
                    stateSelect.append(`
                        <option value="${state.iso2}">
                            ${state.name}
                        </option>
                    `);
                });

                stateSelect.prop("disabled", false);
            })
            .catch(error => {
                console.error(error);

                stateSelect.html(`
                    <option value="">
                        Помилка завантаження
                    </option>
                `);
            });
    }

    stateSelect.on("change", function () {
        const countryCode = countrySelect.val();
        const stateCode = $(this).val();

        weatherResult.addClass("hidden");

        citySelect
            .prop("disabled", true)
            .html(`
                <option value="">
                    Завантаження міст...
                </option>
            `);

        if (!stateCode) {
            citySelect.html(`
                <option value="">
                    Спочатку оберіть область
                </option>
            `);

            return;
        }

        loadCities(countryCode, stateCode);
    });

    function loadCities(countryCode, stateCode) {
        const url =
            `https://api.countrystatecity.in/v1/countries/` +
            `${countryCode}/states/${stateCode}/cities`;

        fetch(url, {
            headers: {
                "X-CSCAPI-KEY": countryApiKey
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `Не вдалося завантажити міста: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(cities => {
                citySelect.html(`
                    <option value="">Оберіть місто</option>
                `);

                if (cities.length === 0) {
                    citySelect.html(`
                        <option value="">
                            Міста не знайдено
                        </option>
                    `);

                    return;
                }

                cities.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

                cities.forEach(city => {
                    citySelect.append(`
                        <option value="${city.name}">
                            ${city.name}
                        </option>
                    `);
                });

                citySelect.prop("disabled", false);
            })
            .catch(error => {
                console.error(error);

                citySelect.html(`
                    <option value="">
                        Помилка завантаження
                    </option>
                `);

                showError(error.message);
            });
    }

    $("#weatherForm").on("submit", function (event) {
        event.preventDefault();

        const countryCode = countrySelect.val();
        const city = citySelect.val();

        if (!countryCode || !city) {
            showError("Оберіть країну, область і місто");
            return;
        }

        loadWeather(city, countryCode);
    });

    function loadWeather(city, countryCode) {
        const url =
            `https://api.openweathermap.org/data/2.5/weather` +
            `?q=${encodeURIComponent(city)},${countryCode}` +
            `&appid=${weatherApiKey}` +
            `&units=metric` +
            `&lang=uk`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(
                        `Не вдалося отримати погоду: ${response.status}`
                    );
                }

                return response.json();
            })
            .then(data => {
                showWeather(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function showWeather(data) {
        weatherResult
            .removeClass("hidden")
            .addClass("result")
            .html(`
                <h2>${data.name}</h2>

                <p>
                    Температура:
                    <strong>${Math.round(data.main.temp)} °C</strong>
                </p>

                <p>
                    Відчувається як:
                    ${Math.round(data.main.feels_like)} °C
                </p>

                <p>
                    Погода:
                    ${data.weather[0].description}
                </p>

                <p>
                    Вологість:
                    ${data.main.humidity}%
                </p>

                <p>
                    Швидкість вітру:
                    ${data.wind.speed} м/с
                </p>
            `);
    }
});