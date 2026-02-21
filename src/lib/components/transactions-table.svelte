<script>
	// ============================================
	// PARTIE 7 - SOLUTION : Table des transactions
	// ============================================

	import * as Table from '$lib/components/ui/table/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import TransactionRow from './transaction-row.svelte';

	let { transactions, loading = false, onView, onEdit, onDelete } = $props();
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Client</Table.Head>
				<Table.Head class="text-right">Montant</Table.Head>
				<Table.Head class="text-center">Statut</Table.Head>
				<Table.Head>Date</Table.Head>
				<Table.Head class="w-[50px]"></Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if loading}
				{#each Array(5) as _}
					<Table.Row>
						<Table.Cell><Skeleton class="h-4 w-32" /></Table.Cell>
						<Table.Cell class="text-right"><Skeleton class="ml-auto h-4 w-20" /></Table.Cell>
						<Table.Cell class="text-center"><Skeleton class="mx-auto h-5 w-20" /></Table.Cell>
						<Table.Cell><Skeleton class="h-4 w-24" /></Table.Cell>
						<Table.Cell><Skeleton class="ml-auto h-8 w-8 rounded" /></Table.Cell>
					</Table.Row>
				{/each}
			{:else}
				{#each transactions as transaction (transaction.id)}
					<TransactionRow {transaction} {onView} {onEdit} {onDelete} />
				{:else}
					<Table.Row>
						<Table.Cell colspan={5} class="h-24 text-center text-muted-foreground">
							Aucune transaction
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</div>
