<script>
	// ============================================
	// PARTIE 18 - TP : Exercice Theme
	// ============================================

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	// TODO 1 : Importer et monter <ModeWatcher /> depuis 'mode-watcher'
	//          C'est lui qui injecte la classe 'dark' sur <html> et persiste le choix dans localStorage
	//   import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<!-- TODO 1 : Ajouter <ModeWatcher /> ici -->
{@render children()}
