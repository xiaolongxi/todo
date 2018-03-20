<template>
	<header class="main-header">
		<h1>{{msg}}</h1>
	</header>
</template>
<script>
	export default {
		data () {
			return {
				msg: 'Jtodo'
			}
		}
	}
</script>
<style>
	.main-header{
		font-size: 20px;
		color: #f0f;
		text-align: center;
	}
</style>