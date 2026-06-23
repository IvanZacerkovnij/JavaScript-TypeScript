//Task1
class Marker {
    constructor(color, capacity){
        this.color = color;
        this.capacity = capacity;
    }

    print(text) {
        let result = '';

        for(let char of text){
            if(char !== ' '){
                if(this.capacity < 0.5){
                    break;
                }
                this.capacity -= 0.5;
            }
            result += char;
        }
        document.write(`<p style="color: ${this.color};">${result}</p>`)
    }
}

class RefillableMarker extends Marker {
    refill(amount){
        this.capacity += amount;

        if(this.capacity > 100){
            this.capacity = 100;
        }
    }
}

let marker = new Marker("red" , 50);
marker.print("Hello World");
console.log(`Ink left: ${marker.capacity}%`);

let refillableMarker = new RefillableMarker("blue", 20);
refillableMarker.refill(50);
console.log(refillableMarker.capacity);
console.log(`Ink left: ${refillableMarker.capacity}%`);

//Task2
class ExtendedDate extends Date {
    showCurrentDate(){

        let year = this.getFullYear();
        let month = String(this.getMonth()+1).padStart(2, '0');
        let day = String(this.getDate()).padStart(2, '0');

        let currentDate = `${year}-${month}-${day}`;
        console.log(currentDate);
        return currentDate;
    }

    checkDate(date){
        let dateToCheck = new Date(date);
        dateToCheck.setHours(0, 0, 0, 0);

        let currentDate = new Date(this.showCurrentDate());
        return dateToCheck >= currentDate;
    }

    showDateText(){
        const month = [
            "січня",
            "лютого",
            "березня",
            "квітня",
            "травня",
            "червня",
            "липня",
            "серпня",
            "вересня",
            "жовтня",
            "листопада",
            "грудня"
        ];

        return `${this.getDate()} ${month[this.getMonth()]}`
    }

    isLeapYear(year){
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ;
    }

    nextDate(){
        let next = new ExtendedDate(this.getTime());
        next.setDate(this.getDate() + 1);

        return next;
    }
}

let date = new ExtendedDate(2026, 5, 23);

console.log(`Дата текстом: ${date.showDateText()}`);

console.log(`Дата майбутня або поточна: ${date.checkDate("2026-06-24")}`);

console.log(`Високосний рік: ${date.isLeapYear(2024)}`);

let next = date.nextDate();

console.log(`Наступна дата: ${next.showCurrentDate()}`);


