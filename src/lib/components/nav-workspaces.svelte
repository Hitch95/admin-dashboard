<script>
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';

	let { workspaces } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Espaces de travail</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each workspaces as workspace (workspace.name)}
				<Collapsible.Root>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							{#snippet child({ props })}
								<a href="##" {...props}>
									<span>{workspace.emoji}</span>
									<span>{workspace.name}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuAction
									{...props}
									class="start-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
									showOnHover
								>
									<ChevronRightIcon />
								</Sidebar.MenuAction>
							{/snippet}
						</Collapsible.Trigger>
						<Sidebar.MenuAction showOnHover></Sidebar.MenuAction>
						<Collapsible.Content>
							<Sidebar.MenuSub>
								{#each workspace.pages as page (page.name)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton>
											{#snippet child({ props })}
												<a href="##" {...props}>
													<span>{page.emoji}</span>
													<span>{page.name}</span>
												</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						</Collapsible.Content>
					</Sidebar.MenuItem>
				</Collapsible.Root>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
