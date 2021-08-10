(async function(){ // fonction principale
    
 var order = localStorage.getItem("orderConfirmed");
 var objectsOrder = JSON.parse(order);
 console.log(objectsOrder);

 const selectionElements = document.querySelector("#confirmCommande");

      let  structureCommande = `
            <div class="container-recapitulatif">
           Bonjour, ${objectsOrder['contact']['firstName']} ${objectsOrder['contact']['lastName']}
            </div>
            <div>Nous avons bien pris en compte votre commande</div>
            <div class="container-recapitulatif">
            Voici votre numéro de commande : ${objectsOrder['orderId']} 
            </div>
            `;

selectionElements.innerHTML=structureCommande;
 
})()
