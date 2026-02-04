<script>
	// ============================================
	// PARTIE 5 - SOLUTION : Props avec la rune $props()
	// ============================================

	import { formatValue, calculateChange } from '$lib/utils.js';

	// Déclaration des props
	// Le composant reçoit : title, value, previousValue, icon, type
	let { title, value, previousValue, icon, type } = $props();

	// Variable dérivée pour calculer le changement en pourcentage
	let change = $derived(calculateChange(value, previousValue));
</script>

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
