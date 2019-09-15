

console.log('Début du code');

getMemberPromise()
    .then(member => getArticlesPromise(member))
    .then(articles => console.log(articles))
    .catch(err => console.log(err));

function getMemberPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('Member 1')
            resolve('Member 1');
        }, 1500);
    })
}

function getArticlesPromise(member) {
    return new Promise( (resolve, reject) => {
        setTimeout(()=> {
            resolve([1, 2, 3]);
        }, 1500);
    })
}
console.log('Fin du code');