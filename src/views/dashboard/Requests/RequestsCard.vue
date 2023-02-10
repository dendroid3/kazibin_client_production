<template>
  <div>
    <v-row class="d-flex grey lighten-2 pa-2 no-gutters">
      <v-col class="col-6 white--text d-flex justify-center">
        <div class="rounded px-4 mb-1 pointer" @click="filterOption('from brokers')" :class="{
          'red elevation-20': (filter_option == 'from brokers'),
          'green': (filter_option != 'from brokers')
        }">
          {{"from brokers"}} 
        </div>
      </v-col>
      <v-col class="col-6 white--text d-flex justify-center">
        <div class="rounded px-4 mb-1 pointer" @click="filterOption('from writers')" :class="{
          'red elevation-20': (filter_option == 'from writers'),
          'green': (filter_option != 'from writers')
        }">
          {{"from writers"}}
        </div>
      </v-col>
      <v-col class="col-6 white--text d-flex justify-center">
        <div class="rounded px-4 mb-1 pointer"  @click="filterOption('to brokers')" :class="{
          'red elevation-20': (filter_option == 'to brokers'),
          'green': (filter_option != 'to brokers')
        }">
          {{"to brokers"}}
        </div>
      </v-col>
      <v-col class="col-6 white--text d-flex justify-center">
        <div class="rounded px-4 mb-1 pointer" @click="filterOption('to writers')" :class="{
          'red elevation-20': (filter_option == 'to writers'),
          'green': (filter_option != 'to writers')
        }">
          {{"to writers"}}
        </div>
      </v-col>
    </v-row>
    <div v-if="pagination_links_set || page == 'Dashboard'" class="d-flex message wrapper" v-for="request in requests" :key="request.created_at" :class="{
      'greenlist': request.status < 2,
      'blacklist': request.status > 2
    }">
      <v-row style="min-height: 3rem;" class="no-gutters pa-2">
        <v-col class="col-12 pointer" @click="go(request)">
          <span class="bold">
            {{"request "}} 
            <span v-if="!request.mine"> 
              {{" from "}}
            </span> 
            <span v-else> 
              {{" to "}}
            </span>
            <span v-if="request.writer">
              {{request.writer.username}}
            </span>
            <span v-else>
              {{request.broker.username}}
            </span>
            <span> 
              {{", code: "}}
            </span>
            <span v-if="request.writer">
              {{request.writer.code}}
            </span>
            <span v-else>
              {{request.broker.code}}
            </span>
          </span>
          
          <v-icon v-if="request.unread_message" small class="ml-1 green--text">
            mdi-message
          </v-icon>
        </v-col>
        <v-col class="col-12 align-center">
          {{request.last_message.message}}
        </v-col>
        <v-col class="col-12 d-flex justify-end">
          <b>
          {{request.created_at | diffForHumans}}
          </b>
        </v-col>
      </v-row>
    </div>

    <v-row class="padder" v-if="!requests[0] && pagination_links_set && page == 'Requests'">
      <div class="padded mb-4">
        <v-row class="no-gutters ">
          <v-col class="col-12 col-md-6 d-flex align-center justify-center">
            <emptyHere />
          </v-col>
          <v-col class="col-12 col-md-6 text-center d-flex align-center ">
            <div>
              {{" No requests " + filter_option + " yet. "}}
              Learn about the process of adding writers and brokers to your network <span class="blue--text bold-tiny">here</span>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-row>
    
    <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && requests[0] && page == 'Requests'" >
      <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
      :key="i" 
      :class="{
        'red': link.active,
        'grey': ((getRequestsPaginationDetails.current_page === getRequestsPaginationDetails.last_page) && link.next) ||
                (getRequestsPaginationDetails.current_page === 1) && link.previous
        }" 
        @click="goToPage(link.url)">
        <span>
          <span v-if="link.previous">
          {{"<<"}}
          </span>
          <span v-if="!link.previous && !link.next">
            {{link.label}}
          </span>
          <span v-if="(link.next)">
            {{">>"}}
          </span>
        </span>
      </v-col>
    </v-row>
    
    <fetching-items :message="`getting requests`"  v-if="!pagination_links_set && page == 'Requests'"/>

  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import emptyHere from '../../../components/svg/emptyHere.vue'
