<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { timelogStoreUpdateDuration, timelogStoreUpdateComment, timelogStoreDelete } from '../stores/timelog-store.js'
	import { projectsStore } from '../stores/projects-store.js'
	import { dateTimeToDuration, dateGetHours, dateGetMinutes} from '../helpers/helpers.js'

	const dispatch = createEventDispatcher();

	export let data = {}

	let navActive = false
	
	onMount(async () => {
		
	})

	async function editDuration() {
		navActive = false
		const newDuration = prompt('Please insert new duration', dateGetHours(data.duration) +':'+ dateGetMinutes(data.duration))

		await timelogStoreUpdateDuration({
			id: data.id,
			duration: dateTimeToDuration(newDuration)
		})

		dispatch('updated', '')
	}

	async function editComment() {
		navActive = false
		const newComment = prompt('Please insert new comment', data.comment ? data.comment : '')

		if (newComment != null){
			await timelogStoreUpdateComment({
				id: data.id,
				comment: newComment
			})

			dispatch('updated', '')
		}
	}

	async function deleteEntry() {
		navActive = false
		await timelogStoreDelete({
			id: data.id
		})

		dispatch('updated', '')
	}

</script>

<article class="{navActive ? 'active' : ''}">
	<div class="duration" on:click={e => editDuration()}>
		{dateGetHours(data.duration)}:{dateGetMinutes(data.duration)}
		<small>
			00
		</small>
	</div>
	<div class="meta-wrapper" on:click={e => dispatch('openOverlay', { kind: 'projects', id: data.id })}>
		<div class="meta">
			<div class="project">
				{data.project && $projectsStore.projectMap[data.project] ? $projectsStore.projectMap[data.project].title : 'No Project'}
			</div>
			<!--<div class="task">
				{JSON.stringify($projectsStore.projectMap[data.project])}
			</div>-->
		</div>
	</div>
	<div class="comment {data.comment && data.comment.length > 0 ? 'filled' : ''}" on:click={e => editComment()}>
		{data.comment && data.comment.length > 0 ? data.comment : 'No Comment'}
	</div>

	<div class="spacer"></div>

	<div class="nav-wrapper">
		<button class="toggle" on:click={e => navActive = !navActive}>
			<span></span>
		</button>
		{#if navActive}
			<nav>
				<button on:click={e => editDuration()}>
					Edit Duration
				</button>
				<button>
					Edit Project <!-- / Task-->
				</button>
				<button on:click={e => editComment()}>
					Edit Comment
				</button>
				<button on:click={e => deleteEntry()}>
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

	.duration {
		width: 78px;
		font-size: 15px;
		line-height: 48px;
		padding: 0 6px 0 12px;
		font-weight: 600;
		border-radius: 6px 0 0 6px;
		cursor: pointer;
	}

	.duration:hover {
		background: var(--c-grey-10);
		color: #FFF;
	}

	.duration small {
		position: relative;
		top: -5px;
		left: 0px;
		font-size: 9px;
	}


	.meta-wrapper {
		padding: 9px;
		cursor: pointer;
	}

	.meta-wrapper:hover {
		background: #000;
	}

	.meta {
		border-radius: 3px;
		background: #333;
		display: flex;
		font-size: 13px;
		line-height: 30px;
		color: #FFF;
	}

	.project {
		padding: 0 12px;
	}

	.task {
		padding: 0 12px;
		background: rgba(255, 255, 255, .1);
	}

	.comment {
		font-size: 13px;
		line-height: 48px;
		font-weight:400;
		padding: 0 12px;
		cursor: pointer;
		color: var(--c-grey-50);
	}

	.comment:hover, .comment.filled:hover {
		background: var(--c-grey-10);
		color: #FFF;
	}

	.comment.filled {
		color: var(--c-grey-10);
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