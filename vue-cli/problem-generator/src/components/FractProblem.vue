<template>
<div class="problem_table">
	<FractProblemStatement :root="root" :data="data" />
	<div class="eq">=</div>
	<AnswerInput :problem="data" :key="rownum" :root="root" />
	<CheckMark :problem="data" :root="root"/>
</div>
</template>
<script>
import CheckMark from './CheckMark.vue';
import Problem from './Problem.js';
import AnswerInput from './AnswerInput.vue';
import FractProblemStatement from './FractProblemStatement.vue';

export default {
	mixins: [Problem],
	name: 'FractProblem',
	components: {CheckMark, FractProblemStatement, AnswerInput},
}
</script>
