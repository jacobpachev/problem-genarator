<template>
<div class="problem_table">
	<template v-for="i in data.fracts.length">
		<DynamicSpan cl="fract_w_sign" :key="get_key(i)" :root="root" :vars="{i,data}">
			<Fract :root="root" :data="data.fracts[i-1]"
				:showsign="i > 1 || data.signs[i-1] == '-'" :sign="data.signs[i-1]"/>
		</DynamicSpan>
	</template>
	<div class="eq">=</div>
	<AnswerInput :problem="data" :key="rownum" :root="root" />
	<CheckMark :problem="data" />
</div>
</template>
<script>
import CheckMark from './CheckMark.vue';
import Problem from './Problem.js';
import DynamicSpan from './DynamicSpan.vue';
import AnswerInput from './AnswerInput.vue';
import Fract from './Fract.vue';

export default {
	mixins: [Problem],
	name: 'FractProblem',
	components: {CheckMark, DynamicSpan, AnswerInput, Fract},
}
</script>
