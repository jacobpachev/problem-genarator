class fraction {
	function Fract (whole,numer,den) {
		this.whole = whole;
		this.numer = numer;
		this.den = den;
	}
	
	function extract_whole() {
		var num = ~~(this.numer/this.den);
		this.whole += num;
		this.numer -= num*den;
	}
	function reduce() {
		var gcd = function gcd(a,b){
			return b ? gcd(b, a%b) : a;
		};
		var fract_gcd = gcd(this.numer,this.den)
		this.numer /= fract_gcd;
		this.den /= fract_gcd;
	}
};
function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
}
function rand_fraction (max_val) {
	return new fraction(range_rand(max_val),range_rand(max_val),range_rand(max_val));
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
