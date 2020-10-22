<template>
	<div class="problem_table">
		<div class="expression-wrap">
			<Expr :root="root" :expr="data.expr" />
		</div>
		<AnswerInput :problem="data" :key="rownum" :root="root" />
		<CheckMark :problem="data" />
	</div>
</template>
<script>
import Expr from './Expr.vue';
import AnswerInput from './AnswerInput.vue';
import CheckMark from './CheckMark.vue';
import Problem from './Problem';

export default {
	mixins: [Problem],
	name: 'ExprProblem',
	components: {Expr, CheckMark, AnswerInput}
}
</script>
