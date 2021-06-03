<script>
	/*import Page from 'page'
	import { onMount } from 'svelte'
	import { get } from 'svelte/store'
	import { isEmailValid } from '../helpers/helpers.js'
	import { i18n } from '../stores/i18n-store.js'
	import { uiStore } from '../stores/ui-store.js'
	import { authStore, authSignUp, authSignIn } from '../stores/auth-store.js'
	import { routerStore } from '../stores/router-store.js'

	import UiInput from '../ui/ui-input.svelte'
	import UiButton from '../ui/ui-button.svelte'*/

	import { authStoreSignUp } from '../stores/auth-store.js'

	import { onMount } from 'svelte'

	let isInvitation = false,
		email = '',
		emailError = '',
		emailEl,
		password = '',
		passwordError = '',
		passwordEl,
		code = ''

	onMount(() => {
		/*const routerStoreData = get(routerStore)

		const url = new URL(window.location.href),
			urlEmail = url.searchParams.get('email'),
			urlCode = url.searchParams.get('code')

		if(urlEmail && urlCode) {
			// TODO: Why is UiInput not reactive without setTimeout?
			setTimeout(() => {
				email = urlEmail.toLowerCase()
				code = urlCode
				isInvitation = true
			}, 10)

			if(!get(uiStore).isTouchDevice) {
				passwordEl.focus()
			}
		} else {
			if(!get(uiStore).isTouchDevice) {
				emailEl.focus()
			}
		}*/
	})

	async function signUp(e) {
		e.preventDefault()
		const { user, error } = await authStoreSignUp({ email, password})

		console.log('HUBA', user, error)

		/*const {
			EMAIL_TAKEN,
			EMAIL_NOT_VALID,
			CONNECTION_ERROR
		} = get(i18n)

		authSignUp(email, password, code).then(res => {
			authSignIn(email, password)
				.then(() => Page('/timelog/'))
				.catch(() => Page('/sign-in/'))
		}).catch(err => {
			if(err.code === 'duplicate-key') {
				emailError = EMAIL_TAKEN
			} else if(err.code === 'email-not-valid') {
				emailError = EMAIL_NOT_VALID
			} else if(err.code === 'not-connected') {
				emailError = CONNECTION_ERROR
			} else {
				console.log('ERR', err)
			}
		}) */
	}

	function keydown(e) {
		/* if(e.keyCode === 13) {
			signUp()
		}*/
	}

</script>

<div class="spacer"></div>

<section class="container">

	<h2>
		Sign Up
	</h2>

	{#if isInvitation}
		<p>
			You got an invitation
		</p>
	{/if}

	<form on:submit={e => signUp(e)}>

		<div class="form-item">
			<input type="email" bind:value={email} class="input">
			<!--<UiInput
				label="{$i18n.EMAIL}"
				type="email"
				bind:this={emailEl}
				bind:value={email}
				disabled={isInvitation}
				bind:error={emailError} />-->
		</div>
		<div class="form-item">
			<input type="password" bind:value={password} class="input">
			<!--<UiInput
				label="{$i18n.PASSWORD}"
				type="password"
				bind:this={passwordEl}
				bind:value={password}
				bind:error={passwordError} />-->
		</div>
		
		<button on:click={e => signUp(e)}>
			Sign Up
		</button>

		{#if !isInvitation}
			<span>
				or
				<a href="/sign-in/">
					go to sign in page
				</a>
			</span>
		{/if}
	</form>

</section>

<div class="spacer"></div>

<style>
	.container {
		position: relative;
		max-width:540px;
		margin:0 auto;
		border:var(--c-grey) 0px solid;
		border-radius: 6px;
		background:#FFF;
		padding:0 30px 30px 30px;
		box-shadow:var(--shadow-box);
	}

	.spacer {
		height:60px;
	}

	h2 {
		padding:24px 0;
	}

	span {
		display:inline-block;
		padding:0 0 0 12px;
	}

	.form-item {
		margin:0 0 24px 0;
	}

	p {
		margin:0 0 24px 0;
	}

</style>