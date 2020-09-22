<template>
	<span>
		<template v-for="i in n_fracts">
			<DynamicSpan cl="fract_w_sign" :key="get_key(i)" :root="root" :vars="{i,data}">
				<Fract :root="root" :data="data.fracts[i-1]"
					:showsign="i > 1 || data.signs[i-1] == '-'" :sign="data.signs[i-1]"/>
			</DynamicSpan>
		</template>
	</span>
</template>
<script>

import Problem from './Problem.js';
import DynamicSpan from './DynamicSpan.vue';
import Fract from './Fract.vue';

export default {
	name: 'FractProblemStatement',
	mixins: [Problem],
	props: ["root", "data"],
	components: {DynamicSpan, Fract},
	computed: {
		n_fracts() {
			return this.data.fracts ? this.data.fracts.length : 0;
		}
	}

}

</script>
