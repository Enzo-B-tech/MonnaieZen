// Liste des billets et pieces en euros
export const COUPURES_EURO = [
    500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01,
];

// Convertion d'un montant en centime
function enCentimes(montantEuro) { // param : montant en euro
    return Math.round(parseFloat(montantEuro) * 100); // return : montant en centime
}


// Calcul de la monnaie à rendre
export function calculerMonnaie(montantDu, montantDonne) { // param : ->
    const duCent = enCentimes(montantDu); // somme que le client doit payer
    const donneCent = enCentimes(montantDonne); // somme donnée par le client

    if (Number.isNaN(duCent) || Number.isNaN(donneCent)) { // Si l'entrée n'est pas un nombre (numérique) (Not a Number)
        throw new Error("Montant invalide (non numérique)");
    }
    const renduCent = donneCent - duCent;
    if (renduCent < 0) {
        throw new Error("Le client n'a pas donné assez d'argent");
    }
    let reste = renduCent;
    const details = [];    // Résultat des coupures

    for (const coupure of COUPURES_EURO) {
        const valeurCent = Math.round(coupure * 100);   // Valeur de la coupure en centimes
        const quantite = Math.floor(reste / valeurCent); // Combien de fois on peut la rendre
        if (quantite > 0) {
            details.push({                                 // Objet dans details
                valeur: coupure,
                etiquette:
                    coupure >= 1
                        ? `${coupure} €`
                        : `${Math.round(coupure * 100)} centimes`,
                quantite,                                    // Nombre d'exemplaires
            });
            reste -= quantite * valeurCent;                // Mise à jour du reste à rendre
        }
    }
    return {
        total: renduCent / 100,
        details,
    };
}