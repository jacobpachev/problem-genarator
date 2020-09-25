<template>
		<div v-if="inited()">
			<DynamicSpan :id="animateid" cl="hint" :root="root">
				<template v-if="problem">
					<template v-if="problem.is('FractProblem')">
							<FractProblemStatement :root="root" :data="problem"/>
					</template>
				</template>
				<template v-else>
					<div class="hint_op_container">
						<span v-if="can_render_direct()">{{this.a}}&nbsp;{{this.op}}&nbsp;{{this.b}}</span>
						<span v-else-if="op == '**' "><Pow :a="a" :b="b" /></span>
						<span v-else-if="op == 'sum_sq' "><Pow :a="a" b="2" />&nbsp;+&nbsp;<Pow :a="b" b="2"/></span>
						<span v-else-if="op == 'table_sq'"><Pow :a="get_square_base()" b="2" /></span>
					</div>
				</template>
				<Star animateid="star" v-if="show_star" :key="star_key()" :root="root" :top="cur_top" :left="cur_left"/>
			</DynamicSpan>
		</div>
</template>
<script>

import Animated from './Animated.js';

import Pow from './Pow.vue';
import Star from './Star.vue';
import FractProblemStatement from './FractProblemStatement.vue';
import DynamicSpan from './DynamicSpan.vue';

const FRAME_STEP = 1;
const FINAL_TOP = 400;

export default {
	name: 'Hint',
	mixins: [Animated],
	components: {Pow, Star, FractProblemStatement, DynamicSpan},
	props: ['root', 'op', 'problem', 'animateid'],
	data() {
		return {
			a: null,
			b: null,
			timer: null,
			show_star: false,
			star_counter: 1,
		}
	},
	mounted() {
		this.root.hint = this;
	},
	computed: {
		cur_left() { return this.pos.left},
		cur_top() { return this.pos.top}
	},
	methods: {
		star_key() {
			return "star-key-" + this.start_counter;
		},
		should_stop() {
			return this.pos.top >= FINAL_TOP;
		},
		run_frame_step() {
			this.pos.top += FRAME_STEP;
		},
		stop_star() {
			this.show_star = false;
			this.root.stop_star();
		},
		on_start() {
			this.star_counter++;
			let cur_star_counter = this.star_counter;

			setTimeout(() => {
				if (cur_star_counter == this.star_counter)
					this.stop_star();
			}, 3000);
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
			let was_running = this.timer;
			this.stop();
			this.reset();
			if (was_running)
			{
				this.show_star = true;
				this.root.stop_star();
				this.root.animate_star();
			}
		},
		update(a,b) {
			this.a = a;
			this.b = b;
			this.animate();
		},
		inited() {
			return this.problem || (this.a !== null && this.b !== null);
		}
	}

}
</script>
