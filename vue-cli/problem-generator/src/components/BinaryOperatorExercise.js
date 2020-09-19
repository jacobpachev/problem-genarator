import Exercise  from './Exercise.js';
export default {
	mixins: [Exercise],
	data() {
		return {
			answer_inputs: {}
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
		},
		fix_paramaters() {
			this.table_len = parseInt(this.table_len_input);
			this.reset_answers();
		},
		gen_row_key(i) {
			return "answer-row-" + i;
		}
	}
}
