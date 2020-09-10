<template>
	<v-app>
		<v-container absolute>
			<v-card>
				<v-select v-model="mode" :items="mode_items" item-text="title" item-value="value"></v-select>
			</v-card>
			<div>
				<ProblemParameters :mode="mode" :root="root"/>
				<BinaryOperatorChart v-if="is_binary_op_exercise" :op="binary_op" :root="root" />
				<template v-else v-for="i in root.problems.length">
					<div class="problem_container" :key="root.gen_key(i)" >
						<div class="problem_label">
							Problem {{i}}
						</div>
						<ExerciseProblem :key="get_problem_key(i)" :mode="mode" :data="root.problems[i-1]" :rownum="i" :root="root.get_root()" />
					</div>
				</template>
				<Clock v-if="root.timer_on" :time="root.work_time" />
				<div class="solve-time" v-if="root.pretty_solve_time">
					Solved in {{root.pretty_solve_time}} seconds.
				</div>
			</div>
		</v-container>
	</v-app>
</template>

<script>
import ProblemParameters from './ProblemParameters.vue';
import Clock from './Clock.vue';
import FractExercise from './FractExercise.js';
import LinearEquationExercise from './LinearEquationExercise.js';
import BinaryOperatorExercise from './BinaryOperatorExercise.js';
import ExerciseProblem from './ExerciseProblem.vue';
import BinaryOperatorChart from './BinaryOperatorChart.vue';

export default {
	name: 'ExerciseView',
	mixins: [FractExercise, LinearEquationExercise, BinaryOperatorExercise],
	components: {ProblemParameters, Clock, ExerciseProblem, BinaryOperatorChart},
	data() {
		return {
			modes: {
				"fract" : {title: "Imporper Fractions", component: FractExercise},
				"linear" : {title: "Linear Equations", component: LinearEquationExercise},
				"multi" : {title: "Multiplication", component: BinaryOperatorExercise, op: "*"}
			}
		};
	},
	methods: {
		get_problem_key(i) {
			return 'problem-' + this.mode + '-' + i;
		}
	},
	computed: {
		root() {
			return this;
		},
		mode_items() {
			return Object.keys(this.modes).map(k => {return {title: this.modes[k].title, value: k}});
		},
		is_binary_op_exercise() {
			return(this.modes[this.mode].component == BinaryOperatorExercise);
		},
		binary_op() {
			return(this.modes[this.mode].op);
		}
	}
}

</script>
