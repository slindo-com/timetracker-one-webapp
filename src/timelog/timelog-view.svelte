<script>
	import { onMount, onDestroy } from 'svelte'
	import { get } from 'svelte/store'
	import { i18n } from '../stores/i18n-store.js'
	import { routerStore } from '../stores/router-store.js'
	import { timelogStoreGetEntries, timelogStoreListen, timelogStoreNew } from '../stores/timelog-store.js'
	import { dateStringToDate, dateGetHumanDate, datePrevDate, dateNextDate, dateToDatestring, dateGetHours, dateGetMinutes} from '../helpers/helpers.js'

	import UiMainNav from '../ui/ui-main-nav.svelte'
	import UiIcon from '../ui/ui-icon.svelte'
	import TimelogEntry from '../timelog/timelog-entry.svelte'
	import TimelogOverlayProjects from '../timelog/timelog-overlay-projects.svelte'

	let entries = [],
		loading = true,
		routerStoreSubscription,
		isOverlay = false,
		overlayKind = '',
		overlayId = '',
		hoveredPrevColor = 'var(--c-grey-10)',
		hoveredNextColor = 'var(--c-grey-10)'

	function accumulate(entries) {
		return entries.reduce((accumulator, currentValue) => {
			return accumulator + currentValue.duration
		}, 0)
	}

	$: total = accumulate(entries)

	onMount(async () => {
		routerStoreSubscription = routerStore.subscribe(async routerStoreData => {
			if(routerStoreData.view === 'timelog') {
				entries = []
				loading = true
				const date = dateStringToDate(routerStoreData.subview)
				entries = await timelogStoreGetEntries(date)
				loading = false
			}
		})
	})

	onDestroy(() => {
		if(routerStoreSubscription) {
			routerStoreSubscription()
		}
	})

	async function getEntries() {
		const date = dateStringToDate(get(routerStore).subview)
		entries = await timelogStoreGetEntries(date)
	}

	async function newEntry() {
		const date = dateStringToDate(get(routerStore).subview)
		await timelogStoreNew(date)
		await getEntries()
	}

	async function openOverlay(e) {
		isOverlay = true
		overlayKind = e.detail.kind
		overlayId = e.detail.id
	}

	async function updatedFromOverlay() {
		await getEntries()
		isOverlay = false
	}

</script>

<UiMainNav active="timelog" />

<header>
	<div class="date-wrapper">
		<a href="/timelog/{dateToDatestring(datePrevDate(dateStringToDate($routerStore.subview)))}/"
			on:mouseenter={e => hoveredPrevColor = '#FFF'}
			on:mouseleave={e => hoveredPrevColor = 'var(--c-grey-10)'}>
			<UiIcon
				type="arrow-left"
				color="{hoveredPrevColor}" />
		</a>
		<a href="/timelog/{dateToDatestring(dateNextDate(dateStringToDate($routerStore.subview)))}/"
			on:mouseenter={e => hoveredNextColor = '#FFF'}
			on:mouseleave={e => hoveredNextColor = 'var(--c-grey-10)'}>
			<UiIcon
				type="arrow-right"
				color="{hoveredNextColor}" />
		</a>
		<h2>
			{dateGetHumanDate($i18n.MONTHS, $i18n.WEEKDAYS_SHORT, dateStringToDate($routerStore.subview))}
		</h2>
	</div>
	<div class="right">
		<button on:click={e => newEntry()}>
			New Entry
		</button>
	</div>
</header>

<main>
	{#if loading}
		<div class="loading">
			Loading…
		</div>
	{:else}
		{#if entries.length === 0}
			<div class="empty">
				No entries for this day.
			</div>
		{:else}
			{#each entries as entry}
				<TimelogEntry
					data={entry}
					on:updated={e => getEntries()}
					on:openOverlay={e => openOverlay(e)} />
			{/each}
			<div class="total">
				{dateGetHours(total)}:{dateGetMinutes(total)}
				<span>
					total
				</span>
			</div>
		{/if}
	{/if}
</main>

{#if isOverlay}
	<div class="shadow" on:click={e => isOverlay = false}></div>
{/if}

{#if isOverlay && overlayKind === 'projects'}
	<TimelogOverlayProjects 
		timeId={overlayId}
		on:updated={e => updatedFromOverlay()} />
{/if}


<style>
	header {
		display: flex;
		justify-content: space-between;
		max-width: 1024px;
		margin: 12px auto;
	}

	.date-wrapper {
		display: flex;
		box-shadow: 0 0 0 1px var(--c-grey-85) inset;
		height: 36px;
		border-radius: 6px;
	}

	header a {
		display: block;
		font-size: 14px;
		line-height: 36px;
		width: 36px;
		text-decoration: none;
		color: var(--c-grey-10);
		max-height: 36px;
		text-align: center;
		padding: 15px;
	}

	header a:hover {
		background: #000;
		border-color: #000;
		color: #FFF;
		cursor: pointer;
	}

	header a:first-child {
		border-radius: 6px 0 0 6px;
	}

	h2 {
		margin: 0;
	    font-size: 13px;
	    font-weight: 600;
	    line-height: 36px;
	    color: var(--c-grey-10);
	    padding: 0 12px;
	    -webkit-font-smoothing: antialiased;
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
		-webkit-font-smoothing: antialiased;
	}

	header button:hover {
		background: var(--c-grey-10);
		box-shadow: 0 0 0 1px var(--c-grey-10) inset;
		color: #FFF;
		cursor: pointer;
	}

	main {
		display: block;
		max-width: 1024px;
		margin: 24px auto;
	}

	.loading, .empty {
		font-size: 13px;
		line-height: 48px;
	}

	.total {
		padding:24px 12px 12px;
		font-size: 15px;
		line-height: 24px;
		font-weight: 600;
		-webkit-font-smoothing: antialiased;
	}

	.total span {
		color: var(--c-grey-65);
		font-size: 12px;
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