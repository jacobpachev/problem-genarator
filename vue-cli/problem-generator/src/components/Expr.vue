<template>
<div>
 <vue-mathjax :formula="'$$' + expr.tex + '$$'"></vue-mathjax>
</div>
</template>
<script>
import {VueMathjax} from "vue-mathjax";

export default {
	name : 'Expr',
	components: {"vue-mathjax": VueMathjax},
	props: ['root', 'expr'],
	mounted() {
	},
	methods: {
	}

}
</script>
