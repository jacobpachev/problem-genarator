<template >
  <v-form class='input'><v-container>
  <template v-if="!root.is_binary_op_exercise">
  <v-row><v-col
		cols="12"
		md="2"
        >  
          <v-text-field
			class="terms"
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
			class="terms"
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
			class="terms"
            v-if="root.mode=='fract'"
            v-model="root.n_terms"
            label="Number of terms"
            type="number"
            required
          ></v-text-field>
          </v-col>
		</v-row>
		</template>
		<template v-if="root.is_binary_op_exercise">
        <v-text-field
			class="terms"
            @input="root.generated=false"
            v-model="root.table_len_input"
            label="Length of table"
            type="number"
            required
          ></v-text-field>
			<v-col>
				<v-select class='trav-order'  :items="root.order_items" label="Traversal Order" v-model="root.order">
				</v-select>
       </v-col>
        Lighter green indicates a full square.
   
       </template>
       <v-col/>
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
