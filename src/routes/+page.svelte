<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { stats as initialStats } from '$lib/data/mock.js';

	// ============================================
	// PARTIE 2 - SOLUTION : La réactivité avec $state et $derived
	// ============================================

	// 1. État réactif : copie modifiable des données importées
	let stats = $state({ ...initialStats });

	// 2. Fonctions de rafraîchissement individuelles
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

	// 3. Variables dérivées pour le formatage
	let formattedRevenue = $derived(
		new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(stats.revenue)
	);

	let formattedUsers = $derived(new Intl.NumberFormat('fr-FR').format(stats.users));

	let formattedOrders = $derived(new Intl.NumberFormat('fr-FR').format(stats.orders));

	let formattedConversion = $derived(
		stats.conversionRate.toLocaleString('fr-FR', {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1
		}) + ' %'
	);

	// 4. Variables dérivées pour les variations en pourcentage
	let revenueChange = $derived(
		Math.round(((stats.revenue - stats.previousRevenue) / stats.previousRevenue) * 1000) / 10
	);

	let usersChange = $derived(
		Math.round(((stats.users - stats.previousUsers) / stats.previousUsers) * 1000) / 10
	);

	let ordersChange = $derived(
		Math.round(((stats.orders - stats.previousOrders) / stats.previousOrders) * 1000) / 10
	);

	let conversionChange = $derived(
		Math.round(
			((stats.conversionRate - stats.previousConversionRate) / stats.previousConversionRate) * 1000
		) / 10
	);
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
			<div>
				<h1 class="text-2xl font-semibold tracking-tight">Dashboard</h1>
				<p class="text-sm text-muted-foreground">Vue d'ensemble de vos indicateurs clés</p>
			</div>

			<!-- Grille des 4 KPIs -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<!-- KPI 1 : Revenu Total -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Revenu Total</p>
						<button
							onclick={refreshRevenue}
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{formattedRevenue}</p>
					<p class="mt-1 text-xs text-muted-foreground">
						<span class={revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}>
							{revenueChange >= 0 ? '+' : ''}{revenueChange}%
						</span> vs mois dernier
					</p>
				</div>

				<!-- KPI 2 : Utilisateurs -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Utilisateurs</p>
						<button
							onclick={refreshUsers}
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{formattedUsers}</p>
					<p class="mt-1 text-xs text-muted-foreground">
						<span class={usersChange >= 0 ? 'text-green-600' : 'text-red-600'}>
							{usersChange >= 0 ? '+' : ''}{usersChange}%
						</span> vs mois dernier
					</p>
				</div>

				<!-- KPI 3 : Commandes -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Commandes</p>
						<button
							onclick={refreshOrders}
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{formattedOrders}</p>
					<p class="mt-1 text-xs text-muted-foreground">
						<span class={ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}>
							{ordersChange >= 0 ? '+' : ''}{ordersChange}%
						</span> vs mois dernier
					</p>
				</div>

				<!-- KPI 4 : Taux de Conversion -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Taux de Conversion</p>
						<button
							onclick={refreshConversion}
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{formattedConversion}</p>
					<p class="mt-1 text-xs text-muted-foreground">
						<span class={conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}>
							{conversionChange >= 0 ? '+' : ''}{conversionChange}%
						</span> vs mois dernier
					</p>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
