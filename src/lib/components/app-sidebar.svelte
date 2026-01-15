<script module>
	import AudioWaveformIcon from 'lucide-svelte/icons/audio-waveform';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import CommandIcon from 'lucide-svelte/icons/command';
	import CreditCardIcon from 'lucide-svelte/icons/credit-card';
	import HouseIcon from 'lucide-svelte/icons/house';
	import MessageCircleQuestionIcon from 'lucide-svelte/icons/message-circle-question';
	import SearchIcon from 'lucide-svelte/icons/search';
	import Settings2Icon from 'lucide-svelte/icons/settings-2';
	import UsersIcon from 'lucide-svelte/icons/users';

	const data = {
		teams: [
			{
				name: 'Acme Inc',
				logo: CommandIcon,
				plan: 'Entreprise'
			}
		],
		navMain: [
			{
				title: 'Rechercher',
				url: '#',
				icon: SearchIcon
			},
			{
				title: 'Dashboard',
				url: '#',
				icon: HouseIcon,
				isActive: true
			},
			{
				title: 'Transactions',
				url: '#',
				icon: CreditCardIcon
			},
			{
				title: 'Clients',
				url: '#',
				icon: UsersIcon
			}
		],
		navSecondary: [
			{
				title: 'Calendrier',
				url: '#',
				icon: CalendarIcon
			},
			{
				title: 'Paramètres',
				url: '#',
				icon: Settings2Icon
			},
			{
				title: 'Aide',
				url: '#',
				icon: MessageCircleQuestionIcon
			}
		],
		favorites: [
			{
				name: 'Rapport mensuel',
				url: '#',
				emoji: '📊'
			},
			{
				name: 'Top produits',
				url: '#',
				emoji: '🥇'
			},
			{
				name: 'Analyse clients',
				url: '#',
				emoji: '👥'
			}
		],
		workspaces: [
			{
				name: 'Ventes',
				emoji: '🔥',
				pages: [
					{
						name: 'Commandes récentes',
						url: '#',
						emoji: '📦'
					},
					{
						name: 'Revenus par région',
						url: '#',
						emoji: '🗺️'
					}
				]
			},
			{
				name: 'Marketing',
				emoji: '📢',
				pages: [
					{
						name: 'Campagnes actives',
						url: '#',
						emoji: '🎯'
					},
					{
						name: 'Taux de conversion',
						url: '#',
						emoji: '📈'
					}
				]
			}
		]
	};
</script>

<script>
	import NavFavorites from './nav-favorites.svelte';
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import NavWorkspaces from './nav-workspaces.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	let { ref = $bindable(null), ...restProps } = $props();
</script>

<Sidebar.Root bind:ref class="border-e-0" {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
		<NavMain items={data.navMain} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavFavorites favorites={data.favorites} />
		<NavWorkspaces workspaces={data.workspaces} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
