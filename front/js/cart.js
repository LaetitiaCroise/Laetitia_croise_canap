// ------------je récupère les informations de l'API-----------
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function getKanapData(kanapData) {
    let products = JSON.parse(localStorage.getItem("products")); //------transforme le json en objet javascript----------
    searchId(kanapData, products);
  })
  .catch(function (error) {
    // -------------si dans le cas il y'a une erreur je voudrais l'afficher-----------
    console.log(error);
  });

// -----------je comprare mon localStorage à l'API products, se qui est similaire s'affiche---------------
function searchId(api, products) {
  // definition de la function
  if (products === null || products.length === 0) {
    // --------------si la liste de produit est inexistant--------------

    // ---------je modifie le h1 avec 'Votre panier est vide'---------
    let cartAndFormContainer = document.querySelector(
      "#cartAndFormContainer > h1"
    );
    cartAndFormContainer.innerHTML = "Votre panier est vide";
  } else {
    for (let product of products) {
      // ------------Pour chaque produit de la liste (panier)-----------
      console.log(product);
      for (let data of api) {
        // ------Pour chaque produit de l'api----------
        if (product.id === data._id) {
          //-------- Si le produit du panier est le meme que celui de l'api alors-----------
          createProductCard(data, product); // on crèe la fiche produit en html
          totalQty(products);
        }
      }
    }
  }
  totalPrice(api, products);
  changeQty(api, products);
  deleteItemSelect(api, products);
}

// -------------je créé les balises et le contenu du DOM--------------------
function createProductCard(data, product) {
  // -----------crée élement article--------------
  const article = document.createElement("article");
  //---------- ajouter une class à l'article--------------------
  article.classList.add("cart__item");
  // -------------j'attache cart__items à l'article--------------
  cart__items.appendChild(article);

  // ------------je defini la valeur du produit et sa couleur dans un attribut-------------------
  article.setAttribute("data-id", product.id);
  article.setAttribute("data-color", product.color);

  // -----------creation d'une div----------------
  let cartItemImg = document.createElement("div");
  // ajout d'une class à la div
  cartItemImg.classList.add("cart__item__img");

  // ------------ on attache notre balise article (cart__items) à la div parente (cartItemImg)------------
  article.appendChild(cartItemImg);

  // creation balise img
  let imgProduct = document.createElement("img");
  cartItemImg.appendChild(imgProduct);
  // On ajoute la source à notre balise img
  imgProduct.src = product.srcImage;

  let cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);

  let cartItemDescription = document.createElement("div");
  cartItemDescription.classList.add("cart__item__content__description");
  article.appendChild(cartItemDescription);

  let cartItemH2 = document.createElement("h2");
  cartItemH2.innerHTML = product.nameProduct; // ------------j'insere le nom du produit (titre) --------------
  cartItemDescription.appendChild(cartItemH2); // --------------je rend l'enfant (cartItemDescription) à la div parente (cartItemH2)-----------

  let cartItemColor = document.createElement("p");
  cartItemColor.innerHTML = product.color;
  cartItemDescription.appendChild(cartItemColor);

  let cartItemPrice = document.createElement("p");
  cartItemPrice.innerText = data.price + "€";
  cartItemDescription.appendChild(cartItemPrice);

  let contentSettings = document.createElement("div");
  contentSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(contentSettings);

  let contentSettingsQuantity = document.createElement("div");
  contentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  contentSettings.appendChild(contentSettingsQuantity);

  let quantity = document.createElement("p");
  quantity.innetHTML = "Qté : ";
  contentSettingsQuantity.appendChild(quantity);

  let input = document.createElement("input"); // ---------- Creation input pour quantité------------
  contentSettingsQuantity.appendChild(input);
  input.id = "itemQuantity";
  input.type = "number";
  input.name = "itemQuantity";
  input.classList.add("itemQuantity");
  input.min = "1";
  input.max = "100";
  input.value = product.quantity; // ------------- defini l'atribue ' value' à l'input quantité de produit----------------

  let contentSettingsDelete = document.createElement("div");
  contentSettingsDelete.classList.add("cart__item__content__settings__delete");
  contentSettings.appendChild(contentSettingsDelete);

  let suppr = document.createElement("p");
  suppr.classList.add("deleteItem");
  suppr.setAttribute("id", "deleteItem");
  contentSettingsDelete.appendChild(suppr);
  suppr.innerHTML = "Supprimer";
}
let validator = true;

