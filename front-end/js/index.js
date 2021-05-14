main();

function main(){
    const articles = getArticles();
    /*displayArcticles(articles)*/
    /*console.log (articles)*/
}

function getArticles(){
    fetch('​http://localhost:3000/api/teddies')
        .then(function(httpBodyResponse){
            console.log(httpBodyResponse.json());
        });

}