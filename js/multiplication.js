function fmt_time(t, show_ms)
{
	let tmp = t;
	let ms = tmp % 1000;
	tmp -= ms;
	tmp /= 1000;
	let ss = tmp % 60;
	tmp -= ss;
	let mm = tmp / 60;
	let res = pad(mm, 2) + ":" + pad(ss, 2);

	if (show_ms)
		res += "." + pad(ms, 3);

	return res;
}
function pad(num, size)
{
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

Vue.component('answer-input', {
	props: ['root', 'data', 'row', 'col'],
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
			return "answer-input" + (this.answer_is_correct() ? " mark-correct" : "");
		},
		answer_is_correct() {
			return this.user_answer == this.data;
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
	},

	template: '<input :class="get_cl()" :id="root.get_input_id(row,col)" type="number" v-model="user_answer" @input="check_answer"></input>'
});

Vue.component('multiplication-table', {
	props: ['root'],
	methods: {
		gen_key(i,j) {
			return "answer-input-" + i.toString() + "-" +  j.toString() + "-" + this.root.n_runs;
		},
		gen_row_key(i) {
			return "answer-row-" + i;
		}

	},
	template: `
	<v-container>
		<table class = "multiplication-table">
		<tr :key="gen_row_key(i)" v-for="i in root.table_len">
			<td :key="'cell-' + gen_key(i,j)" v-for="j in root.table_len">
				<span v-if="i == 1 || j == 1">{{i == 1 ? j : i}}</span>
				<answer-input :row="i"
				  :col="j" :root="root" :key="gen_key(i,j)" v-else :data="i*j"></answer-input>
			</td>
		</tr>
	</table>
	<div v-if="root.timer_running">
	<clock :time="root.work_time"></clock>
	</div>
	<div class="solve-time" v-if="root.solve_time">
		Solved in {{root.pretty_solve_time}} seconds.
	</div>
	</v-container>`
});

Vue.component('clock', {
	props: ['time'],
	methods: {
		display_time: function() {
			if (!this.time)
				return "00:00";
			return fmt_time(this.time, false);
		}
	},
	template: '<p>{{display_time()}}</p>'
});
new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		table_len: 12,
		table_len_input: "12",
		start_time: null,
		solve_time: null,
		timer_running: null,
		work_time: 0,
		timer_id: 0,
		generated: false,
		answer_inputs: {},
		n_runs: 0,
		order_items: ["Row", "Diagonal"],
		order: "Row"
	},
	computed: {
		pretty_solve_time: function() {
			if (!this.solve_time)
				return null;
			return fmt_time(this.solve_time, true);
		}
	},
	mounted() {
	},
	methods: {
		generate: function () {
			let seconds = 0;
			let minutes = 0;
			this.table_len = parseInt(this.table_len_input);
			this.start_time = Date.now();
			this.solve_time = null;
			this.work_time = 0;
			this.reset_timer();
			this.timer_id = setInterval(() => { this.work_time = Date.now() - this.start_time; }, 1000);
			this.generated = true;
			this.reset_answers();
			this.timer_running = true;
			this.n_runs++;
		},
		reset_answers() {
			this.answer_inputs = {};
		},
		get_input_id(row, col) {
			return "answer-input-" + row.toString() + "-" + col.toString();
		},
		check_all() {
			let all_correct = true;
			console.log("answer inputs:", this.answer_inputs);
			for (let k in this.answer_inputs)
			{
				all_correct = all_correct && this.answer_inputs[k].answer_is_correct();
			}

			if (all_correct)
			{
				this.reset_timer();
				this.timer_running = false;
				this.report_time();
			}
		},
		report_time: function () {
			this.solve_time = Date.now() - this.start_time;
		},
		reset_timer: function () {
			if (this.timer_id)
			{
				clearInterval(this.timer_id);
				this.timer_id = 0;
			}
		},
		get_root() {
			return this;
		}
	}
});
