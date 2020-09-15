
<template v-if="root.generated">
	<table class = "binary-operator-table">

	<tr>
		<td>&nbsp;</td>
		<template>
			<td :key="'header-'+gen_key(i)" v-for="i in table_range">{{i}}</td>
		</template>
	</tr>
		<tr :key="root.gen_row_key(i)" v-for="i in table_range">
			<td>{{i}}</td>
			<td :key="'cell-' + gen_key(i,j)" v-for="j in table_range">
				<Hint class="hint" v-if="root.hint" :root="root" :op="op" :i="i" :j="j" />
				<BinaryOperatorInput  :row="i" :col="j" :root="root" :key="gen_key(i,j)" :data="apply_op(i,j)" :op="op" :chart="chart"/>
			</td>
		</tr>
	</table>
</template>

<script>
import BinaryOperatorInput from './BinaryOperatorInput.vue';
import Hint from './Hint.vue';

export default {
	props: ["root", "op"],
	components: {BinaryOperatorInput,Hint},
	computed: {
		chart() {
			return this;
		},
		table_range() {
			let start = this.range_start();
			return Array.apply(null, Array(this.root.table_len + 1 - start)).map((v,i) => i + start);
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
					return 2;
			}
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
			}
		},
		gen_key: function(i,j) {
			return "binary-operator-chart-row-" + this.root.start_time.toString() + "-" + i + "-" + j;
		},
	}

}
</script>
