<template>
<div>
	<div class="expr-challenge">
		<vue-mathjax :formula=" '$$' + expr.tex + '=$$'"></vue-mathjax>
	</div>
	<div class="expr-answer">
		<vue-mathjax :formula="'$$' + to_tex(answer) + '$$'"></vue-mathjax>
	</div>
</div>
</template>
<script>
import {VueMathjax} from "vue-mathjax";
import {parse} from "mathjs";

export default {
	name : 'Expr',
	components: {"vue-mathjax": VueMathjax},
	props: ['root', 'expr', 'parent'],
	computed: {
		answer() {
			return this.parent.answer;
		}
	},
	mounted() {
	},
	methods: {
		to_tex(expr_str) {
			try {
				return expr_str ? parse(expr_str).toTex() : "";
			}
			catch (e) {
				return "";
			}
		}
	}

}
</script>
