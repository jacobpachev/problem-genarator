const FRACT_INC_W = 5;
const FRACT_BASE_W = 5;
const FRACT_GAP = 0;
const FRACT_PAD = 15;

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
    return rand;
}

function rand_fraction (max_val)
{
	let denom = range_rand(max_val);
	if (denom < 2)
		denom = 2;
	return new Fraction(range_rand(max_val), range_rand(denom-1), denom);
}

function rand_sign()
{
	let rand = Math.random();
	return rand >= 0.5 ? '+' : '-';
}

function get_dynamic_style_attrs(cl)
{
	let q_cl = '"' + cl + '"';
	return "class=" + q_cl + " " + ":style='root.get_style(" + q_cl + ")'";
}

Vue.component('fract', {
	props : ['data', 'root'],
  template: '<div class="fraction"><span ' + get_dynamic_style_attrs('whole_part')
	+ '>{{data.whole}}</span><span ' + get_dynamic_style_attrs('numerator')
	+ ' >{{data.numer}}</span>'  +
	'<span ' + get_dynamic_style_attrs('fract_line') + '><hr></hr></span><span ' +
	get_dynamic_style_attrs('denominator') + '>{{data.den}}</span></div>'
})

Vue.component('sign', {
	props: ['data'],

	template: '<div class="sign">{{data}}</div>'
});

Vue.component('problem', {
	props: ['data', 'root'],
	template: '<div class="problem_table"><template v-for="i in data.fracts.length">' +
	'<div ' + get_dynamic_style_attrs('fract_w_sign') +
	'><sign v-if="i > 1 || data.signs[i-1] == \'-\'" ' +
	' :data="data.signs[i-1]"></sign><fract :root="root" :data="data.fracts[i-1]"></fract>' +
	'</div></template><div class="eq">=</div>' +
	'<answer-input :problem="data"></answer-input><div class="checkmark" v-if="data.answer_is_correct()">' +
	'&#10003;</div></div>'
});
Vue.component('problems', {
	
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
			<clock :time="root.work_time"></clock>
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
		num: "",
		denom: "",
		whole: "",
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
		this.fracts = [];
		this.signs = [];
		this.result = {};
		this.ctx = ctx;
		this.user_answer = null;
		for (let i = 0; i < ctx.n_terms; i++)
		{
			this.fracts[i] = rand_fraction(ctx.max_val);
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
		this.answer = new Fraction(0,0,1);
		for(let i = 0; i < this.fracts.length; i++)
		{
			if (this.signs[i] == "+")
				this.answer.add(this.fracts[i]);
			else
			{
				let tmp = this.fracts[i].clone();
				tmp.neg();
				this.answer.add(tmp);
			}
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
			this.fix_styles();
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
			this.work_time = 0;
			this.reset_timer();
			this.timer_id = setInterval(() => { this.work_time = Date.now() - this.start_time; }, 1000);
		},
		fract_width: function () {
			let max_val_length = this.max_val.toString().length;
			return max_val_length * FRACT_INC_W + FRACT_BASE_W;
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
			}

			console.log("Checking answers",this.results);
		},
		fix_styles_for_class(cl, props) {
			let style_map = {};

			for (let p in props)
			{
				style_map[p] = props[p] + "px";
			}

			this.props_by_class[cl] = style_map;
		},
		fix_styles: function() {
			let fract_w = this.fract_width();
			let props = { width: fract_w};
			let props_right = {...props, left: fract_w + FRACT_GAP};
			let props_fract_line = {...props, left: fract_w};
			this.fix_styles_for_class("whole_part", props);
			this.fix_styles_for_class("numerator", props_right);
			this.fix_styles_for_class("fract_line", props_fract_line);
			this.fix_styles_for_class("denominator", props_right);
			this.fix_styles_for_class("fract_w_sign", {width: fract_w * 2 + FRACT_GAP + FRACT_PAD});
		},
		get_root() {
			return this;
		},
		get_style(cl) {
			let props = this.props_by_class[cl];
			if (!props)
				return "";
			let style = Object.keys(props).map(k => k + ":" + props[k]).join(";");
			console.log("style:", style);
			return style;
		},
	}
})
