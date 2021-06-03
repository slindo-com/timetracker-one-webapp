<script>
	import { onMount } from 'svelte'
	import { routerStore } from './stores/router-store.js'
	import { authStoreInit } from './stores/auth-store.js'
	import { timelogStoreInit } from './stores/timelog-store.js'
	import { projectsStoreInit } from './stores/projects-store.js'
	
	import SignUpView from './auth/sign-up-view.svelte'
	import SignInView from './auth/sign-in-view.svelte'
	import TimelogView from './timelog/timelog-view.svelte'
	import ReportsView from './reports/reports-view.svelte'
	import SettingsView from './settings/settings-view.svelte'


	export let name;

	onMount(async () => {
		authStoreInit()
		timelogStoreInit()
		projectsStoreInit()
	})
</script>

<main>
	{#if $routerStore.view === 'overview'}
		<a href="/sign-up/">
			Sign Up
		</a>
	{:else if $routerStore.view === 'sign-up'}
		<SignUpView />
	{:else if $routerStore.view === 'sign-in'}
		<SignInView />
	{:else if $routerStore.view === 'timelog'}
		<TimelogView />
	{:else if $routerStore.view === 'reports'}
		<ReportsView />
	{:else if $routerStore.view === 'settings'}
		<SettingsView />
	{/if}
</main>

<style>
	
</style>