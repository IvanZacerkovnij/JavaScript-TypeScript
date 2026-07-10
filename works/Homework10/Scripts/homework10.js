document.addEventListener("DOMContentLoaded", function () {

    const languageSelect = document.querySelector("#language");
    const themeSelect = document.querySelector("#theme");
    const range = document.querySelector("#range");
    const valueText = document.querySelector("#valueText");

    const translations = {
        uk: {
            pageTitle: "Реєстраційна форма",

            languageLabel: "Мова:",
            themeLabel: "Тема:",

            darkTheme: "Темна",
            lightTheme: "Світла",

            title: "Реєстраційна форма",

            nameLabel: "Ім'я",
            namePlaceholder: "Введіть ім'я",

            surnameLabel: "Прізвище",
            surnamePlaceholder: "Введіть прізвище",

            passwordLabel: "Пароль",
            birthDateLabel: "Дата народження",
            phoneLabel: "Телефон",

            countryLabel: "Країна",
            ukraine: "Україна",
            poland: "Польща",
            germany: "Німеччина",
            usa: "США",

            genderLabel: "Стать",
            male: "Чоловік",
            female: "Жінка",

            skillsLabel: "Ваші навички",
            experienceLabel: "Рівень досвіду",

            fileLabel: "Завантажити файл",

            commentLabel: "Коментар",
            commentPlaceholder: "Напишіть щось...",

            agreeLabel: "Я погоджуюсь з умовами",

            submitButton: "Відправити",
            resetButton: "Очистити"
        },

        en: {
            pageTitle: "Registration form",

            languageLabel: "Language:",
            themeLabel: "Theme:",

            darkTheme: "Dark",
            lightTheme: "Light",

            title: "Registration form",

            nameLabel: "First name",
            namePlaceholder: "Enter your first name",

            surnameLabel: "Last name",
            surnamePlaceholder: "Enter your last name",

            passwordLabel: "Password",
            birthDateLabel: "Date of birth",
            phoneLabel: "Phone",

            countryLabel: "Country",
            ukraine: "Ukraine",
            poland: "Poland",
            germany: "Germany",
            usa: "USA",

            genderLabel: "Gender",
            male: "Male",
            female: "Female",

            skillsLabel: "Your skills",
            experienceLabel: "Experience level",

            fileLabel: "Upload file",

            commentLabel: "Comment",
            commentPlaceholder: "Write something...",

            agreeLabel: "I agree to the terms",

            submitButton: "Submit",
            resetButton: "Clear"
        }
    };

    function setCookie(name, value, days) {
        const date = new Date();

        date.setTime(
            date.getTime() + days * 24 * 60 * 60 * 1000
        );

        document.cookie =
            `${name}=${encodeURIComponent(value)}; ` +
            `expires=${date.toUTCString()}; ` +
            `path=/; SameSite=Lax`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split("; ");

        for (const cookie of cookies) {
            const parts = cookie.split("=");

            const cookieName = parts[0];
            const cookieValue = parts[1];

            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }

        return null;
    }

    function changeTheme(theme) {
        document.body.classList.toggle(
            "light-theme",
            theme === "light"
        );

        themeSelect.value = theme;
    }

    function changeLanguage(language) {
        const currentTranslations = translations[language];

        document.documentElement.lang = language;
        document.title = currentTranslations.pageTitle;

        const textElements =
            document.querySelectorAll("[data-text]");

        textElements.forEach(function (element) {
            const key = element.dataset.text;

            element.textContent =
                currentTranslations[key];
        });

        const placeholderElements =
            document.querySelectorAll("[data-placeholder]");

        placeholderElements.forEach(function (element) {
            const key = element.dataset.placeholder;

            element.placeholder =
                currentTranslations[key];
        });

        languageSelect.value = language;
    }

    const savedTheme =
        getCookie("theme") || "dark";

    const savedLanguage =
        getCookie("language") || "uk";

    changeTheme(savedTheme);
    changeLanguage(savedLanguage);

    themeSelect.addEventListener("change", function () {
        const selectedTheme = themeSelect.value;

        changeTheme(selectedTheme);

        setCookie(
            "theme",
            selectedTheme,
            30
        );
    });

    languageSelect.addEventListener("change", function () {
        const selectedLanguage = languageSelect.value;

        changeLanguage(selectedLanguage);

        setCookie(
            "language",
            selectedLanguage,
            30
        );
    });

    range.addEventListener("input", function () {
        valueText.textContent = range.value + "%";
    });
});