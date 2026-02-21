// ============================================
// PARTIE 9 - TP : Store Derived
// ============================================
// derived(store, fn) recalcule automatiquement
// sa valeur chaque fois que le store source change.
//
// Syntaxe :
//   const result = derived(source, ($source) => { ... })
//   const result = derived([s1, s2], ([$s1, $s2]) => { ... })

import { writable, derived } from 'svelte/store';
import { calculateChange } from '$lib/utils.js';
import initialKpiCards from '$lib/data/kpi-cards.json';

export const kpis = writable(initialKpiCards);
export const kpiLoading = writable(false);

// TODO 1: Créer un store derived "kpisWithChange" à partir de "kpis"
// Pour chaque card, ajouter une propriété "change"
// calculée avec calculateChange(card.value, card.previousValue)
//
// export const kpisWithChange = derived(kpis, ($kpis) => ...)

// TODO 2: Créer un store derived "kpiSummary" à partir de "kpisWithChange"
// Retourner un objet { positive, negative, trend } où :
//   - positive = nombre de cards dont change >= 0
//   - negative = nombre de cards dont change < 0
//   - trend = 'up' si positive > negative, 'down' sinon
//
// export const kpiSummary = derived(kpisWithChange, ($cards) => ...)

export async function refreshKpis() {
    kpiLoading.set(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    kpis.update((cards) =>
        cards.map((card) => ({
            ...card,
            previousValue: card.value,
            value: card.value * (0.9 + Math.random() * 0.2)
        }))
    );

    kpiLoading.set(false);
}
