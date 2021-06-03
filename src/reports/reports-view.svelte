<script>
	import { onMount } from 'svelte'
	import { authStoreSignOut } from '../stores/auth-store.js'
	import UiMainNav from '../ui/ui-main-nav.svelte'

	onMount(() => {

	})

	async function signOut() {
		const { error } = await authStoreSignOut()

		if(error) {
			console.log('ERROR', error)
		}
	}

</script>

<UiMainNav active="reports" />

<header>
	<div class="left">
		<h2>
			Reports
		</h2>
	</div>
	<!-- <div class="right">
		<button on:click={e => signOut()}>
			Sign Out
		</button>
	</div> -->
</header>
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
		font-size: 17px;
		font-weight: 600;
		margin: 0 0 0 12px;
		line-height: 48px;
		max-height: 48px;
		-webkit-font-smoothing: antialiased;
	}

	main {
		display: block;
		max-width: 1024px;
		margin: 0 auto 24px auto;
	}
</style>