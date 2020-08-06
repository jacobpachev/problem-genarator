

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
    return rand;
}

function rand_fraction (max_val) {
	return new Fraction(range_rand(max_val),range_rand(max_val),range_rand(max_val));
}
function rand_sign() {
    let rand = Math.random();
		return rand >= 0.5 ? '+' : '-';
}
Vue.component('fract', {
  props : ['data'],

  template: '<div><span class="whole">{{data.whole}}</span><span class="numerator">{{data.numer}}</span><span><hr class="fract_line"></hr></span><span class="denominator">{{data.den}}</span></div>'
})

Vue.component('sign', {
	props: ['data'],
	template: '<span class="signs">{{data}}</span>'
});

Vue.component('problem', {
	props: ['data'],
	template: '<div class="problem_table"><table><tr><template v-for="i in data.fracts.length"><td><sign :data="data.signs[i-2]"></sign><fract :data="data.fracts[i-1]"></fract></td><td></fract></td></template><td>=</td><td>' +
	'<answer-input></answer-input></td></tr></table></div>'
});

Vue.component('answer-input', {
	data: function() { return {
			num: null,
			denom: null,
			whole: null,
			fract: null
		}
	},
	methods: {
		handle_change: function() {
			this.fract = new Fraction(this.whole, this.num, this.denom);
			console.log("entered fraction:", this.fract);
		}
	},
	template: '<div><div><input class="whole" v-model="whole" @change="handle_change()"></input></div>' +
		'<input class="numerator" v-model="num" @change="handle_change()"></input><div><hr class="fract_line_answer"></hr></span>' +
		'</div><div><input class="denominator" v-model="denom" @change="handle_change()"></input></div></div>'
});

class Problem
{
	constructor (n_terms, max_val)
	{
		this.fracts = [];
		this.signs = [];
		for (let i = 0; i < n_terms; i++)
		{
			this.fracts[i] = rand_fraction(max_val);
			this.signs[i] = rand_sign();
		}
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
		problems: []
    },

	methods: {
		generate: function () {
			this.n_problems = parseInt(this.n_problems);
			let problems = [];
			for (let i = 0; i < this.n_problems; i++)
			{
				problems[i] = new Problem(this.n_terms, this.max_val);
			}

			this.problems = problems;
		}
	}
})

