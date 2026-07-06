$(document).ready(function () {
    let cards = ["🍎", "🍌", "🍇", "🍓", "🍎", "🍌", "🍇", "🍓"];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    cards = shuffleCards(cards);

    cards.forEach(function (value) {
        $("#game").append(
            `<div class="card" data-value="${value}">?</div>`
        )
    })

    $(".card").click(function () {
        if(lockBoard) {
            return;
        }

        if($(this).hasClass("opened") || $(this).hasClass("matched")){
            return;
        }

        let cardValue = $(this).attr("data-value");

        $(this).text(cardValue);
        $(this).addClass("opened");

        if(firstCard == null) {
            firstCard = $(this)
        } else {
            secondCard = $(this)
            checkCards();
        }
    });

    function checkCards() {
        let first = firstCard.attr("data-value");
        let second = secondCard.attr("data-value");

        if(first === second){
            firstCard.addClass("matched");
            secondCard.addClass("matched");

            firstCard = null;
            secondCard = null;

            checkWin();
        } else {
            lockBoard = true;

            setTimeout(function () {
                firstCard.text("?")
                secondCard.text("?")

                firstCard.removeClass("opened");
                secondCard.removeClass("opened");

                firstCard = null;
                secondCard = null;

                lockBoard = false;
            }, 1000);
        }
    }

    function checkWin() {
        if($(".matched").length === cards.length) {
            setTimeout(function () {
                alert("You win");
            }, 500);
        }
    }

    function shuffleCards(array) {
        return array.sort(function() {
            return Math.random() - 0.5;
        })
    }
});

