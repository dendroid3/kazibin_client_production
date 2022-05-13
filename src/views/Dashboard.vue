<template lang="html">
  <div>
    <user-card />
    <transactions-belt class="px-3"/>
    <tabs-strip 
    :posted_fetched="posted_fetched" 
    :taken_fetched="taken_fetched" 
    :offers_fetched="offers_fetched" 
    :bids_fetched="bids_fetched" 
    :liaisons_fetched="liaisons_fetched" 
    :invoices_fetched="invoices_fetched" 
    :chats_fetched="chats_fetched" 
    />
    <title-strip :title="`tasks posted`" :add_url="`/Task/Add`"/>
    <!-- {{getAllTasksPostedByMe}} -->
    <section class="limiting_wrapper">
      <tasks-strip v-for="(task, i) in getAllTasksPostedByMe.tasks" :key="i" :task="task" />
    </section>
    <title-strip :title="`tasks done`" :add_url="`/Task/Explore`"/>
    <title-strip :title="`tasks offered`" :add_url="`/Brokers/Explore`"/>
    <title-strip :title="`bids made`" :add_url="`/Task/Explore`"/>
    <title-strip :title="`brokers`" :add_url="`/Brokers/Explore`"/>
    <title-strip :title="`writers`" :add_url="`/Writers/Explore`"/>
    <title-strip :title="`invoices debited`" :add_url="`/Invoice/Debit`"/>
    <title-strip :title="`invoices credited`" :add_url="`/Invoice/Credit`"/>
    <title-strip :title="`requests`" :add_url="`/Requests`"/>
    <title-strip :title="`timeline`" :add_url="`/Logs`"/>


  </div>
</template>
<script>
import UserCard from '../components/dashboard/UserCard.vue'
import TransactionsBelt from '../components/dashboard/TransactionsBelt.vue'
import TitleStrip from '../components/dashboard/TitleStrip.vue'
import TabsStrip from '../components/dashboard/TabsStrip.vue'
import TasksStrip from '../components/dashboard/TasksStrip.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {UserCard, TransactionsBelt, TitleStrip, TabsStrip, TasksStrip},
  data(){
    return {
      posted_fetched: false,
      taken_fetched: false,
      offers_fetched: false, 
      bids_fetched: false,
      liaisons_fetched: false, 
      invoices_fetched: false, 
      chats_fetched: false
    } 
  },
  computed:{
    ...mapGetters(['getAllTasksPostedByMe'])
  },
  methods:{
    ...mapActions(['fetchAllPostedByMe','fetchAllDoneByMe', 'fetchRequestsFromBrokers']),
    async boot(){
      try{
        await this.fetchAllPostedByMe().then(() => {this.posted_fetched = true})
        await this.fetchAllDoneByMe().then(() => {this.taken_fetched = true})
        await this.fetchRequestsFromBrokers().then((res) => console.log(res))
      } catch {
        console.log(e)
      }
    }
  },
  mounted(){
    this.boot()
  }
}
</script>
<style lang="css" scoped>
  .limiting_wrapper{
    max-height: 70vh;
    overflow: scroll;
  }
</style>
