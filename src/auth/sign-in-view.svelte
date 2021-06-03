<script>
	import { authStoreSignIn } from '../stores/auth-store.js'

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
	
	})

	async function signIn(e) {
		e.preventDefault()
		const { user, error } = await authStoreSignIn({ email, password})
	}
</script>

<div class="spacer"></div>

<section class="container">

	<h2>
		Sign In
	</h2>

	<form on:submit={e => signUp(e)}>

		<div class="form-item">
			<input type="email" bind:value={email} class="input">
		</div>
		<div class="form-item">
			<input type="password" bind:value={password} class="input">
		</div>
		
		<button on:click={e => signIn(e)}>
			Sign In
		</button>

		<span>
			or
			<a href="/sign-up/">
				go to sign up page
			</a>
		</span>
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