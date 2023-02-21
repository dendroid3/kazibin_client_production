<template>
    <div>
      <user-card :user="getViewMyWriterDetails"/>

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

        </section>
      </section>

        I am ViewMyWriter

    </div>
</template>
<script>
import UserCard from '../../components/dashboard/UserCard.vue';
import DTasksCard from '../../components/dashboard/desktop/DTasksCard.vue';
import TasksStrip from '../../components/dashboard/TasksStrip.vue';

import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'ViewMyWriter',

    components:{
      UserCard, DTasksCard, TasksStrip
    },

    computed: {
      ...mapGetters(['getViewMyWriterDetails', 'getViewMyWriter', 'getViewMyWriterTasksPaginationDetails']),

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
        fetching_tasks: true
      }
    },

    methods:{
      ...mapActions(['fetchMyWriter'])
    },

    created() {
      this.fetchMyWriter(this.getViewMyWriterDetails).then((res) => {

        this.fetching_tasks = false

        console.log('this.getViewMyWriter')
        console.log(this.getViewMyWriter)

      })
      console.log(this.getViewMyWriterDetails)
    }
}
</script>
