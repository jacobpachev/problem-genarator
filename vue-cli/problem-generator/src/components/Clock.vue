<template>
<p>{{display_time()}}</p>
</template>
<script>

import {fmt_time} from '../lib/util';

export default {
	props: ['time'],
	methods: {
		display_time: function() {
			if (!this.time)
				return "00:00";
			return fmt_time(this.time, false);
		}
	}
}
</script>
