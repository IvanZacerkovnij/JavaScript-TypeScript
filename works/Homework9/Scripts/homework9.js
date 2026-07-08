const nameRegEx = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}$/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegEx = /^\+380\d{9}$/;

const form = document.forms[0];

const countrySelector = form.querySelector("#country");
countrySelector.value = "Німеччина";

const maleRadio = form.querySelector('input[name="gender"][value="Чоловік"]');
maleRadio.checked = true;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    clearErrors();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    data.firstName = data.firstName.trim();
    data.lastName = data.lastName.trim();
    data.email = data.email.trim();
    data.phone = data.phone.trim();
    data.comment = data.comment.trim();
    data.skills = formData.getAll("skills");

    let isValid = true;

    if (!nameRegEx.test(data.firstName)) {
        showFieldError("Ім'я повинно бути без цифр і не менше 2 літер.", "firstName");
        isValid = false;
    }

    if (!nameRegEx.test(data.lastName)) {
        showFieldError("Прізвище повинно бути без цифр і не менше 2 літер.", "lastName");
        isValid = false;
    }

    if (!emailRegEx.test(data.email)) {
        showFieldError("Email не валідний.", "email");
        isValid = false;
    }

    if (data.password.length < 5 || data.password.includes(" ")) {
        showFieldError("Пароль повинен бути не менше 5 символів і без пробілів.", "password");
        isValid = false;
    }

    if (!data.birthDate) {
        showFieldError("Дата народження повинна бути обрана.", "birthDate");
        isValid = false;
    }

    if (!phoneRegEx.test(data.phone)) {
        showFieldError("Телефон повинен бути у форматі +380XXXXXXXXX.", "phone");
        isValid = false;
    }

    if (data.skills.length < 2) {
        showFieldError("Потрібно обрати мінімум 2 навички.", "skills");
        isValid = false;
    }

    if (data.comment.length < 10 || data.comment.length > 150) {
        showFieldError("Коментар повинен бути від 10 до 150 символів.", "comment");
        isValid = false;
    }

    if (data.agree === undefined) {
        showFieldError("Потрібно погодитись з умовами.", "agree");
        isValid = false;
    }

    if (isValid) {
        alert("Форма успішно відправлена!");

        form.reset();

        countrySelector.value = "Німеччина";
        maleRadio.checked = true;
    }
});

function showFieldError(message, field) {
    const errorElement = document.querySelector(`[data-error="${field}"]`);

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errors = document.querySelectorAll(".error");

    errors.forEach((error) => {
        error.textContent = "";
    });
}