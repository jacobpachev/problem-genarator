<template>
		<div v-if="inited()">
			<div id="hint-id">
				<span v-if="can_render_direct()">{{this.a}}&nbsp;{{this.op}}&nbsp;{{this.b}}</span>
				<span v-else-if="op == '**' "><Pow :a="a" :b="b" /></span>
				<span v-else-if="op == 'sum_sq' "><Pow :a="a" b="2" />&nbsp;+&nbsp;<Pow :a="b" b="2"/></span>
				<span v-else-if="op == 'table_sq'"><Pow :a="get_square_base()" b="2" /></span>
			</div>
			<Star id="star" v-if="show_star" :root="root" :top="200" :left="20"/>
		</div>

</template>
<script>

import Animated from './Animated.js';

import Pow from './Pow.vue';
import Star from './Star.vue';

const FRAME_STEP = 1;
const FINAL_TOP = 400;

export default {
	name: 'Hint',
	mixins: [Animated],
	components: {Pow, Star},
	props: ['root', 'op'],
	data() {
		return {
			a: null,
			b: null,
			timer: null,
			show_star: false,
		}
	},
	mounted() {
		this.root.hint = this;
	},
	methods: {
		should_stop() {
			return this.pos.top >= FINAL_TOP;
		},
		run_frame_step() {
			this.pos.top += FRAME_STEP;
		},
		on_start() {
			setTimeout(() => {
				if (this.timer)
					this.show_star = false;
			}, 2000);
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
		handle_success() {
			this.stop();
			this.reset();
			this.show_star = true;
			console.log("Root in success", this.root);
			if (this.root.star)
				this.root.star.animate();
			else
				this.root.animate_star_on_mount = true;
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
