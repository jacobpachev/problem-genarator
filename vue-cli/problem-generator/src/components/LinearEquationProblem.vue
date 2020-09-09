<template>
	<div class="problem_table">
		<LinearEquation :root="root" :eq="data.eq" />
		<span class="x_ans" >x =</span>
		<AnswerInput :problem="data" :key="rownum" />
		<CheckMark :problem="data" />
	</div>
</template>
<script>
import LinearEquation from './LinearEquation.vue';
import AnswerInput from './AnswerInput.vue';
import CheckMark from './CheckMark.vue';
import Problem from './Problem';

export default {
	mixins: [Problem],
	name: 'LinearEquationProblem',
	components: {LinearEquation, CheckMark, AnswerInput}
}
</script>
