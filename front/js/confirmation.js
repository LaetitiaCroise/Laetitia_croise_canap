// Récupère tout l'url et l'injecte dans le DOM
let url = window.location.href;
console.log(url);
url = new URL(url);// recupere tous les parametre d'url 
console.log(url);
orderId = document.getElementById('orderId');
orderId.innerHTML = url.searchParams.get("id");// renvoie le parametre id dans l'url