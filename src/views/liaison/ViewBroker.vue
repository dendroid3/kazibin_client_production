<template lang="html">
  <div class="main-wrapper grey lighten-3">
    <user-card :user="getViewBroker" />

    <section v-if="fetching">

      <div style="margin-top: 50px;" class="center">
      </div>

      <v-row class="no-gutters">
        <v-col class="col-4 offset-4">
          <v-progress-linear
            indeterminate
            rounded
            color="blue darken-2"
            height="5"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="no-gutters">
        <v-col class="col-12 blue--text d-flex justify-center darken-2">
          getting broker metrics
        </v-col>
      </v-row>

    </section>

    <section  v-if="!fetching" class="big-padding-bottom grey lighten-3">
    
      <broker-metric />

      
    </section>

    
    <div class="pa-3" v-if="getViewBroker.bio">
      <span class="bold">
        Bio:
      </span>
      {{getViewBroker.bio}}
    </div>

    <div class="pa-3" v-if="getViewBroker.interests">
      <span class="bold">
        Interests:
      </span>
      <v-row class="px-4 mx-4 py-2">
          <div class="px-4 white rounded mx-2 my-1" style="font-size: 0.95rem;" v-for="(interest, i) in split(getViewBroker.interests)" :key="i">
              {{interest}}
          </div>
      </v-row>
    </div>
    
    <section v-if="getBrokerMetrics.available_tasks.length > 0">

      <title-strip :title="`available tasks`" />
      <!-- <task-strip :task="task" v-for="task in getBrokerMetrics.available_tasks" :key="task.id"/> -->
      <section v-for="task in getBrokerMetrics.available_tasks" :key="task.id">
        <div class="grey lighten-3 wrapper pa-2">
          <section @click="goToView(task)">
            <span class="head">
              {{task.code}}
              {{': '}}
              {{task.topic}}  
            </span>
            <br>
            {{task.unit}} {{task.type}} 
            {{dueTime(task.expiry_time)}} <br>
            {{fullPay(task) }}{{modeOfPayment(task.pay_day)}} <br>
            <div class="d-flex align-center">
              {{"Difficulty: " + task.difficulty + "/10"}}
              <v-icon color="yellow"  small>
                mdi-star
              </v-icon>
              {{". Files: 0"}}
              <v-icon color="bleck"  small>
                mdi-file
              </v-icon>
            </div>
          </section>
          <div class="d-flex justify-end" >
            <v-btn small 
            class="elevation-15 red lighten-2 white--text" 
            style="font-weight: 900;" 
            @click="initiateBid(task)"
            :disabled="bidded" 
            :loading="bidding">
              {{bidded ? 'bid sent' : 'bid'}}
            </v-btn>
          </div>
        </div>
      </section>

    </section>

    <div class="pa-3" v-if="getBrokerMetrics.broker.broker.ratings[0]">
      <span class="bold">
        {{"Reviews: " + getBrokerMetrics.broker.broker.number_of_reviews}}
      </span>
      <v-row class="px-1 py-1" v-for="rating in getBrokerMetrics.broker.broker.ratings.slice(0,5)" :key="rating.id">
          <div class="px-4 white rounded my-1 col-12" style="font-size: 0.95rem;" >
            {{rating.review}}
            <div class="d-flex justify-end col-12" style="font-size: 0.95rem;">
              <v-icon small class="yellow--text" v-for="star in rating.rating" :key="star">
                mdi-star
              </v-icon>
              <v-icon small class="grey--text" v-for="star in (5-rating.rating)" :key="star">
                mdi-star
              </v-icon>
            </div>
          </div>

      </v-row>
    </div>
    <section>
      <div>
      </div>
    </section>
    <div class="d-flex justify-center grey lighten-3" style="padding-bottom: 1.5rem; padding-right: 0.5rem; padding-top: 0.25rem;" v-if="!fetching">

      <v-btn class="elevation-15 red submit-button lighten-2 white--text" small @click="send" :loading="sending"  style="font-weight: 900;" :disabled="request_sent">
        Liaise
      </v-btn>

      </div>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import UserCard from '../../components/dashboard/UserCard.vue'
import BrokerMetric from './BrokerMetric.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import TitleStrip from '../../components/dashboard/TitleStrip.vue'
export default {
  name: 'ViewBroker',
  components:{UserCard, BrokerMetric, TitleStrip},
  computed:{
    ...mapGetters(['getViewBroker', 'getBrokerMetrics']),
    brokers_tasks(){
      let tasks = []
      this.getBrokerMetrics.available_tasks.forEach(task => {
        task.broker = this.getViewBroker
        tasks.push(task)
      });
      return tasks
    }
  },
  data(){
    return{
      response: null,
      sending: false,
      fetching: true,
      bidded: false,
      bidding: false,
      request_sent: false
    }
  },
  methods:{
    ...mapActions(['sendRequestToBroker', 'fetchBrokerMetrics', 'createBid']),
    
    split(string){
        return string.split(",")
    },
    
    goToView(task){
      this.$router.push('/t/' + task.code)
    },
    initiateBid(task){
      let prompt_message = "You are about to bid on " + task.unit + " " + task.type +
      " task, code: " + task.code + " worth " + task.full_pay + " KES. Proceed?"
      if(!confirm(prompt_message)){
        return
      }
      this.bidding = true
      const data = {
        task_id: task.id
      }
      this.createBid(data).then(() => {
        this.bidding = false
        this.bidded = true
      })
    },

    modeOfPayment(pay_day){
      switch (pay_day) {
        case '1997-09-17 00:00:00':
          return ' to be paid on approval'
          break;
          
        case '1965-05-28 00:00:00':
          return ' to be paid on delivery'
          break;
      
        default:
          return ' to be paid in ' + dayjs(pay_day).fromNow(true)
          break;
      }
    },

    fullPay(task){
      if(task.pages == null ){
          return task.full_pay + ' KES for whole task'

      } else {
          return task.pages * task.page_cost + ' KES ( ' + task.pages + ' @ ' + task.page_cost + ' )'
      }
    },

    dueTime(expiry_time){
      return 'due in ' + dayjs(expiry_time).fromNow(true)
    },
    
    boot(){
        try{
          const data = {
            user_id: this.getViewBroker.id
          }
            this.fetchBrokerMetrics(data).then( res => {
              this.fetching = false
            })
        } catch(e){

        }
    }, 
    
    send(){
      let proceed = confirm('You are about to request ' + this.getViewBroker.username + " to become your task broker. Proceed?")
      if(!proceed){return}

      this.sending = true

      this.sendRequestToBroker({broker_id: this.getViewBroker.broker.id}).then((res) => {
        this.sending = false
        this.request_sent = true
      })
    }
  },

  mounted(){
    this.boot()
  },
  created(){
    dayjs.extend(relativeTime)
  }
}
</script>

<style type="css" scoped>
  .main-wrapper{
    overflow-x: hidden;
    min-height: calc(100vh - 50px);
  }
  .head{
    font-size: 1rem;
    font-weight: 800;
  }
  
  .wrapper{
    background-color: blue;
    position: relative;
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
