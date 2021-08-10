(async function(){ // fonction principale
    //const articles = await getArticles()

    //recuperer les articles
    let articles = await getArticles();
    //console.log(articles);

    //afficher les articles
    for (let i in articles) { //pour chaque article
        //appel de la fonction d'affichage
        displayArticles(articles[i]);
    }

   
})()

async function getArticles(){
    try {
    let res = await fetch("http://localhost:3000/api/cameras");
    return await res.json();
    }
    catch(error){
        alert(error)
   }
}

//function displayArticles pour l'affichage du contennu dans la page
function displayArticles(article){
    let sectionCatalogue = document.getElementById("catalogue"); //on capture la section "id" catalogue
    console.log(article);
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

    let link = document.createElement ('a');
    link.href = 'product.html?id=' + article._id;
    link.appendChild(articleImg);
    articleTag.appendChild(link);


    //ajout de la prix------------------------------------------------------------- 
    
    //creation d'une balise h3 pour l'affichage du prix
    let articlePrice = document.createElement ('h3');
    
    //affichage du prix
    articlePrice.textContent = article.price;

    //conversion du prix en euro
    console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(article.price));
   
    //ici article price est divisé par "/100" ou obtenir le prix en EURO
    articlePrice.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(article.price /100)); 
    
    //affichage du prix dans article
    articleTag.appendChild(articlePrice);

    //ajout de l'enseMble de l'article dans la section
    sectionCatalogue.appendChild(articleTag); // ajout de la balise article comme enfant de la balise section Catalogue
    
    
}



