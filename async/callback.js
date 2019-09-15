console.log('Début du code');
getMember((member) => {
    console.log(member);
    getArticles(member, (articles) => {
        console.log(articles);
    });
});

function getMember(next){
    setTimeout( () => {
        next('Member1')
    }, 1500);
}

function getArticles(member, next){
    setTimeout(  () => {
        next([1, 2, 3]);
    }, 1500);
}

console.log('Fin du code');