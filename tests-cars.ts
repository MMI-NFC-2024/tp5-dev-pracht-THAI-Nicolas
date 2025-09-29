// lancer en tapant dans la console :
// node --experimental-strip-types tests-cars.ts

import cars from "./cars.json" with { type: 'json' };

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES CARS ===\n");
console.log(`Nombre total de voitures: ${cars.length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====

console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");

// at() - Accède à un élément par son indice (accepte les indices négatifs)
console.log("• at() - Première voiture:", cars.at(0)?.name);
console.log("• at() - Dernière voiture:", cars.at(-1)?.name);
console.log();

// slice() - Extrait une portion du tableau
console.log("• slice() - Les 3 premières voitures:");
console.log(cars.slice(0, 3).map(c => `${c.name} (${c.year})`));
console.log();

// ===== MÉTHODES DE RECHERCHE ET VÉRIFICATION =====

console.log("--- MÉTHODES DE RECHERCHE ET VÉRIFICATION ---");

// find() - Trouve le premier élément qui satisfait une condition
const premiereFord = cars.find(c => c.name.includes("Ford"));
console.log("• find() - Première Ford:", premiereFord?.name);

// findIndex() - Trouve l'indice du premier élément qui satisfait une condition
const indexFord = cars.findIndex(c => c.name.includes("Ford"));
console.log("• findIndex() - Index de la première Ford:", indexFord);

// indexOf() - Trouve l'indice d'un élément (comparaison stricte)
const marques = cars.map(c => c.name.split(' ')[0]);
console.log("• indexOf() - Index de 'Toyota' dans la liste des marques:", marques.indexOf("Toyota"));

// lastIndexOf() - Trouve le dernier indice d'un élément
console.log("• lastIndexOf() - Dernier index de 'Chevrolet':", marques.lastIndexOf("Chevrolet"));

// includes() - Vérifie si un élément existe dans le tableau
const cylindres = cars.map(c => c.cylinders);
console.log("• includes() - Y a-t-il des voitures 3 cylindres?", cylindres.includes(3));

// some() - Teste si au moins un élément satisfait une condition
const auMoinsUneRapide = cars.some(c => c["0-60 mph (s)"] != null && c["0-60 mph (s)"] < 8);
console.log("• some() - Y a-t-il des voitures 0-60 mph < 8s?", auMoinsUneRapide);

// every() - Teste si tous les éléments satisfent une condition
const toutesOntPuissance = cars.every(c => c["power (hp)"] != null && c["power (hp)"] > 0);
console.log("• every() - Toutes ont une puissance > 0 hp?", toutesOntPuissance);
console.log();

// ===== MÉTHODES DE FILTRAGE =====

console.log("--- MÉTHODES DE FILTRAGE ---");

// filter() - Crée un nouveau tableau avec les éléments qui passent un test
const voituresEconomiques = cars.filter(c => c["economy (mpg)"] != null && c["economy (mpg)"] > 30);
console.log("• filter() - Nombre de voitures > 30 mpg:", voituresEconomiques.length);

const voituresPuissantes = cars.filter(c => c["power (hp)"] != null && c["power (hp)"] > 200);
console.log("• filter() - Voitures > 200 hp:", voituresPuissantes.length);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====

console.log("--- MÉTHODES DE TRANSFORMATION ---");

// map() - Transforme chaque élément et crée un nouveau tableau
const descriptions = cars.slice(0, 3).map(c => 
    `${c.name} - ${c["power (hp)"]} hp - ${c["economy (mpg)"]} mpg`
);
console.log("• map() - Descriptions des 3 premières:");
descriptions.forEach(desc => console.log("  ", desc));

// Extraction des marques uniques
const marquesUniques = cars.map(c => c.name.split(' ')[0]);
console.log("• map() - Marques uniques:", [...new Set(marquesUniques)].slice(0, 10));

// flatMap() - Applique une fonction puis aplatit d'un niveau
const caracteristiques = cars.slice(0, 2).flatMap(c => 
    [c.name.split(' ')[0], c.cylinders, c.year]
);
console.log("• flatMap() - Caractéristiques aplaties:", caracteristiques);

// reduce() - Réduit le tableau à une seule valeur
const puissanceTotale = cars.reduce((total, c) => 
    c["power (hp)"] != null ? total + c["power (hp)"] : total, 0
);
console.log("• reduce() - Puissance totale:", puissanceTotale, "chevaux");

const nbrParCylindres = cars.reduce((acc, c) => {
    acc[c.cylinders] = (acc[c.cylinders] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• reduce() - Comptage par nombre de cylindres:", nbrParCylindres);

// reduceRight() - Réduit de droite à gauche
const dernieresMarques = cars.slice(-3).reduceRight((acc, c) => 
    acc + c.name.split(' ')[0] + " ", ""
);
console.log("• reduceRight() - 3 dernières marques (inversées):", dernieresMarques.trim());
console.log();

// ===== MÉTHODES DE TRI =====

console.log("--- MÉTHODES DE TRI ---");

// sort() - Trie les éléments (modifie le tableau original)
const puissancesCopie = cars.slice(0, 5).map(c => c["power (hp)"]).filter(p => p != null);
console.log("• sort() - Puissances avant tri:", puissancesCopie);
puissancesCopie.sort((a, b) => a - b);
console.log("• sort() - Puissances après tri croissant:", puissancesCopie);

// Tri par nom
const voituresParNom = cars.slice(0, 10).sort((a, b) => 
    a.name.localeCompare(b.name)
);
console.log("• sort() - 10 premières triées par nom:");
voituresParNom.forEach(c => console.log(`  ${c.name} (${c.year})`));
console.log();

// ===== MÉTHODES D'ITÉRATION =====

console.log("--- MÉTHODES D'ITÉRATION ---");

// forEach() - Exécute une fonction pour chaque élément
console.log("• forEach() - Affichage des 3 premières voitures:");
cars.slice(0, 3).forEach((c, index) => {
    console.log(`  ${index + 1}. ${c.name} - ${c["power (hp)"]} hp (${c.year})`);
});

// ===== MÉTHODES DE CONVERSION =====

console.log("--- MÉTHODES DE CONVERSION ---");

// join() - Joint tous les éléments en une chaîne
const premiersNoms = cars.slice(0, 5).map(c => c.name.split(' ')[0]);
console.log("• join() - Marques séparées par ' | ':", premiersNoms.join(" | "));
console.log("• join() - Marques séparées par des virgules:", premiersNoms.join(","));

// toString() - Convertit en chaîne (équivalent à join(','))
console.log("• toString() - Premières puissances:", cars.slice(0, 3).map(c => c["power (hp)"]).toString());
console.log();

// ===== MÉTHODES DE CONCATÉNATION =====

console.log("--- MÉTHODES DE CONCATÉNATION ---");

// concat() - Joint des tableaux
const fords = cars.filter(c => c.name.includes("Ford")).slice(0, 2);
const chevrolets = cars.filter(c => c.name.includes("Chevrolet")).slice(0, 2);
const melange = fords.concat(chevrolets);
console.log("• concat() - Mélange Ford + Chevrolet:");
melange.forEach(c => console.log(`  ${c.name} (${c.year})`));
console.log();

// ===== MÉTHODES D'APLATISSEMENT =====

console.log("--- MÉTHODES D'APLATISSEMENT ---");

// flat() - Aplatit les tableaux imbriqués
const groupesParDecennie = [
    cars.filter(c => c.year >= 70 && c.year < 75).slice(0, 2).map(c => c.name.split(' ')[0]),
    cars.filter(c => c.year >= 75 && c.year < 80).slice(0, 2).map(c => c.name.split(' ')[0]),
    cars.filter(c => c.year >= 80).slice(0, 2).map(c => c.name.split(' ')[0])
];
console.log("• flat() - Groupes par décennie avant aplatissement:", groupesParDecennie);
console.log("• flat() - Après aplatissement:", groupesParDecennie.flat());
console.log();

// ===== STATISTIQUES FINALES =====

console.log("--- STATISTIQUES FINALES ---");

// Calculs statistiques utilisant différentes méthodes
const puissances = cars.map(c => c["power (hp)"]).filter(p => p != null);
const puissanceTotaleCalc = puissances.reduce((sum, power) => sum + power, 0);
const puissanceMoyenne = puissanceTotaleCalc / puissances.length;
const puissanceMin = Math.min(...puissances);
const puissanceMax = Math.max(...puissances);

console.log("• Statistiques des puissances:");
console.log(`  - Puissance moyenne: ${puissanceMoyenne.toFixed(1)} hp`);
console.log(`  - Puissance minimale: ${puissanceMin} hp`);
console.log(`  - Puissance maximale: ${puissanceMax} hp`);

// Répartition par nombre de cylindres
const repartitionCylindres = cars.reduce((acc, c) => {
    acc[c.cylinders] = (acc[c.cylinders] || 0) + 1;
    return acc;
}, {} as Record<number, number>);
console.log("• Répartition par cylindres:", repartitionCylindres);

// Répartition par décennie
const repartitionDecennie = cars.reduce((acc, c) => {
    const decennie = Math.floor(c.year / 10) * 10;
    const label = `${1900 + decennie}s`;
    acc[label] = (acc[label] || 0) + 1;
    return acc;
}, {} as Record<string, number>);
console.log("• Répartition par décennie:", repartitionDecennie);

// =============================================
// GROUPEMENT DES DONNÉES AVEC Object.groupBy
// =============================================

console.log("\n--- GROUPEMENT AVEC Object.groupBy ---");

// Groupement par nombre de cylindres
console.log("• Object.groupBy() - Répartition par cylindres:");
const voituresParCylindres = Object.groupBy(cars, voiture => voiture.cylinders);
for (const [cylindres, voitures] of Object.entries(voituresParCylindres)) {
    console.log(`  ${cylindres} cylindres: ${voitures?.length || 0} voitures`);
}

// Groupement par marque et décennie combinées
console.log("\n• Object.groupBy() - Répartition par marque et décennie:");
const voituresParMarqueEtDecennie = Object.groupBy(cars, voiture => {
    const marque = voiture.name.split(' ')[0];
    const decennie = Math.floor(voiture.year / 10) * 10;
    return `${marque} - ${1900 + decennie}s`;
});
// Afficher seulement les 10 premiers groupes pour éviter trop de sortie
Object.entries(voituresParMarqueEtDecennie)
    .slice(0, 10)
    .forEach(([marqueEtDecennie, voitures]) => {
        console.log(`  ${marqueEtDecennie}: ${voitures?.length || 0} voitures`);
    });

// Groupement par décennie
console.log("\n• Object.groupBy() - Répartition par décennie:");
const voituresParDecennie = Object.groupBy(cars, voiture => {
    const decennie = Math.floor(voiture.year / 10) * 10;
    return `${1900 + decennie}s`;
});
for (const [decennie, voitures] of Object.entries(voituresParDecennie)) {
    console.log(`  ${decennie}: ${voitures?.length || 0} voitures`);
}

// Groupement par catégorie de consommation (économique, normale, énergivore)
console.log("\n• Object.groupBy() - Répartition par catégorie de consommation:");
const voituresParConsommation = Object.groupBy(cars, voiture => {
    if (!voiture["economy (mpg)"]) return 'consommation inconnue';
    if (voiture["economy (mpg)"] > 30) return 'économique';
    if (voiture["economy (mpg)"] > 20) return 'normale';
    return 'énergivore';
});

Object.entries(voituresParConsommation)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([categorie, voitures]) => {
        console.log(`  ${categorie}: ${voitures?.length || 0} voitures`);
    });

console.log("\n=== FIN DES EXEMPLES ===");
