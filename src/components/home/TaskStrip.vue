<template>
  <div class="grey lighten-4 wrapper pa-2 my-1 relative mx-2 rounded fill-height">
    <section>
      <span class="head pointer uppercase" @click="goToView">
        {{ task.code }}
        {{ ': ' }}
        {{ task.topic }}  
      </span>
      <br>
      <div class="pointer uppercase" @click="goToView">
        {{task.unit}} {{task.type}} 
        {{due_time}} <br>
        {{full_pay }}{{mode_of_payment}} <br>
      </div>
      <div class="d-flex align-center pointer" @click="goToView">
        {{"Broker: "}}
        {{task.broker.user.username + " " + last_activity}}
        {{task.broker.user.credential_verification ? "[verifed]" : null }}
      </div>
      <div class="d-flex align-center pointer" @click="goToView">
        {{"Difficulty: " + task.difficulty + "/10"}}
      </div>
      <div class="d-flex align-center pointer" @click="goToView">
        {{"Files: 0"}}
        <v-icon color="bleck"  small>
          mdi-file
        </v-icon>
      </div>
    </section>
    <div class="d-flex justify-end">
      <v-btn small 
      class="elevation-15 red lighten-2 white--text" 
      style="font-weight: 900;" 
      @click="initiateBid"
      :disabled="bidded" 
      :loading="bidding">
        {{bidded ? 'bid sent' : 'bid'}}
        {{ task.verified_only ? '(Verified Only)' : "(Any Writer)" }}
      </v-btn>
    </div>
  </div>
</template>
<script>

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TaskStrip',
  props:[
    'task'
  ],
  mounted(){
  },
  computed:{
    ...mapGetters(['getUser']),
    mode_of_payment(){
      switch (this.task.pay_day) {
        case '1997-09-17 00:00:00':
          return ' to be paid on approval'
          break;
          
        case '1965-05-28 00:00:00':
          return ' to be paid on delivery'
          break;
      
        default:
          return ' to be paid in ' + dayjs(this.task.pay_day).fromNow(true)
          break;
      }
    },
    full_pay(){
      // return this.task
      if(this.task.pages == null ){
          return this.task.full_pay + ' KES for whole task'

      } else {
          return this.task.pages * this.task.page_cost + ' KES ( ' + this.task.pages + ' @ ' + this.task.page_cost + ' )'
      }
    },
    due_time(){
      return 'due in ' + dayjs(this.task.expiry_time).fromNow(true)
    },
    last_activity(){
      return "( last seen " + dayjs(this.task.broker.user.last_activity).fromNow(true) + " ago )"
    }
  },
  data(){
    return {
      rating:3,
      difficulty: 2,
      bidding: false,
      bidded: false
    }
  },
  methods:{
    ...mapActions(['createBid', 'initialiseVerification']),
    goToView(){
      this.$router.push('/t/' + this.task.code)
    },
    initiateBid(){
      if(this.task.verified_only) {
        if(!this.getUser.credential_verification){
          const confirmation_to_start_verification_process = "The task owner requires account verification to bid on this task. Please go to your profile settings and complete the verification process. Thank you!"

          if(confirm(confirmation_to_start_verification_process)){
            this.$router.push('/Verify')
          } 
          return
        }
      }

      let bid_cost = null
      if(parseInt(this.task.full_pay) <= 1000){
        bid_cost = 10
      } else if((parseInt(this.task.full_pay) > 1000) && (parseInt(this.task.full_pay) <= 5000)){
        bid_cost = 20
      } else {
        bid_cost = 30
      }

      let prompt_message = "You are about to bid on " + this.task.unit + " " + this.task.type +
      " task, code: " + this.task.code + " worth " + this.task.full_pay + " KES. This bid costs " + bid_cost + " KES. Proceed?"
      if(!confirm(prompt_message)){
        return
      }
      this.bidding = true
      const data = {
        bid_cost: bid_cost,
        task_id: this.task.id,
        broker_id: this.task.broker_id
      }
      this.createBid(data).then((res) => {
        this.bidding = false
        this.bidded = res
      })
    }
  },
  created(){
    dayjs.extend(relativeTime)
  }
}
</script>
<style lang="css" scoped>
 .head{
    font-size: 1rem;
    font-weight: 800;
  }
  
  .wrapper{
    background-color: blue;
    position: relative;
    z-index: 999;
  }
  .wrapper::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  
</style>
