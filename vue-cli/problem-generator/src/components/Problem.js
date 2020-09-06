export default {
	props: ['data', 'root', 'rownum'],
	mounted() {
		if (this.rownum == 1)
			this.root.focus_on_row(1);
	},
	methods: {
		get_key(col_num) {
			return this.root.startTime + "-" + this.rownum + "-" + col_num;
		}
	}
}
