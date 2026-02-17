<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import StatCard from '$lib/components/stat-card.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { RefreshCw } from 'lucide-svelte';

	// ============================================
	// PARTIE 5 - TP : Ajout d'un bouton de rafraîchissement
	// ============================================

	// Données initiales (importées depuis JSON)
	import initialKpiCards from '$lib/data/kpi-cards.json';

	// TODO 7: Transformer les données en état réactif avec $state()
	// pour pouvoir les modifier lors du rafraîchissement
	let kpiCards = initialKpiCards;

	// État de chargement global
	let loading = $state(false);

	// TODO 8: Créer une fonction refreshData() qui :
	// 1. Passe loading à true
	// 2. Attend 1 seconde (simuler un appel API)
	// 3. Met à jour les valeurs avec des nombres aléatoires
	// 4. Repasse loading à false
	// Indice : utilisez setTimeout ou await new Promise(...)
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

				<!-- TODO 9: Connecter le bouton à refreshData() -->
				<!-- Ajouter l'attribut disabled={loading} pour éviter les doubles clics -->
				<!-- Ajouter une animation de rotation sur l'icône pendant le chargement -->
				<Button variant="outline" size="sm">
					<RefreshCw class="mr-2 size-4" />
					Actualiser
				</Button>
			</div>

			<!-- Grille des KPIs -->
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each kpiCards as card (card.id)}
					<!-- TODO 10: Passer la prop loading au composant StatCard -->
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
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
