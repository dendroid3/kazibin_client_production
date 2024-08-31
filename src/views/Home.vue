<template>
  <div class="grey lighten-1">
    <search-tab />
    <actions-block /> 
    
    <section v-if="getAllTasksAvailableForBidding[0]"  style="border-top: 0.25rem solid white;" class="grey lighten-1 pb-4">
      <heading-tab
        class="grey lighten-1"
        :heading="`available tasks`"
        :route="`/Explore/Task`"
      />
      <v-row class="limiting_wrapper no-gutters">
        <v-col class="col-12 col-md-6 mb-2"  v-for="(task, i) in getAllTasksAvailableForBidding" :key="i">
          <task-strip :task="task"/>
        </v-col>
        <v-col class="col-12 d-flex justify-center pa-3">
          <v-btn 
            @click="go(`/Explore/Task`)"
            small 
            class="rounded success submit-button">
              Load More
          </v-btn>
        </v-col>
      </v-row>
    </section>
    
    <section v-if="getAllTasksAvailableForBidding[0]"  style="border-top: 0.25rem solid white;" class="grey lighten-1 pb-4">
      <heading-tab
        class="grey lighten-1"
        :heading="`accounts marketplace`"
        :route="`/Marketplace`"
      />
      <v-row class="limiting_wrapper no-gutters">
        <v-col class="col-12 col-md-6 mb-2"  v-for="(account, i) in getAccounts" :key="i">
          <account-card :account="account"/>
        </v-col>
        <v-col class="col-12 d-flex justify-center pa-3">
          <v-btn 
            @click="go(`/Marketplace`)"
            small 
            class="rounded success submit-button">
              Load More
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <section class="grey lighten-1 pb-1">
      <heading-tab
        class="grey lighten-1"
        :heading="`top job brokers`"
        :route="`/Explore/Brokers`"
      />
      <v-row class="no-gutters limiting_wrapper">
        <v-col class="col-12 col-md-6" v-for="(broker, i) in getAllBrokers" :key="i" >
          <user-strip :broker="broker"/>
        </v-col>
        <v-col class="col-12 d-flex justify-center pa-3">
          <v-btn 
            @click="go(`/Explore/Brokers`)"
            small 
            class="rounded success submit-button">
              Load More
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <section class="grey lighten-1 pb-1" style="border-top: 0.25rem solid white;">
      <heading-tab
        class="grey lighten-1"
        :heading="`top writers`"
        :route="`/Explore/Writers`"
      />
      <v-row class="no-gutters limiting_wrapper">
        <v-col class="col-12 col-md-6"  v-for="(writer, i) in getAllWriters" :key="i">
          <user-strip :writer="writer"/>
        </v-col>
        <v-col class="col-12 d-flex justify-center pa-3">
          <v-btn 
            @click="go(`/Explore/Writers`)"
            small 
            class="rounded success submit-button">
              Load More
          </v-btn>
        </v-col>
      </v-row>
    </section>
    <footer-strip />
  </div>
</template>
<script>
import SearchTab from '../components/home/SearchTab.vue'
import HeadingTab from '../components/home/HeadingTab.vue'
import ActionsBlock from '../components/home/ActionsBlock.vue'
import FooterStrip from '../components/widgets/FooterStrip.vue'
import TaskStrip from '../components/home/TaskStrip.vue'
import UserCard from '../components/home/UserCard.vue'
import UserStrip from '../components/home/UserStrip.vue';
import AccountCard from '../components/marketplace/AccountCard.vue'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: { SearchTab, HeadingTab, ActionsBlock, FooterStrip, TaskStrip, UserCard, UserStrip, AccountCard},
  computed: {
    ...mapGetters(['getAllTasksAvailableForBidding', 'getAllWriters', 'getAllBrokers', 'getAccounts']),
    env(){
      return process.env.VUE_APP_API
    },
  },
  data(){
    return {
      fetched_tasks: false,
      fetched_accounts: false,
      fetched_writers: false,
      fetched_brokers: false,
      counter: 8,
      current_j: 0
    }
  },
  methods:{
    ...mapActions(['fetchAllAvailableForBidding', 'fetchAllWriters', 'fetchAllBrokers', 'fetchAccounts']),
    async boot(){
      try{
        await this.fetchAllAvailableForBidding().then(() => {this.fetched_tasks = true})
        await this.fetchAccounts().then(() => {this.fetched_accounts = true})
        await this.fetchAllBrokers(null).then(() => {this.fetched_brokers = true})
        await this.fetchAllWriters(null).then(() => {this.fetched_writers = true})
      } catch(e){
      }
    },
    alert(i, j, message){
      switch (i) {
        case 1:
          window.alert("Sunday of week " + j + ". " + message)
          break;
        case 2:
          window.alert("Monday of week " + j + ". " + message)
          break;
        case 3:
          window.alert("Tuesday of week " + j + ". " + message)
          break;
        case 4:
          window.alert("Wednesday of week " + j + ". " + message)
          break;
        case 5:
          window.alert("Thursday of week " + j + ". " + message)
          break;
        case 6:
          window.alert("Friday of week " + j + ". " + message)
          break;
      
        default:
          window.alert("Saturday of week " + j + ". " + message)
          break;
      }
    },
    go(code){
      this.$router.push(code)
    }
  },
  mounted(){
    this.boot()
    setInterval(() => {
      if(this.current_j < 30){
        this.current_j++
      }
    }, 60);
  }
}
</script>
<style lang="css">
  .limiting_wrapper{
    max-height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .gb{
    color: rgb(12, 93, 12);
  }
</style>
