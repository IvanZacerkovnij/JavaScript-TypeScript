
export function sortArray(array){
    return new Promise((resolve,reject)=>{
        if(array.length === 0){
            reject("Масив пустий");
        }
        else{
            setTimeout(() =>{
                array.sort();
                localStorage.setItem('array',JSON.stringify(array));
            },2000)
        }
    })
}