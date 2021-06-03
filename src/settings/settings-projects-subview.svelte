<script>
	import { onMount } from 'svelte'
	import { projectsStore, projectsStoreGetProjects, projectsStoreNew } from '../stores/projects-store.js'

	import UiSubNav from '../ui/ui-sub-nav.svelte'
	import SettingsProject from '../settings/settings-project.svelte'

	$: projects = Object.values($projectsStore.projectMap)

	onMount(async () => {
		await getProjects()
	})

	async function newProject() {
		await projectsStoreNew()
		getProjects()
	}

	async function getProjects() {
		projects = await projectsStoreGetProjects()
		return projects
	}

</script>

<UiSubNav active="projects" />

<header>
	<div class="left">
		<!-- <h2>
			Projects
		</h2> -->
	</div>
	<div class="right">
		<button on:click={e => newProject()}>
			New Project
		</button>
	</div>
</header>

<main>

	{#if projects.length === 0}
		No Projects
	{:else}
		{#each projects as project}
			<SettingsProject
				data={project}
				on:updated={e => getProjects()} />
		{/each}
	{/if}
</main>

<style>
	header {
		display: flex;
		justify-content: space-between;
		max-width: 1024px;
		margin: 12px auto;
	}

	.left {
		display: flex;
	}

	header button {
		display: block;
		border: 0;
		box-shadow: 0 0 0 1px var(--c-grey-85) inset;
		border-radius: 6px;
		background: #FFF;
		font-size: 13px;
		padding: 0 18px;
		line-height: 36px;
		text-decoration: none;
		color: var(--c-grey-10);
		max-height: 36px;
		text-transform: uppercase;
		font-weight: 600;
		margin: 0;
		-webkit-font-smoothing: antialiased;
	}

	header button:hover {
		background: var(--c-grey-10);
		box-shadow: 0 0 0 1px var(--c-grey-10) inset;
		color: #FFF;
		cursor: pointer;
	}

	h2 {
		display: block;
		margin: 0 0 0 12px;
		line-height: 48px;
		max-height: 48px;
	}

	main {
		display: block;
		max-width: 1024px;
		margin: 0 auto 24px auto;
	}
</style>