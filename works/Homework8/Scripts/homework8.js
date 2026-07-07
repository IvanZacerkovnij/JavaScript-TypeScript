$(document).ready(function () {

    const monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    $("#date").on("submit", function (event) {
        event.preventDefault();

        let month = $("#month").val();
        let year = $("#year").val();

        makeShedule(year, month);
    })

    function makeShedule(year, month) {

        $("#schedule").removeClass("hidden");

        $("#tableBody").html("");

        let daysInMonth = new Date(year, month, 0).getDate();

        let firstDay = new Date(year, month - 1, 1).getDay();
        let startDay = (firstDay + 6) % 7;

        let day = 1;

        $("#textDate").text(`${monthNames[month - 1]} ${year}`);

        while (day <= daysInMonth) {
            $("#tableBody").append("<tr>");
            for(let i = 0; i < 7; i++) {
                if(day === 1 && i < startDay) {
                    $("#tableBody").append("<td></td>");
                } else if (day > daysInMonth){
                    $("#tableBody").append("<td></td>");
                } else {
                    $("#tableBody").append(`<td>${day}</td>`);
                    day++;
                }
            }
            $("#tableBody").append("</tr>");
        }

    }
})