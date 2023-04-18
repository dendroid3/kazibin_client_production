<template>
  <div class="main-wrapper grey lighten-3">
    <v-row class="d-flex grey lighten-2 align-center no-gutters">
      <v-col class="col-8 pl-4 backg"> posted tasks
      </v-col>
      <v-col class="col-4 d-flex align-center justify-end px-4">
        <v-icon class="mx-2" @click="go('Task/Add')">
          mdi-plus  
        </v-icon>
        <!-- <v-icon class="mx-2">
          mdi-magnify  
        </v-icon> -->

        <!-- <v-menu 
          transition="slide-y-transition"
          bottom
          open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="mx-2" v-on="on" v-bind="attrs" :disabled="filter_model != 'unassigned'">
              mdi-filter  
            </v-icon>
          </template>
          <v-list >
            <v-list-item @click="toMyWriters">
              to my writers
            </v-list-item>
            <v-list-item>
              to public
            </v-list-item>
            <v-list-item>
              with bids
            </v-list-item>
          </v-list>
        </v-menu> -->
      </v-col>
    </v-row>
    <div class="pa-1">
      
      <v-row class="pa-2 bold no-gutters">
        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel('all')">
              <div class="d-flex justify-center bold" 
              :class="{
                'yellow--text': !filter_model
              }">
                all posted
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_all}} </span>
              </div>
          </div>
        </v-col>
        
        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(1)" 
            :class="{
              'yellow--text': filter_model == 1
            }">
              <div class="d-flex justify-center bold">
                unassigned
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1 ">
                <span> {{getDashboadDetails.posted.posted_unassigned}}  </span>
              </div>
          </div>
        </v-col>
        
        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(2)"
            :class="{
              'yellow--text': filter_model == 2
            }">
              <div class="d-flex justify-center bold">
                underway
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_underway}} </span>
              </div>
          </div>
        </v-col>
        
        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(3)"
            :class="{
              'yellow--text': filter_model == 3
            }">
              <div class="d-flex justify-center bold">
                complete / editing
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_completed}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(8)" :class="{
              'yellow--text': filter_model == 8
            }">
              <div class="d-flex justify-center bold">
                revision
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_revision}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(4)" :class="{
              'yellow--text': filter_model == 4
            }">
              <div class="d-flex justify-center bold">
                cancelled
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_canceled}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(5)" :class="{
              'yellow--text': filter_model == 5
            }">
              <div class="d-flex justify-center bold">
                invoiced
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_invoiced}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(6)"
            :class="{
              'yellow--text': filter_model == 6
            }">
              <div class="d-flex justify-center bold">
                paid
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_paid}} </span>
              </div>
          </div>
        </v-col>

        
        <v-col class="mb-1 col-4 px-1">
        <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(7)"
            :class="{
              'yellow--text': filter_model == 7
            }">
              <div class="d-flex justify-center bold">
                disputed
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.posted.posted_diputed}} </span>
              </div>
          </div>
        </v-col>

      </v-row>

    </div>
    <section v-if="pagination_links_set && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
      <tasks-strip v-for="task in tasks" :key="task.id" :task="task" />
    </section>

    <section v-if="pagination_links_set && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
      <d-tasks-card :tasks="tasks" v-if="tasks.length > 0" />
    </section>

    <v-row class="padder" v-if="!getAllTasksPostedByMe[0] && pagination_links_set">
      <div class="padded mb-4">
        <v-row class="no-gutters d-flex align-center">
          <v-col class="col-12 col-md-6">
          <emptyHere />
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-if="filter_model === 'all'">
            You have not posted a task yet. Once you post a task, it will appear here. You can post a task
            <span @click="go('Task/Add')" class="blue--text bold-tiny">here</span> and specify the option you decide. You may offer it to the public for writers to bid on it,
            or you can offer it to all or some of the writers on your network. 
            You may view the top writers <span @click="go('Explore/Writers')" class="blue--text bold-tiny">here</span>
            To be add them to your network click on their username, which will take you to their page then click on the 'liaise' button to send them a request.
          </v-col>
          <v-col class="col-12 col-md-6 d-flex align-center justify-center" v-else>
            <span>
              {{"You have no " }} {{ filter_model | statusName}} {{" tasks. We categorise your tasks depending on the stage of the writing workfloe that it is in. You can change the status of you task in their respective chats. Click on the task and do that."}}

            </span>
          </v-col>
          
        </v-row>
      </div>
    </v-row>


    <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && getAllTasksPostedByMe[0]">
      <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
      :key="i" 
      :class="{
        'red': link.active,
        'grey': ((getAllTasksPostedByMePaginationDetails.current_page === getAllTasksPostedByMePaginationDetails.last_page) && link.next) ||
                (getAllTasksPostedByMePaginationDetails.current_page === 1) && link.previous
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
    
    <fetching-items :message="`getting tasks`"  v-if="!pagination_links_set"/>

  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import emptyHere from '../../components/svg/emptyHere.vue'
