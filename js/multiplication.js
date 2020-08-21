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
	props: ['root', 'data'],
	data() {
		return {
			user_answer: ""
		}
	},
	mounted() {
		this.root.answer_inputs[this.data] = this;
	},
	methods: {
		get_cl() {
			return "answer-input" + (this.answer_is_correct() ? " mark-correct" : "");
		},
		answer_is_correct() {
			return this.user_answer == this.data;
		},
		check_answer() {
			console.log("Checking answer:", this.user_answer);
			if (this.answer_is_correct())
				this.root.check_all();
		}
	},

	template: '<input :class="get_cl()" type="number" v-model="user_answer" @input="check_answer"></input>'
});

Vue.component('multiplication-table', {
	props: ['root'],
	methods: {
		gen_key(i,j) {
			return "answer-input-" + (i * j);
		},
		gen_row_key(i) {
			return "answer-row-" + i;
		}

	},
	template: `
	<v-container>
		<v-container>
		<v-row :key="gen_row_key(i)" v-for="i in root.table_len">
			<v-col :key="gen_key(i,j)" v-for="j in root.table_len">
				<span v-if="i == 1 || j == 1">{{i == 1 ? j : i}}</span>
				<answer-input :root="root" :key="gen_key(i,j)" v-else :data="i*j"></answer-input>
			</v-col>
		</v-row>
	</v-container>

	<clock :time="root.work_time"></clock>` +
	`
	<div class="solve-time">
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
		work_time: 0,
		timer_id: 0,
		generated: false,
		answer_inputs: {}
	},
	computed: {

		pretty_solve_time: function() {
			if (!this.solve_time)
				return null;
			return fmt_time(this.solve_time, true);
		}
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
		},
		reset_answers() {
			for (k in this.answer_inputs)
			{
				this.answer_inputs[k].user_answer = "";
			}

			this.answer_inputs = {};
		},
		check_all() {
			let all_correct = true;
			console.log("answer inputs:", this.answer_inputs);
			for (let k in this.answer_inputs)
			{
				all_correct = all_correct && this.answer_inputs[k].answer_is_correct();
			}

			if (all_correct)
				this.report_time();
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
