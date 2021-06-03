<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { projectsStoreUpdateTitle, projectsStoreDelete } from '../stores/projects-store.js'

	const dispatch = createEventDispatcher();

	export let data = {}

	let navActive = false
	
	onMount(async () => {
		
	})

	async function editTitle() {
		navActive = false
		const newTitle = prompt('Please insert new project title', data.title ? data.title : '')

		if (newTitle != null){
			await projectsStoreUpdateTitle({
				id: data.id,
				title: newTitle
			})

			dispatch('updated', '')
		}
	}

	async function deleteProject() {
		navActive = false
		await projectStoreDelete({
			id: data.id
		})

		dispatch('updated', '')
	}

</script>

<article class="{navActive ? 'active' : ''}">
	<div class="title" on:click={e => editTitle()}>
		{data.title ? data.title : 'No Title'}
	</div>

	<div class="spacer"></div>
	
	<div class="nav-wrapper">
		<button class="toggle" on:click={e => navActive = !navActive}>
			<span></span>
		</button>
		{#if navActive}
			<nav>
				<button on:click={e => editTitle()}>
					Edit Title
				</button>
				<button on:click={e => deleteProject()}>
					Delete
				</button>
			</nav>
		{/if}
	</div>
</article>

{#if navActive}
	<div class="shadow" on:click={e => navActive = !navActive}></div>
{/if}



<style>
	article {
		display: flex;
		height: 48px;
		border-radius: 6px;
	}

	article:hover, article.active {
		background: var(--c-grey-95);
	}

	div {
		-webkit-font-smoothing: antialiased;
	}

	.title {
		font-size: 15px;
		line-height: 48px;
		padding: 0 12px;
		font-weight: 600;
		border-radius: 6px 0 0 6px;
		cursor: pointer;
	}

	.title:hover {
		background: var(--c-grey-10);
		color: #FFF;
	}

	.spacer {
		flex-grow: 1;
	}

	.nav-wrapper {
		position: relative;
		width: 36px;
	}

	article.active .nav-wrapper {
		z-index: 1100;
	}

	.toggle {
		position: relative;
		width: 36px;
		height: 48px;
		border-radius: 0 6px 6px 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		opacity: 0;
	}

	.toggle:hover {
		background: var(--c-grey-10);
	}

	article:hover .toggle {
		opacity: 1;
	}

	.toggle span {
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		width: 12px;
		height: 2px;
		background: var(--c-grey-10);
		border-radius: 1px;
	}

	.toggle span:before, .toggle span:after {
		content: '';
		display: inherit;
		position: inherit;
		top: -4px;
		left: 0;
		width: inherit;
		height: inherit;
		background: inherit;
		border-radius: inherit;
	}

	.toggle:hover span, .toggle:hover span:before, .toggle:hover span:after {
		background: #FFF;
	}

	.toggle span:after {
		top: 4px;
	}

	.nav-wrapper nav {
		position: absolute;
		top:0;
		right:0;
		width: 180px;
		background: #FFF;
		border-radius: 6px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .1);
		overflow: hidden;
	}

	.nav-wrapper nav button {
		display: block;
		width: 100%;
		border: 0;
		text-align: left;
		font-size: 13px;
		line-height: 42px;
		font-weight: 600;
		padding: 0 12px;
		margin: 0;
		cursor: pointer;
		background: #FFF;
	}

	.nav-wrapper nav button:hover {
		background: var(--c-grey-10);
		color: #FFF;
	}

	.shadow {
		background: rgba(0, 0, 0, .2);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
	}
</style>