import FetchingItems from '../../components/widgets/FetchingItems.vue'
import TasksStrip from '../../components/dashboard/TasksStrip.vue'

import DTasksCard from '../../components/dashboard/desktop/DTasksCard.vue'

export default {
  name: 'Posted',
  components:{
    emptyHere,
    TasksStrip,
    FetchingItems,
    DTasksCard
  },
  computed:{
    ...mapGetters(['getAllTasksPostedByMe', 'getAllTasksPostedByMePaginationDetails', 'getDashboadDetails']),
    pagination_links(){
        let links = []
        this.getAllTasksPostedByMePaginationDetails.links.forEach(link => {
          link.previous = link.label == "&laquo; Previous"
          link.next = link.label == "Next &raquo;"
          links.push(link)
        });
        return links
    },
    tasks(){
      if(this.filter_model == 'all'){
         return this.getAllTasksPostedByMe
      }
      if(this.filter_model == '4'){
         return this.getAllTasksPostedByMe.filter(task => (task.status == 1))
      }
      if(this.filter_model == 4){
         return this.getAllTasksPostedByMe.filter(task => (task.status == 4 || task.status == 5))
      }
      return this.getAllTasksPostedByMe.filter(task => (task.status == this.filter_model))
    },
  },
  filters:{
    diffForHumans: (date) => {
      if(!date){return 'over'}
      return dayjs(date).fromNow(true)
    },
    statusName: (code) => {
      switch(code) {
        case code = 1:
          return 'unassigned'
        case code = 2:
          return 'incomplete'
        case code = 3:
          return 'complete'
        case code = 4:
          return 'cancelled'
        case code = 5:
          return 'invoiced'
        case code = 8:
          return 'processing pay'
        case code = 6:
          return 'paid'
          default:
            return null
      }
    },
  },
  data(){
    return {
      filter_model: 'all',
      pagination_links_set: false,
    }
  },
  methods:{
    ...mapActions(['settaskChatHeader', 'fetchAllPostedByMePaginated']),
    goToPage(page_link){
      
      this.pagination_links_set = false
      const data = {
        link: page_link
      }
      
      if(this.filter_model === 'all'){
        this.fetchAllPostedByMePaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      } else {
        data.status = this.filter_model
        this.fetchAllPostedByMePaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      }
    },
    go(code){
      this.$router.push('/' + code)
    },
    toMyWriters(){
      const tasks = this.getAllTasksPostedByMe
      const tasks_to_writers = tasks.filter(task => (
        task.takers
      ))
      this.tasks = tasks_to_writers
    },
    startTaskChat(task){
      this.settaskChatHeader(task)
      this.$router.push('/task_chat')
    },
    filterModel(status){
      this.pagination_links_set = false
      this.filter_model = status
      
      if(this.filter_model === 'all'){
        const data = {}
        this.fetchAllPostedByMePaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      } else {
        const data = {
          status: this.filter_model
        }
        this.fetchAllPostedByMePaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      }
    }
  },
  mounted(){
    if(this.$router.history.current.params.filter){
      if(this.$router.history.current.params.filter == 'Underway'){
        this.filterModel(2)
      } else if(this.$router.history.current.params.filter == 'Paid'){
        this.filterModel(6)
      }
    }  else {
      const data = {}

      this.fetchAllPostedByMePaginated(data).then((res) => (
        this.pagination_links_set = true
      ))
    }
  },
  created(){
    dayjs.extend(relativeTime)
  },
}
</script>
<style lang="css" scoped>
  .limiting_wrapper{
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .col-block{
    position: relative;
  }
  .col-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
   .username{
    font-weight: 900;
    font-size: 1.2rem;
  }


  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
  .backgs{
    background-color: rgb(15,14,56);
  }
  .bold{
    font-weight: 900;
  }
  
  .bold-tiny{
  font-weight: 900;
  font-size: 0.9rem;
}
  .list{
    background-color: rgb(231, 231, 231); 
    border-left: solid 20px red;
  }
  .usn-block{
    position: relative;
  }
  .usn-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .redtext{
    color: red;
  }
  .purpletext{
    color: purple;
  }
  .greentext{
    color: green;
  }
  .orangeredtext{
    color: orangered;
  }

</style>
