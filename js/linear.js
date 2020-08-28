class Equation {
	constructor (a,b,c,d) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.x = new Fraction(0, this.a - this.c, this.d - this.b);
		this.x.normalize();
		console.log("Solution", this.x);
	}


};

if (typeof exports !== "undefined")
{
	exports.Equation = Equation;
}

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
    return rand;
}

function rand_equation (max_val)
{
	let a = range_rand(max_val);
	let b = range_rand(max_val);
	let c = range_rand(max_val);
	let d = range_rand(max_val);
	b = (b == d) ? b+1: b;
	a = (a==c) ? a+1: c;
	return new Equation(range_rand(max_val), b, range_rand(max_val), d);
}

function rand_sign()
{
	let rand = Math.random();
	return rand >= 0.5 ? '+' : '-';
}


Vue.component('equation', {
	props : ['data', 'root','prob'],
  template: '<div class="equation">{{data.a}} + <span class="b">{{data.b}}</span><span class="x_1">x</span><span class="eql">=</span><span class="c">{{data.c}}</span></span><span class="d"> + {{data.d}}</span><span class="x_2">x</span><div class="x_ans">x =</div></div>'
})

Vue.component('sign', {
	props: ['data'],

	template: '<div class="sign">{{data}}</div>'
});

Vue.component('problem', {
	props: ['data', 'root','rownum'],
	mounted() {
		if (this.rownum == 1)
			this.root.focus_on_row(1);
	},
	template: '<div class="problem_table">'  +
	'<equation :root="root" :data="data.eq" :prob="data" ></equation><answer-input :problem="data" :key="rownum"></answer-input><div class="checkmark" v-if="data.answer_is_correct()">' +
	'&#10003;</div></div>'
});

Vue.component('problem-parameters', {
	props: ['root'],
	template: `  <v-form><v-container><v-row><v-col
		cols="12"
		md="2"
        >
          <v-text-field
            v-model="root.n_problems"
            label="Number of problems"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="root.max_val"
            label="Maximum value"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
        </v-col>
        </v-col>
      </v-row>
      <v-row>
				<v-btn @click="root.generate()">Start</v-btn>
      </v-row>
    </v-container>
  </v-form>`
});
Vue.component('problem-list', {
	props: ['root','type'],
	template: `<v-container>
		<template v-for="i in root.problems.length">
				<div class="problem_container">
					<div class="problem_label">
					Problem {{i}}
					</div>
						<problem :data="root.problems[i-1]" :key="root.gen_key(i)" :root="root.get_root()" :rownum="i" ></problem>
				</div>
		</template>
		<div v-if="root.timer_run">
			<clock :time="root.work_time"></clock>
        </div>
		<div class="solve-time" v-if="root.pretty_solve_time">
			Solved in {{root.pretty_solve_time}} seconds.
		</div>
	</v-container>`,
	methods: {
		get_template: function() {

		}
	}
});
Vue.component('answer-input', {
	props: ['problem'],
	data: function() { return {
		whole: "",
		num: "",
		denom: "",
		fract: null
		}
	},
	mounted() {
	    this.num = this.denom = this.whole = "";
	    console.log("Mounted input", this);
	},
	methods: {
		handle_change: function() {
			let whole = this.whole;
			let num = this.num;
			let denom = this.denom;

			if (!whole){
			    whole = 0;
			}
			if (whole == "-"){
			    whole = 0;
			    num = -num;
			}
			if (!num && !denom){
			    num = 0
			    denom = 1
			}
			if (whole < 0){
			    num = - num;
			}
			this.fract = new Fraction(whole, num, denom);
			this.problem.update_user_answer(this.fract);
			console.log("entered fraction:", this.fract);
		},
		get_id(suffix) {
			return "answer-input-" + this.$vnode.key + "-" + suffix;
		}
	},
	template: `<div class="answer_container"><div><input class="whole" v-model="whole"` +  `:id="get_id('whole')" @input="handle_change()"></input></div>` +
		` <input class="numerator" v-model="num" :id="get_id('numerator')" @input="handle_change()"></input><div><hr class="fract_line_answer"></hr></span>` +
		`</div><div><input class="denominator" v-model="denom" :id="get_id('denominator')" @input="handle_change()"></input></div></div>`
});

function pad(num, size)
{
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

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
class Problem
{
	constructor (ctx)
	{
		this.eq = rand_equation(ctx.max_val);
		this.result = {};
		this.ctx = ctx;
		this.user_answer = null;
	}

	update_user_answer(answer)
	{
		this.user_answer = answer;
		this.ctx.check_answers();
	}
	answer_is_correct()
	{
		return this.user_answer && this.eq.x.obj_equals(this.user_answer);
	}
}

new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		n_problems: 5,
		max_val: 10,
		problems: [],
		results: [],
		start_time: null,
		solve_time: null,
		timer_run: null,
		work_time: 0,
		timer_id: 0,
		max_val_length: null,
		props_by_class: {}
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
			this.n_problems = parseInt(this.n_problems);
			let problems = [];
			let results = [];
			let seconds = 0;
			let minutes = 0;
			for (let i = 0; i < this.n_problems; i++)
			{
				problems[i] = new Problem(this);
				results[i] = false;
			}
			this.problems = problems;
			this.results = results;
			this.start_time = Date.now();
			this.solve_time = null;
			this.timer_run = true;
			this.work_time = 0;
			this.reset_timer();
			this.timer_id = setInterval(() => { this.work_time = Date.now() - this.start_time; }, 1000);
		},

		reset_timer: function () {
			if (this.timer_id)
			{
				clearInterval(this.timer_id);
				this.timer_id = 0;
			}
		},
		gen_key: function(pos) {
			return this.start_time.toString() + "-" + pos;
		},
		focus_on_row(row_num) {
			let el = this.gen_id("answer-input-" + row_num + "-whole");
			console.log("focus el:", el);
			if (!el)
				return;
			el.focus();
		},
		gen_id: function(id) {
			return(document.getElementById(id));
		},
		report_time: function () {
			this.solve_time = Date.now() - this.start_time;
		},
		check_answers: function () {
			let n_correct = 0;
			let row = 0;
			for (let i = 0; i < this.problems.length; i++)
			{
				this.results[i]  = this.problems[i].answer_is_correct();
				n_correct += this.results[i];
				row += this.results[i];
			}

			if (n_correct == this.problems.length)
			{
				this.report_time();
				this.reset_timer();
				this.timer_run = false;
			}
			console.log("Results", this.results[row])
			if (this.results[row-1] == true && this.results[row] == null)
				this.focus_on_row(row+1);
			console.log("Checking answers",this.results);
		},
		get_root() {
			return this;
		},
	}
})
