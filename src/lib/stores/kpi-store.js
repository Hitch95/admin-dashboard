// ============================================
// PARTIE 8 - SOLUTION : Store Writable
// ============================================

import { writable } from 'svelte/store';
import initialKpiCards from '$lib/data/kpi-cards.json';

export const kpis = writable(initialKpiCards);
export const kpiLoading = writable(false);

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
