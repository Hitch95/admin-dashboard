<script module>
	import BellIcon from '@lucide/svelte/icons/bell';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import FilterIcon from '@lucide/svelte/icons/filter';
	import PrinterIcon from '@lucide/svelte/icons/printer';
	import RefreshCwIcon from '@lucide/svelte/icons/refresh-cw';
	import ShareIcon from '@lucide/svelte/icons/share';
	import SlidersHorizontalIcon from '@lucide/svelte/icons/sliders-horizontal';

	const data = [
		[
			{
				label: 'Actualiser',
				icon: RefreshCwIcon
			},
			{
				label: 'Période',
				icon: CalendarIcon
			},
			{
				label: 'Filtres',
				icon: FilterIcon
			}
		],
		[
			{
				label: 'Exporter CSV',
				icon: DownloadIcon
			},
			{
				label: 'Imprimer',
				icon: PrinterIcon
			},
			{
				label: 'Partager',
				icon: ShareIcon
			}
		],
		[
			{
				label: 'Notifications',
				icon: BellIcon
			},
			{
				label: 'Paramètres',
				icon: SlidersHorizontalIcon
			}
		]
	];
</script>

<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import StarIcon from '@lucide/svelte/icons/star';
	import { untrack } from 'svelte';

	let open = $state(false);

	$effect(() => {
		untrack(() => {
			open = true;
		});
	});

	const lastUpdate = new Date(Date.now() - 600000).toLocaleTimeString('fr-FR', {
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<div class="flex items-center gap-2 text-sm">
	<div class="hidden font-medium text-muted-foreground md:inline-block">
		Dernière maj : {lastUpdate}
	</div>
	<Button variant="ghost" size="icon" class="size-7">
		<StarIcon />
	</Button>
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon" class="size-7 data-[state=open]:bg-accent">
					<EllipsisIcon />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-56 overflow-hidden rounded-lg p-0" align="end">
			<Sidebar.Root collapsible="none" class="bg-transparent">
				<Sidebar.Content>
					{#each data as group, index (index)}
						<Sidebar.Group class="border-b last:border-none">
							<Sidebar.GroupContent class="gap-0">
								<Sidebar.Menu>
									{#each group as item, index (index)}
										<Sidebar.MenuItem>
											<Sidebar.MenuButton class="hover:bg-accent hover:text-accent-foreground">
												<item.icon /> <span>{item.label}</span>
											</Sidebar.MenuButton>
										</Sidebar.MenuItem>
									{/each}
								</Sidebar.Menu>
							</Sidebar.GroupContent>
						</Sidebar.Group>
					{/each}
				</Sidebar.Content>
			</Sidebar.Root>
		</Popover.Content>
	</Popover.Root>
</div>
