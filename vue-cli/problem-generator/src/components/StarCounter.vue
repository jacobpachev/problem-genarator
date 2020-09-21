<template>
	<div class="star-counter">
		<svg class="star-counter-icon" width="37px" height="15px" viewBox="0 0 200 200">
			<polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:rgb(224,224,0);stroke-width:0;"/>
		</svg>
{{n_stars}}</div>
</template>
<script>
export default {
	props: ["root", "id"],
	methods: {},
	computed: {
		n_stars() {
			return this.root.n_stars;
		}
	}
}
</script>
