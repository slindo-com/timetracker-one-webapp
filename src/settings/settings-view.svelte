<script>
	import { onMount } from 'svelte'
	import { routerStore } from '../stores/router-store.js'
	import UiMainNav from '../ui/ui-main-nav.svelte'

	import SettingsProjectsSubview from '../settings/settings-projects-subview.svelte'
	import SettingsAccountSubview from '../settings/settings-account-subview.svelte'

	onMount(() => {

	})

</script>

<UiMainNav active="settings" />

{#if $routerStore.subview === 'projects'}
	<SettingsProjectsSubview />
{:else if $routerStore.subview === 'account'}
	<SettingsAccountSubview />
{/if}

<style>
	
</style>