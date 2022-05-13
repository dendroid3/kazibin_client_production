<template lang="html">
<v-form class="full-width mt-4 mx-2"
  v-model="valid"
  :lazy-validation="lazy"
  ref="form">
  <div>
    <v-select
      :rules="rules.Required"
      :items="payment_modes"
      v-model="pay_mode"
      label="time of payment"
      hint="How you will pay for the task"
      outlined
    ></v-select>
  </div>
  
  <div>
    <v-text-field 
    clearable
    v-if="pay_day && pay_time"
    outlined
    type="name"
    :value="pay_day + ' ' + pay_time"
    @change="clearEntries"
    label="pay day"
    required
    > </v-text-field>  
  </div>

  <section v-if="pay_mode == 'pay on set date'">
    <div class="mb-4 subtitle primary-color-text d-flex justify-center"
    v-if="!pay_day">
      Select Date
    </div>
    <div class="mb-4 d-flex justify-center">
      <v-date-picker
        v-if="!pay_day"
        color="green lighten-1"
        format="24hr"
        :rules="rules.Required"
        v-model="pay_day"
      ></v-date-picker>
    </div>
    <div class="mb-4 d-flex justify-center subtitle primary-color-text"
    v-if="!pay_time && pay_day">
      Select Time
    </div>
    <div class="mb-4 d-flex justify-center">
      <v-time-picker
        v-if="!pay_time && pay_day"
        color="green lighten-1"
        format="24hr"
        :rules="rules.Required"
        v-model="pay_time"
      ></v-time-picker>
    </div>

  </section>
  
  <div class="d-flex justify-center">
    <v-btn 
    small 
    @click="submit"
    :loading="loading"
    class="rounded success submit-button"
    :disabled="!valid">
      submit
    </v-btn>
  </div>
  <div class="d-flex justify-center mt-2">
    <v-btn 
    small 
    class="rounded grey red--text submit-button">
      learn more
    </v-btn>
  </div>
</v-form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Five',
  computed:{
    ...mapGetters(['getStepOneResponse']),
  },
  data() {
    return{
      valid: true,
      lazy: false,
      task: {},
      pay_time: null,
      rules: {
        Required: [
          v => !!v || 'Field is required',
        ],
      },
      payment_modes: ['pay on delivery', 'pay on approval', 'pay on set date'],
      pay_mode: null,
      pay_day: null,
      loading: false
    }
  },
  methods:{
    ...mapActions(['stepFive']),
    clearEntries(){
      this.pay_day = null
      this.pay_time = null
    },
    submit(){
      this.loading = true
      const data = {
        task_id: this.getStepOneResponse.id
      }
      switch (this.pay_mode) {
        case 'pay on delivery':
          data.pay_day = '1965-5-28 00:00:00'
          break;
        case 'pay on approval':
          data.pay_day = '1997-9-17 00:00:00'
          break;
      
        default:
          data.pay_day = this.pay_day + ' ' + this.pay_time
          break;
      }
      console.log(data)
      this.stepFive(data).then((res) => {
        this.loading = res
      })
    }
  }
}
</script>
