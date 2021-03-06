(async function(){ // fonction principale async (async attend que le code soit executer avent d'executer la fonction en async)
    
    var idProduct = getProductFromUrl(); // Récupération de l'id par l'url
    var url = "http://localhost:3000/api/cameras/" + idProduct; //+ id pour récupé un article bien specifique
    //recuperer les articles
    let article = await getArticle(url);
    //console.log(articles);

        displayArticle(article);
})()

async function getArticle(url){
    try {  
    let res = await fetch(url); //récupération de l'url demandé
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

    let articleTag = document.createElement('article'); //creation d'une balise <article>
    articleTag.setAttribute('class', 'product'); // ajout d'une classe à la balise article

    //ajout du titre----------------------------------------------------------------
    let articleTitle = document.createElement('h2'); //creation d'une balise h2
    articleTitle.textContent = article.name; //ajoute de texte à la balise h2
    articleTag.appendChild(articleTitle); //ajout du h2 comme balise enfant de la balise article

    //ajout de l'iMage--------------------------------------------------------------
    let articleImg = document.createElement ('img');
    articleImg.src=article.imageUrl; // creation d'une balise href
    articleTag.appendChild(articleImg); //

    //ajout de la description-------------------------------------------------------
    let articleDescription = document.createElement('p');
    articleDescription.textContent = article.description ;
    articleTag.appendChild(articleDescription);

    //ajout de le prix------------------------------------------------------------- 
    //creation d'une balise h3 pour l'affichage du prix
    let articlePrice = document.createElement ('h3');
    //affichage du prix
    articlePrice.textContent = article.price ;
    //conversion du prix en euro********************************

    //ici article price est divisé par "/100" ou obtenir le prix en EURO
    articlePrice.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(article.price /100)); 
    
    //affichage du prix dans article
    articleTag.appendChild(articlePrice);

    //affichage des options -------------------------------------
    //creation d'une balise selection pour l'affichage des option
    let lentilles = document.createElement("select"); 
    articleTag.appendChild(lentilles);

    for (i = 0; i < article.lenses.length; i++) {
    let option = document.createElement("option");
    lentilles.appendChild(option);
    option.textContent = article.lenses[i];
    option.value = article.lenses[i];

  }
    // Fin affichage des option --------------------------------------

    //ici ajout du bouton "ajouter au panier"
    let boutonAjouter = document.getElementById("btn_envoyer");

    boutonAjouter.addEventListener("click",function(){ 
        //ajouter ici les fonction néssessaire à la function 
        localStorage.setItem('ajouterAuPanier', 'btn_envoiyer');

        //--déclaration de la variable "produitEnregistrerDansLocalStorage" 
        //dans lequelle on met la key et les values qui sont dans le local storage
        let id_article = article._id;

         //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
        let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('panier')); 
        
        if(produitEnregistrerDansLocalStorage){ // si on a un panier
            let checkCart = 0; // on surveille si on trouve l'article dans le panier
            for (var cartArticle in produitEnregistrerDansLocalStorage) { // pour chaque article du panier
            
                if (id_article.localeCompare( cartArticle) == 0) { // si l'id correspond a larticle aue je veux ajouter
                    let qty_article = parseInt (produitEnregistrerDansLocalStorage[id_article]);  // je recupère la quantite
                    qty_article +=1; // j'augmente la quantite

                    // ajouter la nouvelle qty
                    produitEnregistrerDansLocalStorage[id_article]  = qty_article; // je stocke la nouvelle qty dans le panier
                    localStorage.setItem('panier', JSON.stringify(produitEnregistrerDansLocalStorage)); //j'enregistre le panier
                    checkCart = 1;     //je note aue j'ai trouvé l'article
                }
            }
            if (checkCart == 0) { // si je n'ai pas trouvé l'article
            produitEnregistrerDansLocalStorage[id_article]  = "1"; // j'ajoute ce nouvel article au panier
            localStorage.setItem('panier', JSON.stringify(produitEnregistrerDansLocalStorage));
            }
        }
        else{ // si je n'est pas de panier, je crée un nouveau panier
            let produitEnregistrerDansLocalStorage = {};
            produitEnregistrerDansLocalStorage[id_article]  = "1";
            localStorage.setItem('panier', JSON.stringify(produitEnregistrerDansLocalStorage));   
        }

        // Confirmation d'ajout au panier
        confirm("Le produit à bien été ajouter au panier");

    });

    //ajout de l'enseMble de l'article dans la section
    sectionCatalogue.appendChild(articleTag); // ajout de la balise article comme enfant de la balise section Catalogue
      
}