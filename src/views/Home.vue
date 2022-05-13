<template>
  <div class="grey lighten-1">
    <search-tab />
    <actions-block />
    <!-- brokers section -->
    <section>
      <heading-tab
        class="grey lighten-1"
        :heading="`top job brokers`"
        :route="`/Explore/Brokers`"
      />
      <div class="d-flex no-gutters" style="overflow-x: scroll;">
        <v-col class="col-5" v-for="(writer, i) in getAllWriters" :key="i">
          <user-card :user="writer" :broker="true"/>
        </v-col>
      </div>
    </section>
    <section>
      <heading-tab
        class="grey lighten-1"
        :heading="`top writers`"
        :route="`/Explore/Writers`"
      />
      <div class="d-flex no-gutters" style="overflow-x: scroll;">
        <v-col class="col-5" v-for="(writer, i) in getAllWriters" :key="i">
          <user-card :user="writer" :writer="true"/>
        </v-col>
      </div>
      <!-- {{getAllTasksAvailableForBidding}} -->
    </section>
    <section>
      <heading-tab
        class="grey lighten-1"
        :heading="`available tasks`"
        :route="`/Explore/Task`"
      />
      <task-strip v-for="(task, i) in getAllTasksAvailableForBidding.slice(71, 89)" :key="i" :task="task"/>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: { SearchTab, HeadingTab, ActionsBlock, FooterStrip, TaskStrip, UserCard},
  computed: {
    ...mapGetters(['getAllTasksAvailableForBidding', 'getAllWriters']),
    env(){
      return process.env.VUE_APP_API
    },
  },
  data(){
    return {
      fetched_tasks: false,
      fetched_writers: false,
      counter: 8
    }
  },
  methods:{
    ...mapActions(['fetchAllAvailableForBidding', 'fetchAllWriters']),
    async boot(){
      try{
        await this.fetchAllAvailableForBidding().then(() => {this.fetched_tasks = true})
        await this.fetchAllWriters(null).then(() => {this.fetched_writers = true})
      } catch(e){
        console.log(e)
      }
    }
  },
  mounted(){
    this.boot()
  }
}
</script>
