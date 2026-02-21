<script>
	// ============================================
	// PARTIE 7 - TP : Table des transactions
	// ============================================

	import * as Table from '$lib/components/ui/table/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import TransactionRow from './transaction-row.svelte';

	// TODO 1: Définir les props avec $props()
	// transactions, loading = false, onView, onEdit, onDelete
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
			<!-- TODO 2: Si loading, afficher 5 <Table.Row> avec des <Skeleton> dans les cellules -->

			<!-- TODO 3: Sinon, {#each transactions as transaction} afficher <TransactionRow> -->

			<!-- TODO 4: Gérer {:else} (tableau vide) avec une cellule "Aucune transaction" -->
		</Table.Body>
	</Table.Root>
</div>
