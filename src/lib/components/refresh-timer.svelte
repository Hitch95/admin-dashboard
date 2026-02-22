<script>
	// ============================================
	// PARTIE 12 - TP : Lifecycle (onMount, onDestroy, $effect)
	// ============================================
	// onMount  → code exécuté quand le composant entre dans le DOM
	// onDestroy → code exécuté quand le composant est détruit
	// $effect   → réagit aux changements de state/store (effet de bord)
	//
	// Documentation :
	//   https://svelte.dev/docs/svelte/lifecycle-hooks
	//   https://svelte.dev/docs/svelte/$effect

	import { Clock } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { refreshKpis, kpiLoading } from '$lib/stores/kpi-store.js';

	let countdown = $state(30);
	let lastRefreshedAt = $state(null);
	let timerId = $state(null);

	// TODO 1 : Importer onMount et onDestroy depuis 'svelte'

	// TODO 2 : Dans onMount(), démarrer un setInterval toutes les 1000ms :
	//   - Décrémente countdown
	//   - Quand countdown === 0 : appeler refreshKpis(), remettre countdown à 30
	//   - Stocker l'id du timer dans timerId

	// TODO 3 : Dans onDestroy(), appeler clearInterval(timerId)
	//   Sans ça → fuite mémoire ! L'intervalle continue même si le composant est détruit.

	// TODO 4 : Créer un $effect qui surveille $kpiLoading :
	//   Quand $kpiLoading passe à false → mettre à jour lastRefreshedAt = new Date()
	//   Cela capture aussi les refreshs manuels (bouton "Actualiser")

	const formatTime = (date) => {
		return date.toLocaleTimeString('fr-FR');
	};
</script>

<div class="flex items-center gap-3 text-sm">
	<Badge variant="outline" class="tabular-nums">
		<Clock class="mr-1 size-3" />
		{countdown}s
	</Badge>

	{#if $kpiLoading}
		<span class="text-muted-foreground">Actualisation...</span>
	{:else if lastRefreshedAt}
		<span class="text-muted-foreground">
			Mis à jour à {formatTime(lastRefreshedAt)}
		</span>
	{/if}
</div>
