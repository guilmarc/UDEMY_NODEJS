console.log('Début du code');


(async () => {
    try {
        let member = await getMember();
        let articles = await getArticles();
        console.log(articles)
    }
    catch(err) {
        console.log(err.message)
    }
})();



function getMember() {
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log("Member 1")
            resolve("Member 1")
        }, 1500)
    })
}

function getArticles() {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve([1, 2, 3])
        }, 1000)
    })
}

console.log('Fin du code');
