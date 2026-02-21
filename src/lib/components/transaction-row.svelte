<script>
	// ============================================
	// PARTIE 7 - SOLUTION : Ligne de transaction
	// ============================================

	import * as Table from '$lib/components/ui/table/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import MoreHorizontal from 'lucide-svelte/icons/more-horizontal';
	import Eye from 'lucide-svelte/icons/eye';
	import Pencil from 'lucide-svelte/icons/pencil';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import { formatValue } from '$lib/utils.js';

	let { transaction, onView, onEdit, onDelete } = $props();

	const getStatusConfig = (status) => {
		const config = {
			completed: { variant: 'default', label: 'Complétée' },
			pending: { variant: 'secondary', label: 'En attente' },
			failed: { variant: 'destructive', label: 'Échouée' }
		};
		return config[status] || config.pending;
	};

	let formattedAmount = $derived(formatValue(transaction.amount, 'currency'));
	let formattedDate = $derived(new Date(transaction.date).toLocaleDateString('fr-FR'));
	let statusConfig = $derived(getStatusConfig(transaction.status));
</script>

<Table.Row>
	<Table.Cell>
		<div>
			<p class="font-medium">{transaction.customer}</p>
			<p class="text-sm text-muted-foreground">{transaction.email}</p>
		</div>
	</Table.Cell>
	<Table.Cell class="text-right font-medium">{formattedAmount}</Table.Cell>
	<Table.Cell class="text-center">
		<Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
	</Table.Cell>
	<Table.Cell>{formattedDate}</Table.Cell>
	<Table.Cell class="text-right">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="ghost" size="icon" class="size-8">
						<MoreHorizontal class="size-4" />
						<span class="sr-only">Actions</span>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Item onclick={() => onView?.(transaction.id)}>
					<Eye class="mr-2 size-4" />
					Voir
				</DropdownMenu.Item>
				<DropdownMenu.Item onclick={() => onEdit?.(transaction.id)}>
					<Pencil class="mr-2 size-4" />
					Modifier
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={() => onDelete?.(transaction.id)}>
					<Trash2 class="mr-2 size-4" />
					Supprimer
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Table.Cell>
</Table.Row>
