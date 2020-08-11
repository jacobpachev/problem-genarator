

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
    return rand;
}

function rand_fraction (max_val) {
	let denom = range_rand(max_val);
	if (denom < 2) 
		denom = 2;
	return new Fraction(range_rand(max_val), range_rand(denom-1), denom);
}
function rand_sign() {
    let rand = Math.random();
		return rand >= 0.5 ? '+' : '-';
}
Vue.component('fract', {
	props : ['data'],

  template: '<div class="fract"><span class="whole">{{data.whole}}</span><span class="numerator">{{data.numer}}</span>'  +
	'<span class="fract_line"><hr ></hr></span><span class="denominator">{{data.den}}</span></div>'
})

Vue.component('sign', {
	props: ['data'],
	
	template: '<div class="sign">{{data}}</div>'
});

Vue.component('problem', {
	props: ['data'],
	data: function() { return {
		correct: false
	}
	},
	template: '<div class="problem_table"><template v-for="i in data.fracts.length"><div class="fract_w_sign"><sign :data="data.signs[i-1]"></sign><fract :data="data.fracts[i-1]"></fract></div></template><div class="eq">=</div>' +
	'<answer-input :problem="data"></answer-input><div class="checkmark"><span v-if="correct">&#10003;</span></div></div>'
});

Vue.component('answer-input', {
	props: ['problem'],
	data: function() { return {
		num: null,
		denom: null,
		whole: null,
		fract: null
		}
	},
	methods: {
		handle_change: function() {
			this.fract = new Fraction(this.whole, this.whole < 0 ? -this.num: this.num, this.denom);
			this.problem.update_user_answer(this.fract);
			console.log("entered fraction:", this.fract);
		}
	},
	template: '<div class="answer_container"><div><input class="whole" v-model="whole" @change="handle_change()"></input></div>' +
		'<input class="numerator" v-model="num" @change="handle_change()"></input><div><hr class="fract_line_answer"></hr></span>' +
		'</div><div><input class="denominator" v-model="denom" @change="handle_change()"></input></div></div>'
});

class Problem
{
	constructor (ctx)
	{
		this.fracts = [];
		this.signs = [];
		this.result = {};
		this.whole = parseInt(this.whole);
		this.num = parseInt(this.num);
		this.denom = parseInt(this.denom);
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
		console.log("Answer",this.answer);
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
		valid: false,
		n_problems: 10,
		n_terms: 3,
		max_val: 10,
		problems: [],
		results: []
    },
	methods: {
		generate: function () {
			const time = Date.now();
			this.n_problems = parseInt(this.n_problems);
			let problems = [];
			let results = [];
			for (let i = 0; i < this.n_problems; i++)
			{
				problems[i] = new Problem(this);
				results[i] = false;
			}

			this.problems = problems;
			this.results = results;
		},
		check_answers: function () {
			for (let i = 0; i < this.problems.length; i++)
			{
				this.results[i]  = this.problems[i].answer_is_correct();
				if (this.results[i]) 
				{
					
				}
			}
		console.log("Checking answers",this.results);
		}
	}
})

