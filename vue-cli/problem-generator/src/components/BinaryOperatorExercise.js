import Exercise  from './Exercise.js';
export default {
	mixins: [Exercise],
	data() {
		return {
			answer_inputs: {},
			n_stars: 0
		}
	},
	methods: {
		get_input_id(row, col) {
			return "answer-input-" + row.toString() + "-" + col.toString();
		},
		check_all() {
			let all_correct = true;
			for (let k in this.answer_inputs)
			{
				all_correct = all_correct && this.answer_inputs[k].answer_is_correct();
			}

			if (all_correct)
			{
				this.reset_timer();
				this.timer_running = false;
				this.report_time();
			}
		},
		reset_answers() {
			this.answer_inputs = {};
			this.n_stars = 0;
		},
		fix_paramaters() {
			this.table_len = parseInt(this.table_len_input);
			this.reset_answers();
		},
		gen_row_key(i) {
			return "answer-row-" + i;
		},
		reset_on_generate() {
			if (this.root.hint)
				this.root.hint.stop();
		},
		n_stars_inc() {
			switch(this.root.mode)
			{
				default:
					return 1;
				case 'linear':
					return 3;
				case 'fract':
					return 5;
			}
		},
		animate_star() {
			this.n_stars += this.n_stars_inc();
			if (this.star)
			{
				this.star.animate();
				return;
			}
			console.log("Animating star");
			this.animate_star_on_mount = true;
		},
		stop_star() {
			this.animate_on_mount = false;
			if (this.star)
				this.star.stop();
		}
	}
}
