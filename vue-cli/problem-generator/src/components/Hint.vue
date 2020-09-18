<template>
		<div v-if="inited()">
			<div id="hint-id">
				<span v-if="can_render_direct()">{{this.a}}&nbsp;{{this.op}}&nbsp;{{this.b}}</span>
				<span v-else-if="op == '**' "><Pow :a="a" :b="b" /></span>
				<span v-else-if="op == 'sum_sq' "><Pow :a="a" b="2" />&nbsp;+&nbsp;<Pow :a="b" b="2"/></span>
				<span v-else-if="op == 'table_sq'"><Pow :a="get_square_base()" b="2" /></span>
			</div>
			<Star v-if="this.star"/>
		</div>

</template>
<script>

import Pow from './Pow.vue';
import Star from './Star.vue';

const INIT_TOP = 0;
const INIT_LEFT = 20;
const INIT_STAR_TOP = 0;
const INIT_STAR_LEFT = 20;
const FRAME_RATE = 30;
const FRAME_STEP = 1;
const STAR_FRAME_STEP = 2;
const FINAL_TOP = 400;
const FINAL_STAR_LEFT = 400;

export default {
	name: 'Hint',
	components: {Pow,Star},
	props: ['root', 'op'],
	data() {
		return {
			a: null,
			b: null,
			timer: null,
			star_timer: null,
			star: false,
			pos: { top: null, left: null},
			star_pos: { top: null, left: null}
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
		reset_star_pos() {
			this.star_pos = {top: INIT_STAR_TOP, left: INIT_STAR_LEFT};
		},
		should_stop_animate() {
			return this.pos.top >= FINAL_TOP;
		},
		animate_sync_element(id, pos)
		{
			let el = document.getElementById(id);
			if (!el)
				return;

			el.style.top = pos.top + 'px';
			el.style.left = pos.left + 'px';
		},
		animate_sync_pos() {
			this.animate_sync_element('hint-id', this.pos);
		},
		animate_star_sync_pos() {
			console.log("star:", this.star_pos);
			this.animate_sync_element('star', this.star_pos);
		},
		animate_star() {
			if (this.star_timer)
				return;
			this.reset_star_pos();
			this.star = true;
			let delay = 1000 / FRAME_RATE;

			this.star_timer = setInterval(() => {
				if (!this.star)
					return;

				this.star_pos.left += STAR_FRAME_STEP;
				this.animate_star_sync_pos();

				if (this.should_stop_animate_star())
					this.clear_star_animation();
			}, delay);
		},
		should_stop_animate_star() {
			return this.star_pos.left >= FINAL_STAR_LEFT;
		},
		clear_star_animation() {
			clearInterval(this.star_timer);
			this.star_timer = null;
			this.reset_star_pos();
			this.star = false;
		},
		animate() {
			if (this.timer)
				return;
			this.reset_pos();
			let delay = 1000 / FRAME_RATE;
			this.timer = setInterval(() => {
				this.pos.top += FRAME_STEP;
				this.animate_sync_pos();

				if (this.should_stop_animate()) {
					this.clear_animation();
				}
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