// Pour changer la quantité
function changeQty(api, products) {
  // deux parametre api et products
  const inputs = document.querySelectorAll(".itemQuantity"); // -----------je crée une constante et je réccupère tout les elements qui auront la class itemquantity-----------
  inputs.forEach((input) => {
    // ------- je boucle tout les elements de la const (inputs) et pour chaque (input)-----------
    input.addEventListener("change", function () {
      // addEventListener écoute une action // -------------j'ecoute le comportement de (change) de la function-------------
      const product = input.closest("article"); // ---------------je recupère l'article le plus proche de l'input à la racine-----------
      const productId = product.dataset.id; // --------- je defini l'atribue  dataset et je lui assigne la valeur  de l'id -------------
      const productColor = product.dataset.color;
      let quantityInput = document.getElementById("itemQuantity"); // ----------je récupère l'id de lélement 'itemquantity'---------
      let quantityValue = quantityInput.value; //------- je lui atrribue une valeur--------

      if (quantityValue > 100) {
        alert("Merci de choisir une quantité comprise entre 1 et 100");
        validator = false;
      } else if (quantityValue <= 0) {
        validator = false;
      }
      else {
        validator = true;
      }

  
      // --------------si c'est le meme produit et la meme couleur alors on ne crèe pas un nouveau produit dans le panier mais on met a jour la quantité du produit existant dans le panier--------------------
      if (
        // -------------si l'element est identique à l'id du produit et que l'element est egale au produit---------------
        products.some(
          (evnt) => evnt.id === productId && evnt.color === productColor
        )
      ) {
        //---------permet de trouver la position de l'objet que l'on souhaite modifier ( récupération de l'index)----------
        let objIndex = products.findIndex(
          (product) =>
            product.id === productId && product.color === productColor
        );
        // ------------on actualise la quantité de l'objet du tableau à l'index definir par objIndex avec la valeur de l'input--------
        products[objIndex].quantity = input.valueAsNumber;
      }

      // -----------on converti les datas au format json ( on rajoute des guillelets sur les clés des objets )------------
      let productJson = JSON.stringify(products);

      // -------------on met à jour l'objet products dnas le localStorage en lui envoyant les données JSon : productJson---------
      localStorage.setItem("products", productJson);
      // -------------------on appel notre fonction totatQty va mettre à jour la somme totale sur le dom------------
      totalQty(JSON.parse(productJson));

      totalPrice(api, products);
    });
  });
}

//--------------boucle pour chaque produit la quantité s'ajoute à sum--------------
function totalQty(products) {
  let sum = 0;
  for (let product of products) {
    sum += product.quantity;
  }
  document.getElementById("totalQuantity").innerText = sum;
}

// -------------boucle pour calculer le prix total---------
function totalPrice(api, products) {
  let sumPrice = 0;

  if (products !== null) {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let apiProduct = api.find((item) => item._id === product.id);
      sumPrice += apiProduct.price * product.quantity;
    }
    document.getElementById("totalPrice").innerText = sumPrice;
  }
}
// ---------  pour la function supprimer------------
function deleteItemSelect(api, products) {
  // ------------- Ces deux variables permettent de supprimer un objet via son ID et sa couleur.-----------
  const itemDelete = document.querySelectorAll(".deleteItem");
  itemDelete.forEach((item) => {
    item.addEventListener("click", function () {
      const product = item.closest("article"); //----------------retrouve l'article le plus proche de l'item  (supprime du dom (product.remove) )-------------
      product.remove();
      const productId = product.dataset.id;
      const productColor = product.dataset.color;
      if (
        //------------actualise le localstorage lignes 222 à 230---------------
        products.some(
          (evnt) => evnt.id === productId && evnt.color === productColor
        )
      ) {
        let objIndex = products.findIndex(
          // -----------retrouver la position du premier objet dans le tableau avec un id et une couleur similaires------------
          (product) =>
            product.id === productId && product.color === productColor
        );
        products.splice(objIndex, 1); //-------------retire l'objet à la position donnée par objIndex--------------
        let productsJson = JSON.stringify(products); // ----------convertie tout le tableaux en format json----------
        //------------- après cette ligne actualisation du localstorage----------
        localStorage.setItem("products", productsJson); //------- actualisation du localStorage avec le tableau dont l'objet à été supprimé--------
        totalPrice(api, products);
        totalQty(products);
      }
    });
    totalQty(products); // ------------Appelle de la fonction------------
  });
}

