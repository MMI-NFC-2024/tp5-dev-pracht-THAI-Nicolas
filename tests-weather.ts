// lancer en tapant dans la console :
// node --experimental-strip-types tests-weather.ts

import weather from './weather.json' with { type: 'json' };

console.log("=== EXEMPLES DES MÉTHODES ARRAY AVEC LES DONNÉES MÉTÉO ===\n");
console.log(`Nombre total d'enregistrements météo: ${weather.length}\n`);

// ===== MÉTHODES D'ACCÈS AUX ÉLÉMENTS =====

console.log("--- MÉTHODES D'ACCÈS AUX ÉLÉMENTS ---");

// at() - Accède à un élément par son indice (accepte les indices négatifs)
console.log("• at() - Premier enregistrement météo:", weather.at(0));
console.log("• at() - Dernier enregistrement météo:", weather.at(-1));
console.log();

// slice() - Extrait une portion du tableau
console.log("• slice() - Les 3 premiers enregistrements météo:");
console.log(weather.slice(0, 3).map(w => `${w.date}: ${w.weather}, ${w.temp_max}°C`));
console.log("• slice() - Les 3 derniers enregistrements météo:");
console.log(weather.slice(-3).map(w => `${w.date}: ${w.weather}, ${w.temp_max}°C`));
console.log();

// ===== MÉTHODES DE RECHERCHE D'ÉLÉMENTS =====

console.log("--- MÉTHODES DE RECHERCHE D'ÉLÉMENTS ---");

// find() - Trouve le premier élément qui satisfait une condition
const hottestDay = weather.find(w => w.temp_max > 35);
console.log("• find() - Jour le plus chaud trouvé:", hottestDay ? `${hottestDay.date}: ${hottestDay.temp_max}°C, ${hottestDay.weather}` : "Aucun");

const snowyDay = weather.find(w => w.weather === "snow");
console.log("• find() - Premier jour de neige:", snowyDay ? `${snowyDay.date}: ${snowyDay.temp_min}°C à ${snowyDay.temp_max}°C` : "Aucun");
console.log();

// findIndex() - Trouve l'index du premier élément qui satisfait une condition
const extremeRainIndex = weather.findIndex(w => w.precipitation > 100);
console.log("• findIndex() - Index du jour de pluie extrême:", extremeRainIndex);
if (extremeRainIndex !== -1) {
    console.log("  Détails de la pluie extrême:", weather[extremeRainIndex]);
}
console.log();

// indexOf() et lastIndexOf() - Recherche de valeurs spécifiques
const rainWeathers = weather.map(w => w.weather);
console.log("• indexOf() - Index du premier jour pluvieux:", rainWeathers.indexOf("rain"));
console.log("• lastIndexOf() - Index du dernier jour pluvieux:", rainWeathers.lastIndexOf("rain"));
console.log();

// includes() - Vérifie la présence d'une valeur
const weatherTypes = weather.map(w => w.weather);
console.log("• includes() - A des jours de brouillard:", weatherTypes.includes("fog"));
console.log("• includes() - A des jours de tempête:", weatherTypes.includes("storm"));
console.log();

// ===== MÉTHODES DE TEST =====

console.log("--- MÉTHODES DE TEST ---");

// some() - Teste si au moins un élément satisfait une condition
console.log("• some() - A des jours de gel (temp_min < 0):", weather.some(w => w.temp_min < 0));
console.log("• some() - A des jours tropicaux (temp_max > 30):", weather.some(w => w.temp_max > 30));
console.log("• some() - A des jours très venteux (vent > 15):", weather.some(w => w.wind > 15));
console.log();

// every() - Teste si tous les éléments satisfont une condition
console.log("• every() - Tous les jours ont des données de précipitation:", weather.every(w => w.precipitation !== undefined));
console.log("• every() - Tous les jours sont à New York:", weather.every(w => w.location === "New York"));
console.log("• every() - Tous les jours ont des températures modérées (> -20°C):", weather.every(w => w.temp_min > -20));
console.log();

// ===== MÉTHODES DE FILTRAGE =====

console.log("--- MÉTHODES DE FILTRAGE ---");

