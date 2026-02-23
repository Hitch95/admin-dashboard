<script>
	// ============================================
	// PARTIE 18 - SOLUTION : Exercice Theme
	// ============================================

	import { Button } from '$lib/components/ui/button/index.js';

	import { toggleMode, mode } from 'mode-watcher';
	import { Sun, Moon } from 'lucide-svelte';

	let Icon = $derived(mode.current === 'light' ? Sun : Moon);
</script>

<Button variant="ghost" size="icon" class="size-7" onclick={toggleMode}>
	<Icon class="size-4" />
	<span class="sr-only">Changer le thème</span>
</Button>
