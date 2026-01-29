<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { stats as initialStats } from '$lib/data/mock.js';

	// ============================================
	// PARTIE 4 - SOLUTION : Boucles avec {#each}
	// ============================================

	let stats = $state({ ...initialStats });

	// Fonctions de rafraîchissement
	const refreshRevenue = () => {
		stats.revenue = stats.revenue + (Math.random() - 0.45) * 5000;
	};

	const refreshUsers = () => {
		stats.users = Math.max(0, Math.floor(stats.users + (Math.random() - 0.45) * 100));
	};

	const refreshOrders = () => {
		stats.orders = Math.max(0, Math.floor(stats.orders + (Math.random() - 0.45) * 50));
	};

	const refreshConversion = () => {
		stats.conversionRate = Math.max(0, stats.conversionRate + (Math.random() - 0.5));
	};

	// SOLUTION TODO 1: Tableau réactif des cartes KPI
	let kpiCards = $derived([
		{
			id: 'revenue',
			title: 'Revenu Total',
			value: stats.revenue,
			previousValue: stats.previousRevenue,
			type: 'currency',
			refresh: refreshRevenue
		},
		{
			id: 'users',
			title: 'Utilisateurs',
			value: stats.users,
			previousValue: stats.previousUsers,
			type: 'number',
			refresh: refreshUsers
		},
		{
			id: 'orders',
			title: 'Commandes',
			value: stats.orders,
			previousValue: stats.previousOrders,
			type: 'number',
			refresh: refreshOrders
		},
		{
			id: 'conversion',
			title: 'Taux de Conversion',
			value: stats.conversionRate,
			previousValue: stats.previousConversionRate,
			type: 'percent',
			refresh: refreshConversion
		}
	]);

	// SOLUTION TODO 2: Fonction de formatage selon le type
	const formatValue = (value, type) => {
		switch (type) {
			case 'currency':
				return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
			case 'number':
				return new Intl.NumberFormat('fr-FR').format(value);
			case 'percent':
				return (
					value.toLocaleString('fr-FR', {
						minimumFractionDigits: 1,
						maximumFractionDigits: 1
					}) + ' %'
				);
			default:
				return value;
		}
	};

	// SOLUTION TODO 3: Fonction de calcul de variation
	const calculateChange = (current, previous) => {
		return Math.round(((current - previous) / previous) * 1000) / 10;
	};

	// Alertes (Part 3) - mise à jour pour utiliser kpiCards
	let hasNegativeGrowth = $derived(
		kpiCards.some((card) => calculateChange(card.value, card.previousValue) < 0)
	);

	let showAlerts = $state(true);
	const toggleAlerts = () => {
		showAlerts = !showAlerts;
	};
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-14 shrink-0 items-center gap-2">
			<div class="flex flex-1 items-center gap-2 px-3">
				<Sidebar.Trigger />
				<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Page class="line-clamp-1">Dashboard</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<div class="ms-auto px-3">
				<NavActions />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-6 p-6">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-semibold tracking-tight">Dashboard</h1>
					<p class="text-sm text-muted-foreground">Vue d'ensemble de vos indicateurs clés</p>
				</div>
				<button onclick={toggleAlerts} class="text-sm text-primary hover:underline">
					{#if showAlerts}
						Masquer les alertes
					{:else}
						Afficher les alertes
					{/if}
				</button>
			</div>

			{#if showAlerts && hasNegativeGrowth}
				<div
					class="rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-800 transition-all"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">⚠️</span>
						<div>
							<h3 class="font-semibold">Attention : Performances en baisse</h3>
							<p class="text-sm opacity-90">
								Certains indicateurs affichent une croissance négative.
							</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- SOLUTION TODO 4 & 5: Boucle {#each} avec clé et {:else} -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each kpiCards as card (card.id)}
					{@const change = calculateChange(card.value, card.previousValue)}
					<div class="rounded-xl border bg-card p-6">
						<div class="flex items-center justify-between">
							<p class="text-sm font-medium text-muted-foreground">{card.title}</p>
							<button
								onclick={card.refresh}
								class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
								title="Actualiser"
							>
								↻
							</button>
						</div>
						<p class="mt-2 text-2xl font-bold">{formatValue(card.value, card.type)}</p>
						<p class="mt-1 text-xs text-muted-foreground">
							{#if change >= 0}
								<span class="text-green-600">↑ +{change}%</span>
							{:else}
								<span class="text-red-600">↓ {change}%</span>
							{/if}
							vs mois dernier
						</p>
					</div>
				{:else}
					<p class="col-span-full text-center text-muted-foreground">Aucune donnée disponible.</p>
				{/each}
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