// filter() - Filtre les éléments selon une condition
const winterDays = weather.filter(w => {
    const date = new Date(w.date);
    const month = date.getMonth();
    return month === 11 || month === 0 || month === 1; // Déc, Jan, Fév
});
console.log(`• filter() - Nombre de jours d'hiver: ${winterDays.length}`);

const perfectDays = weather.filter(w => 
    w.weather === "sun" && 
    w.temp_max >= 20 && 
    w.temp_max <= 25 && 
    w.wind < 5 && 
    w.precipitation === 0
);
console.log(`• filter() - Jours de météo parfaite: ${perfectDays.length}`);

const extremeWeatherDays = weather.filter(w => 
    w.precipitation > 50 || w.temp_max > 35 || w.temp_min < -10 || w.wind > 10
);
console.log(`• filter() - Jours de météo extrême: ${extremeWeatherDays.length}`);
console.log();

// ===== MÉTHODES DE TRANSFORMATION =====

console.log("--- MÉTHODES DE TRANSFORMATION ---");

// map() - Transforme chaque élément du tableau
const weatherSummaries = weather.slice(0, 5).map(w => {
    const date = new Date(w.date).toLocaleDateString('fr-FR');
    const tempRange = `${w.temp_min}°C à ${w.temp_max}°C`;
    return `${date}: ${w.weather} (${tempRange})`;
});
console.log("• map() - Résumés météo:", weatherSummaries);

const comfortIndices = weather.slice(0, 10).map(w => {
    const avgTemp = (w.temp_max + w.temp_min) / 2;
    let comfort = "Inconfortable";
    if (avgTemp >= 18 && avgTemp <= 24 && w.precipitation === 0 && w.wind < 8) {
        comfort = "Parfait";
    } else if (avgTemp >= 15 && avgTemp <= 28 && w.precipitation < 5) {
        comfort = "Agréable";
    } else if (avgTemp >= 10 && avgTemp <= 30) {
        comfort = "Acceptable";
    }
    return `${new Date(w.date).toLocaleDateString('fr-FR')}: ${comfort}`;
});
console.log("• map() - Indices de confort:", comfortIndices);
console.log();

// flatMap() - Transforme et aplatit en une seule opération
const weatherEvents = weather.slice(0, 10).flatMap(w => {
    const events = [];
    if (w.precipitation > 20) events.push(`Forte pluie le ${new Date(w.date).toLocaleDateString('fr-FR')}`);
    if (w.temp_max > 30) events.push(`Jour chaud le ${new Date(w.date).toLocaleDateString('fr-FR')}`);
    if (w.temp_min < 0) events.push(`Jour de gel le ${new Date(w.date).toLocaleDateString('fr-FR')}`);
    if (w.wind > 12) events.push(`Jour venteux le ${new Date(w.date).toLocaleDateString('fr-FR')}`);
    return events;
});
console.log("• flatMap() - Événements météo:", weatherEvents);
console.log();

// ===== MÉTHODES D'AGRÉGATION =====

console.log("--- MÉTHODES D'AGRÉGATION ---");

// reduce() - Réduit le tableau à une seule valeur
const tempStats = weather.reduce((stats, w) => {
    stats.totalMaxTemp += w.temp_max;
    stats.totalMinTemp += w.temp_min;
    stats.totalPrecipitation += w.precipitation;
    stats.totalWind += w.wind;
    stats.count++;
    
    if (w.temp_max > stats.hottestDay.temp) {
        stats.hottestDay = { date: w.date, temp: w.temp_max };
    }
    if (w.temp_min < stats.coldestDay.temp) {
        stats.coldestDay = { date: w.date, temp: w.temp_min };
    }
    
    return stats;
}, {
    totalMaxTemp: 0,
    totalMinTemp: 0,
    totalPrecipitation: 0,
    totalWind: 0,
    count: 0,
    hottestDay: { date: '', temp: -Infinity },
    coldestDay: { date: '', temp: Infinity }
});

