<template>
<div><span>{{rand_sign}}</span>{{display_term}}<sup>{{rand}}</sup></div>
</template>
<script>


export default {
	props: ['k','term', 'rand', 'showplus'],
	name: 'ExprTerm',
	computed: {
		display_term() {
			let k = (this.k != 1 && this.k != -1) ? this.k : "";
			let term = this.term;
			return " " + k.toString() + term.toString();
		},
		rand_sign() {
			return (Math.random() >= 0.5 && this.showplus) ? "+" : (Math.random() >= 0.5 && !this.showplus) ? "" : "-";
		}
	}
}
</script>
