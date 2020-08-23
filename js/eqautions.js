class Equation {
	constructor (a,b,c,d) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
	}
	equals(a,b,c,d) {
		return this.a == a && this.b == b && this.c == c && this.d == d;
	}
	obj_equals(other)
    {
        return this.equals(other.a,other.b,other.c,other.d);
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
	let b = range_rand(max_val);
	let d = range_rand(max_val);
	b = (b == d) ? b+1: b;
	return new Equation(range_rand(max_val), b, range_rand(max_val), d);
}

function rand_sign()
{
	let rand = Math.random();
	return rand >= 0.5 ? '+' : '-';
}


Vue.component('equation', {
	props : ['data', 'root','prob'],
  template: '<div class="equation">{{data.a}}<span class="sign_1"><sign :data="prob.signs[0]"></sign></span><span class="b">{{data.b}}</span><span class="x_1">x</span><span class="eql">=</span><span class="c">{{data.c}}</span><span class="sign_2"><sign :data="prob.signs[0]"></sign></span><span class="d">{{data.d}}</span><span class="x_2">x</span><span class="x_ans">x =</span></div>'
})

Vue.component('sign', {
	props: ['data'],

	template: '<div class="sign">{{data}}</div>'
});

Vue.component('problem', {
	props: ['data', 'root'],
	template: '<div class="problem_table"><template v-for="i in data.eqs.length">'  +
	'<equation :root="root" :data="data.eqs[i]" :prob="data" ></equation></template><answer-input :problem="data"></answer-input><div class="checkmark" v-if="data.answer_is_correct()">' +
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
          <v-text-field
            v-model="root.n_terms"
            label="Number of terms"
            type="number"
            required
          ></v-text-field>
        </v-col>
        </v-col>
      </v-row>
      <v-row>
				<v-btn @click="root.generate()">Generate</v-btn>
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
						<problem :data="root.problems[i-1]" :key="root.gen_key(i)" :root="root.get_root()"></problem>
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
			this.eq = new Equation(a,b,c,d);
			this.problem.update_user_answer(this.eq);
			console.log("entered Equation:", this.eq);
		}
	},
	template: '<div class="answer_container"><div><input class="whole" v-model="whole" @change="handle_change()"></input></div>' +
		'<input class="numerator" v-model="num" @change="handle_change()"></input><div><hr class="fract_line_answer"></hr></span>' +
		'</div><div><input class="denominator" v-model="denom" @change="handle_change()"></input></div></div>'
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
		this.eqs = [];
		this.signs = [];
		this.result = {};
		this.ctx = ctx;
		this.user_answer = null;
		for (let i = 0; i < ctx.n_terms; i++)
		{
			this.eqs[i] = rand_equation(ctx.max_val);
			this.signs[i] = rand_sign();
		}
		this.compute_answer();
	}
	update_user_answer(answer)
	{
		this.user_answer = answer;
		this.ctx.check_answers();
	}
	compute_answer()
	{
		for(let i = 0; i < this.eqs.length; i++)
		{
			console.log("Answer",this.user_answer)
		}
	}
	answer_is_correct()
	{
		return this.user_answer && this.answer.obj_equals(this.user_answer);
	}
}

new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		n_problems: 3,
		n_terms: 2,
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
		report_time: function () {
			this.solve_time = Date.now() - this.start_time;
		},
		check_answers: function () {
			let n_correct = 0;
			for (let i = 0; i < this.problems.length; i++)
			{
				this.results[i]  = this.problems[i].answer_is_correct();
				n_correct += this.results[i];
			}
			
			if (n_correct == this.problems.length)
			{
				this.report_time();
				this.reset_timer();
                this.timer_run = false;
			}

			console.log("Checking answers",this.results);
		},
		get_root() {
			return this;
		},
	}
})
