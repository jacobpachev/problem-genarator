<template>
	<div>
		<div v-if="root.generated" class='input'>
			<table class = "binary-operator-table">
			<tr>
				<td>&nbsp;</td>
				<template>
					<td :key="'header-'+gen_key(b)" v-for="b in col_range">{{b}}</td>
				</template>
			</tr>
				<tr :key="root.gen_row_key(a)" v-for="(a,i) in row_range">
					<td>{{a}}</td>
					<td :key="'cell-' + gen_key(i,j)" v-for="(b,j) in col_range">
						<BinaryOperatorInput :row="i" :col="j" :root="root" :key="gen_key(i,j)" :data="apply_op(a,b)" :op="op" :chart="chart" :a="a" :b="b"/>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import BinaryOperatorInput from './BinaryOperatorInput.vue';

export default {
	props: ["root", "op"],
	components: {BinaryOperatorInput},
	computed: {
		chart() {
			return this;
		},
		row_range() {
			if (this.op != "trig")
				return this.table_range;

			return ["sin", "cos", "tan", "cot", "sec", "csc"];
		},
		col_range() {
			if (this.op != "trig" && this.op != "log")
				return this.table_range;
			else if(this.op == "log") {
				return this.table_range.map((x) => {
					return 2**x;
				});
			}
			return this.table_range.map((x) => {
				let cycle = Math.floor(x / 4);
				let phase = x % 4;
				let offset_map = [0, 30, 45, 60];
				return cycle * 90 + offset_map[phase];
			});
		},
		table_range() {
			let start = this.range_start();
			return Array.apply(null, Array(this.root.table_len + 1 - start)).map((v,i) => i + start);
		},
		show_sq() {
			if(this.op == "trig")
				return false;
			return false;
		}
	},
	methods: {
		range_start() {
			switch (this.op)
			{
				default:
					return 0;
				case '*':
					if (this.root.table_len < 7)
						return 0;
					return 2;
				case '**':
				case 'sum_sq':
				case 'log':
					return 2;
			}
		},
		get_base_log(a,b) {
			return Math.log(b) / Math.log(a);
		},
		apply_op(a,b) {
			switch (this.op)
			{
				case '+':
					return a + b;
				case '-':
					return a - b;
				case '*':
					return a * b;
				case '**':
					return Math.pow(a, b);
				case 'sum_sq':
					return a * a + b * b;
				case 'table_sq':
				{
					let p = parseInt(a.toString() + b.toString());
					return p * p;
				}
				case 'trig':
					return this.apply_trig_op(a, b);
				case 'log':
					return (this.get_base_log(a,b));
			}
		},
		apply_trig_op(f_name, x) {
			let f = null;
			x *= Math.PI / 180;
			switch (f_name)
			{
				case "sin":
					f = Math.sin;
					break;
				case "cos":
					f = Math.cos;
					break;
				case "tan":
					f = (x) => { let c = Math.cos(x); return c ? Math.sin(x) / c : Infinity ;};
					break;
				case "cot":
					f = (x) => { let s = Math.sin(x); return s ? Math.cos(x) / s : Infinity ;};
					break;
				case "csc":
					f = (x) => { let s = Math.sin(x); return s ? 1 / s : Infinity ;};
					break;
				case "sec":
					f = (x) => { let c = Math.cos(x); return c ? 1 / c : Infinity ;};
					break;
				default:
					throw "Unsupported trig function " + f_name;
			}

			return f(x);
		},
		gen_key: function(i,j) {
			return "binary-operator-chart-row-" + this.root.start_time.toString() + "-" + i + "-" + j;
		},
	}

}
</script>
