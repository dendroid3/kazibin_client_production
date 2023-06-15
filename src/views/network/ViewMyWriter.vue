<template>
    <div>
      <user-card :user="getViewMyWriterDetails"/>

      <!-- Mutual Tasks -->
      <section>
        <v-row class="d-flex grey lighten-2 px-2 py-4" >
            <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
            {{'Mutual Tasks'}}
            </v-col>
        </v-row>

        <section>
          <v-row class="no-gutters grey lighten-3 mt-2">
            <v-col class="col-4 px-1 mb-1 white--text">
              <div class="tomato pointer rounded elevation-10">
                <div class="d-flex justify-center bold">
                    {{'total'}}
                </div>
                <v-divider inset class="red--text dark" dark/>
                <div class="d-flex justify-end align-center px-1">
                  <v-spacer />
                  <span> {{getViewMyWriter.data.broker_writer_metrics['total']}} </span>
                </div>
              </div>
            </v-col>
            
            <v-col class="col-4 px-1 mb-1 white--text">
              <div class="tomato pointer rounded elevation-10">
                <div class="d-flex justify-center bold">
                    {{'available'}}
                </div>
                <v-divider inset class="red--text dark" dark/>
                <div class="d-flex justify-end align-center px-1">
                    <v-spacer />
                    <span> {{getViewMyWriter.data.broker_writer_metrics['available']}} </span>
                </div>
                </div>
            </v-col>
            
            <v-col class="col-4 px-1 mb-1 white--text">
              <div class="tomato pointer rounded elevation-10">
                <div class="d-flex justify-center bold">
                    {{'underway'}}
                </div>
                <v-divider inset class="red--text dark" dark/>
                <div class="d-flex justify-end align-center px-1">
                    <v-spacer />
                    <span> {{getViewMyWriter.data.broker_writer_metrics['underway']}} </span>
                </div>
                </div>
            </v-col>

            <v-col class="col-4 px-1 mb-1 white--text">
              <div class="tomato pointer rounded elevation-10">
                <div class="d-flex justify-center bold">
                    {{'complete'}}
                </div>
                <v-divider inset class="red--text dark" dark/>
                <div class="d-flex justify-end align-center px-1">
                    <v-spacer />
                    <span> {{getViewMyWriter.data.broker_writer_metrics['complete']}} </span>
                </div>
              </div>
            </v-col>
            
            <v-col class="col-4 px-1 mb-1 white--text">
              <div class="tomato pointer rounded elevation-10">
                <div class="d-flex justify-center bold">
                    {{'cancelled'}}
                </div>
                <v-divider inset class="red--text dark" dark/>
                <div class="d-flex justify-end align-center px-1">
                    <v-spacer />
                    <span> {{getViewMyWriter.data.broker_writer_metrics['cancelled']}} </span>
                </div>
              </div>
            </v-col>
            
            <v-col class="col-4 px-1 mb-1 white--text">
              <div class="tomato pointer rounded elevation-10">
                <div class="d-flex justify-center bold">
                    {{'paid'}}
                </div>
                <v-divider inset class="red--text dark" dark/>
                <div class="d-flex justify-end align-center px-1">
                  <v-spacer />
                  <span> {{getViewMyWriter.data.broker_writer_metrics['paid']}} </span>
                </div>
              </div>
            </v-col>
          </v-row>

          <section v-if="!fetching_tasks">
            <section v-if="tasks[0]">
              <div class="limiting_wrapper" v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                  <tasks-strip v-for="(task, i) in tasks" :key="i" :task="task" />
              </div>

              <div v-if="($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
                  <d-tasks-card :tasks="tasks" />
              </div>
              
              <!-- <v-row class="d-flex justify-center mb-4" v-if="tasks_pagination_links.length > 3">
                <v-col class="col-1 white--text mb-4 primary-color text-center" v-for="(link, i) in tasks_pagination_links" 
                :key="i" 
                :class="{
                    'red': link.active,
                    'grey': ((getViewMyWriterTasksPaginationDetails.current_page === getViewMyWriterTasksPaginationDetails.last_page) && link.next) ||
                            (getViewMyWriterTasksPaginationDetails.current_page === 1) && link.previous
                    }">
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
              </v-row> -->
            </section>
            <section v-else>
              <div class="padded ma-4">
                <v-row class="no-gutters d-flex align-center">
                    <v-col class="col-12 col-md-6">
                        <emptyHere />
                    </v-col>
                    <v-col class="col-md-6 col-12">
                      You do not have any mutual tasks with 
                      {{ getViewMyWriterDetails.username }}
                      Tasks that you assign to this writer will appear here. 
                    </v-col>
                </v-row>
              </div>
            </section>
          </section> 
          <fetching-items v-else :message="`Fetching Mutual Tasks`" />
        </section>
      </section>

      <!-- Mutual Offers-->
      <section v-if="!fetching_tasks">
        <v-row class="d-flex grey lighten-2 px-2 py-4" >
            <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
            {{'Offers'}}
            </v-col>
        </v-row>
        <section v-if="fetching_offers">
            <fetching-items :message="`Fetching Offers`" />
        </section>
        <section v-else>
          <v-row class="no-gutters grey lighten-3 mt-2">
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                      <div class="d-flex justify-center bold">
                          {{'total'}}
                      </div>
                      <v-divider inset class="red--text dark" dark/>
                      <div class="d-flex justify-end align-center px-1">
                          <v-spacer />
                          <span> {{getViewMyWriterOffers.data.broker_writer_offers['total']}} </span>
                      </div>
                  </div>
              </v-col>
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                      <div class="d-flex justify-center bold">
                          {{'pending'}}
                      </div>
                      <v-divider inset class="red--text dark" dark/>
                      <div class="d-flex justify-end align-center px-1">
                          <v-spacer />
                          <span> {{getViewMyWriterOffers.data.broker_writer_offers['pending']}} </span>
                      </div>
                  </div>
              </v-col>
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                      <div class="d-flex justify-center bold">
                          {{'accepted'}}
                      </div>
                      <v-divider inset class="red--text dark" dark/>
                      <div class="d-flex justify-end align-center px-1">
                          <v-spacer />
                          <span> {{getViewMyWriterOffers.data.broker_writer_offers['accepted']}} </span>
                      </div>
                  </div>
              </v-col>
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                      <div class="d-flex justify-center bold">
                          {{'rejected'}}
                      </div>
                      <v-divider inset class="red--text dark" dark/>
                      <div class="d-flex justify-end align-center px-1">
                          <v-spacer />
                          <span> {{getViewMyWriterOffers.data.broker_writer_offers['rejected']}} </span>
                      </div>
                  </div>
              </v-col>
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                      <div class="d-flex justify-center bold">
                          {{'cancelled'}}
                      </div>
                      <v-divider inset class="red--text dark" dark/>
                      <div class="d-flex justify-end align-center px-1">
                          <v-spacer />
                          <span> {{getViewMyWriterOffers.data.broker_writer_offers['cancelled']}} </span>
                      </div>
                  </div>
              </v-col>
              <v-col class="col-4 pa-1">
                  <div class="grey rounded elevation-1 pointer" style="color: transparent;" >
                      <div class="d-flex justify-center bold">
                          pulled
                      </div>
                      <v-divider inset/>
                      <div class="d-flex justify-end align-center px-1 ">
                          <span> {{'s'}}  </span>
                      </div>
                  </div>
              </v-col>
          </v-row>
          <section v-if="getViewMyWriterOffers.data.offers.data[0]">
            <div class="limiting_wrapper" v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
              <offers-strip v-for="(offer, i) in getViewMyWriterOffers.data.offers.data" :key="i" :offer="offer" />
            </div>

            <div class="limiting_wrapper" v-if="($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
              <d-offers-card :offers="getViewMyWriterOffers.data.offers.data"/>
            </div>
          </section>
          <section v-else>
              <div class="padded ma-4">
                  <v-row class="no-gutters d-flex align-center">
                      <v-col class="col-12 col-md-6">
                          <emptyHere />
                      </v-col>
                      <v-col class="col-md-6 col-12">
                        You have never offered 
                        {{ getViewMyWriterDetails.username }}
                        any task. Those offers will appear here once they are available.
                      </v-col>
                  </v-row>
              </div>
          </section>
        </section>
      </section>

      <!-- Mutual Bids -->
      <section v-if="!fetching_offers">
        <v-row class="d-flex grey lighten-2 px-2 py-4" >
            <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
            {{'Bids'}}
            </v-col>
        </v-row>
        <section v-if="fetching_bids">
          <fetching-items :message="`Fetching Bids`" />
        </section>
        <section v-else>
          <v-row class="no-gutters grey lighten-3 mt-2">
            <v-col class="col-4 px-1 mb-1 white--text">
                <div class="tomato pointer rounded elevation-10" @click="alert">
                    <div class="d-flex justify-center bold">
                        {{'total'}}
                    </div>
                    <v-divider inset class="red--text dark" dark/>
                    <div class="d-flex justify-end align-center px-1">
                        <v-spacer />
                        <span> {{getViewMyWriterBids.data.broker_writer_bids['total']}} </span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-4 px-1 mb-1 white--text">
                <div class="tomato pointer rounded elevation-10" @click="alert">
                    <div class="d-flex justify-center bold">
                        {{'pending'}}
                    </div>
                    <v-divider inset class="red--text dark" dark/>
                    <div class="d-flex justify-end align-center px-1">
                        <v-spacer />
                        <span> {{getViewMyWriterBids.data.broker_writer_bids['pending']}} </span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-4 px-1 mb-1 white--text">
                <div class="tomato pointer rounded elevation-10" @click="alert">
                    <div class="d-flex justify-center bold">
                        {{'won'}}
                    </div>
                    <v-divider inset class="red--text dark" dark/>
                    <div class="d-flex justify-end align-center px-1">
                        <v-spacer />
                        <span> {{getViewMyWriterBids.data.broker_writer_bids['won']}} </span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-4 px-1 mb-1 white--text">
                <div class="tomato pointer rounded elevation-10" @click="alert">
                    <div class="d-flex justify-center bold">
                        {{'lost'}}
                    </div>
                    <v-divider inset class="red--text dark" dark/>
                    <div class="d-flex justify-end align-center px-1">
                        <v-spacer />
                        <span> {{getViewMyWriterBids.data.broker_writer_bids['lost']}} </span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-4 px-1 mb-1 white--text">
                <div class="tomato pointer rounded elevation-10" @click="alert">
                    <div class="d-flex justify-center bold">
                        {{'pulled'}}
                    </div>
                    <v-divider inset class="red--text dark" dark/>
                    <div class="d-flex justify-end align-center px-1">
                        <v-spacer />
                        <span> {{getViewMyWriterBids.data.broker_writer_bids['pulled']}} </span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-4 px-1 mb-1 white--text">
                <div class="tomato pointer rounded elevation-10" @click="alert">
                    <div class="d-flex justify-center bold">
                        {{'rejected'}}
                    </div>
                    <v-divider inset class="red--text dark" dark/>
                    <div class="d-flex justify-end align-center px-1">
                        <v-spacer />
                        <span> {{getViewMyWriterBids.data.broker_writer_bids['rejected']}} </span>
                    </div>
                </div>
            </v-col>
          </v-row>
          <section v-if="getViewMyWriterBids.data.bids.data[0]">

          </section>
          <section v-else>
            <div class="padded ma-4">
              <v-row class="no-gutters d-flex align-center">
                  <v-col class="col-12 col-md-6">
                      <emptyHere />
                  </v-col>
                  <v-col class="col-md-6 col-12">
                      {{ getViewMyWriterDetails.username }}
                      has never bid on any of your tasks. Their bids will appear here once they do.
                  </v-col>
              </v-row>
          </div>
          </section>
        </section>
      </section>

      <!-- Mututal Invoices -->
      <section v-if="!fetching_bids">
        <v-row class="d-flex grey lighten-2 px-2 py-4" >
            <v-col class="col-7 primary-color-text title d-flex justify-start pointer"> 
            {{'Mutual Invoices'}}
            </v-col>
        </v-row>
        <section v-if="fetching_invoices">
            <fetching-items :message="`Fetching Mutual Invoices`" />
        </section>
        <section v-else>
          <v-row class="no-gutters grey lighten-3 mt-2">
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                  <div class="d-flex justify-center bold">
                      {{'total'}}
                  </div>
                  <v-divider inset class="red--text dark" dark/>
                  <div class="d-flex justify-end align-center px-1">
                      <v-spacer />
                      <span> {{getViewMyWriterInvoices.data.broker_writer_invoices['total']}} </span>
                  </div>
                  </div>
              </v-col>

              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                  <div class="d-flex justify-center bold">
                      {{'pending'}}
                  </div>
                  <v-divider inset class="red--text dark" dark/>
                  <div class="d-flex justify-end align-center px-1">
                      <v-spacer />
                      <span> {{getViewMyWriterInvoices.data.broker_writer_invoices['pending']}} </span>
                  </div>
                  </div>
              </v-col>
              
              <v-col class="col-4 px-1 mb-1 white--text">
                  <div class="tomato pointer rounded elevation-10" @click="alert">
                  <div class="d-flex justify-center bold">
                      {{'paid'}}
                  </div>
                  <v-divider inset class="red--text dark" dark/>
                  <div class="d-flex justify-end align-center px-1">
                      <v-spacer />
                      <span> {{getViewMyWriterInvoices.data.broker_writer_invoices['paid']}} </span>
                  </div>
                  </div>
              </v-col>
          </v-row>
          
          <section v-if="getViewMyWriterInvoices.data.invoices.data[0]">
          </section>
          <section v-else>
              <div class="padded ma-4">
                  <v-row class="no-gutters d-flex align-center">
                      <v-col class="col-12 col-md-6">
                          <emptyHere />
                      </v-col>
                      <v-col class="col-md-6 col-12">
                          You have no invoice where 
                          {{ getViewMyWriterDetails.username }}
                          is the writer. These invoices will appear here once they are created.
                      </v-col>
                  </v-row>
              </div>
          </section>
        </section>
      </section>

    </div>
