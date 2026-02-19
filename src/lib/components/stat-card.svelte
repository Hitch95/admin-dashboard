<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} title - Le titre de la carte
	 * @property {number} value - La valeur actuelle
	 * @property {number} previousValue - La valeur précédente pour le calcul de tendance
	 * @property {string} [type] - Le type de formatage (currency, percentage, etc.)
	 * @property {boolean} [loading] - État de chargement
	 * @property {import('svelte').Snippet} [icon] - Snippet pour l'icône (Lucide)
	 */
	// ============================================
	// PARTIE 6 - TP : Slots et Snippets (Svelte 5)
	// ============================================
	// En Svelte 5, les slots sont remplacés par les "snippets" :
	// - {#snippet name()}...{/snippet} pour définir du contenu côté parent
	// - {@render name()} pour l'afficher côté enfant
	// - Les props peuvent recevoir des snippets
	//
	// Documentation :
	// https://svelte.dev/docs/svelte/legacy-slots (legacy)
	// https://svelte.dev/docs/svelte/snippet (svelte 5)

	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { formatValue, calculateChange } from '$lib/utils.js';

	// TODO 1: Ajuster les props
	// - La prop "icon" va devenir un Snippet (au lieu d'une string)
	// - Ajouter la prop "children" (Snippet optionnel pour le contenu additionnel)
	let { title, value, previousValue, icon, type, loading = false } = $props();

	let change = $derived(calculateChange(value, previousValue));
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		{#if loading}
			<Skeleton class="h-4 w-24" />
		{:else}
			<Card.Title class="text-sm font-medium text-muted-foreground">
				{title}
			</Card.Title>
		{/if}

		<!-- TODO 2: Afficher l'icône via un snippet -->
		<!-- Utilisez {@render icon()} -->
		<!-- (Optionnel : gardez un <span> avec emoji comme fallback si icon est absent) -->
		<span class="text-xl text-muted-foreground/80">{icon}</span>
	</Card.Header>
	<Card.Content>
		{#if loading}
			<Skeleton class="mb-2 h-8 w-32" />
			<Skeleton class="h-5 w-24" />
		{:else}
			<p class="text-2xl font-bold">{formatValue(value, type)}</p>
			<div class="mt-1 flex items-center gap-2">
				{#if change >= 0}
					<Badge variant="secondary" class="bg-green-100 text-green-800 hover:bg-green-100">
						↑ +{change}%
					</Badge>
				{:else}
					<Badge variant="destructive">
						↓ {change}%
					</Badge>
				{/if}
				<span class="text-xs text-muted-foreground">vs mois dernier</span>
			</div>

			<!-- TODO 3: Afficher le contenu additionnel ici -->
			<!-- Utilisez {@render children?.()} -->
		{/if}
	</Card.Content>
</Card.Root>
