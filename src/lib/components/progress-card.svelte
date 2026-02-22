<script>
	// ============================================
	// PARTIE 17 - TP : Exercice ProgressCard
	// ============================================

	import * as Card from '$lib/components/ui/card/index.js';

	// TODO 2 : Déclarer les props : label, current, target, unit (optionnel, défaut: ''), icon (snippet)
	//   let { label, current, target, unit = '', icon } = $props();

	// TODO 3 : Calculer avec $derived :
	//   let percentage = $derived(Math.min(Math.round((current / target) * 100), 100));
	//   let status = $derived(percentage >= 100 ? 'success' : percentage >= 70 ? 'warning' : 'danger');
	//
	//   Créer un objet de couleurs correspondant au status :
	//   const colors = { success: 'bg-green-500', warning: 'bg-amber-500', danger: 'bg-red-500' };
</script>

<!-- TODO 4 : Construire le template avec Card, une barre de progression
              (div avec width en % pilotée par percentage), et le texte current / target -->
<!-- TODO 5 : Ajouter le snippet icon() comme dans StatCard ({#if icon}{@render icon()}{/if}) -->

<!--
	Indice pour la barre de progression :
	<div class="h-2 w-full rounded-full bg-muted">
		<div class="h-full rounded-full transition-all {colors[status]}" style="width: {percentage}%"></div>
	</div>
-->

<Card.Root>
	<Card.Content class="p-6">
		<p class="text-sm text-muted-foreground">Composant ProgressCard à créer...</p>
	</Card.Content>
</Card.Root>
