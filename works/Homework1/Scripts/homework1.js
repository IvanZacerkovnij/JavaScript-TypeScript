//Task1
alert(`Hello, ${prompt("Enter your name")}!`);

//Task2
const currentYear = new Date().getFullYear();
let yearWhenBorn = Number(prompt("Enter year when you were born: "));
if (Number.isNaN(yearWhenBorn) || yearWhenBorn < 1950 || yearWhenBorn > currentYear) {
    alert("Invalid input");
} else {
    alert(`You are ${currentYear - yearWhenBorn} years old!`);
}

//Task3
let sideOfSquare = Number(prompt("Enter the length of square side: "));
if(Number.isNaN(sideOfSquare) || sideOfSquare <= 0) {
    alert("Invalid input");
} else {
    alert(`The perimetr of this square is ${sideOfSquare * 4}`);
}

//Task4
let radiusOfCircle = Number(prompt("Enter the radius of Circle: "));
if(Number.isNaN(radiusOfCircle) || radiusOfCircle <= 0) {
    alert("Invalid input");
} else {
    alert(`The area of circle is ${Math.PI * radiusOfCircle**2}`);
}

//Task5
let lengthBetweenCities = Number(prompt("Enter the length of cities: "));
let timeToSpend  = Number(prompt("Enter the length of time to Spend (in hours): "));

if (lengthBetweenCities <= 0 || Number.isNaN(lengthBetweenCities) || timeToSpend <= 0 || Number.isNaN(timeToSpend)) {
    alert("Invalid input");
} else {
    prompt(`You should drive ${lengthBetweenCities / timeToSpend} km per hour`);
}
