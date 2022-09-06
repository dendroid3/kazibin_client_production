<template lang="html">
  <div class="main-wrapper">
    <v-list
    v-if="getStepOneResponse"
    class="striped"
    subheader
    two-line
    >
      <v-list-item class="stripped">
        <v-list-item-content>
          <v-list-item-title v-text="'code:'"></v-list-item-title>
          <v-list-item-subtitle v-text="getStepOneResponse.code"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="stripped">
        <v-list-item-content>
          <v-list-item-title v-text="'topic:'"></v-list-item-title>
          <v-list-item-subtitle v-text="getStepOneResponse.topic"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="stripped">
        <v-list-item-content>
          <v-list-item-title v-text="'unit:'"></v-list-item-title>
          <v-list-item-subtitle v-text="getStepOneResponse.unit"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="stripped">
        <v-list-item-content>
          <v-list-item-title v-text="'type:'"></v-list-item-title>
          <v-list-item-subtitle v-text="getStepOneResponse.type"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item class="stripped">
        <v-list-item-content>
          <v-list-item-title v-text="'instructions:'"></v-list-item-title>
          <v-list-item-subtitle v-text="getStepOneResponse.instructions"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="stripped" v-if="getStepTwoResponse">
        <v-list-item-content>
          <v-list-item-title v-text="'files:'"></v-list-item-title>
          <v-list-item-subtitle v-for="file in getStepTwoResponse" :key="file.id" v-text="file.name"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="stripped" v-if="getStepThreeResponse">
        <v-list-item-content>
          <v-list-item-title v-text="'cost:'"></v-list-item-title>
          <v-list-item-subtitle v-text="cost"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="stripped" v-if="getStepFourResponse">
        <v-list-item-content>
          <v-list-item-title v-text="'due time:'"></v-list-item-title>
          <v-list-item-subtitle v-text="due_time"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="stripped" v-if="getStepFiveResponse">
        <v-list-item-content>
          <v-list-item-title v-text="'payment mode:'"></v-list-item-title>
          <v-list-item-subtitle v-text="payment_mode"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      </v-list>

      <p class="primary-color-text form-title d-flex justify-start px-2">
          {{title}} 
      </p>
      <one v-if="getAddTaskStep == 1 || !getAddTaskStep" />
      <two v-if="getAddTaskStep == 2" />  
      <three v-if="getAddTaskStep == 3" /> 
      <four v-if="getAddTaskStep == 4" />
      <five v-if="getAddTaskStep == 5" />
      <six v-if="getAddTaskStep == 6" />
      <div class="bottom">
        <div class="pa-2 d-flex justify-center">
          <v-btn 
          small 
          :loading="deleting"
          @click="deleteIt"
          v-if="getAddTaskStep != 1"
          class="rounded red submit-button white--text">
            <v-icon small class="white--text">
              mdi-delete
            </v-icon>
            delete
          </v-btn>
        </div>
      </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import One from './Steps/Index.vue'
import Two from './Steps/Two.vue'
import Three from './Steps/Three.vue'
import Four from './Steps/Four.vue'
import Five from './Steps/Five.vue'
import Six from './Steps/Six.vue'
export default {
  name: 'Index',
  components:{ 
    One, 
    Two, 
    Three, 
    Four, 
    Five, 
    Six
  },
  computed: {
    ...mapGetters([
      'getAddTaskStep', 'getStepOneResponse', 'getStepTwoResponse', 'getStepThreeResponse', 
      'getStepFourResponse', 'getStepFiveResponse', 'getStepSixResponse'
    ]),
    title(){
      switch (this.getAddTaskStep) {
        case 1:
          return 'Post Task'
          break;
      
        case 2:
          return 'Select Files'
          break;
      
        case 3:
          return 'How will The Task Be Paid?'
          break;
      
        case 4:
          return 'When Is The Task Due?'
          break;

        case 5:
          return 'When Will The Task Be Paid?'
          break;
      
        case 6:
          return 'Who Can Take Up The Task?'
          break;
      
        default:
          return 'dsds'
          break;
      }
    },
    cost(){
      if(this.getStepThreeResponse.pages){
        return this.getStepThreeResponse.full_pay + ' KES ( ' + this.getStepThreeResponse.page_cost + ' KES per page for ' + this.getStepThreeResponse.pages + ' pages )'
      } else {
        return this.getStepThreeResponse.full_pay + ' KES for the whole task'
      }
    },
    due_time(){
      return this.getStepFourResponse.expiry_time
    },
    payment_mode(){
      if(this.getStepFiveResponse.pay_day == '1965-5-28 00:00:00'){
        return 'to be paid on delivery'
      } else if(this.getStepFiveResponse.pay_day == '1997-9-17 00:00:00'){
        return 'to be paid on approval'
      } else {
        return 'to be paid by: ' + this.getStepFiveResponse.pay_day
      }
    }
  },
  data(){
    return{
      deleting: false
    }
  },
  methods: {
    ...mapActions(['setAddTaskStep', 'flashAdditionResponses', 'deleteTask']),
    back(){
      if(this.getAddTaskStep > 1){
        this.setAddTaskStep(this.getAddTaskStep - 1)
      }
    },
    skip(){

      if(this.getAddTaskStep < 6){
        this.setAddTaskStep(this.getAddTaskStep + 1)
      }
    },
    finish(){
      this.flashAdditionResponses()
      this.setAddTaskStep(1)
    },
    deleteIt(){
      const confirmation = "You are about to delete this task. This process is irreversable. \n Proceed?"
      if(!confirm(confirmation)){return}
      this.deleting = true
      const data = {
        task_id: this.getStepOneResponse.id
      }
      this.deleteTask(data).then((res) => (
        this.finish(),
        this.deleting = false
      ))
    }
  }
}
</script>
<style lang="css" scoped>
.bottom{
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
}

div{
  font-family: dosis;
}
.form-title{
  font-size: 2rem;
  font-weight: 300;
  width: 70vw;
}
.stripped{
  background-color: #E0E0E0;
}
.stripped:nth-child(even){
  background-color:#F5F5F5;
}
.main-wrapper{
  padding-bottom: 5rem;
}
</style>

