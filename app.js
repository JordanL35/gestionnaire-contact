class Contact {
  constructor(nom, email) {
    // "this" désigne l'objet en cours de création
    this.id    = Date.now(); // Identifiant unique basé sur l'heure
    this.nom   = nom;
    this.email = email;
  }
}

// Tableau de stockage des contacts
let contacts = [];

// Récupération des élements HTML
const formulaire = document.getElementById('formulaire');
const champNom = document.getElementById('nom');
const champEmail = document.getElementById('email');
const listeContacts = document.getElementById('liste-contacts');
// Affichage de tous les contacts

// Fonction permettant de vider la liste et de la reconstruire
function afficherContacts() {
    // Vide le contenu HTML de la liste
    listeContacts.innerHTML = '';

    // Si aucun contact, affiche un message
    if (contacts.length === 0) {
        listeContacts.innerHTML = 'Aucun contact pour l\'instant.'
        console.log('Test affichage L.29');
        return;
    }

    // Pour parcourir chaque contact du tableau
    contacts.forEach(function(contact) {

        // Création d'un élément <li> pour le contact
        const li = document.createElement('li');

        // Injection HTML avec les infos du contact
        li.innerHTML = `
            <div class="infos">
                <span class="nom">${contact.nom}</span>
                <span class="email">${contact.email}</span>
            </div>

            <div class="actions">
                <button class="btn-modifier"   data-id="${contact.id}">Modifier</button>
                <button class="btn-supprimer"  data-id="${contact.id}">Supprimer</button>
            </div>
        `;

        // Ajout du <li> dans le <ul>
        listeContacts.appendChild(li);
    });
}

// Ajout d'un contact
formulaire.addEventListener('submit', function(event) {
    // Empêche la page de se recharger
    event.preventDefault();

    // Récupération des valeurs saisies (- les espaces useless)
    const nom = champNom.value.trim();
    const email = champEmail.value.trim();

    // Vérification que les deux champs ont été remplis
    if (nom === '' || email === '') {
        alert('Merci de remplir le nom et l\'email');
        return;
    }

    // Création d'un nouvel objet Contact (voir classe)
    const nouveauContact = new Contact(nom, email);

    // Ajout dans le tableau
    contacts.push(nouveauContact);

    // On vide les champs du formulaire
    champNom.value = '';
    champEmail.value = '';

    // On réaffiche la liste mise à jour
    afficherContacts();
});