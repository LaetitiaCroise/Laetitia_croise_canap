const tableau = [ "arrosoir", "chien", "pancake", "lessive", "brioche"]
console.log(tableau);

const longueur = tableau.length
console.log("la longuur du tableau et de ", longueur);

const position= tableau.indexOf("pancake")
console.log(position);

const personne = {
    nom : 'lili',
    couleur : "bleu"
} 

console.log(personne);

// nomdelobjet.nouvelleclé = valeur
personne.age = 5

console.log(personne);

personne['voiture'] = "clio"

console.log(personne);


let age = 4

if(age > 15) {
    console.log('plus de 15 ans');
    age++
    console.log(age);
} else if ( age > 10) {
    console.log('plus de 10 ans ');
    age++
    console.log(age);
} else {
    console.log('moins de 10 ans');
    age++
    console.log(age);
}


function isEmail(email) {
              
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
    // Converting the email to lowercase
    return regexp.test(String(email).toLowerCase());
}

function isName(clientName) {
const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return regexp.test(String(clientName).toLowerCase())
}


const email = 'blabla@truc.net'

if ( isEmail(email)  ) {
    console.log('c 1 mail');
} else {
    console.log('c pas 1 mail');
}

//  créer un programme qui va vérifier si une personne est majeure
// si machin est superieur a un nombre donnée ( 18) alors on log majeur

// créer un programme qui retourner tous les mots qui contient la lettre w dans une une phrase (include etc ) 


//  crée un programme qui va monter le compteur de 1 à chauqe fois que tu passe ta souris sur un élément bleu ( crée une page avec pleins de truc de couleur différentes )

