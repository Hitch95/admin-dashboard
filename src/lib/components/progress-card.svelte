<script>
	// ============================================
	// PARTIE 17 - SOLUTION : Exercice ProgressCard
	// ============================================

	import * as Card from '$lib/components/ui/card/index.js';

	let { label, current, target, unit = '', icon } = $props();

	let percentage = $derived(Math.min(Math.round((current / target) * 100), 100));
	let status = $derived(percentage >= 100 ? 'success' : percentage >= 70 ? 'warning' : 'danger');

	const colors = { success: 'bg-green-500', warning: 'bg-amber-500', danger: 'bg-red-500' };
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium text-muted-foreground">
			{label}
		</Card.Title>
		{#if icon}
			{@render icon()}
		{/if}
	</Card.Header>
	<Card.Content>
		<div class="mb-2 flex items-baseline justify-between">
			<p class="text-2xl font-bold">{current}{unit}</p>
			<p class="text-sm text-muted-foreground">/ {target}{unit}</p>
		</div>
		<div class="h-2 w-full rounded-full bg-muted">
			<div
				class="h-full rounded-full transition-all {colors[status]}"
				style="width: {percentage}%"
			></div>
		</div>
		<p class="mt-1 text-xs text-muted-foreground">{percentage}%</p>
	</Card.Content>
</Card.Root>
