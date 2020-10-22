<template>
<span>{{display_term}}<sup>{{rand}}</sup></span>
</template>
<script>


export default {
	props: ['k','term', 'rand'],
	name: 'ExprTerm',
	computed: {
		display_term() {
			let sign = (this.k > 0) ? '+' : '';
			let k = this.k
			let term = this.term
			if (this.k == -1)
				sign = "-";
			return sign + " " + k.toString() + term.toString();
		}
	}
}
</script>
