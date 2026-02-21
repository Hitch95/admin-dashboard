<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import StatCard from '$lib/components/stat-card.svelte';
	import TransactionsTable from '$lib/components/transactions-table.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { RefreshCw, DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-svelte';
	import { transactions } from '$lib/data/mock.js';

	// ============================================
	// PARTIE 8 - SOLUTION : Store Writable
	// ============================================
	import { kpis, kpiLoading, refreshKpis } from '$lib/stores/kpi-store.js';

	const iconMap = {
		revenue: DollarSign,
		users: Users,
		orders: ShoppingCart,
		conversion: TrendingUp
	};

	const handleView = (id) => alert(`Voir la transaction #${id}`);
	const handleEdit = (id) => alert(`Modifier la transaction #${id}`);
	const handleDelete = (id) => alert(`Supprimer la transaction #${id}`);
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

				<Button variant="outline" size="sm" onclick={refreshKpis} disabled={$kpiLoading}>
					<RefreshCw class="mr-2 size-4 {$kpiLoading ? 'animate-spin' : ''}" />
					{$kpiLoading ? 'Actualisation...' : 'Actualiser'}
				</Button>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each $kpis as card (card.id)}
					{@const Icon = iconMap[card.id]}
					<StatCard
						title={card.title}
						value={card.value}
						previousValue={card.previousValue}
						type={card.type}
						loading={$kpiLoading}
					>
						{#snippet icon()}
							<Icon class="size-5 text-muted-foreground/80" />
						{/snippet}
					</StatCard>
				{:else}
					<p class="col-span-full text-center text-muted-foreground">Aucune donnée disponible</p>
				{/each}
			</div>

			<div>
				<h2 class="text-lg font-semibold tracking-tight">Transactions récentes</h2>
				<p class="text-sm text-muted-foreground">Les 5 dernières transactions de votre boutique</p>
			</div>

			<TransactionsTable
				{transactions}
				loading={$kpiLoading}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
