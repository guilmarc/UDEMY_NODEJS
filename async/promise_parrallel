

console.log('Début du code');

let p1 = new Promise(( resolve, reject ) => {

    setTimeout( () => {
        resolve("Promise 1")
    }, 3000)

});

let p2 = new Promise(( resolve, reject ) => {

    setTimeout( () => {
        resolve("Promise 2")
    }, 1000)

});

//Attends tous les retours de promesses
Promise.all([p1, p2])
    .then((result) => console.log(result));

//Met la plus rapide en retour
Promise.race([p1, p2])
    .then((result) => console.log(result));

console.log('Fin du code');