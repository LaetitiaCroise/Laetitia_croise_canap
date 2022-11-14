// Récupère l'ID du produit et l'injecte dans le DOM
let url = window.location.href;
url = new URL(url);
orderId = document.getElementById('orderId');
orderId.innerHTML = url.searchParams.get("id");