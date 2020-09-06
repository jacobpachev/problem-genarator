<template>
	<v-container>
		<ProblemParameters :root="root"/>
		<template v-for="i in root.problems.length">
			<div class="problem_container" :key="root.gen_key(i)" >
				<div class="problem_label">
					Problem {{i}}
				</div>
				<FractProblem :data="root.problems[i-1]" :rownum="i" :root="root.get_root()" />
			</div>
		</template>
		<Clock v-if="root.timer_on" :time="root.work_time" />
		<div class="solve-time" v-if="root.pretty_solve_time">
			Solved in {{root.pretty_solve_time}} seconds.
		</div>

	</v-container>
</template>

<script>
import ProblemParameters from './ProblemParameters.vue';
import Clock from './Clock.vue';
import FractProblem from './FractProblem.vue';
import FractExercise from './FractExercise.js';

export default {
	name: 'ExerciseView',
	mixins: [FractExercise],
	components: {ProblemParameters, Clock, FractProblem},
	computed: {
		root() {
			return this;
		}
	}
}

</script>
