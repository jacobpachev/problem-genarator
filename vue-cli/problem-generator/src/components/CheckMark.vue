<template>
<div class="checkmark" v-if="answer_is_correct">
&#10003;
</div>
</template>
<script>
export default {
	props: ["problem","root"],
	computed: {
		answer_is_correct() {
			let res = this.problem.answer_is_correct();
			return(res);
		}
	}
}
</script>
