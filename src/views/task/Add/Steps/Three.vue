<template lang="html">
<v-form class="mt-4 px-4"
  v-model="valid"
  :lazy-validation="lazy"
  ref="form">
  <div>
    <v-select
      :rules="rules.Required"
      :items="payment_modes"
      label="mode of payment"
      hint="There are three ways you can pay. This value shall be used in creating the invoice for this task"
      @change="changeMode"
      outlined
    ></v-select>
  </div>
  
  <section v-if="(mode != '') && (mode != 'for the whole job')">
    <div>
      <v-text-field 
      clearable
      outlined
      :rules="rules.Required"
      type="number"
      v-model="task.pages"
      :label="pages_label"
      required
      > </v-text-field>  
    </div>
    <div>
      <v-text-field 
      v-if="task.pages"
      clearable
      outlined
      :rules="rules.Required"
      type="number"
      v-model="task.page_cost"
      :label="cost_label"
      required
      > </v-text-field>  
    </div>
     <div class="mb-4 bold">
       {{(task.page_cost && task.pages) ? 'Full Amount Payable: ' + task.page_cost * task.pages + ' KES': null}}
     </div>
  </section> 
  <section v-else>
    <div>
      <v-text-field 
      clearable
      outlined
      :rules="rules.Required"
      type="number"
      v-model="task.full_pay"
      :label="cost_label"
      required
      > </v-text-field>  
    </div>
  </section>
  
  <div class="d-flex justify-center">
    <v-btn 
    small 
    :loading="loading"
    @click="submit"
    class="rounded success submit-button"
    :disabled="!valid">
      submit
    </v-btn>
  </div>
</v-form>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Three',
  computed:{
    ...mapGetters(['getStepOneResponse']),
    pages_label(){
      switch (this.mode) {
        case 'per page':
          return 'number of pages'
          break;
        case 'per slide':
          return 'number of slides'
          break;
      
        default:
          break;
      }
    },
    cost_label(){
      return 'amount ' + this.mode
    }
  },
  data(){
    return{
      valid: true,
      lazy: false,
      task: {},
      mode: '',
      payment_modes: ['per page', 'for the whole job'],
      rules: {
        Required: [
          v => !!v || 'Field is required',
        ],
      },
      loading: false
    }
  },
  methods: {
    ...mapActions(['stepThree']),
    changeMode(e){
      this.task = {}
      this.mode = e
    },
    submit(){
      this.loading = true
      this.task.task_id = this.getStepOneResponse.id

      this.stepThree(this.task).then((res) => {
        this.loading = res
      })
    }
  },
}
</script>
