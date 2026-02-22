// ============================================
// PARTIE 9 - SOLUTION : Store Derived
// ============================================

import { writable, derived } from 'svelte/store';
import { calculateChange } from '$lib/utils.js';
import initialKpiCards from '$lib/data/kpi-cards.json';

export const kpis = writable(initialKpiCards);
export const kpiLoading = writable(false);

export const kpisWithChange = derived(kpis, ($kpis) =>
	$kpis.map((card) => ({
		...card,
		change: calculateChange(card.value, card.previousValue)
	}))
);

export const kpiSummary = derived(kpisWithChange, ($cards) => {
	const positive = $cards.filter((c) => c.change >= 0).length;
	const negative = $cards.filter((c) => c.change < 0).length;
	return {
		positive,
		negative,
		trend: positive > negative ? 'up' : 'down'
	};
});

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
