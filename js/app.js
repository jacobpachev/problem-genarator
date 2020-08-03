

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

  template: '<div><div><span class = "whole">{{data.whole}}</span></div><span class = "numerator">{{data.numer}}</span><div><hr class="fract_line"></hr></span></div><div><span class = "denominator">{{data.den}}</span></div></div>'
})

Vue.component('sign', {
	props: ['data'],
	template: '<div><span class="signs">{{data}}</span></div>'
});

Vue.component('problem', {
	props: ['data'],
	template: '<v-row><template v-for="i in data.fracts.length"><v-col><sign :data="data.signs[i-1]"></sign></v-col><v-col ><fract :data="data.fracts[i-1]"></fract></v-col></template></v-row>'
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

