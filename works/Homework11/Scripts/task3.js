export function multiplyAsync(a,b){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(Number.isNaN(a) || Number.isNaN(b)){
                reject("Не коректні значення");
            }
            else{
                resolve(a * b);
            }
        }, 2000);
    })
}