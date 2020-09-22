<template>
<div>
	<Sign v-if="showsign" :data="sign" />
	<div class="fraction">
		<DynamicSpan cl="whole_part" :text="data.whole" :root="root"/>
		<DynamicSpan cl="numerator" :text="data.numer" :root="root"/>
		<DynamicSpan cl="fract_line" div_cl="fract_line_bar" :root="root"/>
		<DynamicSpan cl="denominator" :text="data.den" :root="root"/>
	</div>
</div>
</template>
<script>
import DynamicSpan from './DynamicSpan.vue';
import Sign from './Sign.vue';

export default {
	name: 'Fract',
	props : ['data', 'root', 'showsign', 'sign'],
	components: { DynamicSpan, Sign},

}
</script>
