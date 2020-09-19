<template>
<span id="star">
	<v-icon color="yellow">mdi-star</v-icon>
</span>
</template>
<script>
import Animated from './Animated.js';

const FINAL_LEFT = 400;

export default {
	name: 'Star',
	mixins: [Animated],
	props: ["root"],
	mounted() {
		this.root.star = this;
		console.log("root in star mount", this.root);
		if (this.root.animate_star_on_mount)
		{
			console.log("Animating star");
			this.animate();
			this.root.animate_star_on_mount = false;
		}
	},
	methods: {
		should_stop() {
			this.pos.left >= FINAL_LEFT;
		},
		run_frame_step() {
			this.pos.left += 2;
		}
	}
}
</script>
