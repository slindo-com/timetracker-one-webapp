import { writable, get } from 'svelte/store'
import { routerStore } from '../stores/router-store.js'
import { authStore } from '../stores/auth-store.js'

export const projectsStore = writable({
	projectMap: {}
})

export function projectsStoreInit() {
	console.log('projectsStoreInit')
	projectsStoreGetProjects()
}

export async function projectsStoreGetProjects() {
	const { data, error } = await supabase
		.from('projects')
		.select()
		.order('title', { ascending: false })

	if(error) {
		console.log(error)
	} else {
		projectsStore.update(projectsStoreData => {
			projectsStoreData.projectMap = {}
			data.forEach(project => projectsStoreData.projectMap[project.id] = project)
			return projectsStoreData
		})
	}

	return data
}

export async function projectsStoreNew() {
	const { data, error } = await supabase
		.from('projects')
		.insert([{
			created_by: get(authStore).user.id
		}])

	if(error) {
		console.log(error)
	}

	return data
}

export async function projectsStoreUpdateTitle({ id, title }) {
	const { data, error } = await supabase
		.from('projects')
		.update({ title })
		.match({ id })

	if(error) {
		console.log(error)
	}

	return data
}

export async function projectsStoreDelete({ id }) {
	const { data, error } = await supabase
		.from('projects')
		.delete()
		.match({ id })

	if(error) {
		console.log(error)
	}

	return data
}