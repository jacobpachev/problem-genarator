<template>
<div class="checkmark" v-if="problem.answer_is_correct()">
&#10003;
</div>
</template>
<script>
export default {
	props: ["problem"]
}
</script>
