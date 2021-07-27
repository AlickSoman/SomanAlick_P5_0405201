(async function(){ // fonction principale

// récupération des éléments dans le localStorage
    //

//--déclaration de la variable "produitEnregistrerDansLocalStorage" 
        //dans lequelle on met la key et les values qui sont dans le local storage
       
        let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('panier')); 
        //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
        // console.log(produitEnregistrerDansLocalStorage);
 
//-------------------------------L'AFFICHAGE DES PRODUITS DU PANIER -------------------------------------------
// CI-DESSOUS JE SELECTIONNE LA CLASS OU JE VAIS INJESTER MON CODE HTML---------------
const selectionElements = document.querySelector("#container-produits-panier");
// console.log(selectionElements);
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
    var productsList = [];
    for(idProduit in produitEnregistrerDansLocalStorage){
        var url = "http://localhost:3000/api/cameras/" + idProduit; //+ id pour récupé un article bien specifique
        //recuperer les articles
        productsList.push(idProduit);
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
        // console.log(totalArticle);
        structureProduitPanier = structureProduitPanier + `
            <div class="container-recapitulatif ${classeCouleur}">
                <div>Nom du produit : ${article.name} </div>
                <div>Prix : ${articlePrice} € </div>
               
                <div> Quantité : ${qty}</div>
                <div> prix : ${totalArticle} €</div>
                <div id="sup-1-IdProduit"> <img src="../img/cart-plus-solid.svg" alt="image"></div>
                <div id="supOuAjout"><span id="retirerArticle">-</span>   <span id="ajouterPlus">+</span></div>
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
                <span id="vidPanier">Vider le panier</span>
            </div>


            <form action="/ma-page-de-traitement" method="post">

            <h4>INFORMATIONS CLIENT</h4>
            <div>
                <label for="firstName">Nom :</label>
                <input type="text" id="firstName" name="user_firstName" required>
                <span id="aideNom"></span>
            </div>
            <div>
                <label for="lastName">Prénom :</label>
                <input type="text" id="lastName" name="user_lastName" required>
                <span id="aidePrenom"></span>
            </div>

            <div>
                <label for="mail">email :</label>
                <input type="email" id="email" name="user_email" required>
                <span id="aideEmail"></span>
            </div>
    
            <div>
                <label for="adresse">Adresse :</label>
                <input type="text" id="adresse" name="user_adresse" required>
                <span id="aideAdresse"></span>
            </div>
    
            <div>
                <label for="city">Ville :</label>
                <input type="text" id="city" name="user_city" required>
                <span id="aideVille"></span>
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
                  address: document.querySelector("#adresse").value,
                  city: document.querySelector("#city").value,
                  
                  
             }
                // btnEnvoyerLaCommande renvoi les element du form dans localstorage, 
                // pour les recupérer avec dans la page confirmation de commande "confirm.html"

                localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));

            // console.log('formulaireValues') 
            // console.log(formulaireValues)



            //======================== Envoi de l'objet "aEnvoyerAuServeur" vers le serveur ========================

                let url = 'http://localhost:3000/api/cameras/order';

       
                const promiseCommande = fetch(url, {
                 method:"POST",
                body: JSON.stringify({contact:formulaireValues, products:productsList}),
                headers:{
                 "content-Type" : "application/json",
                },
                });

            // console.log("promiseCommande");
            // console.log(promiseCommande);

            // =============== Controler le resulta de promise dans la console à envoyer au server (au click) =============
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
             // FIN DE ======= Controler le resulta de promise dans la console à envoyer au server (au click) ============
            //** 
            // ================================= Controle du formulaire ===========================/
            // création des expression rassionnelle (Regular Expression) 
            let regexFirstName = /[a-zA-Z] {3,20}$/; //controle que il y a que des les lettre de a-à-Z
            let regexLastName = /[a-zA-Z]{3,20}$/; //controle que il y a que des les lettre de a-à-Z
            let regexEmail = /.+@.+\..+/; //controle que il y a que des les lettre de a-à-Z
            let regexAdresse = /[0-9] [a-zA-Z]/; //controle que il y a que des les lettre de a-à-Z + nombre de 0 à 9
            let regexCity = /[a-zA-Z]/; //controle que il y a que des les lettre de a-à-Z


            // Validite vas etre appeler en cas d'erreur-----
            let validiteFirstName = "";
            let validiteLastName = "";
            let validiteEmail = "";
            let validiteAdresse = "";
            let validiteCity = "";

            // aide sera appeler pour indiquer quoi faire en cas d'erreur de remplissage------
            let aideNom = document.getElementById("firstName");
            let aidePrenom = document.getElementById("lastName");
            let aideEmail = document.getElementById("email");
            let aideAdresse = document.getElementById("adresse");
            let aideCity = document.getElementById("city");


                //Conditionnement des champs du form  ********

                // condition acceptation envoie serveur

            if (!regexNom.test(firstName.value)) {
                validiteFirstName = "Prenom doit contenir des lettres";
        
                aideNom.textContent = validiteFirstName;
                aideNom.style.color = "red";
            } else if ((regexFirstName.test = firstName.value)) {
                aideNom.textContent = "";
            }
        
            if (!regexPrenom.test(lastName.value)) {
                validiteLastName = "Prenom doit contenir des lettres";
        
                aidePrenom.textContent = validiteLastName;
                aideLastName.style.color = "red";
            } else if ((regexPrenom.test = lastName.value)) {
                aideLastName.textContent = "";
            }
            if (!regexEmail.test(email.value)) {
                validiteEmail = "Adresse email fausse suivez l 'exemple au dessus ";
                aideEmail.textContent = validiteEmail;
                aideEmail.style.color = "red";
            } else if ((regexEmail.test = email.value)) {
                aideEmail.textContent = "";
            }
            
            if (!regexAdresse.test(adresse.value)) {
                validiteAdresse =
                "Adresse non valide doit contenir des chiffre puis des lettres";
                aideAdresse.textContent = validiteAdresse;
                aideAdresse.style.color = "red";
            } else if ((regexAdresse.test = adresse.value)) {
                aideAdresse.textContent = "";
            }
            if (!regexCity.test(city.value)) {
                validiteCity = "Ville doit contenir des lettres";
                aideVille.textContent = validiteCity;
                aideCity.style.color = "red";
            } else if ((regexVille.test = city.value)) {
                aideCity.textContent = "";
            }

            // si toute les conditions rempli envoie au serveur et recupere la reponse serveur

            if (
                regexFirstName.test == firstName.value &&
                regexLastName.test == lastName.value &&
                regexEmail.test == email.value &&
                regexAdresse.test == adresse.value &&
                regexCity.test == city.value
            ) 


            // FIN DE ================================= Controle du formulaire ===========================/
            // **
            // ============================= Redirection sur la page confirmation de commande===================================/


            // FIN DE ====================== Redirection sur la page confirmation de commande===================================/

            function poster(reponse) {
                // redirection page de confirmation commande
        
                location.href = "confirm.html";
        
                reponsejs = reponse;
        
                let objectJsOrder = "orderId";
        
                let lineOrderId = localStorage.getItem("orderId");
                let orderIdent = JSON.parse(lineOrderId);
        
                //suppression du local storage des produit panier apres commande si nouvel commande suppression total
        
                if (orderIdent === null) {
                  localStorage.removeItem("id");
                  localStorage.removeItem("object");
                  orderIdent = [];
                } else {
                  localStorage.removeItem("id");
                  localStorage.removeItem("object");
                  localStorage.removeItem("orderId");
                  orderIdent = [];
                }
        
                // integre la nouvelle commande apres l ancienne commande
        
                orderIdent.push(reponsejs.orderId, somme);
        
                let tabOrderIdLine = JSON.stringify(orderIdent);
        
                localStorage.setItem(objectJsOrder, tabOrderIdLine);
                
            }
            //     // recuper les valeurs du formulaire
            // const formulaireUserData = localStorage.getItem("formulaireValues"); 
            // // conversion de la chaine de caractère en objet
            // const formulaireUserObject = JSON.parse(formulaireUserData);


            // // remplire le formulaire avec les données de lutilisateur
            // // données enregistrer 

            // function formDataUser(input){
            //     document.querySelector (`#${input}`).value =formulaireUserObject[input];
            // };
            // formDataUser("firstName");
            // formDataUser("lasstName");
            // formDataUser("email");
            // formDataUser("adresse");
            // formDataUser("ville");

            // ----------------Ici la fin de l'écoute du btnEnvoyerLaCommande------------------------
             });

           


            

           
            
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
 


