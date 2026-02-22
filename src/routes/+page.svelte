<script>
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import NavActions from '$lib/components/nav-actions.svelte';
	import StatCard from '$lib/components/stat-card.svelte';
	import TransactionsTable from '$lib/components/transactions-table.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { RefreshCw, DollarSign, Users, ShoppingCart, TrendingUp, Search, X } from 'lucide-svelte';
	import { setContext } from 'svelte';

	import { kpisWithChange, kpiSummary, kpiLoading, refreshKpis } from '$lib/stores/kpi-store.js';
	import {
		transactions,
		filteredTransactions,
		searchQuery,
		statusFilter
	} from '$lib/stores/transactions-store.js';

	// ============================================
	// PARTIE 12 - TP : Lifecycle
	// ============================================
	// TODO 5 : Importer RefreshTimer depuis '$lib/components/refresh-timer.svelte'
	//          et l'ajouter dans le header, à côté du bouton "Actualiser"

	const iconMap = {
		revenue: DollarSign,
		users: Users,
		orders: ShoppingCart,
		conversion: TrendingUp
	};

	const handleView = (id) => alert(`Voir la transaction #${id}`);
	const handleEdit = (id) => alert(`Modifier la transaction #${id}`);
	const handleDelete = (id) => transactions.remove(id);

	setContext('transactionActions', { handleView, handleEdit, handleDelete });
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
					<p class="text-sm text-muted-foreground">
						Vue d'ensemble de vos indicateurs clés
						{#if $kpiSummary.trend === 'up'}
							<Badge variant="secondary" class="ml-2 bg-green-100 text-green-800">
								📈 {$kpiSummary.positive} en hausse
							</Badge>
						{:else}
							<Badge variant="destructive" class="ml-2">
								📉 {$kpiSummary.negative} en baisse
							</Badge>
						{/if}
					</p>
				</div>

				<Button variant="outline" size="sm" onclick={refreshKpis} disabled={$kpiLoading}>
					<RefreshCw class="mr-2 size-4 {$kpiLoading ? 'animate-spin' : ''}" />
					{$kpiLoading ? 'Actualisation...' : 'Actualiser'}
				</Button>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each $kpisWithChange as card (card.id)}
					{@const Icon = iconMap[card.id]}
					<StatCard
						title={card.title}
						value={card.value}
						change={card.change}
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

			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-semibold tracking-tight">Transactions récentes</h2>
					<p class="text-sm text-muted-foreground">
						{$filteredTransactions.length} transaction(s)
					</p>
				</div>

				<div class="flex items-center gap-3">
					<div class="relative">
						<Search
							class="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							placeholder="Rechercher un client..."
							bind:value={$searchQuery}
							class="w-64 pl-10 {$searchQuery ? 'pr-9' : ''}"
						/>
						{#if $searchQuery}
							<button
								onclick={() => ($searchQuery = '')}
								class="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
							>
								<X class="size-4" />
								<span class="sr-only">Effacer</span>
							</button>
						{/if}
					</div>

					<select
						bind:value={$statusFilter}
						class="h-9 rounded-md border bg-background px-3 text-sm shadow-xs"
					>
						<option value="all">Tous les statuts</option>
						<option value="completed">Complétées</option>
						<option value="pending">En attente</option>
						<option value="failed">Échouées</option>
					</select>
				</div>
			</div>

			<TransactionsTable transactions={$filteredTransactions} loading={$kpiLoading} />
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
