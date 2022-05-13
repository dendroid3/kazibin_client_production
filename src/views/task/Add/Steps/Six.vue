<template lang="html">
<v-form class="full-width mt-4 mx-2"
  v-model="valid"
  :lazy-validation="lazy"
  ref="form">
  <div>
    <v-select
      :rules="rules.Required"
      :items="offering_options"
      v-model="offering"
      label="takers"
      outlined
    ></v-select>
  </div>
  <!--<section v-if="offering_options == 'select writers'">
  <div class="grey d-flex lighten-3 align-center liaison" v-for="(c, i) in counter" :key="i" v-model="task.takers">
    <div class="pa-2">
      <span class="bold">
        {{i}}
      </span>
    </div>
    <v-spacer />
    <v-btn small class="white--text mr-2" style="background-color: tomato;">
      select
    </v-btn>
  </div>
  </section>
  <section v-if="offering == 'everyone'">
  <div class="grey d-flex lighten-3 align-center liaison" v-model="task.takers">
    <div class="pa-2">
      <span class="bold">
        {{"broadcast on telegram "}}
      </span>
    </div>
    <v-spacer />
    <v-btn small class="white--text mr-2" style="background-color: tomato;">
      select
    </v-btn>
  </div>
  </section>-->
  
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Six',
  computed:{
    ...mapGetters(['getStepOneResponse'])
  },
  data() {
    return{
      valid: true,
      lazy: false,
      task: {},
      due_time: null,
      rules: {
        Required: [
          v => !!v || 'Field is required',
        ],
      },
      offering_options: ['all my writers', 'select writers', 'everyone'],
      offering: null,
      loading: false,
      broadcast_on_telegram: true
    }
  },
  methods:{
    ...mapActions(['stepSix']),
    submit(){
      // if(this.takers){
        this.loading = true
        console.log(this.getStepOneResponse.id)
        if(this.offering == 'everyone'){

          const data = {
            takers: '',
            difficulty: 4,
            task_id: this.getStepOneResponse.id
          }
          if(this.broadcast_on_telegram){
            data.broadcast_on_telegram = true
          }
          this.stepSix(data).then((res) => {
            this.loading = res
          })
        }
      // }
    }
  }
}
</script>
