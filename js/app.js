

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
}

function rand_fraction (max_val) {
	return new Fraction(range_rand(max_val),range_rand(max_val),range_rand(max_val));
}
new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		valid: false,
		n_problems: 10,
		n_terms: 3,
		max_val: 10
    },
	
	methods: {
		generate: function () {
			this.n_problems = parseInt(this.n_problems);
		}
	}
})
