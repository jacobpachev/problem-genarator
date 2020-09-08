<template>
<span class="x">{{display_x}}</span>
</template>
<script>
export default {
	props: ['k'],
	name: 'XTerm',
	computed: {
		display_x() {
			let sign = (this.k > 0) ? '+' : '';
			let k = (this.k != 1 && this.k != -1) ? this.k : "";
			if (this.k == -1)
				sign = "-";
			return sign + k.toString() + "x";
		}
	}
}
</script>
