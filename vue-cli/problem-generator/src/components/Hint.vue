<template>
	<span v-if="op != 'sum_sq' && op != 'table_sq' ">{{this.i.toString() + this.op + this.j.toString()}}</span>
	<span v-else-if="op == 'sum_sq' ">{{this.i.toString() + " ^ 2 " + "+" + this.j.toString() + " ^ 2 "}}</span>
	<span v-else-if="op == 'table_sq' && this.i != 0">{{this.i.toString() + this.j.toString() + " ^ 2 "}}</span>
	<span v-else-if="op == 'table_sq' && this.i == 0">{{this.j.toString() + " ^ 2 "}}</span>
</template>
<script>
export default {
	name: 'Hint',
	props: ['root', 'op','i','j'],
}
</script>
