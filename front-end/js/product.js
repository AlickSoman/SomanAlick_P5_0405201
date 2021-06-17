(async function(){ // fonction principale
    //const articles = await getArticles()
    var idProduct = getProductFromUrl(); // Récup l'id par l'url
    var url = "http://localhost:3000/api/cameras/" + idProduct; //+ id pour récupé un article bien specifique
    //recuperer les articles
    let article = await getArticle(url);
    //console.log(articles);

        displayArticle(article);

})()

async function getArticle(url){
    try {
        //console.log(url);
    let res = await fetch(url); //l'url demandé
    return await res.json();
    }
    catch(error){
        alert(error)
   }
}
//
function getProductFromUrl() {
    var urlParams = new URLSearchParams(window.location.search); //capture de l'url et découpe les paramètres
    return urlParams.get('id'); // renvoie uniquement le paramètre, qui nous intéresse
}


//function displayArticles pour l'affichage du contennu dans la page
function displayArticle(article){
    let sectionCatalogue = document.getElementById("article"); //on capture la section "id" catalogue
    console.log(article);
    //let articleTag = document.createElement('article'); //creation d'une balise <article>
    //articleTag.setAttribute('class', 'product'); // ajout d'une classe à la balise article


    let articleTag = document.createElement('article'); //creation d'une balise <article>
    articleTag.setAttribute('class', 'product'); // ajout d'une classe à la balise article


    //ajout du titre
    let articleTitle = document.createElement('h2'); //creation d'une balise h2
    articleTitle.textContent = article.name; //ajoute de texte à la balise h2
    articleTag.appendChild(articleTitle); //ajout du h2 comme balise enfant de la balise article
    //ajout de l'iMage
    let articleImg = document.createElement ('img');
    articleImg.src=article.imageUrl; // creation d'une balise href
    articleTag.appendChild(articleImg); //


    //ajout de la description-------------------------------------------------------
    let articleDescription = ducument.createElement('p');
    articleDescription.textContent = article.description ;
    articleTag.appendChild(articleDescription);
    console.log('Description')

    //ajout de la prix------------------------------------------------------------- 
    
    //creation d'une balise h3 pour l'affichage du prix
    let articlePrice = document.createElement ('h3');
    
    //affichage du prix
    articlePrice.textContent = article.price ;

    //conversion du prix en euro
    console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(article.price /100));
   
    //ici article price est divisé par "/100" ou obtenir le prix en EURO
    articlePrice.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(article.price /100)); 
    
    //affichage du prix dans article
    articleTag.appendChild(articlePrice);
    
//Ici je veux injecter mon article selectionner dans InerHTML

 

    //ajout de l'enseMble de l'article dans la section
    sectionCatalogue.appendChild(articleTag); // ajout de la balise article comme enfant de la balise section Catalogue
    
    
}





