<script>
	import { onMount } from 'svelte'

	export let active = 'timelog'

	onMount(() => {

	})

</script>

<nav>
	<a href="/timelog/" class="{active === 'timelog' ? 'active' : ''}">
		Timelog
	</a>
	<a href="/reports/" class="{active === 'reports' ? 'active' : ''}">
		Reports
	</a>
	<a href="/settings/projects/" class="{active === 'settings' ? 'active' : ''}">
		Settings
	</a>
</nav>

<style>
	nav {
		position: relative;
		z-index: 900;
		padding: 6px 0 0 0;
		display: flex;
		justify-content: center;
	}

	a {
		position: relative;
		font-size: 13px;
		line-height: 42px;
		color: var(--c-grey-50);
		text-decoration: none;
		display: block;
		padding: 0 12px;
		border-radius: 6px;
		-webkit-font-smoothing: antialiased;
	}

	a:hover {
		background: var(--c-grey-10);
		color: #FFF;
	}

	a.active {
		color: var(--c-grey-10);
	}

	a.active:after {
		content: '';
		display: block;
		width: 6px;
		height: 3px;
		background: var(--c-grey-10);
		border-radius: 0 0 3px 3px;
		position: absolute;
		top: -6px;
		left: 50%;
		transform: translateX(-50%);
	}

	a.active:hover {
		color: #FFF;
	}
</style>