</template>
<script>
import UserCard from '../../components/dashboard/UserCard.vue';
import DTasksCard from '../../components/dashboard/desktop/DTasksCard.vue';
import TasksStrip from '../../components/dashboard/TasksStrip.vue';
import emptyHere from '../../components/svg/emptyHere.vue';
import FetchingItems from '../../components/widgets/FetchingItems.vue';
import OffersStrip from '../../components/dashboard/OffersStrip.vue';
import DOffersCard from '../../components/dashboard/desktop/DOffersCard.vue'


import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ViewMyWriter',

    components:{
      UserCard, DTasksCard, TasksStrip, emptyHere, FetchingItems, DOffersCard, OffersStrip
    },

    computed: {
      ...mapGetters(['getViewMyWriterDetails', 'getViewMyWriter', 'getViewMyWriterTasksPaginationDetails', 'getViewMyWriterOffers', 'getViewMyWriterBids', 'getViewMyWriterInvoices']),

      tasks(){
          let tasks = this.getViewMyWriterTasksPaginationDetails.data
          tasks.forEach(task => {
              task.writer = {}
              task.writer.user = {}
              task.writer.user.code = this.getViewMyWriterDetails.code
              task.writer.user.username = this.getViewMyWriterDetails.username
          });
          return tasks
      },

      tasks_pagination_links(){
          let links = []
          this.getViewMyWriterTasksPaginationDetails.links.forEach(link => {
          link.previous = link.label == "&laquo; Previous"
          link.next = link.label == "Next &raquo;"
          links.push(link)
          });
          return links
      },
    },

    data: () => {
      return {
        fetching_tasks: true,
        fetching_offers: true,
        fetching_bids: true,
        fetching_invoices: true
      }
    },

    methods:{
      ...mapActions(['fetchMyWriter', 'fetchMyWriterOffers', 'fetchMyWriterBids', 'fetchMyWriterInvoices']),
      alert(){
        console.log('pararp')
      }
    },

    created() {
      this.fetchMyWriter(this.getViewMyWriterDetails).then((res) => {
        this.fetching_tasks = false,

        this.fetchMyWriterOffers(this.getViewMyWriterDetails).then((res) => {
          this.fetching_offers = false,

          this.fetchMyWriterBids(this.getViewMyWriterDetails).then((res) => {
            this.fetching_bids = false,

            this.fetchMyWriterInvoices(this.getViewMyWriterDetails).then((res) => {
              this.fetching_invoices = false
            })
          })
        })
      })
    }
}
</script>
<style scoped>
 .padded{
    background-color: rgb(228, 227, 227);
    /* background-color: red; */
    padding: 0.1rem 0.1rem;
    font-size: 0.8rem;
    border-radius: 0.5rem;
  }
</style>
