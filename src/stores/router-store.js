import { writable, get } from 'svelte/store'
import { dateToDatestring } from '../helpers/helpers.js'
import Page from 'page'

export const routerStore = writable({
	view: 'overview',
	subview: null
})

Page({
	hashbang: true
})

Page('/sign-up/', data => {
	routerStore.set({
		view: 'sign-up'
	})
})

Page('/sign-in/', data => {
	routerStore.set({
		view: 'sign-in'
	})
})

Page('/timelog/', () => Page('/timelog/' + dateToDatestring(new Date()) + '/'))

Page('/timelog/:date/', data => {
	routerStore.set({
		view: 'timelog',
		subview: data.params.date
	})
})

Page('/reports/', data => {
	routerStore.set({
		view: 'reports'
	})
})

Page('/settings/', () => Page('/settings/projects/'))

Page('/settings/:subview/', data => {
	routerStore.set({
		view: 'settings',
		subview: data.params.subview
	})
})

Page()