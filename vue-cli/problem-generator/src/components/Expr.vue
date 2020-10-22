<template>
<div class="expr"><ExprTerm class="num-a" :k="expr.a" term="a" :rand="range_rand(root.max_val)" /> <ExprTerm class="num-b" :k="expr.b" term="b" :rand="range_rand(root.max_val)" /> <hr class="expr-line"/><ExprTerm class="denom-a" :k="expr.c" term="a" :rand="range_rand(root.max_val)"/>  <ExprTerm class="denom-b" :k="expr.d" term="b" :rand="range_rand(root.max_val)" /> </div>
</template>
<script>

import ExprTerm from './ExprTerm.vue';
import {range_rand} from '../lib/util';

export default {
	name : 'Expr',
	props: ['root', 'expr'],
	components: {ExprTerm},
	methods: {
		range_rand(range) {
			return Math.floor(Math.random() * range) + 1;
		}
	}
	
}
</script>