console.log("• reduce() - Statistiques météorologiques:");
console.log(`  Température max moyenne: ${(tempStats.totalMaxTemp / tempStats.count).toFixed(1)}°C`);
console.log(`  Température min moyenne: ${(tempStats.totalMinTemp / tempStats.count).toFixed(1)}°C`);
console.log(`  Précipitations moyennes: ${(tempStats.totalPrecipitation / tempStats.count).toFixed(1)}mm`);
console.log(`  Vitesse du vent moyenne: ${(tempStats.totalWind / tempStats.count).toFixed(1)}`);
console.log(`  Jour le plus chaud: ${new Date(tempStats.hottestDay.date).toLocaleDateString('fr-FR')} (${tempStats.hottestDay.temp}°C)`);
console.log(`  Jour le plus froid: ${new Date(tempStats.coldestDay.date).toLocaleDateString('fr-FR')} (${tempStats.coldestDay.temp}°C)`);
console.log();

// reduceRight() - Réduit le tableau de droite à gauche
const recentTrend = weather.slice(-30).reduceRight((trend, w, index) => {
    if (index === weather.slice(-30).length - 1) {
        trend.daysAgo = 0;
        trend.tempChange = 0;
    } else {
        trend.daysAgo++;
        const prevTemp = (w.temp_max + w.temp_min) / 2;
        const currentTemp = trend.lastTemp || prevTemp;
        trend.tempChange = currentTemp - prevTemp;
        trend.lastTemp = prevTemp;
    }
    return trend;
}, { daysAgo: 0, tempChange: 0, lastTemp: 0 });

console.log(`• reduceRight() - Tendance de température sur les 30 derniers jours: ${recentTrend.tempChange > 0 ? 'réchauffement' : 'refroidissement'} de ${Math.abs(recentTrend.tempChange).toFixed(1)}°C`);
console.log();

// ===== MÉTHODES DE TRI =====

console.log("--- MÉTHODES DE TRI ---");

// sort() - Trie les éléments du tableau
const sortedByTemp = weather.slice().sort((a, b) => b.temp_max - a.temp_max);
console.log("• sort() - Top 3 des jours les plus chauds:");
sortedByTemp.slice(0, 3).forEach((w, i) => {
    console.log(`  ${i + 1}. ${new Date(w.date).toLocaleDateString('fr-FR')}: ${w.temp_max}°C (${w.weather})`);
});

const sortedByRain = weather.slice().sort((a, b) => b.precipitation - a.precipitation);
console.log("• sort() - Top 3 des jours les plus pluvieux:");
sortedByRain.slice(0, 3).forEach((w, i) => {
    console.log(`  ${i + 1}. ${new Date(w.date).toLocaleDateString('fr-FR')}: ${w.precipitation}mm (${w.weather})`);
});
console.log();

// ===== MÉTHODES D'ITÉRATION =====

console.log("--- MÉTHODES D'ITÉRATION ---");

// forEach() - Exécute une fonction pour chaque élément
const seasonalCount = { spring: 0, summer: 0, autumn: 0, winter: 0 };
const weatherTypeCount: { [key: string]: number } = {};

weather.forEach(w => {
    const date = new Date(w.date);
    const month = date.getMonth();
    
    if (month >= 2 && month <= 4) seasonalCount.spring++;
    else if (month >= 5 && month <= 7) seasonalCount.summer++;
    else if (month >= 8 && month <= 10) seasonalCount.autumn++;
    else seasonalCount.winter++;
    
    weatherTypeCount[w.weather] = (weatherTypeCount[w.weather] || 0) + 1;
});

console.log("• forEach() - Distribution saisonnière:", seasonalCount);
console.log("• forEach() - Distribution des types de météo:", weatherTypeCount);
console.log();

// ===== MÉTHODES DE CONVERSION =====

console.log("--- MÉTHODES DE CONVERSION ---");

// join() et toString() - Convertissent le tableau en chaîne
const recentWeatherTypes = weather.slice(-7).map(w => w.weather);
console.log("• join() - Types de météo de la dernière semaine:", recentWeatherTypes.join(" → "));

const temperatureRange = weather.slice(0, 10).map(w => `${w.temp_min}-${w.temp_max}`);
console.log("• toString() - Plages de température (10 premiers jours):", temperatureRange.toString());
console.log();

// ===== MÉTHODES DE COMBINAISON =====

console.log("--- MÉTHODES DE COMBINAISON ---");

