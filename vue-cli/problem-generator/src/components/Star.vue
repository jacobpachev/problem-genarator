<template>
<div id="star">
	<svg height="75" width="250" viewBox="0 0 210 500">
		<polygon points="100,10 40,198 190,78 10,78 160,198" style="fill:rgb(224,224,0);stroke-width:0;"/>
	</svg>
</div>
</template>
<script>
import Animated from './Animated.js';

const FINAL_TOP = 20;

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
			return this.pos.top <= FINAL_TOP;
		},
		run_frame_step() {
			this.pos.top -= 2;
		},
		on_stop() {
		}
	}
}
</script>
