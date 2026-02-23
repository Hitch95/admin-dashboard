<script>
	// ============================================
	// PARTIE 18 - SOLUTION : Exercice Theme
	// ============================================

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
{@render children()}
