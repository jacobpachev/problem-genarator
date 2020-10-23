<template>
	<div class="problem_table">
		<div class="expression-wrap">
			<Expr :root="root" :expr="data.expr" />
		</div>
		<ExprAnswerInput :problem="data" :key="rownum" :root="root" />
		<CheckMark :problem="data" />
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
	components: {Expr, CheckMark, ExprAnswerInput}
}
</script>
