<script>
	// ============================================
	// PARTIE 9 - SOLUTION : Store Derived
	// ============================================

	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { formatValue } from '$lib/utils.js';

	let { title, value, change, icon, children, type, loading = false } = $props();
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

		{#if icon}
			{@render icon()}
		{:else}
			<span class="text-xl text-muted-foreground/80">📊</span>
		{/if}
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

			{@render children?.()}
		{/if}
	</Card.Content>
</Card.Root>
