<template v-if="root.generated">
	<table class = "binary-operator-table">
		<tr :key="root.gen_row_key(i)" v-for="i in root.table_len">
			<td :key="'cell-' + gen_key(i,j)" v-for="j in root.table_len">
				<span v-if="i == 1 || j == 1">{{i == 1 ? j : i}}</span>
				<BinaryOperatorInput :row="i" :col="j" :root="root" :key="gen_key(i,j)" v-else :data="apply_op(i,j)" />
			</td>
		</tr>
	</table>
</template>
<script>
import BinaryOperatorInput from './BinaryOperatorInput.vue';

export default {
	props: ["root", "op"],
	components: {BinaryOperatorInput},
	methods: {
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
			}
		},
		gen_key: function(i,j) {
			return "binary-operator-chart-row-" + this.root.start_time.toString() + "-" + i + "-" + j;
		},
	}

}
</script>
