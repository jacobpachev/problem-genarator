<template>
	<div class="problem_table">
        <ExprAnswerInput :problem="data" :key="rownum" :root="root" :parent="self" />
		<div class="expression-wrap">
			<Expr :root="root" :expr="data.expr" :parent="self" />
		</div>
		<CheckMark class="expr-checkmark" :problem="data"/>
	</div>
</template>
<script>
import Expr from './Expr.vue';
import ExprAnswerInput from './ExprAnswerInput.vue';
import CheckMark from './CheckMark.vue';
import Problem from './Problem';

export default {
	mixins: [Problem],
	name: 'ExprProblem',
	components: {Expr, CheckMark, ExprAnswerInput},
	data() {
		return {
			answer: ""
		}
	},
	computed: {
		self() {
			return this;
		},
	},
	methods: {
	}

}
</script>
