<template>
	<div>
		<template v-if="mode == 'fract'">
			<FractProblem  :data="data" :rownum="rownum" :root="root" />
		</template>
		<template v-if="mode == 'linear'">
			<LinearEquationProblem :data="data" :rownum="rownum" :root="root" />
		</template>
		<template v-if="mode=='binary_op'">
			<BinaryOperatorChart :root="root" ops="" />
		</template>
	</div>
</template>
<script>
import FractProblem from './FractProblem.vue';
import LinearEquationProblem from './LinearEquationProblem.vue';
import BinaryOperatorChart from './BinaryOperatorChart';

export default
{
	props: ['data', 'root', 'rownum', 'mode'],
	components: {FractProblem, LinearEquationProblem, BinaryOperatorChart}
}
</script>
