<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { stats as initialStats } from '$lib/data/mock.js';

	// ============================================
	// PARTIE 3 (Rappel) : Code de la solution précédente
	// ============================================

	let stats = $state({ ...initialStats });

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

	// ============================================
	// PARTIE 4 - TP : Boucles avec {#each}
	// ============================================
	// Objectif : Remplacer les 4 cartes KPI dupliquées par une boucle
	// Documentation : https://svelte.dev/docs/svelte/each

	// TODO 1: Créer un tableau réactif kpiCards avec $derived
	// Chaque élément doit avoir : id, title, value, previousValue, icon, type, refresh
	// Exemple :
	// let kpiCards = $derived([
	//   { id: 'revenue', title: "Revenu Total", value: stats.revenue, previousValue: stats.previousRevenue, icon: "💰", type: "currency", refresh: refreshRevenue },
	//   { id: 'users', title: "Utilisateurs", value: stats.users, previousValue: stats.previousUsers, icon: "👥", type: "number", refresh: refreshUsers },
	//   { id: 'orders', title: "Commandes", value: stats.orders, previousValue: stats.previousOrders, icon: "📦", type: "number", refresh: refreshOrders },
	//   { id: 'conversion', title: "Taux de Conversion", value: stats.conversionRate, previousValue: stats.previousConversionRate, icon: "📈", type: "percent", refresh: refreshConversion },
	// ]);

	// TODO 2: Créer une fonction formatValue(value, type) qui formate selon le type
	// - type "currency" → new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)
	// - type "number" → new Intl.NumberFormat('fr-FR').format(value)
	// - type "percent" → value.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %'

	// TODO 3: Créer une fonction calculateChange(current, previous)
	// Formule : Math.round(((current - previous) / previous) * 1000) / 10

	// Code actuel (à supprimer une fois la boucle implémentée)
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

	// Alertes (Part 3)
	let hasNegativeGrowth = $derived(
		revenueChange < 0 || usersChange < 0 || ordersChange < 0 || conversionChange < 0
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

			<!-- TODO 4: Remplacer les 4 cartes ci-dessous par une boucle {#each} -->
			<!-- Syntaxe : {#each kpiCards as card (card.id)} ... {/each} -->
			<!-- Dans chaque itération, utiliser {@const change = calculateChange(card.value, card.previousValue)} -->

			<!-- TODO 5: Ajouter {:else} pour afficher "Aucune donnée" si tableau vide -->

			<!-- Grille des 4 KPIs (code dupliqué à refactoriser) -->
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
						{#if revenueChange >= 0}
							<span class="text-green-600">↑ +{revenueChange}%</span>
						{:else}
							<span class="text-red-600">↓ {revenueChange}%</span>
						{/if}
						vs mois dernier
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
						{#if usersChange >= 0}
							<span class="text-green-600">↑ +{usersChange}%</span>
						{:else}
							<span class="text-red-600">↓ {usersChange}%</span>
						{/if}
						vs mois dernier
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
						{#if ordersChange >= 0}
							<span class="text-green-600">↑ +{ordersChange}%</span>
						{:else}
							<span class="text-red-600">↓ {ordersChange}%</span>
						{/if}
						vs mois dernier
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
						{#if conversionChange >= 0}
							<span class="text-green-600">↑ +{conversionChange}%</span>
						{:else}
							<span class="text-red-600">↓ {conversionChange}%</span>
						{/if}
						vs mois dernier
					</p>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