// Gestion et validation des données du formulaire

//-----------firstName-----------
let inputFirstName = document.getElementById("firstName");

inputFirstName.addEventListener("change", function () {
  validfirstName(this);
});
//----Test de validité du Nom avec la methode regex------
function validfirstName(inputFirstName) {
  let firstNameRegex = new RegExp("^[A-Z+.+-+a-z-_]+$");

  if (!firstNameRegex.test(inputFirstName.value)) {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.innerHTML = "Merci d'ajouter un prénom valide";
    return false;
  } else {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.innerHTML = "";
    return true;
  }
}
//-----------fin/firstName-----------

//-----------lastName-----------
let inputLastName = document.getElementById("lastName");

inputLastName.addEventListener("change", function () {
  validLastName(this);
});

function validLastName(inputLastName) {
  let lastNameRegex = new RegExp("^[A-Z+.+-+a-z-_]+$");

  if (!lastNameRegex.test(inputLastName.value)) {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.innerHTML = "Merci d'ajouter un nom valide";
    return false;
  } else {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.innerHTML = "";
    return true;
  }
}
//-----------fin/lastName-----------

//-----------adress-----------
let inputAddress = document.getElementById("address");

inputAddress.addEventListener("change", function () {
  validAddress(this);
});
function validAddress(inputAddress) {
  if (inputAddress == null) {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.innerHTML = "Merci d'ajouter une adresse postale";
    return false;
  } else {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.innerHTML = "";
    return true;
  }
}
//-----------fin/adress-----------

//-----------city-----------
let inputCity = document.getElementById("city");

inputCity.addEventListener("change", function () {
  validCity(this);
});
function validCity(inputCity) {
  let cityRegex = new RegExp("^[A-Z+.++-+a-z-_]+$");

  if (!cityRegex.test(inputCity.value)) {
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.innerHTML = "Merci d'ajouter une ville valide";
    return false;
  } else {
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.innerHTML = "";
    return true;
  }
}
//-----------fin/city-----------

//-----------e-mail-----------
let inputEmail = document.getElementById("email");
inputEmail.addEventListener("change", function () {
  validEmail(this);
});
function validEmail(inputEmail) {
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );

  if (!emailRegex.test(inputEmail.value)) {
    let errorMessageEmail = document.getElementById("emailErrorMsg");
    errorMessageEmail.innerHTML = "Merci d'ajouter un Email valide";
    return false;
  } else {
    let errorMessageEmail = document.getElementById("emailErrorMsg");
    errorMessageEmail.innerHTML = "";
    return true;
  }
}
//-----------fin/e-mail-----------

//  ----------------Récupération des données validées du form--------------
let order = document.getElementById("order");

order.addEventListener("click", function (evnt) {
  evnt.preventDefault();

  let products = JSON.parse(localStorage.getItem("products"));

  // --------------- si le panier est vide alert sinon si les datas sont valides on push les prouctsId dans le tableau productsId-------------
  if (products === null || products.length < 1) {
    alert("VOTRE PANIER EST VIDE");
  } else {
    if (validator == true) {
      if (
        validEmail(inputEmail) &&
        validCity(inputCity) &&
        validAddress(inputAddress) &&
        validLastName(inputLastName) &&
        validfirstName(inputFirstName)
      ) {
        const productsId = []; // stoc
        products.forEach((product) => {
          productsId.push(product.id);
        });
        console.log(productsId);

        // ----------- On crée un objet order qui contient les information à envoyer au backend--------------
        const order = {
          contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
          },
          products: productsId,
        };
        orderProducts(order);
      } else {
        alert("Votre panier est vide");
      }
    } else {
      alert("Merci de choisir une quantité comprise entre 1 et 100");
    }
  }
});

// -------- et si oui confirme la commande------
const orderProducts = (order) => {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/JSON",
    },
    body: JSON.stringify(order), //------------ convertie order en json----------
  })
    .then((data) => data.json())
    .then((data) => {
      const orderId = data.orderId;
      clickCommander(orderId);
    });
  // ------------  vide le localStorage si la commande est validé--------------
  function clickCommander(orderId) {
    localStorage.clear();
    document.location.href = `confirmation.html?id=${orderId}`; //----- Génère une url avec l'id de commande et redirige sur la page-----------
  }
};
