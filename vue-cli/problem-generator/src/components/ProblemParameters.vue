<template>
  <v-form><v-container><v-row><v-col
		cols="12"
		md="2"
        >
          <v-text-field
            v-model="root.n_problems"
            label="Number of problems"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="root.max_val"
            label="Maximum value"
            type="number"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
          <v-text-field
            v-if="root.mode=='fract'"
            v-model="root.n_terms"
            label="Number of terms"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
				<v-btn @click="root.generate()">Start</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>

export default {
	name: 'ProblemParameters',
	props: ['root']
}
</script>
