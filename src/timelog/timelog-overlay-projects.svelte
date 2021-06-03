<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { timelogStoreUpdateProject } from '../stores/timelog-store.js'
	import { projectsStore, projectsStoreGetProjects } from '../stores/projects-store.js'

	const dispatch = createEventDispatcher()

	export let timeId = null

	$: projects = Object.values($projectsStore.projectMap)

	onMount(async () => {
		await getProjects()
	})
	async function getProjects() {
		projects = await projectsStoreGetProjects()
	}

	async function updateProject(id) {
		await timelogStoreUpdateProject({
			id: timeId,
			project: id
		})

		dispatch('updated', '')
	}

</script>

<div class="wrapper">
	{#if projects.length === 0}
		No Projects
	{:else}
		{#each projects as project}
			<button on:click={e => updateProject(project.id)}>
				{project.title ? project.title : 'No Title'}
			</button>
		{/each}
	{/if}
</div>



<style>
	.wrapper {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		background: #FFF;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .1);
		z-index: 1100;
		border-radius: 6px;
		width: 300px;
		padding: 6px;
		max-height: 90vh;
		overflow-x: hidden;
		overflow-y: auto;
	}

	button {
		display: block;
		width: 100%;
		border: 0;
		text-align: left;
		font-size: 14px;
		line-height: 42px;
		font-weight: 700;
		padding: 0 12px;
		margin: 0;
		cursor: pointer;
		background: #FFF;
		border-radius: 2px;
	}

	button:hover {
		background: #333;
		color: #FFF;
	}
</style>