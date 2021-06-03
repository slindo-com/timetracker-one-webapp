import { writable, get } from 'svelte/store'
import { routerStore } from '../stores/router-store.js'
import { authStore } from '../stores/auth-store.js'
import { dateToDatabaseDate } from '../helpers/helpers.js'

export const timelogStore = writable({
	entries: {}
})

export function timelogStoreInit() {
	console.log('timelogStoreInit')
}

export async function timelogStoreListen() {
	/* const mySubscription = supabase
		.from('times')
		.on('*', payload => {
			console.log('Change received!', payload)
		})
		.subscribe()*/
}

export async function timelogStoreGetEntries(day) {
	const { data, error } = await supabase
		.from('times')
		.select()
		.filter('day', 'eq', dateToDatabaseDate(day))
		.order('created_at', { ascending: false })

	if(error) {
		console.log(error)
	}

	return data
}

export async function timelogStoreNew(day) {
	const { data, error } = await supabase
		.from('times')
		.insert([{
			created_by: get(authStore).user.id,
			day: dateToDatabaseDate(day)
		}])

	if(error) {
		console.log(error)
	}

	return data
}

export async function timelogStoreUpdateDuration({ id, duration }) {
	const { data, error } = await supabase
		.from('times')
		.update({ duration })
		.match({ id })

	if(error) {
		console.log(error)
	}

	return data
}

export async function timelogStoreUpdateProject({ id, project }) {
	const { data, error } = await supabase
		.from('times')
		.update({ project })
		.match({ id })

	if(error) {
		console.log(error)
	}

	return data
}

export async function timelogStoreUpdateComment({ id, comment }) {
	const { data, error } = await supabase
		.from('times')
		.update({ comment })
		.match({ id })

	if(error) {
		console.log(error)
	}

	return data
}

export async function timelogStoreDelete({ id }) {
	const { data, error } = await supabase
		.from('times')
		.delete()
		.match({ id })

	if(error) {
		console.log(error)
	}

	return data
}