<template lang="html">
<v-form class="mt-4 px-4"

  v-model="valid"
  :lazy-validation="lazy"
  ref="form">
  <div>
    <v-text-field 
    clearable
    v-if="due_date && due_time"
    outlined
    type="name"
    :value="due_refined"
    @change="clearEntries"
    label="due time"
    required
    > </v-text-field>  
  </div>
  <div class="mb-4 subtitle primary-color-text d-flex justify-center"
  v-if="!due_date">
    Select Date
  </div>
  <div class="mb-4 d-flex justify-center">
    <v-date-picker
      v-if="!due_date"
      color="green lighten-1"
      format="24hr"
      :rules="rules.Required"
      v-model="due_date"
    ></v-date-picker>
  </div>
  <div class="mb-4 d-flex justify-center subtitle primary-color-text"
  v-if="!due_time && due_date">
    Select Time
  </div>
  <div class="mb-4 d-flex justify-center">
    <v-time-picker
      v-if="!due_time && due_date"
      color="green lighten-1"
      format="24hr"
      :rules="rules.Required"
      v-model="due_time"
    ></v-time-picker>
  </div>

  <div class="d-flex justify-center">
    <v-btn 
    small 
    @click="submit"
    :loading="loading"
    class="rounded success submit-button"
    :disabled="!due_time || !due_date">
      submit
    </v-btn>
  </div>
</v-form>
</template>
<script>
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Four',
  computed:{
    ...mapGetters(['getStepOneResponse']),

    due_refined(){
      let refined_time = ' ( ' + dayjs(this.due_date + ' ' + this.due_time + ':00').fromNow(true) + ' from now )'
      let formated_time = dayjs(this.due_date + ' ' + this.due_time + ':00').format('DD/MM/YYYY')
      return formated_time + refined_time
    }
  },

  data() {
    return{
      valid: true,
      lazy: false,
      task: {},
      due_date: null,
      due_time: null,
      rules: {
        Required: [
          v => !!v || 'Field is required',
        ],
      },
      loading: false
    }
  },

  methods: {
    ...mapActions(['stepFour']),
    clearEntries(){
      this.due_date = null
      this.due_time = null
    },
    submit(){
      this.loading = true
      const data = {
        expiry_time: this.due_date + ' ' + this.due_time,
        task_id: this.getStepOneResponse.id
      }
      this.stepFour(data).then((res) => {
        this.loading = res
      })
    }
  },
  
  created(){
    dayjs.extend(relativeTime)
  }
}
</script>
