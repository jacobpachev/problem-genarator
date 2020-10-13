<template>
	<input  :class="get_cl()" :id="root.get_input_id(row,col)" type="input_type" v-model="user_answer"
	@input="handle_input" @focus="set_hint()" @focusout="clear_hint()" inputmode="decimal" />
</template>
<script>

import {SQRT_KEY, SQRT_SYM, Expr} from '../lib/expr.js';

const FLOAT_INF = 1e10;

export default {
	name: 'BinaryOperatorInput',
	props: ["root", "row", "col", "data", "op", "chart", "a", "b"],
		data() {
		return {
			user_answer: ""
		}
	},
	mounted() {
		this.root.answer_inputs[this.$vnode.key] = this;
		if (this.row == this.chart.range_start() && this.col == this.chart.range_start())
		{
			let id = this.root.get_input_id(0, 0);
			let el = document.getElementById(id);
			if (el)
				el.focus();
		}
	},
	computed: {
		input_type() {
			switch (this.op)
			{
				case "trig": return "text";
				default: return "number";
			}
		},
		table_end() {
			return this.root.table_len - this.chart.range_start()
		}
	},
	methods: {
		set_hint() {
			if (!this.root.hint)
				return;
			this.root.hint.update(this.a, this.b);
		},
		clear_hint() {
			if (!this.root.hint)
				return;
			this.root.hint.update(null, null);
		},
		get_cl() {
			return "binary-operator-input" + (this.answer_is_correct() && !this.is_full_sq(this.user_answer) && this.user_answer !== "" ? " mark-correct" : this.answer_is_correct() && this.is_full_sq(this.user_answer)  ? " mark-correct-sq" : "");
		},
		answer_is_correct() {
			if (typeof this.user_answer === "undefined" || !this.user_answer.length)
				return false;

			console.log("user answer", this.user_answer, "real answer", this.data, "eps", this.root.float_eps);
			if (this.op != "trig")
				return this.user_answer == this.data;

			if (this.user_answer.toLowerCase().startsWith("inf") && (this.data == Infinity ||
						Math.abs(this.data) > FLOAT_INF))
				return true;

			let val = null;
			try
			{
				console.log("Checking ", this.user_answer);
				let expr = new Expr(this.user_answer);
				val = expr.eval();
			}
			catch (e)
			{
				return false;
			}

			let res = Math.abs(val - this.data) <= this.root.float_eps;
			console.log("check answer res", res);
			return res;
		},
		is_full_sq(n) {
			return Math.sqrt(n) % 1 === 0
		},
		get_next() {
			let row = this.row;
			let col = this.col;
			switch (this.root.order) {
				case "Row":
					col++;
					if (col > this.table_end)
					{
						col = 0;
						row++;
					}
					break;
				case "Diagonal":
					row++;
					col++;
					if (col > this.table_end || row > this.table_end)
					{
						let diag = row - col;
						diag = (diag >= 0) ? -diag-1 : -diag;
						if (diag < 0) {
							row = 0;
							col = row - diag;
						}
						else {
							col = 0;
							row = diag + col;
						}
					}
					break;
				case "Random":
					console.log("Random");
					break;
			}
			return document.getElementById(this.root.get_input_id(row, col));
		},
		handle_input(e) {
			switch (e.data)
			{
				case SQRT_KEY:
					this.user_answer = this.user_answer.replace(SQRT_KEY, SQRT_SYM);
					break;
			}

			this.check_answer();
		},
		check_answer() {
			if (this.answer_is_correct())
			{
				this.root.check_all();
				if (this.root.hint)
				{
					this.root.hint.handle_success();
				}
				let el = this.get_next();
				if (el)
					el.focus();
			}

		}
	}
}
</script>
