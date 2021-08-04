// ecoute des données utilsateur et validation formulaire avant envoi serveur
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // controle du formulaire---------------------------------
    // regex
    let regexFirstName = /[a-zA-Z]/;
    let regexLastName = /[a-zA-Z]/;
    let regexEmail = /.+@.+\..+/;
    let regexAdresse = /[0-9] [a-zA-Z]/;
    let regexCity = /[a-zA-Z]/;

    let validiteFirstName = "";
    let validiteLastName = "";
    let validiteEmail = "";
    let validiteAdresse = "";
    let validiteCity = "";

    let aideFirstName = document.getElementById("firstName");
    let aideLastName = document.getElementById("lastName");
    let aideEmail = document.getElementById("email");
    let aideAdresse = document.getElementById("adresse");
    let aideCity = document.getElementById("city");

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
    ) {
      let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: adresse.value,
        city: city.value,
        email: email.value,
      };
      let products = objectJs2;

      let contprod = { contact, products };
      contprodjs = JSON.stringify(contprod);

    //   ------------fin de controle du formulaire -----------------------------


    
      // Envoi des données du formulaire au serveur avec promise

      ajaxPost("http://localhost:3000/api/cameras/order", contprodjs)
        .then(function (reponse) {
          poster(reponse);
        })
        .catch(function (err) {
          console.log(err);
        });

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
}
})


            // création des expression rassionnelle (Regular Expression) 
            let regexFirstName = /[a-zA-Z] {3,20}$/; //controle que il y a que des les lettre de a-à-Z
            let regexLastName = /[a-zA-Z]{3,20}$/; //controle que il y a que des les lettre de a-à-Z
            let regexEmail = /.+@.+\..+/; //controle que il y a que des les lettre de a-à-Z
            let regexAdresse = /[0-9] [a-zA-Z]/; //controle que il y a que des les lettre de a-à-Z + nombre de 0 à 9
            let regexCity = /[a-zA-Z]/; //controle que il y a que des les lettre de a-à-Z


            // Validite vas etre appeler en cas d'erreur-----
            let validiteFirstName = "preno ,al renseigné";
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
            );




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
            // formDataUser("lastName");
            // formDataUser("email");
            // formDataUser("adresse");
            // formDataUser("city");