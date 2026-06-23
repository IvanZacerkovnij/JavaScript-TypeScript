$("#btn").click(function () {
    $("#text").toggleClass("hidden");
});

$('.menu p').click(function () {
    let attribute = $(this).attr("data-text");

    let textBlock = $(".textContainer p");
    switch (attribute) {
        case "HTML":
            textBlock.text("HTML — це мова розмітки, за допомогою якої створюється структура вебсторінки. Наприклад: заголовки, текст, картинки, кнопки та посилання.");
            break;
        case "CSS":
            textBlock.text("CSS — це мова стилів, яка відповідає за зовнішній вигляд сторінки. За допомогою CSS можна змінювати кольори, розміри, відступи, шрифти та розташування елементів.")
            break;
        case "JS":
            textBlock.text("JavaScript — це мова програмування, яка додає сторінці інтерактивність. Наприклад: обробка кліків, зміна тексту, показ або приховування елементів.")
            break;
    }
});