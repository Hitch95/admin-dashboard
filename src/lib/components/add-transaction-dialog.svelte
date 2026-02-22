<script>
	// ============================================
	// PARTIE 15 - SOLUTION : Async (Suite) / POST Form
	// ============================================

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Plus, Loader2 } from 'lucide-svelte';
	import { transactions } from '$lib/stores/transactions-store.js';

	let open = $state(false);

	let submitting = $state(false);
	let errorMsg = $state(null);

	let formData = $state({
		customer: '',
		email: '',
		amount: '',
		status: 'pending'
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		submitting = true;
		errorMsg = null;

		try {
			const response = await fetch('/api/transactions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...formData, amount: parseFloat(formData.amount) })
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la création');
			}

			const result = await response.json();
			transactions.add(result);
			formData = { customer: '', email: '', amount: '', status: 'pending' };
			open = false;
		} catch (e) {
			errorMsg = e.message;
		} finally {
			submitting = false;
		}
	};
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

			{#if errorMsg}
				<p class="text-sm text-destructive">{errorMsg}</p>
			{/if}

			<Dialog.Footer>
				<Button type="button" variant="outline" onclick={() => (open = false)}>Annuler</Button>

				<Button type="submit" disabled={submitting}>
					{#if submitting}
						<Loader2 class="mr-2 size-4 animate-spin" />
						Envoi...
					{:else}
						Créer
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
