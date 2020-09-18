<template>
	<input  :class="get_cl()" :id="root.get_input_id(row,col)" type="number" v-model="user_answer" @input="check_answer" @focus="set_hint()" @focusout="clear_hint()">
</template>
<script>
export default {
	name: 'BinaryOperatorInput',
	props: ["root", "row", "col", "data", "op", "chart"],
		data() {
		return {
			user_answer: ""
		}
	},
	mounted() {
		this.root.answer_inputs[this.$vnode.key] = this;
		if (this.row == this.chart.range_start() && this.col == this.chart.range_start())
		{
			let id = this.root.get_input_id(this.chart.range_start(), this.chart.range_start());
			console.log("first id:", id);
			let el = document.getElementById(id);
			if (el)
				el.focus();
		}
	},
	methods: {
		set_hint() {
			if (!this.root.hint)
				return;
			this.root.hint.update(this.row, this.col);
		},
		clear_hint() {
			if (!this.root.hint)
				return;
			this.root.hint.update(null, null);
		},
		get_cl() {
			console.log("Op, " + this.op);
			return "binary-operator-input" + (this.answer_is_correct() && !this.is_full_sq(this.user_answer) && this.user_answer != "" ? " mark-correct" : this.answer_is_correct() && this.is_full_sq(this.user_answer)  ? " mark-correct-sq" : "");
		},
		answer_is_correct() {
			return typeof this.user_answer !== "undefined" && this.user_answer.length &&
				this.user_answer == this.data;
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
					if (col > this.root.table_len)
					{
						col = this.chart.range_start();
						row++;
					}
					console.log("row:", row, "col:", col);
					break;
				case "Diagonal":
					row++;
					col++;
					if (col > this.root.table_len || row > this.root.table_len)
					{
						let diag = row - col;
						diag = (diag >= 0) ? -diag-1 : -diag;
						if (diag < 0) {
							row = this.chart.range_start();
							col = row - diag;
						}
						else {
							col = this.chart.range_start();
							row = diag + col;
						}
					}
					break;
				case "Random":
					console.log("Random");
					break;
			}
			console.log("Order", this.root.order);
			return document.getElementById(this.root.get_input_id(row, col));
		},
		check_answer() {
			console.log("Checking answer:", this.user_answer);
			if (this.answer_is_correct())
			{
				this.root.check_all();
				if (this.root.hint)
				{
					this.root.hint.clear_animation();
					this.root.hint.animate_star();
				}
				let el = this.get_next();
				if (el)
					el.focus();
			}

		}
	}
}
</script>
