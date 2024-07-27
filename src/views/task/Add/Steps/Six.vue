<template lang="html">
<v-form class="mt-4 px-4"
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
  <section v-if="offering == 'select writers'">
    <div class="d-flex justify-center">
      {{selected_writers.length ? selected_writers.length : 'No'}}
      {{(selected_writers.length > 1) ? "writers": 'writer'}}
      {{" selected"}} 
    </div>
    <div class="grey d-flex lighten-3 align-center liaison" v-for="(writer, i) in getMyWriters" :key="i">
      <div class="pa-2">
        <v-icon small class="green--text" v-if="isSelected(writer.writer_id)">
          mdi-check
        </v-icon>
        <span class="bold">
          {{writer.code}}
          {{": "}}
          {{writer.username}}
        </span>
      </div>
      <v-spacer />
      <v-btn x-small class="white--text mr-2 success" @click="addWriter(writer.writer_id)" v-if="!isSelected(writer.writer_id)">
        select
      </v-btn>
      <v-btn x-small class="white--text mr-2" style="background-color: tomato;" @click="removeWriter(writer.writer_id)" v-if="isSelected(writer.writer_id)">
        remove
      </v-btn>
    </div>
    <div class="d-flex justify-end">
    <v-btn small class="success mt-2" @click="selectWriters" :disabled="applied || (selected_writers.length < 1)">
      {{applied ? 'applied' : 'apply'}}
      <v-icon small class="green--text" v-if="applied">
        mdi-check
      </v-icon>
    </v-btn>

    </div>
  </section>

  <div class="d-flex justify-center mb-4">
    {{"Difficulty: "}}
    <v-rating
      v-model="task.difficulty"
      :rules="rules.Required"
      small
      label="difficulty"
      background-color="blue"
      color="yellow accent-4"
      dense
      size="18"
      :length="10"
      hover
    ></v-rating>
  </div>
    
  <!-- <div class="d-flex justify-center mb-4">
    {{"Secure Task In Escrow: "}} v-if="offering == 'everyone'"
  </div> -->
  <section v-if="offering == 'everyone'">
    <div class=" d-flex lighten-3 align-center justify-center">
      <v-checkbox
        v-model="broadcast_on_telegram"
        :label="`broadcast on telegram`"
      ></v-checkbox>
    </div>
  </section>
  
  <div class="d-flex justify-center">
    <v-btn 
    small 
    @click="submit"
    :loading="loading"
    class="rounded success submit-button"
    :disabled="computed_valid">
      submit
    </v-btn>
  </div>
</v-form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Six',
  computed:{
    ...mapGetters(['getStepOneResponse', 'getMyWriters', 'getDashboadDetails']),
    computed_valid(){
      // if(this.offering_options == 'select writers'){
      //   if(this.takers){
      //     return true
      //   }
      // } else {
      //   return true
      // }
      return false
    }
  },
  data() {
    return{
      valid: true,
      lazy: false,
      applied: false,
      task: {
        difficulty: 5
      },
      due_time: null,
      rules: {
        Required: [
          v => !!v || 'Field is required',
        ],
      },
      offering_options: ['all my writers', 'select writers', 'everyone'],
      offering: '',
      loading: false,
      broadcast_on_telegram: false,
      selected_writers: [],
      takers: null
    }
  },
  methods:{
    ...mapActions(['stepSix', 'intitiateRequestToDeposit']),
    addWriter(writer_id){
      this.applied = false
      this.selected_writers.push(writer_id)
    },
    removeWriter(writer_id){
      this.applied = false
      this.selected_writers = this.selected_writers.filter(id => (id != writer_id))
    },
    isSelected(writer_id){
      return this.selected_writers.filter(id => (id == writer_id)).length
    },
    selectWriters(){
      this.applied = true
      let takers = ''
      this.selected_writers.forEach(id => {
        takers += id +  '_'
      });
      this.takers = takers
    },
    submit(){
      this.loading = true

      if(this.offering == 'everyone'){
        const data = {
          takers: '',
          difficulty: this.task.difficulty,
          task_id: this.getStepOneResponse.id
        }
        if(this.broadcast_on_telegram){
          let prompt_message = "Broadcasting to telegram is sure to expose your task to a larger number of writers, faster. It costs 20 KES to broadcast to the XXX telegram group. Proceed?"

          if(!confirm(prompt_message)){ this.loading = false; return }

          if(this.getDashboadDetails.transactions.balance < 20){
            const required_amount = (20 - this.getDashboadDetails.transactions.balance);

            const intitiate_request_to_deposit_data = {
              action: "forward a task to telegram",
              required_amount: required_amount
            }

            this.intitiateRequestToDeposit(intitiate_request_to_deposit_data)

            this.loading = false
            return 
          }

          data.broadcast_on_telegram = true
        }
        this.stepSix(data).then((res) => {
          this.loading = res
        })
      } else if(this.offering == 'select writers'){

        let usernames = ''
        
        this.selected_writers.forEach(writer_id => {
          let writer = this.getMyWriters.filter(writer => (
            writer.writer_id == writer_id
          ))  
          usernames += (" -- " + writer[0].code+ ": " + writer[0].username + '\r\n')
        });
        
        let writer_vs_writers = null
        if(this.selected_writers.length > 1){
          writer_vs_writers = " writers: \r\n"
        } else {
          writer_vs_writers = " writer: \r\n"
        }
        
        let text = "This task will be offered to " + 
                    this.selected_writers.length + 
                    writer_vs_writers + usernames + 
                    "Proceed?"

        if(!confirm(text)){
          return
        }
        
        const data = {
          takers: this.takers,
          difficulty: this.task.difficulty,
          task_id: this.getStepOneResponse.id,
          broadcast_on_telegram: false
        }

        this.stepSix(data).then((res) => {
          this.loading = res
        })
      }
    }
  },

  mounted() {
  },
}
</script>
