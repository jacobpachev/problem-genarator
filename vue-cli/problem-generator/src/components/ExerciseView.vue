
<template>
	<v-app>
		<v-container absolute>
			<div class='mode-selection'>
				<v-select  v-model="mode" label="Select exercise type" :items="mode_items" item-text="title" item-value="value"></v-select>
				<ProblemParameters :mode="mode" :root="root"/>
			</div>
			<div>
				<template v-if="has_stars">
					<Hint animateid="hint-id" :root="root" :op="binary_op" :problem="get_cur_problem()" :top="0" :left="20" />
					<StarCounter :root="root" />
				</template>
				<BinaryOperatorChart v-if="is_binary_op_exercise" :op="binary_op" :root="root" />
				<template v-else v-for="i in root.problems.length">
					<div class="problem_container" :key="root.gen_key(i)" >
						<div class="problem_label">
							Problem {{i}}
						</div>
						<ExerciseProblem :key="get_problem_key(i)" :mode="mode" :data="root.problems[i-1]" :rownum="i" :root="root.get_root()" />
					</div>
				</template>
				<Clock class='clock' v-if="root.timer_on" :time="root.work_time" />
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
import Hint from './Hint.vue';
import StarCounter from './StarCounter.vue';

export default {
	name: 'ExerciseView',
	mixins: [FractExercise, LinearEquationExercise, BinaryOperatorExercise],
	components: {ProblemParameters, Clock, ExerciseProblem, BinaryOperatorChart, Hint, StarCounter},
	data() {
		return {
			modes: {
				"linear" : {title: "Linear Equations", component: LinearEquationExercise},
				"fract" : {title: "Imporper Fractions", component: FractExercise},
				"multi" : {title: "Multiplication", component: BinaryOperatorExercise, op: "*"},
				"add" : {title: "Addition", component: BinaryOperatorExercise, op: "+"},
				"sub" : {title: "Subtraction", component: BinaryOperatorExercise, op: "-"},
				"pow" : {title: "Powers", component: BinaryOperatorExercise, op: "**"},
				"sum_sq" : {title: "Sum of Squares", component: BinaryOperatorExercise, op: "sum_sq"},
				"table_sq" : {title: "Table of Squares", component: BinaryOperatorExercise, op: "table_sq"},
			}
		};
	},
	methods: {
		get_problem_key(i) {
			return 'problem-' + this.mode + '-' + i;
		},
		get_cur_problem() {
			if (!this.cur_row)
				return null;

			return this.problems[this.cur_row - 1];
		}
	},
	computed: {
		root() {
			return this;
		},
		has_stars() {
			if (this.is_binary_op_exercise)
				return true;

			switch (this.mode)
			{
				case "fract":
				case "linear":
					return true;
				default:
					return false;
			}
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
