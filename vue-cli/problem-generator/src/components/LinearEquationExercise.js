import Exercise  from './Exercise.js';

export default {
	mixins: [Exercise],
	methods: {
		get_focus_on_row_id(row_num) {
			return "answer-input-" + row_num + "-whole";
		}
	}
}

