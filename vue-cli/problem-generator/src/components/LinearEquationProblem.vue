<template>
	<div class="problem_table">
		<LinearEquation :root="root" :eq="data.eq" />
		<div class="x_ans">x =</div>
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
