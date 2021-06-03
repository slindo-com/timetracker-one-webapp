<script>
	import { onMount } from 'svelte'

	export let active = 'projects'

	onMount(() => {

	})

</script>

<nav>
	<a href="/settings/projects/" class="{active === 'projects' ? 'active' : ''}">
		Projects
	</a>
	<!--<a href="/settings/team/" class="{active === 'reports' ? 'active' : ''}">
		Team
	</a>-->
	<a href="/settings/account/" class="{active === 'account' ? 'active' : ''}">
		Account
	</a>
</nav>

<style>
	/* nav {
		margin: 24px auto;
		display: flex;
		justify-content: center;
		box-shadow: 0 -1px 0 0 #CCC inset;
		max-width: 1024px;
	}

	a {
		position: relative;
		line-height: 48px;
		color: #999;
		text-decoration: none;
		display: block;
		padding: 0 18px;
	}

	a:hover {
		color: #333;
	}

	a.active {
		box-shadow: 0 -1px 0 0 #FFF inset, 0 1px 0 0 #CCC inset, -1px 0 0 0 #CCC inset, 1px 0 0 0 #CCC inset;
		color: #333;
	}*/

nav {
	position: sticky;
	top:0;
	left:0;
	width:100%;
	height:16rem;
	z-index:800;
	background:var(--c-grey-92);
	/* background:linear-gradient( to bottom, #FFF, var(--c-grey-98)); */
	display:flex;
	justify-content: center;
	padding:8rem 0 0 0;
	margin:-8rem 0 0 0;
}

a {
	padding:0 2rem;
	margin:2rem 0 0 0;
	line-height: 6rem;
	font-size:13px;
	font-weight:600;
	text-decoration: none;
	border-radius: 1rem 1rem 0 0;
	color:var(--c-grey-50);
	outline:none;
}

a:hover {
	text-decoration:none;
	background:var(--c-grey-10);
	color:#FFF;
}

a.active {
	color:var(--c-grey-10);
	background:#FFF;
}

</style>