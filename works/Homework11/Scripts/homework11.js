// task1
import {makeDinner, washDishes,cleanRoom} from "./task1.js";

makeDinner().then(result => {
    console.log(result);
})
washDishes().then(result => {
    console.log(result);
})
cleanRoom().then(result => {
    console.log(result);
})

//task2
import {sortArray} from "./task2.js";

let emptyArray = [];
let array = [5,2,4,1];

Promise.all([
    sortArray(emptyArray),
    sortArray(array)
]).then(result => {
    console.log(result);
}).catch(err=>{
    console.log(err)
})

let savedArray = JSON.parse(localStorage.getItem("array"));
console.log(savedArray);

//task3
import {multiplyAsync} from "./task3.js";

async function main(){
    const result = await multiplyAsync(6,9);
    console.log(result);
}

main();
