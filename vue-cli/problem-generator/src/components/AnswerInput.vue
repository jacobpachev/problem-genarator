<template>
	<div class="answer_container"><div><input class="whole" v-model="whole"
			:id="get_id('whole')" @input="handle_change()"/></div>
		<input class="numerator" v-model="num" :id="get_id('numerator')" @input="handle_change()"/><div><hr class="fract_line_answer"/>
		</div><div><input class="denominator"
			:id="get_id('denominator')" v-model="denom" @input="handle_change()" />
			</div>
	</div>
</template>
<script>
import { Fraction } from '../lib/fract';

export default {
	props: ['problem'],
	data: function() { return {
		num: "",
		denom: "",
		whole: "",
		fract: null
		}
	},
	mounted() {
		this.num = this.denom = this.whole = "";
		console.log("Mounted input", this);
		console.log("problem:", this.problem);
	},
	methods: {
		handle_change() {
			let whole = this.whole;
			let num = this.num;
			let denom = this.denom;

			if (!whole) {
				whole = 0;
			}

			if (whole == "-") {
				whole = 0;
				num = -num;
			}

			if (!num && !denom) {
				num = 0;
				denom = 1;
			}

			if (whole < 0) {
				num = - num;
			}

			this.fract = new Fraction(whole, num, denom);
			this.problem.update_user_answer(this.fract);
			console.log("entered fraction:", this.fract);
		},
		get_id(suffix) {
			console.log("vnode:", this.$vnode);
			return "answer-input-" + this.$vnode.key + "-" + suffix;
		}
	}
}
</script>
