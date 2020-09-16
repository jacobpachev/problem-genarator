<template>
	<div id="hint-id" v-if="inited()">
		{{this.animate(this.pos)}}
		<span v-if="can_render_direct()">{{this.a}}&nbsp;{{this.op}}&nbsp;{{this.b}}</span>
		<span v-else-if="op == '**' "><Pow :a="a" :b="b" /></span>
		<span v-else-if="op == 'sum_sq' "><Pow :a="a" b="2" />&nbsp;+&nbsp;<Pow :a="b" b="2"/></span>
		<span v-else-if="op == 'table_sq'"><Pow :a="get_square_base()" b="2" /></span>
	</div>
</template>
<script>

import Pow from './Pow.vue';

export default {
	name: 'Hint',
	components: {Pow},
	props: ['root', 'op'],
	data() {
		return {
			a: null,
			b: null,
			timer: null,
			pos: null
		}
	},
	mounted() {
		console.log("Hint is mounted");
		this.root.hint = this;
	},
	methods: {
		animate(pos) {
			this.timer = setInterval(function() {
				pos ++;
				document.getElementById('hint-id').style.top = pos + 'px';
				if(pos >= 500) 
					this.clear_animation();
		}, 100);
		},
		clear_animation() {
			clearInterval(this.timer);
			this.pos = 0;
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
		},
		inited() {
			return this.a !== null && this.b !== null;
		}
	}

}
</script>
