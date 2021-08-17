(async function(){ // fonction principale async (async attend que le code soit executer avent d'executer la fonction en async)
    //recuperer les articles
    let articles = await getArticles();

    //afficher les articles
    for (let i in articles) { //pour chaque article
        //appel de la fonction d'affichage
        displayArticles(articles[i]);
    } 
})()

async function getArticles(){
    try { // essai de récupérer l'url
    let res = await fetch("http://localhost:3000/api/cameras");
    return await res.json();
    }
    catch(error){ // affichier erreur en cas probleme
        alert(error)
   }
}

//function displayArticles pour l'affichage du contennu dans la page
function displayArticles(article){
    let sectionCatalogue = document.getElementById("catalogue"); //on capture la section "id" catalogue
    let articleTag = document.createElement('article'); //creation d'une balise <article>
    articleTag.setAttribute('class', 'product'); // ajout d'une classe à la balise article

   
    let articleImg = document.createElement ('img');
    articleImg.src=article.imageUrl; // creation d'une balise href
    articleTag.appendChild(articleImg); //

    let link = document.createElement ('a'); //création d'un lien pour rendre l'image cliquable
    link.href = 'product.html?id=' + article._id;
    link.appendChild(articleImg);
    articleTag.appendChild(link);

    let descTag = document.createElement ('div');// création d'une div conteneur pour letitle et le prix
    articleTag.appendChild(descTag);
    //ajout du titre
    let articleTitle = document.createElement('h2'); //creation d'une balise h2
    articleTitle.textContent = article.name; //ajoute de texte à la balise h2
    descTag.appendChild(articleTitle); //ajout du h2 comme balise enfant de la balise article
    //ajout de l'iMage

    //ajout de la prix------------------------------------------------------------- 
    
    //creation d'une balise h3 pour l'affichage du prix
    let articlePrice = document.createElement ('h5');
    
    //affichage du prix
    articlePrice.textContent = article.price;

    //conversion du prix en euro
    //ici article price est divisé par "/100" pour obtenir le prix en EURO
    articlePrice.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(article.price /100)); 
    
    //affichage du prix dans article
    descTag.appendChild(articlePrice);
    
    //ajout de l'enseMble de l'article dans la section
    sectionCatalogue.appendChild(articleTag); // ajout de la balise article comme enfant de la balise section Catalogue
}