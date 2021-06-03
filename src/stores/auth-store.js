import { writable, get, set } from 'svelte/store'
import { routerStore } from '../stores/router-store.js'
import Page from 'page'

export const authStore = writable({
	user: null
})

export function authStoreInit() {
	console.log('authStoreInit')

	supabase.auth.onAuthStateChange((event, session) => {

		if(session) {
			authStore.set({
				user: session.user
			})
		}

		const isSignedOutView = get(routerStore).view === 'sign-up' || get(routerStore).view === 'sign-in'

		if(event === 'SIGNED_IN' && isSignedOutView) {
			Page('/timelog/')
		} else {
			console.log(event, session)
		}
	})
}

export async function authStoreSignUp({ email, password }) {

	const { user, session, error } = await supabase.auth.signUp({
		email: email.toLowerCase(),
		password
	})

	return {
		user,
		error
	}
}

export async function authStoreSignIn({ email, password }) {

	const { user, session, error } = await supabase.auth.signIn({
		email: email.toLowerCase(),
		password
	})

	return {
		user,
		error
	}
}

export async function authStoreSignOut() {

	const { error } = await supabase.auth.signOut()

	if(!error) {
		Page('/sign-in/')
	}

	return {
		error
	}
}