import FetchingItems from '../../../components/widgets/FetchingItems.vue'

export default {
  name: 'RequestsCard',

  filters:{
    diffForHumans: (date) => {
      if(!date){return 'over'}
      return dayjs(date).fromNow(true) + ' ago'
    },
  },

  computed:{
    ...mapGetters(['getRequestsToAndFromBrokers', 'getRequestsToAndFromWWriters', 'getUser', 'getRequestsPaginationDetails']),
    requests(){
      // return this
      let filter_option = this.filter_option
      switch (filter_option) {
        case 'to brokers':
          return this.getRequestsToAndFromBrokers.filter(request => (
            request.mine &&
            request.writer_id == this.getUser.writer.id
          ))
          break;
          
        case 'from brokers':
          return this.getRequestsToAndFromBrokers.filter(request => (
            !request.mine && 
            request.writer_id == this.getUser.writer.id
          ))
          break;

        case 'to writers':
          return this.getRequestsToAndFromWWriters.filter(request => (
            request.mine &&
            request.broker_id == this.getUser.broker.id
          ))
          break;
          
        default: 
          //from writers
          return this.getRequestsToAndFromWWriters.filter(request => (
            !request.mine && 
            request.broker_id == this.getUser.broker.id
          ))
          break;
      }
    },
    pagination_links(){
      let links = []
      this.getRequestsPaginationDetails.links.forEach(link => {
        link.previous = link.label == "&laquo; Previous"
        link.next = link.label == "Next &raquo;"
        links.push(link)
      });
      return links
    },
  },

  components:{
    emptyHere, FetchingItems
  },

  data(){
    return {
      filter_option: 'from brokers',
      from_brokers: 0,
      to_brokers: 0,
      to_writers: 0,
      from_writers: 0,
      pagination_links_set: false,
      page: null
    }
  },

  methods:{
    ...mapActions(['setLiaisonRequestChat','fetchAllRequests', 'fetchAllRequestsPaginated']),
    go(request){
      this.setLiaisonRequestChat(request)
      this.$router.push('/request/chat')
    },
    filterOption(code){
      this.pagination_links_set = false
      this.filter_option = code
      const data = {
        filter_option: code
      }
      this.fetchAllRequestsPaginated(data).then((res) => (
        this.pagination_links_set = true
      ))
    },
    goToPage(link){
      this.pagination_links_set = false

      const data = {
        filter_option: this.filter_option,
        link: link
      }
      this.fetchAllRequestsPaginated(data).then((res) => (
        this.pagination_links_set = true
      ))
    },
    boot(){
      const requests_to_broker =  this.getRequestsToAndFromBrokers.filter(request => (
        request.mine &&
        request.writer_id == this.getUser.writer.id
      ))
      this.to_brokers = requests_to_broker.length
      const requests_from_broker = this.getRequestsToAndFromBrokers.filter(request => (
        !request.mine && 
        request.writer_id == this.getUser.writer.id
      ))
      this.from_brokers = requests_from_broker.length
      const requests_to_writers = this.getRequestsToAndFromWWriters.filter(request => (
        request.mine &&
        request.broker_id == this.getUser.broker.id
      ))
      this.to_writers = requests_to_writers.length
      const requests_from_writers = this.getRequestsToAndFromWWriters.filter(request => (
        !request.mine && 
        request.broker_id == this.getUser.broker.id
      ))
      this.from_writers = requests_from_writers.length

      if(this.to_brokers > this.from_brokers ){
        this.filter_option = "to brokers"
      }

      if(this.to_writers > this.to_brokers ){
        this.filter_option = "to writers"
      }

      if(this.from_writers > this.to_writers ){
        this.filter_option = "from writers"
      }

      if(this.$router.history.current.name == "Requests"){
        if(this.to_brokers > this.from_brokers ){
          this.filterOption("to brokers")
        } else if(this.to_writers > this.to_brokers ){
          this.filterOption("to writers")
        }else if(this.from_writers > this.to_writers ){
          this.filterOption("from writers")
        } else {
          this.filterOption("from brokers")
        }
      }
      this.page = this.$router.history.current.name
    }
  },
  created(){
    dayjs.extend(relativeTime)
  },
  mounted(){
    this.boot()
  }
}
</script>
<style scoped lang="css">
  .wrapper{
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
