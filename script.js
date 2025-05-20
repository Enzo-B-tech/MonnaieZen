import { calculerMonnaie } from "./calculMonnaie.js";

// Récupération des éléments du DOM par leur id
const formulaire = document.getElementById("form-monnaie");
const champDu = document.getElementById("montant-du");
const champDonne = document.getElementById("montant-donne");
const zoneErreur = document.getElementById("message-erreur");
const zoneResultat = document.getElementById("zone-resultat");
const totalRendu = document.getElementById("total-rendu");
const listeDetails = document.getElementById("liste-details");

// Fonction qui affiche la monnaie ou le message d'erreur
function afficherMonnaie(event) {
  event.preventDefault(); // empêche le rechargement de la page
  try {
    // exécute le calcul avec les valeurs saisies
    const { total, details } = calculerMonnaie(champDu.value, champDonne.value);

    // en cas de succès, on affiche le résultat
    zoneErreur.textContent = "";
    zoneResultat.hidden = false;
    totalRendu.textContent = total.toFixed(2) + " €";

    // on vide et remplit la liste des détails
    listeDetails.innerHTML = "";
    details.forEach((d) => {
      const li = document.createElement("li");
      li.textContent = `${d.quantite} × ${d.etiquette}`;
      listeDetails.appendChild(li);
    });
  } catch (e) {
    // en cas d'erreur (paiement insuffisant ou montant invalide)
    zoneErreur.textContent = e.message;
    zoneResultat.hidden = true;
  }
}

// Ajoute l'écouteur submit au formulaire pour déclencher le calcul
formulaire.addEventListener("submit", afficherMonnaie);
