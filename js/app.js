

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
    return rand;
}

function rand_fraction (max_val) {
	return new Fraction(range_rand(max_val),range_rand(max_val),range_rand(max_val));
}
function symbol(max_val) {
    var rand = range_rand(max_val);
    if(rand >= max_val/2) 
    {
        return "+";
    }
    else if(rand < max_val/2) {
        return "-";
    }
}
Vue.component('fract', {
  props : ['data'],
    
  template: '<div><div><span class = "whole">{{data.whole}}</span></div><span class = "numerator">{{data.numer}}</span><div><hr class="fract_line"></hr></span></div><div><span class = "denominator">{{data.den}}</span></div></div>'
})


new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		valid: false,
		n_problems: 10,
		n_terms: 3,
		max_val: 10,
		f: rand_fraction(10),   
		f1: rand_fraction(10)
    },
	
	methods: {
		generate: function () {
			this.n_problems = parseInt(this.n_problems);
		}
	}
})

