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


// Gestion de suppression et modification 


listeContacts.addEventListener('click', function(event) {
  // Récupérer l'élément cliqué
  const cible = event.target;

  // Suppression
  if (cible.classList.contains('btn-supprimer')) {
    // Récupérer l'id stocké dans data-id et on le convertit en nombre
    const id = Number(cible.dataset.id);

    // Filtrer le tableau : garder tous les contacts sauf celui avec cet id
    contacts = contacts.filter(function(c) {
      return c.id !== id;
    });

    // Réaffiche
    afficherContacts();
  }

  // Modification
  if (cible.classList.contains('btn-modifier')) {
    const id = Number(cible.dataset.id);

    // Retrouver le contact dans le tableau grâce à son id
    const contact = contacts.find(function(c) {
      return c.id === id;
    });

    // Demander les nouvelles valeurs
    const nouveauNom   = prompt('Nouveau nom :', contact.nom);
    const nouvelEmail  = prompt('Nouvel email :', contact.email);

    // Si l'utilisateur n'a pas annulé
    if (nouveauNom !== null && nouvelEmail !== null) {
      contact.nom   = nouveauNom.trim();
      contact.email = nouvelEmail.trim();
    }

    // On réaffiche
    afficherContacts();
  }
});


// Initialisation : affiche la liste au chargement de la page

afficherContacts();