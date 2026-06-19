const car = {
    carDeveloper: "Toyota",
    model: "Camry",
    releaseDate: 2020,
    avgSpeed: 90,

    showInfo() {
        alert(`Car developer: ${this.carDeveloper}\n` +
            `Model: ${this.model}\n` +
            `Release: ${this.releaseDate}\n` +
            `Average speed: ${this.avgSpeed} km/h`);
    },

    countTimeForRoad(roadLength) {
        if (roadLength <= 0 || this.avgSpeed <= 0) {
            alert("Invalid input");
            return;
        }

        let time = 0;
        let drivingHours = 0;

        while (roadLength > 0) {
            roadLength -= this.avgSpeed;
            time++;
            drivingHours++;

            if (drivingHours % 4 === 0 && roadLength > 0) {
                time++;
            }
        }

        alert(`For this distance you need spend ${time} hours`);
    }
};

const printMachine =  {
    fontSize: 14,
    fontColor: 'black',
    fontFamily: 'Roboto',

    print(text){
        alert(`fontSize: ${this.fontSize}\n` +
            `fontColor: ${this.fontColor}\n` +
            `fontFamily: ${this.fontFamily}\n`+ "" +
            `Text: ${text}\n`);
    }
}

setTimeout(() => {
    printMachine.print("Hello World!");
}, 5000)