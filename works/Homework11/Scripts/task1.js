export function washDishes(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("Посуд вимито")
        }, 2000)
    })
}

export function cleanRoom(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("Кімнату прибрано")
        },4000)
    })
}

export function makeDinner(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("Вечеря приготована")
        },7000)
    })
}