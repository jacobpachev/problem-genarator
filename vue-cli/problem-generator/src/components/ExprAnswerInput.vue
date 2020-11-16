<template>
<div>
	<input  placeholder="Enter answer here" v-model="answer"
		class="expr-answer-input" :id="parent.get_id()" @focus="handle_focus()"></input>
</div>
</template>
<script>
import BaseAnswerInput from './BaseAnswerInput.js';

export default {
	props: ["parent"],
	mixins: [BaseAnswerInput],
	methods: {
	},
	computed:
	{
		answer: {
			set(new_answer) {
				this.parent.answer = new_answer;
				this.parent.data.update_user_answer(new_answer);
				console.log(this.parent.data.result);
				this.parent.answer_is_correct = this.parent.data.answer_is_correct();
			},
			get() {
				return this.parent.answer;
			}
		}
	}
}
</script>
