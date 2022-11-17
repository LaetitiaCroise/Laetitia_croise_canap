// ---------Récupère l'url tout l'url : http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926&name=blabla&link=315864848948-------------
let url = window.location.href;
// -------On récupère tous les paramètres d'url : ?id=107fb5b75607497b96722bda5b504926&name=blabla&link=315864848948---------
url = new URL(url); 
//--------- on recherche le paramètre id à l'interieur des paramètres d'url : 107fb5b75607497b96722bda5b504926-------------
let id = url.searchParams.get("id");

// -----------je récupère le produit avec l'id correspondant -----------
function getProduct(id) {
  // ------------interpolation de variable $ ça consiste à afficher ce qu'on souhaite grace au backstinks--------------
  fetch(`http://localhost:3000/api/products/${id}`) 
    .then(function (data) {
      if (data.ok) {
        // ---------------- appel de la fonction then()pour récupérer le résultat de la requête au format json-------------
        return data.json();
      }
    })
    .then(function (product) {
      let imageContainer = document.querySelector(".item__img");
      let colorInput = document.getElementById("colors");
      let title = document.getElementById("title");
      let description = document.getElementById("description");
      let price = document.getElementById("price");
      // ----------- on crée une nouvelle balise <Img> ----
      let imageElement = new Image();
      // ----------On attribut l'id product-imag à notre balise img : <img id='product-img'>----------
      imageElement.setAttribute("id", "product-img")
      // ------------On ajoute la source à notre balise img : <img id='product-img' src='blabla/blab.png' >-------------
      imageElement.src = product.imageUrl;
      // ------------on attache notre balise img à la div imageContainer : <div class='item_img'> <img id='product-img' src='blabla/blab.png' >  </div>---------------
      imageContainer.appendChild(imageElement);
      

      title.innerText = product.name;
      description.innerText = product.description;
      price.innerText = product.price;

      // --------Ici on boucle for of sur le tableau car on dispose de plusieurs couleurs  donc parcourir le tableau colors cree class color qu'on manipuler directement------------ 
      for (let color of product.colors) {
        // ---------On créer un élement option et on lui attribut la données-------------
        let option = document.createElement('option');
        option.value = color;
        option.innerText = color;

        // --------On l'ajoute au DOM------------
        colorInput.appendChild(option);
      }
    });
}

getProduct(id);
let button = document.getElementById('addToCart'); 
//j'écoute le clic pour lancer la fonction
button.addEventListener('click', function (evnt) {
  // -------- regex ( c'est-à-dire de vérifier qu'un texte corresponde à une description que l'on a définie) pour prevoir un évenement sur le bouton ( le click sur le bouton )
  evnt.preventDefault(); 
  // -----------j'ajoute une variable color, quantityValue et productOrder avec l'id la quantité et la couleur
  let colorInput = document.getElementById('colors');
  let color = colorInput.value;
  let quantityValue = parseInt(quantity.value); // --------récupère la valeur de l'élement id quantity et convertie en entier et stock dans quantité value --------
  let titleProduct = document.getElementById('title').innerHTML;
  let imageProduct = document.getElementById('product-img');
  let srcImage = imageProduct.getAttribute('src');


  // ----------je déclare ma variable avec les informations du produit séléctionné----------
  let productOrder = {
      id: id,
      quantity: quantityValue,
      color: color,
      nameProduct: titleProduct,
      srcImage: srcImage,
  };
  // --------je créé un validateur qui passe à false si un aucune couleur ou quantité n'est choisi----------
let validator = true
  if (color == 0){
    alert("Merci de choisir votre couleur");
    validator = false;
  }
  if (quantityValue <= 0){
    alert("Merci de choisir une quantité comprise entre 1 et 100");
    validator = false;
  }
  if (quantityValue > 100){
    alert("Merci de choisir une quantité comprise entre 1 et 100");
    validator = false;
  }
// ---------je déclare ma variable cart le contenu de l'objet products----------
  let cart = localStorage.getItem('products');

  // ---------si la cart n'existe pas, je la créé---------
  if (cart === null)  {
      cart = [];
  // -------------sinon je l'ajoute en JSON à la cart-----------
  } else {
      cart = JSON.parse(cart)
  }
  // ----------jusqu'à preuve du contraire, c'est un nouvel item,------------
  let newItem = true;

  //je boucle sur le tableau des produits (cart) et pour chacuns des produits (product)
  for (let product of cart) {
      // -------si le titre du product est strictment égal au product déjà ajouté, et que la couleur est la même----------
      if (productOrder.title === product.title && productOrder.color === product.color) {
          //----------alors on incrémente simplement la quantité"de notre item dans le tableau cart--------------
          product.quantity += productOrder.quantity;
          // -----------on défini new item sur false car il ne doit pas créer de nouvel objet dans le tableau cart-----------
          newItem = false;
      }
  }

  // ------------si newItem est true-------------
  if (newItem === true) {
      // -------------On ajoute le nouveau produit au tableau 'Cart' ( nouvel item) ------------
      cart.push(productOrder);
  }

  // si les conditions sont remplies 
  if (validator === true){
    // on push notre tableau Cart dans le local storage
  localStorage.setItem('products', JSON.stringify(cart));
  
  alert('Un produit a été ajouté à votre panier')
  }
});
