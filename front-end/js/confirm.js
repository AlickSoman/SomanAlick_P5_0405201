(async function(){ // fonction principale
    
 var order = localStorage.getItem("orderConfirmed");
 var objectsOrder = JSON.parse(order);
 console.log(objectsOrder);

 const selectionElements = document.querySelector("#confirmCommande");

      let  structureCommande = `
            <div class="container-recapitulatif">
            Merci pour votre commande n°${objectsOrder['orderId']} ${objectsOrder['contact']['firstName']} ${objectsOrder['contact']['lastName']}
                </div>
            `;

selectionElements.innerHTML=structureCommande;
 
})()
