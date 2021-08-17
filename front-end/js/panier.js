(async function(){ // fonction principale async (async attend que le code soit executer avent d'executer la fonction en async)// fonction principale 
// récupération des éléments dans le localStorage
//--déclaration de la variable "produitEnregistrerDansLocalStorage" 
//dans lequelle on met la key et les values qui sont dans le local storage  
let produitEnregistrerDansLocalStorage = JSON.parse(localStorage.getItem('panier')); 
        //JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet Javascript
 
//-------------------------------L'AFFICHAGE DES PRODUITS DU PANIER -------------------------------------------
// CI-DESSOUS JE SELECTIONNE LA CLASS OU JE VAIS INJESTER MON CODE HTML---------------
const selectionElements = document.querySelector("#container-produits-panier");

// si le panier est vide : afficher le panier est vide
if(produitEnregistrerDansLocalStorage ===null){
    const panierVide = `
    <div id="panier_vide">
        <div >est vide <span style='font-size:100px;'>&#128542;</span></div>
    </div>`;

    //affichage le panier est vide dans la page
    selectionElements.innerHTML = panierVide;   
}

//Si le panier n'est pas vide : afficher les produits enregistrer dans le localStorage
else{
    let structureProduitPanier = []; // [] signifie que structureProduitPanier est un tableau
    var i=0; // injection des varriations de couleurs
    var classeCouleur = '';
    var totalPanier = 0; // cration de la var totalPanier
    var totalQty = 0;  // cration de la var totalQty
    var productsList = []; // [] signifie que productlist est un tableau
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
        structureProduitPanier = structureProduitPanier + displayPanier(article);
        i++;  

    }

    function displayPanier(article) {
        var articlePrice = article.price/100;
        var totalArticle = qty*article.price/100;
        totalPanier += totalArticle;
        totalQty += qty;

        //injection des données dans la pagne html
     //doit retourner le html à l'execution de la fonction displayArticle
        return `
            <div class="container-recapitulatif ${classeCouleur}">
                <div>Produit : ${article.name} </div>
                <div>Prix unité : ${articlePrice} € </div>     
                <div> Quantité : ${qty}</div>
                <div> Prix : ${totalArticle} €</div>
                <div id="supOuAjout"><span id="retirerArticle">-</span>   <span id="ajouterPlus">+</span></div>
            </div>
            `;        

     }

    //     Panier  : doit contabiliser touts les produit dans le localStorage et les afficher
    //injection des données dans la pagne html
        structureProduitPanier = structureProduitPanier + `
       <div class="panierFinal">
            <div>Nombres total d'articles : ${totalQty}</div>
            <div>Prix total : ${totalPanier} €</div>
            <span id="vidPanier">Vider le panier</span>
        </div>


        <form action="/ma-page-de-traitement" method="post">

        <h4>INFORMATIONS CLIENT</h4>
        <div>
            <label for="firstName">Nom :</label>
            <input type="text" id="firstName" name="user_firstName" required>
             <span id="alertNom" class="aRemplirStyle"></span>
        </div>
        <div>
            <label for="lastName">Prénom :</label>
            <input type="text" id="lastName" name="user_lastName" required>
            <span id="alertPrenom" class="aRemplirStyle"></span>
        </div>

        <div>
            <label for="mail">Email :</label>
            <input type="email" id="email" name="user_email" required>
            <span id="alertEmail" class="aRemplirStyle"></span>
        </div>

        <div>
            <label for="adresse">Adresse :</label>
            <input type="text" id="adresse" name="user_adresse" required>
            <span id="alertAdresse" class="aRemplirStyle"></span>
        </div>

        <div>
            <label for="city">Ville :</label>
            <input type="text" id="city" name="user_city" required>
            <span id="alertVille" class="aRemplirStyle"></span>
        </div>

        <button id="btn_commande" type="submit">Envoyer ma Commande</button>
    </form>
       `; 
        //alors en injecte la structure html dans le panier 
    selectionElements.innerHTML = structureProduitPanier;

             //selection du btn envoi de la commande========================
             var btnEnvoyerLaCommande = document.querySelector("#btn_commande")
            // ---------------------addEentListner btn confirmation de la commande-------------------------
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

            //======================== Envoi de l'objet "aEnvoyerAuServeur" vers le serveur ========================

                let url = 'http://localhost:3000/api/cameras/order';
      
                const promiseCommande = fetch(url, {
                 method:"POST",
                body: JSON.stringify({contact:formulaireValues, products:productsList}),
                headers:{
                 "content-Type" : "application/json",
                },
                });
                
             // FIN DE ======= Controler le resulta de promise dans la console à envoyer au server (au click) ============

             
            //** 
            // ================================= Controle du formulaire ===========================/
            
            const alertMessage1 = (value) => { //message d'alert pour les 3 variables qui return :  /^[a-zA-Z]{3,20}$/.test(value);
                return `${value}: Chiffres et symbole ne son pas autorisé, Ne pas dépasser 20 lettres, minimum 3 lettres`;
            };
                        
            // création du fonction contenant les nom, prenom, ville
            //ici une expression de fonction
            const regExNomPrenomVille = (value ) => {
                return /^[A-Za-z\-']{3,20}$/.test(value);
            };
            const regExAdresse = (value ) => {
                return /^[A-Za-z0-9\s]{5,50}$/.test(value);
            };
            const regExEmail = (value ) => {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            };

            //fonctions pour message de texte menquant 

            function infosChampBienRempli(querySelectorId){
                document.querySelector(`#${querySelectorId}`).textContent = "";
            };

            function infosChampManquant(querySelectorId){
                document.querySelector(`#${querySelectorId}`).textContent = "Ce champ à été mal renseigné";
            };

            //---------fin des fonction de message de champs menquant

            //controle de la validité des chemps du formulaire avent l'envoi dens le localStorage
            // ici les fuctions
            function firstNameCt(){
                // controle de la validité du nom
                const firstNameCtOk = formulaireValues.firstName;
                if (regExNomPrenomVille(firstNameCtOk)) {
                    infosChampBienRempli("alertNom");
                    
                    return true;
                } else{
                    infosChampManquant("alertNom");
                    return false;
                }
            };

              function lastNameCt(){
                // controle de la validité du prénom
                const lastNameCtOk = formulaireValues.lastName;
                if (regExNomPrenomVille(lastNameCtOk)){
                    infosChampBienRempli("alertPrenom");
                    return true;
                } else{
                    infosChampManquant("alertPrenom");
                    return false;
                }
            };
              function cityCt(){
                // controle de la validité du ville
                const cityCtOk = formulaireValues.city;
                if (regExNomPrenomVille(cityCtOk)){
                    infosChampBienRempli("alertVille");
                    return true;
                } else{
                    infosChampManquant("alertVille");
                 
                    return false;
                }
            };
            //controle de la validité de l'adresse
            function adresseCt(){
                const adresseCtOk = formulaireValues.adresse;
                if(regExAdresse (adresseCtOk)){
                    infosChampBienRempli("alertAdresse");
                    return true
                }else{
                    infosChampManquant("alertAdresse");
                    return false
                }
            };
            //controle de la validité de l'email
            function emailCt(){
                const emailCtOk = formulaireValues.email;
                if(regExEmail (emailCtOk)){
                    infosChampBienRempli("alertEmail");
                    return true
                }else{
                    infosChampManquant("alertEmail");
                    return false
                }
            };


           //Vérification des chemps pour envoyer le formulaire dans localStorage
            if(firstNameCt() && lastNameCt() && cityCt() && adresseCt() && emailCt()){
                localStorage.setItem('formulaireValues', JSON.stringify(formulaireValues));
                alert ('Votre commande à bien été envoyé')
               //rediriger vers la page de confirmation
            // =============== Controler le resulta de promise dans la console à envoyer au server (au click) =============
            promiseCommande.then(async(response)=>{
                try{
                    console.log("response");
                    console.log(response);

                    const contenu = await response.json(); // Récuperation de la promese + passage en format Json
                    console.log("contenu");
                    console.log(contenu); 
                    localStorage.setItem("orderConfirmed", JSON.stringify(contenu)); // passge des donnée en chaine de caractère
                    localStorage.removeItem("panier"); // suppresion des ellement inutile
                    localStorage.removeItem("formulaireValues");
                    localStorage.removeItem("ajouterAuPanier");
                    location.href = "confirm.html"; // redirection sur la page html
                }catch(e){
                    console.log(e);
                }
            });
            }else{
                alert("veillez bien remplir le formulaire");
            }

            // FIN DE ================================= Controle du formulaire ===========================/
            // **

             });         
}

})()

//get acticles : je recupere les informations des article selectionner
async function getArticle(url){
    try {
    let res = await fetch(url); //l'url demandé
    return await res.json();
    }
    catch(error){
        alert(error)
   }
}