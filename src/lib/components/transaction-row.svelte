<script>
	// ============================================
	// PARTIE 7 - TP : Ligne de transaction
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

	// TODO 1: Définir les props avec $props()
	// - transaction, onView?, onEdit?, onDelete?

	const getStatusConfig = (status) => {
		const config = {
			completed: { variant: 'default', label: 'Complétée' },
			pending: { variant: 'secondary', label: 'En attente' },
			failed: { variant: 'destructive', label: 'Échouée' }
		};
		return config[status] || config.pending;
	};

	// TODO 2: Déclarer les valeurs dérivées ($derived)
	// - formattedAmount (avec formatValue, type 'currency')
	// - formattedDate (avec toLocaleDateString('fr-FR'))
	// - statusConfig (avec getStatusConfig)
</script>

<Table.Row>
	<!-- TODO 3: Créer les 5 cellules <Table.Cell> -->
	<!-- 1. Client (customer + email) -->
	<!-- 2. Montant (formattedAmount) aligné à droite -->
	<!-- 3. Statut (Badge) centré -->
	<!-- 4. Date (formattedDate) -->
	<!-- 5. Actions (DropdownMenu) aligné à droite -->
</Table.Row>
