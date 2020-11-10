<template>
	<div>
		<template v-if="mode == 'fract'">
			<FractProblem  :data="data" :rownum="rownum" :root="root" />
		</template>
		<template v-if="mode == 'linear'">
			<LinearEquationProblem :data="data" :rownum="rownum" :root="root" />
		</template>
		<template v-if="mode == 'power_ratio_expr'">
			<ExprProblem :data="data" :rownum="rownum" :root="root" :mode="mode" />
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
	components: {FractProblem, LinearEquationProblem, ExprProblem},
	methods: {
		is_expr() {
			return this.mode.endsWith("_expr");
		}
	}
}
</script>
