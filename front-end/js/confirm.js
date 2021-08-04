(async function(){ // fonction principale
    
 var order = localStorage.getItem("orderConfirmed");
 var objectsOrder = JSON.parse(order);
 console.log(objectsOrder['contact']['firstName']);

//-------------------------------L'AFFICHAGE DES PRODUITS DU PANIER -------------------------------------------
// CI-DESSOUS JE SELECTIONNE LA CLASS OU JE VAIS INJESTER MON CODE HTML---------------
const selectionElements = document.querySelector("#container-produits-panier");
// console.log(selectionElements);
// si le panier est vide : afficher le panier est vide
// if(produitEnregistrerDansLocalStorage ===null){
//     const panierVide = `
//     <div id="panier_vide">
//         <div>Le panier est vide </div>
//     </div>`;

//     //affichage le panier est vide dans la page
//     selectionElements.innerHTML = panierVide;
    
// };


//Si le panier n'est pas vide : afficher les produits enregistrer dans le localStorage
    
// else{

//     console.log(produitEnregistrerDansLocalStorage)

//     let structureProduitPanier = [];
//     var i=0; // injection des varriations de couleurs
//     var classeCouleur = '';
//     var totalPanier = 0; // cration de la var totalPanier
//     var totalQty = 0;  // cration de la var totalQty
//     var productsList = [];
//     for(idProduit in produitEnregistrerDansLocalStorage){
//         var url = "http://localhost:3000/api/cameras/" + idProduit; //+ id pour récupé un article bien specifique
//         //recuperer les articles
//         productsList.push(idProduit);
//         if (i%2 == 0){ /// i Modulo 2 calcule le reste de la division par 2 et on verifie si ca vaut 0 ou autre chose
//             classeCouleur = "pair";
//         }
//         else {
//             classeCouleur = "impair";
//         }
//         //récuper les valeur des var déclarer plus haut ligne 35 à 38
//         var qty = parseInt (produitEnregistrerDansLocalStorage[idProduit]);

//         let article = await getArticle(url);
//         var articlePrice = article.price/100;
//         var totalArticle = qty*article.price/100;
//         totalPanier += totalArticle;
//         totalQty += qty;


//         //injection des données dans la pagne html
//         // console.log(totalArticle);
//         structureProduitPanier = structureProduitPanier + `
//             <div class="container-recapitulatif ${classeCouleur}">
//                 <div>Nom du produit : ${article.name} </div>
//                 <div>Prix : ${articlePrice} € </div>
               
//                 <div> Quantité : ${qty}</div>
//                 <div> prix : ${totalArticle} €</div>
//                 <div id="sup-1-IdProduit"> <img src="../img/cart-plus-solid.svg" alt="image"></div>
//                 <div id="supOuAjout"><span id="retirerArticle">-</span>   <span id="ajouterPlus">+</span></div>
//             </div>
//             `;
//             //addEnventlistner sur mon btn supprimer 1 alarticle

//             i++;  
// }



 
})()

// {contact: {…}, products: Array(2), orderId: "637e9bc0-eec2-11eb-9cc5-73bd5797072d"}

//::::::::::::::::::::::::::::::recupere localstorage order command:::::::::::::::::::::::::::::::



//:::::::::::::::::::::: changement de contenu quand la commande est valider ::::::::::::::::::::::

// if (lineCommand !== null) {
//   var titCommand = document.getElementById("command");
//   var descriCommand = document.getElementById("orderCommand");

//   titCommand.innerHTML = "Votre commande a bien été reçu";
//   descriCommand.textContent =
//     "Votre identifiant de commande est le :   " +
//     objectCommand[0] +
//     "  ,le total de vos achats est de : " +
//     objectCommand[1] +
//     "  euro";
// }