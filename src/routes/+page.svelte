<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import StatCard from '$lib/components/stat-card.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import kpiCards from '$lib/data/kpi-cards.json';

	// ============================================
	// PARTIE 5 - SOLUTION : Props et communication parent → enfant
	// ============================================

	// États de l'application (simulation de chargement)
	let loading = $state(false);
	let error = $state(null);
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

			{#if loading}
				<div class="flex h-64 flex-col items-center justify-center gap-4">
					<Spinner class="size-8" />
					<p class="animate-pulse text-sm text-muted-foreground">Chargement des données...</p>
				</div>
			{:else if error}
				<div class="rounded-xl border border-red-200 bg-red-50 p-6">
					<h3 class="text-lg font-semibold text-red-800">Erreur</h3>
					<p class="mt-2 text-sm text-red-600">{error}</p>
				</div>
			{:else}
				<!-- Grille des KPIs -->
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{#each kpiCards as card (card.id)}
						<!-- SOLUTION : Utilisation du composant StatCard -->
						<StatCard
							title={card.title}
							value={card.value}
							previousValue={card.previousValue}
							icon={card.icon}
							type={card.type}
						/>
					{:else}
						<p class="col-span-full text-center text-muted-foreground">Aucune donnée disponible</p>
					{/each}
				</div>
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
