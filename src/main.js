import App from './App.svelte'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxODkyNjAzMiwiZXhwIjoxOTM0NTAyMDMyfQ.plgW-cHsCIxYu0ELKFH1QjPcDASn3ZSGBS7ThmXq74c'
const SUPABASE_URL = "https://ckegwgscrhxrpvyenqqo.supabase.co"

window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
})

export default app;