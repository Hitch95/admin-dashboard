<script>
	// ============================================
	// PARTIE 14 - SOLUTION : Forms Dialog
	// ============================================

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Plus } from 'lucide-svelte';
	import { transactions } from '$lib/stores/transactions-store.js';

	let open = $state(false);

	let formData = $state({
		customer: '',
		email: '',
		amount: '',
		status: 'pending'
	});

	function handleSubmit(e) {
		e.preventDefault();
		transactions.add({ ...formData, amount: parseFloat(formData.amount) });
		formData.customer = '';
		formData.email = '';
		formData.amount = '';
		formData.status = 'pending';
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...props} size="sm">
				<Plus class="mr-2 size-4" />
				Ajouter
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>Nouvelle transaction</Dialog.Title>
			<Dialog.Description>Remplissez les informations de la transaction.</Dialog.Description>
		</Dialog.Header>
		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="customer">Client</Label>
				<Input id="customer" bind:value={formData.customer} placeholder="Jean Dupont" required />
			</div>
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<Input
					id="email"
					type="email"
					bind:value={formData.email}
					placeholder="jean@email.com"
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="amount">Montant (€)</Label>
				<Input
					id="amount"
					type="number"
					step="0.01"
					bind:value={formData.amount}
					placeholder="0.00"
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="status">Statut</Label>
				<select
					id="status"
					bind:value={formData.status}
					class="h-9 w-full rounded-md border bg-background px-3 text-sm shadow-xs"
				>
					<option value="pending">En attente</option>
					<option value="completed">Complétée</option>
					<option value="failed">Échouée</option>
				</select>
			</div>
			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => (open = false)}>Annuler</Button>
				<Button type="submit">Créer</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
