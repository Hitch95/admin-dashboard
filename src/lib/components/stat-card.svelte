<script>
	// ============================================
	// PARTIE 5 - TP : Props avec la rune $props()
	// ============================================
	// Objectif : Créer un composant réutilisable pour les cartes KPI
	// Documentation : https://svelte.dev/docs/svelte/$props
	// Tutoriel (Runes) : https://svelte.dev/blog/runes

	import { formatValue, calculateChange } from '$lib/utils.js';

	// TODO 1: Déclarer les props avec $props()
	// Le composant doit recevoir : title, value, previousValue, icon, type
	// Syntaxe : let { prop1, prop2, ... } = $props();

	let { title, value, previousValue, icon, type } = $props();

	// TODO 2: Créer une variable dérivée pour calculer le changement
	// Utiliser $derived() avec calculateChange(value, previousValue)

	let change = $derived(calculateChange(value, previousValue));
</script>

<!-- TODO 3: Adapter le template pour utiliser les props -->
<!-- Remplacer les valeurs en dur par les props : title, value, icon, etc. -->
<div class="rounded-xl border bg-card p-6">
	<div class="flex items-center justify-between">
		<p class="text-sm font-medium text-muted-foreground">{title}</p>
		<span class="text-muted-foreground/80">{icon}</span>
	</div>
	<p class="mt-2 text-2xl font-bold">{formatValue(value, type)}</p>
	<p class="mt-1 text-xs text-muted-foreground">
		{#if change >= 0}
			<span class="text-green-600">↑ +{change}%</span>
		{:else}
			<span class="text-red-600">↓ {change}%</span>
		{/if}
		vs mois dernier
	</p>
</div>
