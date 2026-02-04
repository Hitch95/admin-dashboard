<script>
	// ============================================
	// PARTIE 5 - TP : Création d'un composant avec Props
	// ============================================

	import { formatValue, calculateChange } from '$lib/utils.js';

	// TODO 1: Récupérer les données passées par le parent (les "props")
	// Le composant doit accepter 5 propriétés : title, value, previousValue, icon, type
	//
	// Documentation : https://svelte.dev/docs/svelte/$props
	// Tâche : Déclarez les props en utilisant la rune $props()

	// ... votre code ici ...

	// TODO 2: Calculer la variation en pourcentage
	// Cette valeur doit se recalculer automatiquement si "value" ou "previousValue" change.
	//
	// Documentation : https://svelte.dev/docs/svelte/$derived
	// Tâche : Créez une variable "change" utilisant $derived et la fonction calculateChange()

	// ... votre code ici ...
</script>

<div class="rounded-xl border bg-card p-6">
	<div class="flex items-center justify-between">
		<!-- TODO 3: Rendre le titre et l'icône dynamiques -->
		<!-- Remplacez le texte statique par les variables de vos props -->
		<p class="text-sm font-medium text-muted-foreground">Titre du KPI</p>
		<span class="text-muted-foreground/80">📈</span>
	</div>

	<!-- TODO 4: Rendre la valeur dynamique -->
	<!-- Utilisez la fonction formatValue(value, type) -->
	<p class="mt-2 text-2xl font-bold">0</p>

	<p class="mt-1 text-xs text-muted-foreground">
		<!-- TODO 5: Rendre la variation dynamique -->
		<!-- Affichez "change" précédé de "+" si positif -->
		<!-- Changez la couleur (vert/rouge) selon le signe -->
		<span class="text-green-600">↑ +0%</span>
		vs mois dernier
	</p>
</div>
