<template>
  <div class="main-wrapper grey lighten-3">
    <user-card v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs" :user="getUser"/>
    <transactions-belt class="px-3 my-4" v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs || $vuetify.breakpoint.md"/>
    <tabs-strip 
    v-if=" $vuetify.breakpoint.md || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
    :posted_fetched="posted_fetched" 
    :taken_fetched="taken_fetched" 
    :offers_fetched="offers_fetched" 
    :bids_fetched="bids_fetched" 
    :liaisons_fetched="liaisons_fetched" 
    :invoices_fetched="invoices_fetched" 
    :chats_fetched="chats_fetched" 
    :requests_fetched="requests_fetched"
    :transactions_fetched="transactions_fetched"
    />
    <section v-if="
        getAllTasksPostedByMe && 
        getAllTasksDoneByMe &&
        getMyOffers &&
        getMyBids && 
        getMyBrokers &&
        getMyWriters &&
        getDebitedInvoices &&
        getCreditedInvoices &&
        getRequestsToAndFromBrokers &&
        getRequestsToAndFromWWriters &&
        getLogMessages
        ">

      <section v-if="getAllTasksPostedByMe">
        <title-strip :title="`tasks posted`" :page="`Tasks/Posted`" :add_url="`/Task/Add`" v-if="getAllTasksPostedByMe[0]"/>
        <div class="limiting_wrapper" v-if="getAllTasksPostedByMe[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <tasks-strip v-for="task in getAllTasksPostedByMe" :key="task.id" :task="task" />
        </div>

        <div v-if="getAllTasksPostedByMe[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <d-tasks-card :tasks="getAllTasksPostedByMe" />
        </div>
      </section>

      <section v-if="getAllTasksDoneByMe">
        <title-strip :title="`tasks done`" :page="`Tasks/Taken`" :add_url="`/Tasks/Done`" v-if="getAllTasksDoneByMe[0]"/>
        <div class="limiting_wrapper" v-if="getAllTasksDoneByMe[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <tasks-strip v-for="(task, i) in getAllTasksDoneByMe" :key="i" :task="task" />
        </div>
      </section>

      <section v-if="getMyOffers" >
        <title-strip :title="`tasks offered`" :page="`Offers`" :add_url="`/Brokers/Explore`" v-if="getMyOffers[0]"/>
        <div class="limiting_wrapper" v-if="getMyOffers[0]">
          <offers-strip v-for="(offer, i) in getMyOffers" :key="i" :offer="offer" />
        </div>
      </section>
    
      <section v-if="getMyBids">
        <title-strip :title="`bids made`" :page="`Bids`" :add_url="`/Bids`"  v-if="getMyBids[0]"/>
        <div class="limiting_wrapper"  v-if="getMyBids[0]  && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <bids-strip v-for="(bid, i) in getMyBids" :key="i" :bid="bid" />
        </div>
        
        <div v-if="getMyBids[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <d-bids-card :bids="getMyBids" />
        </div>
      </section>

      <section v-if="getMyBrokers">
        <title-strip :title="`brokers`" :add_url="`/Explore/Brokers`" :page="`/Network`"  v-if="getMyBrokers[0]"/>
        <div class="limiting_wrapper" v-if="getMyBrokers[0]">
          <network-strip :network_option="'brokers'" />
        </div>
      </section>

      <section v-if="getMyWriters">
        <title-strip :title="`writers`" :add_url="`/Explore/Writers`" :page="`/Network`" v-if="getMyWriters[0]"/>
        <div class="limiting_wrapper" v-if="getMyWriters[0]">
          <network-strip :network_option="'writers'" />
        </div>
      </section>

      <section v-if="getDebitedInvoices">
        <title-strip :title="`invoices debited`" :add_url="`/Invoice/Create`" :page="`/Invoices`" v-if="getDebitedInvoices[0]"/>
        <div class="limiting_wrapper" v-if="getDebitedInvoices[0]">
          <invoice-strip v-for="invoice in getDebitedInvoices" :key="invoice.id" :invoice="invoice"/>
        </div>
      </section>

      <section v-if="getCreditedInvoices">
        <title-strip :title="`invoices credited`" :add_url="`/Invoice/Create`" :page="`/Invoices`"  v-if="getCreditedInvoices[0]"/>
        <div class="limiting_wrapper"  v-if="getCreditedInvoices[0]">
          <invoice-strip v-for="invoice in getCreditedInvoices" :key="invoice.id" :invoice="invoice"/>
        </div>
      </section>
      
      <section v-if="getRequestsToAndFromBrokers || getRequestsToAndFromWWriters">
        <title-strip :title="`requests`" :add_url="`/Requests`" :page="`/Requests`"  v-if="getRequestsToAndFromBrokers[0] || getRequestsToAndFromWWriters[0]"/> 
        <div class="limiting_wrapper"  v-if="getRequestsToAndFromBrokers[0] || getRequestsToAndFromWWriters[0]">
          <requests-card />
        </div>
      </section>

      <section v-if="getMyTransactions">
        <title-strip :title="`transactions`" :page="`/Transactions`"  v-if="getMyTransactions[0]"/> 
        <div class="limiting_wrapper"  v-if="getMyTransactions[0]">
          <!-- {{getMyTransactions}} -->
          <transaction-strip :transaction="transaction" v-for="transaction in getMyTransactions" :key="transaction.id" />
        </div>
      </section>

      <section v-if="getLogMessages &&  ($vuetify.breakpoint.md || $vuetify.breakpoint.sm || $vuetify.breakpoint.xs)">
        <title-strip :title="`timeline`" :page="`/Logs`" v-if="getLogMessages[0]" />
        <div class="limiting_wrapper">
          <logs-strip :Logs="getLogMessages"  v-if="getLogMessages[0]" />
        </div>
      </section>
    </section>

    <section>
        <section class="padder" v-if="
        !getAllTasksPostedByMe || 
        !getAllTasksDoneByMe ||
        !getMyOffers ||
        !getMyBids || 
        !getMyBrokers ||
        !getMyWriters ||
        !getDebitedInvoices ||
        !getCreditedInvoices ||
        !getRequestsToAndFromBrokers ||
        !getRequestsToAndFromWWriters ||
        !getMyTransactions ||
        !getLogMessages
        ">
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
              getting your dashboard set up
            </v-col>
          </v-row>
      </section>
      <v-row class="padder" v-if="
        !getAllTasksPostedByMe[0] && 
        !getAllTasksDoneByMe[0] &&
        !getMyOffers[0] &&
        !getMyBids[0] && 
        !getMyBrokers[0] &&
        !getMyWriters[0] &&
        !getDebitedInvoices[0] &&
        !getCreditedInvoices[0] &&
        !getRequestsToAndFromBrokers[0] &&
        !getRequestsToAndFromWWriters[0] &&
        !getLogMessages[0] &&
        !getMyTransactions[0]
      ">
        <div class="padded mb-4">
          <v-row class="no-gutters d-flex align-center">
          <v-col class="col-12 col-md-6">
          <emptyHere />
          </v-col>
          <v-col class="col-md-6 col-12">
            You have not done any activity yet. Your activities will appear here once you do. You can post a task
            <span @click="go('Task/Add')" class="blue--text bold-tiny">here</span> and specify the option you decide. You may offer it to the public for writers to bid on it,
            or you can offer it to all or some of the writers on your network. You can find writers to be working with consistently
            <span @click="go('')" class="blue--text bold-tiny"> here.</span>
            You may alternatively get brokers to be giving you tasks
            <span @click="go('')" class="blue--text bold-tiny"> here.</span>
            Also, you may bid on available tasks 
            <span @click="go('')" class="blue--text bold-tiny"> here.</span>
            We forward tasks available for bidding in realtime on our telegram group, join it  
            <a class="blue--text bold-tiny" href="https://t.me/writersplatform"> here </a>
            To get acquinted with the platform go
            <a class="blue--text bold-tiny" href="https://t.me/writersplatform"> here </a>
            to view some tutorials
          </v-col>
          </v-row>
        </div>
      </v-row>
    </section>
  </div>
