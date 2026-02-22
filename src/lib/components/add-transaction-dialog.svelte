<script>
	// ============================================
	// PARTIE 16 - TP : Forms Dialog (Suite)
	// ============================================

	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Plus, Loader2, Pencil } from 'lucide-svelte';
	import { transactions } from '$lib/stores/transactions-store.js';

	// TODO 2 : Accepter deux props optionnelles :
	//   let { transaction = null, onclose = () => {} } = $props();
	//   - transaction : si fourni → mode édition, sinon → mode création
	//   - onclose : callback pour notifier le parent quand le dialog se ferme
	//
	//   Créer un $derived pour déterminer le mode :
	//   let isEditing = $derived(transaction !== null);
	//
	//   Ajouter un $effect qui, quand transaction change et n'est pas null,
	//   pré-remplit formData et ouvre le dialog :
	//   $effect(() => {
	//       if (transaction) {
	//           formData = { ...transaction, amount: String(transaction.amount) };
	//           open = true;
	//       }
	//   });

	let open = $state(false);

	let submitting = $state(false);
	let errorMsg = $state(null);

	// TODO 3 : Ajouter un $state() errors = {} pour la validation par champ
	//   et créer une fonction validate() qui retourne true si le formulaire est valide :
	//   const validate = () => {
	//       errors = {};
	//       if (!formData.customer.trim()) errors.customer = 'Le nom est requis';
	//       if (!formData.email.includes('@')) errors.email = 'Email invalide';
	//       if (!formData.amount || parseFloat(formData.amount) <= 0) errors.amount = 'Montant invalide';
	//       return Object.keys(errors).length === 0;
	//   }

	let formData = $state({
		customer: '',
		email: '',
		amount: '',
		status: 'pending'
	});

	// TODO 4 : Modifier handleSubmit() pour :
	//   - Appeler validate() en premier, ne pas soumettre si invalide
	//   - Si isEditing → appeler transactions.update(transaction.id, parsedData) + fermer
	//   - Si création → garder le fetch POST existant
	//   Penser à appeler onclose() quand le dialog se ferme en mode édition

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
			<!-- TODO 5 : Adapter le titre et la description selon le mode -->
			<!--   isEditing ? 'Modifier la transaction' : 'Nouvelle transaction' -->
			<Dialog.Title>Nouvelle transaction</Dialog.Title>
			<Dialog.Description>Remplissez les informations de la transaction.</Dialog.Description>
		</Dialog.Header>
		<form onsubmit={handleSubmit} class="space-y-4">
			<div class="space-y-2">
				<Label for="customer">Client</Label>
				<Input id="customer" bind:value={formData.customer} placeholder="Jean Dupont" required />
				<!-- TODO 5 : Afficher errors.customer sous le champ si présent -->
				<!-- {#if errors.customer}<p class="text-xs text-destructive">{errors.customer}</p>{/if} -->
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
				<!-- TODO 5 : Afficher errors.email sous le champ si présent -->
				<!-- {#if errors.email}<p class="text-xs text-destructive">{errors.email}</p>{/if} -->
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
				<!-- TODO 5 : Afficher errors.amount sous le champ si présent -->
				<!-- {#if errors.amount}<p class="text-xs text-destructive">{errors.amount}</p>{/if} -->
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
						<!-- TODO 5 : Adapter le label selon le mode -->
						<!-- isEditing ? 'Modifier' : 'Créer' -->
						Créer
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
