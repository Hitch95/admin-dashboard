<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	// On importe les données mock et on les renomme en "initialStats"
	// Cela nous permettra de créer une copie modifiable
	import { stats as initialStats } from '$lib/data/mock.js';

	// ============================================
	// PARTIE 2 : La réactivité avec $state et $derived
	// ============================================
	//
	// Objectif : Rendre ce dashboard interactif !
	// - Afficher les KPIs avec un formatage propre (monétaire, pourcentages)
	// - Permettre de "rafraîchir" chaque carte individuellement
	//
	// Concepts clés :
	// - $state(valeur) : crée une variable réactive (modifiable)
	// - $derived(expression) : crée une valeur calculée automatiquement mise à jour
	//
	// Au départ, vous verrez des valeurs brutes (45231.89) et des boutons inactifs.
	// À la fin, les valeurs seront formatées et chaque bouton actualisera sa carte !

	// TODO 1: Créer un état réactif "stats" à partir de "initialStats"
	//
	// Pourquoi ? Les données importées sont en lecture seule.
	// On doit créer une copie locale pour pouvoir les modifier.
	//
	// Syntaxe : let stats = $state({ ...initialStats });
	//
	// Pour l'instant, on utilise directement initialStats (non réactif) :
	let stats = initialStats;

	// TODO 2: Créer des fonctions pour rafraîchir chaque KPI individuellement
	//
	// Chaque carte aura son propre bouton de rafraîchissement.
	// Créez 4 fonctions qui modifient une seule propriété de "stats".
	//
	// Exemple pour le revenu :
	//   function refreshRevenue() {
	//     stats.revenue = stats.revenue + (Math.random() - 0.45) * 5000;
	//   }
	//
	// Pour l'instant, les fonctions affichent juste un log :
	function refreshRevenue() {
		console.log('Rafraîchir Revenu - Implémentez $state pour voir la magie !');
	}

	const refreshUsers = () => {
		console.log('Rafraîchir Utilisateurs');
	};

	const refreshOrders = () => {
		console.log('Rafraîchir Commandes');
	};

	const refreshConversion = () => {
		console.log('Rafraîchir Taux de Conversion');
	};

	// TODO 3: Créer une variable dérivée "formattedRevenue"
	//
	// Elle doit formater "stats.revenue" en devise EUR (ex: "45 231,89 €")
	// Utiliser : new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(...)
	//
	// Syntaxe : let formattedRevenue = $derived(...);

	// TODO 4: Créer une variable dérivée "formattedUsers"
	//
	// Elle doit formater "stats.users" avec séparateur de milliers (ex: "2 350")
	// Utiliser : new Intl.NumberFormat('fr-FR').format(...)

	// TODO 5: Créer une variable dérivée "formattedOrders"
	//
	// Même principe que formattedUsers pour stats.orders

	// TODO 6: Créer une variable dérivée "formattedConversion"
	//
	// Elle doit afficher stats.conversionRate avec 1 décimale et le symbole %
	// Utiliser : stats.conversionRate.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %'

	// TODO 7: Créer une variable dérivée "revenueChange"
	//
	// Elle calcule la variation en % entre revenue et previousRevenue
	// Formule : ((revenue - previousRevenue) / previousRevenue) * 100
	// Arrondir à 1 décimale : Math.round(... * 10) / 10

	// TODO 8: Créer "usersChange" (variation entre stats.users et stats.previousUsers)

	// TODO 9: Créer "ordersChange" (variation entre stats.orders et stats.previousOrders)

	// TODO 10: Créer "conversionChange" (variation entre stats.conversionRate et stats.previousConversionRate)
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
						<!-- Bouton de rafraîchissement individuel -->
						<button
							onclick={refreshRevenue}
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<!-- TODO 11: Remplacer {stats.revenue} par {formattedRevenue} -->
					<p class="mt-2 text-2xl font-bold">{stats.revenue}</p>
					<!-- TODO 12: Afficher revenueChange avec couleur conditionnelle -->
					<!-- Syntaxe pour la couleur : class={revenueChange >= 0 ? 'text-green-600' : 'text-red-600'} -->
					<!-- Syntaxe pour le signe : {revenueChange >= 0 ? '+' : ''}{revenueChange}% -->
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
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
					<!-- TODO 13: Remplacer par {formattedUsers} -->
					<p class="mt-2 text-2xl font-bold">{stats.users}</p>
					<!-- TODO 14: Afficher usersChange -->
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
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
					<!-- TODO 15: Remplacer par {formattedOrders} -->
					<p class="mt-2 text-2xl font-bold">{stats.orders}</p>
					<!-- TODO 16: Afficher ordersChange -->
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
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
					<!-- TODO 17: Remplacer par {formattedConversion} -->
					<p class="mt-2 text-2xl font-bold">{stats.conversionRate}</p>
					<!-- TODO 18: Afficher conversionChange -->
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
