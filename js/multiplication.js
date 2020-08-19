function fmt_time(t, show_ms)
{
	let tmp = t;
	let ms = tmp % 1000;
	tmp -= ms;
	tmp /= 1000;
	let ss = tmp % 60;
	tmp -= ss;
	let mm = tmp / 60;
	let res = pad(mm, 2) + ":" + pad(ss, 2);

	if (show_ms)
		res += "." + pad(ms, 3);

	return res;
}
function pad(num, size)
{
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}
Vue.component('multiplication-table', {
	props: ['root'],
	template: `
	<v-container>
	<template v-for="i in root.table_len">
	<div class="table_length">
	{{i}}
	</div>
	<div class="table_width">
	{{i}}
	</div>
	</template>
	<clock :time="root.work_time"></clock>` + 
	`
	<div class="solve-time">
		Solved in {{root.pretty_solve_time}} seconds.
	</div>
	</v-container>`
});

Vue.component('clock', {
	props: ['time'],
	methods: {
		display_time: function() {
			if (!this.time)
				return "00:00";
			return fmt_time(this.time, false);
		}
	},
	template: '<p>{{display_time()}}</p>'
});
new Vue({
	el: '#app',
	vuetify: new Vuetify(),
	data: {
		table_len: 12,
		start_time: null,
		solve_time: null,
		work_time: 0,
		timer_id: 0
	},
	computed: {
		
		tty_solve_time: function() {
			if (!this.solve_time)
				return null;
			return fmt_time(this.solve_time, true);
		}
	},
	methods: {
		generate: function () {
			let seconds = 0;
			let minutes = 0;
			this.start_time = Date.now();
			this.solve_time = null;
			this.work_time = 0;
			this.reset_timer();
			this.timer_id = setInterval(() => { this.work_time = Date.now() - this.start_time; }, 1000);
		},
		report_time: function () {
			this.solve_time = Date.now() - this.start_time;
		},
		reset_timer: function () {
			if (this.timer_id)
			{
				clearInterval(this.timer_id);
				this.timer_id = 0;
			}
		},
		get_root() {
			return this;
		}
		
	}
});
