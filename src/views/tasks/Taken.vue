<template lang="">
    <div class="main-wrapper">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> tasks taken
            </v-col>
            <v-col class="col-4 d-flex align-center justify-end px-4">
                <v-icon class="mx-2" @click="go('Explore/Task')">
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
         
      <v-row class="pa-2 bold no-gutters">
        <v-col class="mb-1 col-4 px-1">
          <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel(null)">
              <div class="d-flex justify-center bold"
              :class="{
              'yellow--text': !filter_model
            }">
                all taken
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1 ">
                <span> {{getDashboadDetails.taken.taken_all}}  </span>
              </div>
          </div>
        </v-col>
        
        <v-col class="mb-1 col-4 px-1">
          <div class="tomato white--text rounded elevation-1 pointer"  @click="filterModel(2)"
          :class="{
              'yellow--text': filter_model == 2
            }">
              <div class="d-flex justify-center bold">
                underway
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.taken.taken_underway}} </span>
              </div>
          </div>
        </v-col>
        
        <v-col class="mb-1 col-4 px-1" >
          <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(3)"
            :class="{
              'yellow--text': filter_model == 3
            }">
              <div class="d-flex justify-center bold">
                complete / editing
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.taken.taken_completed}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
          <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(8)"
            :class="{
              'yellow--text': filter_model == 8
            }">
              <div class="d-flex justify-center bold">
                revision
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.taken.taken_revision}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
          <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(4)"
            :class="{
              'yellow--text': filter_model == 4
            }">
              <div class="d-flex justify-center bold">
                cancelled
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.taken.taken_canceled}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
          <div class="tomato white--text rounded elevation-1 pointer" @click="filterModel(5)"
            :class="{
              'yellow--text': filter_model == 5
            }">
              <div class="d-flex justify-center bold">
                invoiced
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span> {{getDashboadDetails.taken.taken_invoiced}} </span>
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
                <span> {{getDashboadDetails.taken.taken_paid}} </span>
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
                <span> {{getDashboadDetails.taken.taken_disputed}} </span>
              </div>
          </div>
        </v-col>

        <v-col class="mb-1 col-4 px-1">
          <div class="grey grey--text rounded elevation-1 pointer">
              <div class="d-flex justify-center bold">
                0
              </div>
              <v-divider inset/>
              <div class="d-flex justify-end align-center px-1">
                <span>  c</span>
              </div>
          </div>
        </v-col>
      </v-row>

    <section v-if="pagination_links_set">
        <div class="limiting_wrapper" v-if="getAllTasksDoneByMe[0] && !($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <tasks-strip v-for="(task, i) in getAllTasksDoneByMe" :key="i" :task="task" />
        </div>

        <div v-if="getAllTasksDoneByMe[0] && ($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
          <d-taken-card :tasks="getAllTasksDoneByMe" />
        </div>
      </section>
  
    <v-row class="padder d-flex justify-center" v-if="!getAllTasksDoneByMe[0] && pagination_links_set">
      <div class="padded mb-4">
        <v-row class="no-gutters d-flex align-center">
          <v-col class="col-12 col-md-6">
            <emptyHere />
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-if="!filter_model">
            You have not been assigned any task yet. Your assigned tasks will appear here once you get assigned any.
            You may bid on tasks <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
            , we forward available tasks for bidding to our telegram group 
            <a class="bold-tiny blue--text" href="https://t.me/writersplatform"> here.</a>
            Alternatively you may request a broker to add you to their network so they may be able to offer you tasks directly. 
            You may view the top brokers <span @click="go('Explore/Brokers')" class="blue--text bold-tiny">here</span>
            To be added to their network click on their username, which will take you to their page then click on the 'liaise' button to send them a request.
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 2">
            You have no pending task at the moment. Pending tasks are those assigned to you but yet to be marked complete either by you or the task's broker. 
            To get assigned tasks, you may bid on tasks <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
            , we forward available tasks for bidding to our telegram group 
            <a class="bold-tiny blue--text" href="https://t.me/writersplatform"> here.</a>
            Alternatively you may request a broker to add you to their network so they may be able to offer you tasks directly. 
            You may view the top brokers <span @click="go('Explore/Brokers')" class="blue--text bold-tiny">here</span>
            To be added to their network click on their username, which will take you to their page then click on the 'liaise' button to send them a request. 
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 3">
            You have no completed tasks at the moment. You may learn about the tasks workflow process
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 4">
            You have no cancelled tasks at the moment. You may learn about the tasks workflow process
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 8">
            You have no tasks in revision at the moment. You may learn about the tasks workflow process
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 7">
            You have no disputed tasks at the moment. You may learn about the tasks workflow process
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 5">
            You have no invoiced tasks at the moment. These are the tasks that are invoiced but yet to be paid. You may learn about the tasks workflow process
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
            You will be able to create an invoice once you have a task that is completed. To create an invoice go to the invoices page
            <span @click="go('Invoices')" class="blue--text bold-tiny">here</span> 
            and click on the 
            <v-icon>
              mdi-plus
            </v-icon>
            sign above and follow the process. You can create an invoice to either pay for a writer or get paid by a broker. Alternatively, you may go to the completed task's chat and click on 'create invoice',
            this method however allows you to create an invoice for that single task. If you wish to create for several tasks for the same writer or broker then use the former method. 
            We currently do not support payments therefore you will have to manually mark the invoice as paid. If you are the broker and mark an invoice as paid, the writer will have to 
            confirm that indeed it is paid. However, confirmation will not be required if you are the writer and mark it as paid.
          </v-col>
          <v-col class="col-12 col-md-6 text-center" v-else-if="filter_model == 6">
            You have no paid tasks at the moment. These are the tasks that are invoiced and the invoices marked as paidand confirmed. You may learn about the tasks workflow process
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
            Learn about the payment workflow 
            <span @click="go('Explore/Task')" class="blue--text bold-tiny">here</span> 
          </v-col>
        </v-row>
      </div>
    </v-row>

    
    <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && getAllTasksDoneByMe[0]">
      <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
      :key="i" 
      :class="{
        'red': link.active,
        'grey': ((getAllTasksDoneByMePaginationDetails.current_page === getAllTasksDoneByMePaginationDetails.last_page) && link.next) ||
                (getAllTasksDoneByMePaginationDetails.current_page === 1) && link.previous
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
import { mapActions, mapGetters } from 'vuex';
import EmptyHere from '../../components/widgets/EmptyHere.vue';
import TasksStrip from '../../components/dashboard/TasksStrip.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';
import DTakenCard from '../../components/dashboard/desktop/DTakenCard.vue';

