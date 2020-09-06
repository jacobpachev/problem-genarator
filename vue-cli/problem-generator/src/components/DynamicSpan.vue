<template>
<span :class="cl" :style="get_style()"><template v-if="text">{{text}}</template>
	<template v-if="div_cl"><div :class="div_cl"></div></template><slot></slot></span>
</template>

<script>
export default {
	props: ["root", "cl", "text", "div_cl", "vars"],
	name: 'DynamicSpan',
	computed: {
		v() {
			return this.vars;
		}
	},
	methods: {
		get_style() {
			return this.root.get_style(this.cl);
		}
	}
}
</script>
