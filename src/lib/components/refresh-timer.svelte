<script>
	// ============================================
	// PARTIE 12 - SOLUTION : Lifecycle
	// ============================================

	import { onMount, onDestroy } from 'svelte';
	import { Clock } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { refreshKpis, kpiLoading } from '$lib/stores/kpi-store.js';

	let countdown = $state(30);
	let lastRefreshedAt = $state(null);
	let timerId = $state(null);

	onMount(() => {
		timerId = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				refreshKpis();
				countdown = 30;
			}
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(timerId);
	});

	$effect(() => {
		if (!$kpiLoading) {
			lastRefreshedAt = new Date();
		}
	});

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
