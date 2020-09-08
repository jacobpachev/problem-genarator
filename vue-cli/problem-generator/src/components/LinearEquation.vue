<template>
<div class="equation">{{eq.a}} <span class="b"> <XTerm :k="eq.b"/></span><span class="eql">=</span><span class="c">{{eq.c}}</span> <span class="d" ><XTerm :k="eq.d"/></span></div>
</template>
<script>
import XTerm from './XTerm.vue';

export default {
	name : 'LinearEquation',
	props : ['eq', 'root'],
	components: {XTerm}
}
</script>
