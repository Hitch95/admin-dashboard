<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { stats } from '$lib/data/mock.js';
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
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{stats.revenue} €</p>
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
				</div>

				<!-- KPI 2 : Utilisateurs -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Utilisateurs</p>
						<button
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{stats.users}</p>
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
				</div>

				<!-- KPI 3 : Commandes -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Commandes</p>
						<button
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{stats.orders}</p>
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
				</div>

				<!-- KPI 4 : Taux de Conversion -->
				<div class="rounded-xl border bg-card p-6">
					<div class="flex items-center justify-between">
						<p class="text-sm font-medium text-muted-foreground">Taux de Conversion</p>
						<button
							class="rounded p-1 text-muted-foreground/60 transition-colors hover:bg-accent hover:text-foreground"
							title="Actualiser"
						>
							↻
						</button>
					</div>
					<p class="mt-2 text-2xl font-bold">{stats.conversionRate}%</p>
					<p class="mt-1 text-xs text-muted-foreground">+X% vs mois dernier</p>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
