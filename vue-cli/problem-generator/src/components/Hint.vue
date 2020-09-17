<template>
	<div id="hint-id" v-if="inited()">
		<span v-if="can_render_direct()">{{this.a}}&nbsp;{{this.op}}&nbsp;{{this.b}}</span>
		<span v-else-if="op == '**' "><Pow :a="a" :b="b" /></span>
		<span v-else-if="op == 'sum_sq' "><Pow :a="a" b="2" />&nbsp;+&nbsp;<Pow :a="b" b="2"/></span>
		<span v-else-if="op == 'table_sq'"><Pow :a="get_square_base()" b="2" /></span>
	</div>
</template>
<script>

import Pow from './Pow.vue';

const INIT_TOP = 100;
const INIT_LEFT = 50;
const FRAME_RATE = 30;
const FRAME_STEP = 1;
const FINAL_TOP = 500;

export default {
	name: 'Hint',
	components: {Pow},
	props: ['root', 'op'],
	data() {
		return {
			a: null,
			b: null,
			timer: null,
			pos: { top: null, left: null}
		}
	},
	mounted() {
		console.log("Hint is mounted");
		this.root.hint = this;
	},
	methods: {
		reset_pos() {
			this.pos = {top: INIT_TOP, left: INIT_LEFT};
		},
		should_stop_animate() {
			return this.pos.top >= FINAL_TOP;
		},
		animate_sync_pos() {
			let el = document.getElementById('hint-id');

			if (!el)
				return;

			el.style.top = this.pos.top + 'px';
			el.style.left = this.pos.left + 'px';
		},
		animate() {
			if (this.timer)
				return;
			this.reset_pos();
			let delay = 1000 / FRAME_RATE;
			this.timer = setInterval(() => {
				this.pos.top += FRAME_STEP;
				this.animate_sync_pos();
				if (this.should_stop_animate())
					this.clear_animation();
		}, delay);
		},
		clear_animation() {
			if (!this.timer)
				return;
			clearInterval(this.timer);
			this.timer = null;
			this.reset_pos();
			console.log("Clearing");
		},
		get_square_base() {
			let res = this.b.toString();
			if (this.a)
				res = this.a.toString() + res;
			return res;
		},
		can_render_direct() {
			switch (this.op)
			{
				case 'sum_sq':
				case 'table_sq':
				case '**':
					return false;
				default:
					return true;
			}
		},
		update(a,b) {
			this.a = a;
			this.b = b;
			this.animate();
		},
		inited() {
			return this.a !== null && this.b !== null;
		}
	}

}
</script>
