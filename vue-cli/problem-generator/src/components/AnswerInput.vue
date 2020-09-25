<template>
	<div class="answer_container"><div><input class="whole" v-model="whole"
			:id="get_id('whole')" @input="handle_change()" @focus="handle_focus()"/></div>
		<input class="numerator" v-model="num" :id="get_id('numerator')"
			@input="handle_change()" @focus="handle_focus()"/><div><hr class="fract_line_answer"/>
		</div><div><input class="denominator"
			:id="get_id('denominator')" v-model="denom" @input="handle_change()" @focus="handle_focus()"/>
			</div>
	</div>
</template>
<script>
import { Fraction } from '../lib/fract';

export default {
	props: ['problem', 'root'],
	data: function() { return {
			num: "",
			denom: "",
			whole: "",
			fract: null,
			anim_problem: null
		}
	},
	mounted() {
		this.num = this.denom = this.whole = "";
	},
	watch: {
		problem(new_val, old_val) {
			console.log("problem changed from ", old_val, " to ", new_val);
			this.anim_problem = old_val;
		}
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
		},
		get_hint() {
			if (!this.root || !this.root.hint)
				return null;

			return this.root.hint;
		},
		handle_focus() {
			if (this.problem && this.problem === this.anim_problem)
				return;

			let hint = this.get_hint();
			console.log("answer input focus hint", hint);
			if (!hint)
				return;

			hint.stop();
			hint.animate();
			this.anim_problem = this.problem;
		},
		handle_focus_out() {
			let hint = this.get_hint();
			if (!hint)
				return;
		},
		get_id(suffix) {
			return "answer-input-" + this.$vnode.key + "-" + suffix;
		}
	}
}
</script>
