<template>
  <div id="app">
			<ExerciseView/>
  </div>
</template>
<style>
@import './assets/style.css'
</style>

<script>
import ExerciseView from './components/ExerciseView.vue';

export default {
  name: 'App',
  components: {
    ExerciseView
  }
}
</script>