</template>
<script>
import UserCard from '../components/dashboard/UserCard.vue'
import TransactionsBelt from '../components/dashboard/TransactionsBelt.vue'
import TitleStrip from '../components/dashboard/TitleStrip.vue'
import TabsStrip from '../components/dashboard/TabsStrip.vue'
import TasksStrip from '../components/dashboard/TasksStrip.vue'
import OffersStrip from '../components/dashboard/OffersStrip.vue'
import LogsStrip from '../components/dashboard/LogsStrip.vue'
import NetworkStrip from '../components/dashboard/NetworkStrip.vue'
import RequestsCard from './dashboard/Requests/RequestsCard.vue'
import BidsStrip from '../components/dashboard/BidsStrip.vue'
import InvoiceStrip from '../components/dashboard/InvoiceStrip.vue'
import emptyHere from '../components/svg/emptyHere.vue'

//desktop

import DTasksCard from '../components/dashboard/desktop/DTasksCard.vue'
import DBidsCard from '../components/dashboard/desktop/DBidsCard.vue'

import { mapActions, mapGetters } from 'vuex'
import TransactionStrip from '../components/dashboard/TransactionStrip.vue'

export default {
  name: 'Dashboard',
  components: { 
    UserCard, TransactionsBelt, TitleStrip, TabsStrip, TasksStrip, LogsStrip, RequestsCard, NetworkStrip, OffersStrip, BidsStrip, 
    InvoiceStrip, emptyHere, TransactionStrip, 
    //desktop
    DTasksCard, DBidsCard
  },
  data(){
    return {
      posted_fetched: false,
      taken_fetched: false,
      offers_fetched: false, 
      bids_fetched: false,
      liaisons_fetched: false, 
      invoices_fetched: false, 
      chats_fetched: false,
      network_fetched: false,
      requests_fetched: false,
      transactions_fetched: false
    } 
  },
  computed:{
    ...mapGetters(['getAllTasksPostedByMe', 'getLogMessages', 'getMyBrokers', 'getMyWriters', 'getMyOffers', 'getMyBids', 
    'getAllTasksDoneByMe', 'getRequestsToAndFromWWriters', 'getRequestsToAndFromBrokers', 'getDashboadDetails', 'getUser',
    'getDebitedInvoices', 'getCreditedInvoices', 'getMyTransactions'])
  },
  methods:{
    ...mapActions(['fetchAllPostedByMe','fetchAllDoneByMe', 'fetchAllRequests', 'fetchLogMessages', 'fetchMyWriters',
     'fetchMyBrokers', 'fetchTaskOffers', 'fetchMyBids', 'fetchDashboardDetails', 'getInvoices', 'fetchMyTransactions']),
    go(code){
      this.$router.push('/' + code)
    },
    async boot(){
      try{
        await this.fetchDashboardDetails()
        await this.fetchAllPostedByMe().then(() => {this.posted_fetched = true})
        await this.fetchAllDoneByMe().then(() => {this.taken_fetched = true})
        await this.fetchTaskOffers().then(() => {this.offers_fetched = true})
        await this.fetchMyBids().then((res) => {this.bids_fetched = true})
        await this.fetchMyWriters()
        await this.fetchMyBrokers().then(() => {this.liaisons_fetched = true})
        await this.fetchAllRequests().then((res) => {this.requests_fetched = true, console.log(res);})
        await this.getInvoices().then((res) => {
          this.invoices_fetched = true
        })
        await this.fetchMyTransactions().then((res) => this.transactions_fetched = true)
        await this.fetchLogMessages().then((res) => {
          this.chats_fetched = true
        })
      } catch {
      }
    }
  },
  created(){
    this.boot()
  }
}
</script>
<style lang="css" scoped>
.padder{
    margin: 1rem 2rem;
    padding: 1rem 0;
    animation: tada; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
    animation-delay: 2s;
    animation-iteration-count: 3;
  }
  .padded{
    background-color: rgb(228, 227, 227);
    padding: 1rem 1rem;
    font-size: 0.8rem;
    border-radius: 3%;
  }
.main-wrapper{
  overflow-x: hidden;
  padding-bottom: 2rem;
  min-height: calc(100vh - 50px);
}

  .limiting_wrapper{
    max-height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .bold-tiny{
  font-weight: 900;
  font-size: 0.9rem;
}
</style>
