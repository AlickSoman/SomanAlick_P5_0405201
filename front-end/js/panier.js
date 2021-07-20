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
    <div id="panier_vide">
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
    var totalPanier = 0; // cration de la var totalPanier
    var totalQty = 0;  // cration de la var totalQty
    for(idProduit in produitEnregistrerDansLocalStorage){
        var url = "http://localhost:3000/api/cameras/" + idProduit; //+ id pour récupé un article bien specifique
        //recuperer les articles
        
        if (i%2 == 0){ /// i Modulo 2 calcule le reste de la division par 2 et on verifie si ca vaut 0 ou autre chose
            classeCouleur = "pair";
        }
        else {
            classeCouleur = "impair";
        }
        //récuper les valeur des var déclarer plus haut ligne 35 à 38
        var qty = parseInt (produitEnregistrerDansLocalStorage[idProduit]);

        let article = await getArticle(url);
        var articlePrice = article.price/100;
        var totalArticle = qty*article.price/100;
        totalPanier += totalArticle;
        totalQty += qty;


        //injection des données dans la pagne html
        console.log(totalArticle);
        structureProduitPanier = structureProduitPanier + `
            <div class="container-recapitulatif ${classeCouleur}">
                <div>Nom du produit : ${article.name} </div>
                <div>Prix : ${articlePrice} € </div>
               
                <div> Quantité : ${qty}</div>
                <div> prix : ${totalArticle} €</div>
                <div id="sup-1-IdProduit"> <img src="../img/cart-plus-solid.svg" alt="image"></div>
                
            </div>
            `;

            //addEnventlistner sur mon btn supprimer 1 alarticle




            i++;



            
}

        //     Panier  : doit contabiliser touts les produit dans le localStorage et les afficher
        //injection des données dans la pagne html
            structureProduitPanier = structureProduitPanier + `
           <div class="panierFinal">
                <div>Nombres total d'articles : ${totalQty}</div>
                <div>prix total : ${totalPanier} €</div>
            </div>


            <form action="/ma-page-de-traitement" method="post">

            <h4>INFORMATIONS CLIENT</h4>
            <div>
                <label for="firstName">Nom :</label>
                <input type="text" id="firstName" name="user_firstName" required>
            </div>
            <div>
                <label for="lastName">Prénom :</label>
                <input type="text" id="lastName" name="user_lastName" required>
            </div>

            <div>
                <label for="mail">email :</label>
                <input type="email" id="email" name="user_email" required>
            </div>
    
            <div>
                <label for="adresse">Adresse :</label>
                <input type="text" id="adresse" name="user_adresse" required>
            </div>
    
            <div>
                <label for="city">Ville :</label>
                <input type="text" id="city" name="user_city" required>
            </div>
    
            <button id="btn_commande" type="submit">Envoyer ma Commande</button>
        </form>
           `; 
            //alors en injecte la structure html dans le panier
            selectionElements.innerHTML = structureProduitPanier;
        

             //selection du btn envoi de la commande========================
             var btnEnvoyerLaCommande = document.querySelector("#btn_commande")
            //  console.log(btnEnvoyerLaCommande)

            // ---------------------addEentListner-------------------------
             btnEnvoyerLaCommande.addEventListener("click",(e) => {
                e.preventDefault(); // annule le conportement par défaut

            //récupération des valeurs du formulaire
             const formulaireValues = {
                  firstName: document.querySelector("#firstName").value,
                  lastName: document.querySelector("#lastName").value,
                  email: document.querySelector("#email").value,
                  adresse: document.querySelector("#adresse").value,
                  city: document.querySelector("#city").value,
                  
                  
             }

            // mettre les valeurs du formulaires dans le localStorage
            localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));

            console.log('formulaireValues') 
            console.log(formulaireValues)

            //  les elements a envoyer au serveur
             const aEnvoyerAuServeur = {
                 produitEnregistrerDansLocalStorage,
                 formulaireValues
             }

              //  Envoi de l'objet "aEnvoyerAuServeur" vers le serveur
            const promiseCommande = fetch("​http://localhost:3000/api/cameras/users", {
             method:"POST",
             body: JSON.stringify(aEnvoyerAuServeur),
             headers:{
                 "content-Type" : "application/jason",
             },
            });
            console.log("promiseCommande");
            console.log(promiseCommande);

            // voir le resulta de promise dans la console
            promiseCommande.then(async(response)=>{
                try{
                    console.log("response");
                    console.log(response);

                    const contenu = await response.json();
                    console.log("contenu");
                    console.log(contenu);

                }catch(e){
                    console.log(e);
                }
            });

            // controle de l'envoi sur le serveur Metod Get
            const promiseCommandeCT = fetch("​http://localhost:3000/api/cameras/users")
            promiseCommandeCT.then(async (response) =>{
                try{
                    console.log("promiseCommandeCT")
                    console.log(promiseCommandeCT)
                    const donneeSurServeur =await response.json();
                    console.log("donneeSurServeur")
                    console.log(donneeSurServeur)

                }catch(e){
                    console.log(e)
                }
            })

            // ----------------Ici la fin de l'écoute du btnEnvoyerLaCommande------------------------
             });

           

            // //   garder le formulaire remplie
            // const dataLocalStorage = localStorage.getItem("formulairValues");
            // // convertion des chaine de caractère en objet javascript avec JSON.parse
            // const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

            // // Mettre les values du formulaire qui son dans localStorage
            // // en souvenir dans le formulaire
            // document.querySelector("#firstName").value = dataLocalStorageObjet.firstName;
            // document.querySelector("#lasttName").value = dataLocalStorageObjet.lastName;
            // document.querySelector("email").value = dataLocalStorageObjet.email;
            // document.querySelector("#adresse").value = dataLocalStorageObjet.adresse;
            // document.querySelector("#city").value = dataLocalStorageObjet.city;
            

           
            
}





})()



//get acticles : je recupere les informations des article selectionner

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
 