export default {
    name: 'Taken',
    components: {
        TasksStrip,EmptyHere,FetchingItems, DTakenCard
    },
    computed:{
      ...mapGetters(['getAllTasksDoneByMe', 'getDashboadDetails', 'getAllTasksDoneByMePaginationDetails']),
      tasks(){
        if(this.filter_model){
            return [this.getAllTasksDoneByMe.filter(task => (task.status == this.filter_model))]
        } else {
            return this.getAllTasksDoneByMe
        }
      },
      pagination_links(){
        let links = []
        this.getAllTasksDoneByMePaginationDetails.links.forEach(link => {
          link.previous = link.label == "&laquo; Previous"
          link.next = link.label == "Next &raquo;"
          links.push(link)
        });
        return links
      },
    },

    data(){
      return {
        filter_model: null,
        pagination_links_set: true
      }
    },

    methods:{
      ...mapActions(['fetchAllDoneByMePaginated']),

      boot(){
        const data = {}
        this.fetchAllDoneByMePaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      },

      goToPage(page_link){
        this.pagination_links_set = false
        const data = {
          link: page_link
        }
        
        if(!this.filter_model){
          this.fetchAllDoneByMePaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        } else {
          data.status = this.filter_model
          this.fetchAllDoneByMePaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        }
      },

      go(code){
          this.$router.push('/' + code)
      },
        
      filterModel(status){
        this.pagination_links_set = false
        this.filter_model = status
        
        if(!this.filter_model){
          const data = {}
          this.fetchAllDoneByMePaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        } else {
          const data = {
            status: this.filter_model
          }
          this.fetchAllDoneByMePaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        }
        this.filter_model = status
      },
    },
    mounted(){
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
  
  .main-wrapper{
    padding-bottom: 5rem;
    overflow-x: hidden;
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
  .yellowtext{
    color: yellow;
  }
</style>
