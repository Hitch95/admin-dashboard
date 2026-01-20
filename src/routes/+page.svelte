<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { stats as initialStats } from '$lib/data/mock.js';

	// ============================================
	// PARTIE 2 (Rappel) : Code de la solution précédente
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

	// ============================================
	// PARTIE 3 : Rendu conditionnel avec {#if}
	// ============================================
	// Documentation : https://svelte.dev/docs/svelte/if
	// Objectif : Afficher des éléments conditionnellement selon l'état des données

	// TODO 1: Créer une variable dérivée "hasNegativeGrowth"
	// Elle doit être true si AU MOINS UNE des variations est négative
	// Syntaxe : let hasNegativeGrowth = $derived(revenueChange < 0 || usersChange < 0 || ...);

	// TODO 2: Créer un état booléen "showAlerts" initialisé à true
	// Cet état permettra à l'utilisateur de masquer/afficher le bandeau d'alerte
	// Syntaxe : let showAlerts = $state(true);

	// TODO 3: Créer une fonction "toggleAlerts" qui inverse showAlerts
	// Syntaxe : const toggleAlerts = () => { showAlerts = !showAlerts; };
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
				<!-- TODO 4: Ajouter un bouton pour afficher/masquer les alertes -->
				<!-- Le bouton doit appeler toggleAlerts au clic -->
				<!-- Le texte doit changer selon showAlerts : "Masquer alertes" ou "Afficher alertes" -->
				<!-- Indice : utiliser {#if showAlerts} ... {:else} ... {/if} dans le bouton -->
			</div>

			<!-- TODO 5: Afficher ce bandeau UNIQUEMENT SI showAlerts ET hasNegativeGrowth sont vrais -->
			<!-- Syntaxe : {#if showAlerts && hasNegativeGrowth} ... {/if} -->
			<div class="rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-800">
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
						<!-- TODO 6: Remplacer le ternaire par un bloc {#if} {:else} -->
						<!-- Si revenueChange >= 0 : afficher en vert avec + -->
						<!-- Sinon : afficher en rouge -->
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
						<!-- TODO 7: Même chose pour usersChange -->
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
						<!-- TODO 8: Même chose pour ordersChange -->
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
						<!-- TODO 9: Même chose pour conversionChange -->
						<span class={conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}>
							{conversionChange >= 0 ? '+' : ''}{conversionChange}%
						</span> vs mois dernier
					</p>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
