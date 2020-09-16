<template>
<span class="pow">
	{{a}}<sup>{{b}}</sup>
</span>
</template>
<script>
export default {
	name: 'Pow',
	props: ['a', 'b']
}
</script>
