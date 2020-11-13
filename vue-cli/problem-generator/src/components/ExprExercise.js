import Exercise  from './Exercise.js';

export default {
	mixins: [Exercise],
	properties: ["type"],
	methods: {
		get_focus_on_row_id(row_num) {
			console.log("focus on row:", row_num);
			return "expr-answer-" + row_num;
		}
	}
}
