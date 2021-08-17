(async function(){ // fonction principale async (async attend que le code soit executer avent d'executer la fonction en async)// fonction principale
    
 var order = localStorage.getItem("orderConfirmed"); //récupération du order de la commande dans le localstorage
 var objectsOrder = JSON.parse(order); //Transformer le order en chaines de caractères
 console.log(objectsOrder);

 const selectionElements = document.querySelector("#confirmCommande"); // Selectionne la section dans la affiche le contenu

      let  structureCommande = `
            <div class="container-recapitulatif">
           Bonjour, ${objectsOrder['contact']['firstName']} ${objectsOrder['contact']['lastName']}
            </div>
            <div>Nous avons bien pris en compte votre commande</div>
            <div class="container-recapitulatif">
            Voici votre numéro de commande : ${objectsOrder['orderId']} 
            </div>
            `; //construction de la structure htm et assigniation des valeurs a afficher sur la page

selectionElements.innerHTML=structureCommande; // Injection du html dans la section
 
})()
