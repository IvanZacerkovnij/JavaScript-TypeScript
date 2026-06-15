//Task1
let startRange = Number(prompt("Enter a start of range: "));
let endRange = Number(prompt("Enter a end of range: "));

if(Number.isNaN(startRange) || Number.isNaN(endRange)) {
    alert("Invalid input");
} else {
    if(startRange <= endRange) {
        let temp = startRange;
        startRange = endRange;
        endRange = temp;
    }
}

let sumNumbersOfRange = 0;
for(let i = startRange; i <= endRange; i++) {
    sumNumbersOfRange += i;
}

alert(`The number sum of this range is ${sumNumbersOfRange}`);

//Task2
let numberOne = Number(prompt("Enter a number: "));
let numberTwo = Number(prompt("Enter a number: "));

let commonDivisor;
if(Number.isNaN(numberOne) || Number.isNaN(numberTwo) || numberOne <= 0 || numberTwo <= 0) {
    alert("Invalid input");
} else {
    if (numberOne < numberTwo) {
        let temp = numberOne;
        numberOne = numberTwo;
        numberTwo = temp;
    }
}
for(let i = 1; i <= numberOne; i++) {
    if(numberOne % i === 0 && numberTwo % i === 0) {
        if(commonDivisor === undefined || i  > commonDivisor) {
            commonDivisor = i;
        }
    }
}
alert("The common divisor is " + commonDivisor);

//Task3
let number = Number(prompt("Enter a number: "));
if(Number.isNaN(number) || number <= 0 || !Number.isInteger(number)) {
    alert("Invalid input");
} else {
    console.log("Divisors:\n")
    for(let i = 1; i <= number; i++) {
        if(number % i === 0) {
            console.log(i)
        }
    }
}

//Task4
number = Number(prompt("Enter a number: "));
if(Number.isNaN(number) || number <= 0 || !Number.isInteger(number)) {
    alert("Invalid input");
} else {
    let count= 0;
    while(number > 0){
        number = Math.floor(number / 10);
        count++;
    }
    alert(`The number contains ${count} digits`)
}

//Task5
let negCount = 0;
let posCount = 0;
let zeroCount = 0;
for(let i = 0; i < 10; i++) {
    let temp = Number(prompt("Enter a number: "));
    if (Number.isNaN(temp)) {
        alert("Invalid input");
        i--;
    } else if (temp < 0) {
        negCount++;
    } else if (temp > 0) {
        posCount++;
    } else {
        zeroCount++;
    }
}
alert(`You entered: ${posCount} positive numbers, ${negCount} negative numbers and ${zeroCount} zeros`);
