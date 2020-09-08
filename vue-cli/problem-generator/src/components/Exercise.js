import {fmt_time} from '../lib/util';
import {LinearEquationProblem} from '../lib/linear-equation-problem';
import {FractProblem} from '../lib/fract-problem';


export default {
	name: 'Exercise',
	data() {
		return {
			max_val: 10,
			n_problems: 10,
			n_terms: 3,
			props_by_class: {},
			problems: [],
			results: [],
			start_time: null,
			solve_time: null,
			timer_on: null,
			work_time: 0,
			timer_id: 0,
			max_val_length: null,
			mode: null,
			problem_lookup: {"fract": FractProblem, "linear": LinearEquationProblem}
		};
	},
	computed: {
		pretty_solve_time() {
			if (!this.solve_time)
				return null;
			return fmt_time(this.solve_time, true);
		}
	},
	methods: {
		get_root() {
			return this;
		},
		fix_styles_for_class(cl, props) {
			let style_map = {};

			for (let p in props)
			{
				style_map[p] = props[p] + "px";
			}

			this.props_by_class[cl] = style_map;
		},
		get_problem() {
			return new this.problem_lookup[this.mode](this);
		},
		generate() {
			console.log("generating: mode=", this.mode);
			this.n_problems = parseInt(this.n_problems);
			this.fix_styles();
			let problems = [];
			let results = [];
			for (let i = 0; i < this.n_problems; i++)
			{
				problems[i] = this.get_problem();
				results[i] = false;
			}
			this.problems = problems;
			this.results = results;
			this.start_time = Date.now();
			this.solve_time = null;
			this.timer_on = true;
			this.work_time = 0;
			this.reset_timer();
			this.timer_id = setInterval(() => { this.work_time = Date.now() - this.start_time; }, 1000);
		},
		focus_on_row(row_num) {
			let el = this.gen_id("answer-input-" + row_num + "-whole");
			console.log("focus el:", el);
			if (!el)
				return;
			el.focus();
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
				this.timer_on = false;
			}
			console.log("Results", this.results[n_correct-1])
			if (this.results[row-1] == true && this.results[row] == null)
					this.focus_on_row(row+1);
			console.log("Checking answers",this.results);
		},
	}
}
