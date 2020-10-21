<template>
	<div>
		<template v-if="mode == 'fract'">
			<FractProblem  :data="data" :rownum="rownum" :root="root" />
		</template>
		<template v-if="mode == 'linear'">
			<LinearEquationProblem :data="data" :rownum="rownum" :root="root" />
		</template>
		<template v-if="mode == 'expr'">
			<ExprProblem :data="data" :rownum="rownum" :root="root" />
		</template>
	</div>
</template>
<script>
import FractProblem from './FractProblem.vue';
import LinearEquationProblem from './LinearEquationProblem.vue';
import ExprProblem from './ExprProblem.vue';

export default
{
	props: ['data', 'root', 'rownum', 'mode'],
	components: {FractProblem, LinearEquationProblem, ExprProblem}
}
</script>
