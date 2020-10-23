<template>
<div class="expr"><ExprTerm class="num-a" :showplus="false" :k="expr.a" term="a" :rand="range_rand(root.max_val)" /> <ExprTerm class="num-b"         :k="expr.b" :showplus="true" term="b" :rand="range_rand(root.max_val)" /> <hr class="expr-line"/><ExprTerm class="denom-a"  :showplus="false" :k="expr.c" term="a" :rand="range_rand(root.max_val)"/>  <ExprTerm class="denom-b" :showplus="true" :k="expr.d" term="b" :rand="range_rand(root.max_val)" /> <span class="expr-eq">=</span></div>
</template>
<script>

import ExprTerm from './ExprTerm.vue';

export default {
	name : 'Expr',
	props: ['root', 'expr'],
	components: {ExprTerm},
	methods: {
		range_rand(range) {
			return Math.floor(Math.random() * range) + 2;
		}
	}
	
}
</script>
