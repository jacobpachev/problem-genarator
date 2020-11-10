<template>
<div>
	<input v-model="answer"></input>
</div>
</template>
<script>
export default {
	props: ["parent"],
	computed:
	{
		answer: {
			set(new_answer) {
				this.parent.answer = new_answer;
				this.parent.data.user_answer = new_answer;
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
