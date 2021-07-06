(async function(){ // fonction principale

// récupération des éléments dans le localStorage
    //

//--déclaration de la variable "produitEnregistrerDansLocalStorage" 
        //dans lequelle on met la key et les values qui sont dans le local storage
       
        let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('panier')); 
        //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
        console.log(produitEnregistrerDansLocalStorage);
 
//-------------------------------L'AFFICHAGE DES PRODUITS DU PANIER -------------------------------------------
// CI-DESSOUS JE SELECTIONNE LA CLASS OU JE VAIS INJESTER MON CODE HTML---------------
const selectionElements = document.querySelector("#container-produits-panier");
console.log(selectionElements);
// si le panier est vide : afficher le panier est vide
if(produitEnregistrerDansLocalStorage ===null){
    const panierVide = `
    <div>
        <div>Le panier est vide </div>
    </div>`;

    //affichage le panier est vide dans la page
    selectionElements.innerHTML = panierVide;
    
}


//Si le panier n'est pas vide : afficher les produits enregistrer dans le localStorage
    
else{
    console.log(produitEnregistrerDansLocalStorage)
    let structureProduitPanier = [];
    var i=0; // injection des varriations de couleurs
    var classeCouleur = '';
    for(idProduit in produitEnregistrerDansLocalStorage){
        var url = "http://localhost:3000/api/cameras/" + idProduit; //+ id pour récupé un article bien specifique
        //recuperer les articles
        
        if (i%2 == 0){ /// i Modulo 2 calcule le reste de la division par 2 et on verifie si ca vaut 0 ou autre chose
            classeCouleur = "pair";
        }
        else {
            classeCouleur = "impair";
        }
        
        var qty = produitEnregistrerDansLocalStorage[idProduit];
        let article = await getArticle(url);
        var articlePrice = article.price/100;
        var totalArticle = qty*article.price/100;
        



        console.log(totalArticle);
        structureProduitPanier = structureProduitPanier + `
            <div class="container-recapitulatif ${classeCouleur}">
                <div>Nom du produit : ${article.name} </div>
                <div>Prix : ${articlePrice} € </div>
               
                <div> Quantité : ${qty}</div>
                <div> prix : ${totalArticle} €</div>
                
            </div>
            `;
            i++;

            // Panier  : doit contabiliser touts les produit dans le localStorage et les afficher

            // structureProduitPanierFinal = structureProduitPanierFinal + `
        //    <div class="panierFinal ${classeCouleur}">
                
        //         <div>Prix : ${articlePrice}*${qty}€ </div>
        //         <div> QNombres total d'articles : ${qty}</div>
        //         <div> prix total : ${totalArticle} €</div>
        //         <div><button>Validé</button></div>
        //     </div>
        //    `; 


            
}


            //alors en injecte la structure html dans le panier
            selectionElements.innerHTML = structureProduitPanier;

}

})()
//get acticles

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
 


