<script>
	// ============================================
	// PARTIE 5 - TP : Refactorisation du composant StatCard
	// ============================================
	// Objectif : Utiliser les composants UI (Card, Badge, Skeleton)
	// et ajouter un état de chargement

	import { formatValue, calculateChange } from '$lib/utils.js';

	// TODO 1: Importer les composants UI nécessaires
	// - Card (depuis '$lib/components/ui/card/index.js')
	// - Badge (depuis '$lib/components/ui/badge/index.js')
	// - Skeleton (depuis '$lib/components/ui/skeleton/index.js')

	// TODO 2: Ajouter une prop "loading" avec une valeur par défaut à false
	// Syntaxe pour une valeur par défaut : let { prop = valeurParDefaut } = $props();
	let { title, value, previousValue, icon, type } = $props();

	// Calcul de variation réactif
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
		{/if}
	</Card.Content>
</Card.Root>
