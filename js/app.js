

function range_rand(range) {
	var rand = Math.floor(Math.random() * range)+1;
    return rand;
}

function rand_fraction (max_val) {
	return new Fraction(range_rand(max_val),range_rand(max_val),range_rand(max_val));
}
Vue.component('fract', {
    props : ['data'],
    
  template: ' <div class="fract"><v-container > <v-row align="center" justify="center"> <v-col>{{data.whole}} </v-col> <v-col><v-container ><v-row><v-col>{{data.numer}}</v-col> </v-row> <v-row> <v-col> <hr class="fract_line"></hr> </v-col> </v-row> <v-row> <v-col>{{data.den}}</v-col></v-row> </v-container></v-col></v-row></v-container></div>'
})
new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		valid: false,
		n_problems: 10,
		n_terms: 3,
		max_val: 10,
        f: new Fraction(1,2,3)
    },
	
	methods: {
		generate: function () {
			this.n_problems = parseInt(this.n_problems);
		}
	}
})