// concat() et flat() - Combinent des tableaux
const summerDays = weather.filter(w => {
    const month = new Date(w.date).getMonth();
    return month >= 5 && month <= 7;
});

const winterDays2 = weather.filter(w => {
    const month = new Date(w.date).getMonth();
    return month === 11 || month === 0 || month === 1;
});

const extremeSeasons = summerDays.slice(0, 5).concat(winterDays2.slice(0, 5));
console.log(`• concat() - Échantillon de saisons extrêmes combinées: ${extremeSeasons.length} jours`);

const nestedWeatherData = [
    weather.filter(w => w.weather === "sun").slice(0, 3),
    weather.filter(w => w.weather === "rain").slice(0, 3),
    weather.filter(w => w.weather === "snow").slice(0, 3)
];
const flatWeatherData = nestedWeatherData.flat();
console.log(`• flat() - Échantillons météo aplatis: ${flatWeatherData.length} jours`);
console.log();

// ===== REGROUPEMENTS AVANCÉS =====

console.log("--- REGROUPEMENTS AVANCÉS ---");

// Object.groupBy() - Regroupe les éléments par clé

// Regroupement par type de météo
const byWeatherType = Object.groupBy(weather, w => w.weather);
console.log("\n🌤️ Grouping by weather type:");
Object.entries(byWeatherType).forEach(([weatherType, days]) => {
    if (days) {
        console.log(`${weatherType}: ${days.length} days`);
    }
});

// Regroupement par catégorie de température
const byTempCategory = Object.groupBy(weather, w => {
    const avgTemp = (w.temp_max + w.temp_min) / 2;
    if (avgTemp < 0) return "Gelé";
    if (avgTemp < 10) return "Froid";
    if (avgTemp < 20) return "Frais";
    if (avgTemp < 25) return "Agréable";
    if (avgTemp < 30) return "Chaud";
    return "Très chaud";
});
console.log("\n🌡️ Grouping by temperature category:");
Object.entries(byTempCategory).forEach(([category, days]) => {
    console.log(`${category}: ${days.length} days`);
});

// Regroupement par saison
const bySeason = Object.groupBy(weather, w => {
    const month = new Date(w.date).getMonth();
    if (month >= 2 && month <= 4) return "Printemps";
    if (month >= 5 && month <= 7) return "Été";
    if (month >= 8 && month <= 10) return "Automne";
    return "Hiver";
});
console.log("\n🍂 Grouping by season:");
Object.entries(bySeason).forEach(([season, days]) => {
    const avgTemp = days.reduce((sum, d) => sum + (d.temp_max + d.temp_min) / 2, 0) / days.length;
    const totalRain = days.reduce((sum, d) => sum + d.precipitation, 0);
    console.log(`${season}: ${days.length} days (avg temp: ${avgTemp.toFixed(1)}°C, total rain: ${totalRain.toFixed(1)}mm)`);
});

// Regroupement par intensité de précipitations
const byPrecipitationLevel = Object.groupBy(weather, w => {
    if (w.precipitation === 0) return "Sec";
    if (w.precipitation < 5) return "Léger";
    if (w.precipitation < 20) return "Modéré";
    if (w.precipitation < 50) return "Fort";
    return "Intense";
});
console.log("\n🌧️ Grouping by precipitation level:");
Object.entries(byPrecipitationLevel).forEach(([level, days]) => {
    console.log(`${level}: ${days.length} days`);
});

// Regroupement par année
const byYear = Object.groupBy(weather, w => {
    return new Date(w.date).getFullYear().toString();
});
console.log("\n📅 Grouping by year:");
Object.entries(byYear).forEach(([year, days]) => {
    if (days && days.length > 0) {
        const hottestDay = days.reduce((hottest, day) => 
            day.temp_max > hottest.temp_max ? day : hottest
        );
        const coldestDay = days.reduce((coldest, day) => 
            day.temp_min < coldest.temp_min ? day : coldest
        );
        console.log(`${year}: ${days.length} days (hottest: ${hottestDay.temp_max}°C, coldest: ${coldestDay.temp_min}°C)`);
    }
});

console.log("\n=== WEATHER DATA ANALYSIS COMPLETE ===");
