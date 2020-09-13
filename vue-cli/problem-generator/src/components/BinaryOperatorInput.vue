<template>
	<input :class="get_cl()" :id="root.get_input_id(row,col)" type="number" v-model="user_answer" @input="check_answer" >
</template>
<script>
export default {
	name: 'BinaryOperatorInput',
	props: ["root", "row", "col", "data", "op"],
		data() {
		return {
			user_answer: ""
		}
	},
	mounted() {
		this.root.answer_inputs[this.$vnode.key] = this;
		if (this.row == 2 && this.col == 2)
		{
			let id = this.root.get_input_id(2,2);
			console.log("first id:", id);
			let el = document.getElementById(id);
			if (el)
				el.focus();
		}
	},
	methods: {
		get_cl() {
			console.log("Op, " + this.op);
			return "binary-operator-input" + (this.answer_is_correct() && !this.is_full_sq(this.user_answer) && this.user_answer != "" ? " mark-correct" : this.answer_is_correct() && this.is_full_sq(this.user_answer)  ? " mark-correct-sq" : "");
		},
		answer_is_correct() {
			return this.user_answer == this.data;
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
						col = 2;
						row++;
					}
					break;
				case "Diagonal":
					row++;
					col++;
					if (col > this.root.table_len || row > this.root.table_len)
					{
						let diag = row - col;
						diag = (diag >= 0) ? -diag-1 : -diag;
						if (diag < 0) {
							row = 2;
							col = row - diag;
						}
						else {
							col = 2;
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
				let el = this.get_next();
				if (el)
					el.focus();
			}

		}
	}
}
</script>
