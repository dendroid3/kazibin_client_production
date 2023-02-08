<template lang="html">
  <div class="pa-2 wrapper pointer" @click="startChat" :class="{
          redlist: task.status == 1, 
          purplelist: task.status == 2, 
          greenlist: task.status == 3, 
          yellowlist: task.status == 4,
          blacklist: task.status == 5,
          orangelist: task.status == 6 || task.status == 8,
        }">
    <section v-if="!deleting">
        <span class="head">
        {{task.code}}
        {{': '}}
        {{task.topic}}  
      </span>
      
      <br>
      
      {{task.unit}} {{task.type}} 
      {{posted_time}} <br>
      {{full_pay }}{{mode_of_payment}} <br>
      <span v-if="task.difficulty" :class="{
            'purple--text': task.status == 2, 
            'green--text': task.status == 3, 
            'yellow--text': task.status == 4,
            'black--text': task.status == 5,
            'orange--text': task.status == 6 || task.status == 8,
          }">
        {{status + " ||"}}
      </span>
      <span class="red--text" v-if="!task.difficulty">
        <v-icon small class="red--text">
          mdi-alert
        </v-icon>
        {{"task upload incomplete!"}}
      </span>
      <span class="red--text" v-if="(task.status < 2) && (task.offers.length > 0)">
        {{(task.offers.length > 1) ? task.offers.length + " offers" : task.offers.length + " offer"}} 
      </span>
      
      <v-icon v-if="unread_offer_message" small class="ml-1 green--text">
        mdi-message
      </v-icon>

      <span class="red--text" v-if="(task.status < 2) && (task.bids.length > 0)">
        {{(task.bids.length > 1) ? task.bids.length + " bids" : task.bids.length + " bid"}} 
      </span>
      
      <v-icon v-if="unread_bid_message" small class="ml-1 green--text">
        mdi-message
      </v-icon>
      <span class="blue--text " v-if="(task.writer)">
        {{task.writer.user.username}} 
      </span>
    </section>
    
    <section v-else>
      
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
          deleting task
        </v-col>
      </v-row>
    </section>
  </div>
</template>
<script>

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'

export default {
  name: 'TaskStrip',
  props:[
    'task'
  ],
  computed:{
    mode_of_payment(){
      switch (this.task.pay_day) {
        case '1997-09-17 00:00:00':
          return ' to be paid on approval'
          break;
          
        case '1965-05-28 00:00:00':
          return ' to be paid on delivery'
          break;
      
        default:
          return ' to be paid in ' + dayjs(this.task.pay_day).fromNow(true)
          break;
      }
    },
    
    full_pay(){
      // return this.task
      if(this.task.pages == null ){
          return this.task.full_pay + ' KES for whole task'

      } else {
          return this.task.pages * this.task.page_cost + ' KES ( ' + this.task.pages + ' @ ' + this.task.page_cost + ' )'
      }
    },

    posted_time(){
      return 'posted ' + dayjs(this.task.created_at).fromNow(true) + ' ago'
    },

    status(){
      switch (this.task.status) {
        case 1:
          return 'unassigned'
          break;

        case 2:
          return 'underway'
          break
        
        case 3:
          return 'complete'
          break

        case 4:
          return 'cancelled'
          break

        case 5:
          return 'invoiced'
          break

        case 6:
          return 'paid'
          break

        case 8:
          return 'paid (unconfirmed)'
          break

        default:
          break;
      }
    },

    unread_bid_message(){
      let unread = false
      if(this.task.status == 1){
        this.task.bids.forEach(bid => {
          if(bid.unread_message){
            unread = true
          }
        });
      }
      return unread
    },

    unread_offer_message(){
      let unread = false
      if(this.task.status == 1){
        this.task.offers.forEach(offer => {
          if(offer.unread_message){
            unread = true
          }
        });
      }
      return unread
    }
  },
  data(){
    return {
      deleting: false
    }
  },
  methods:{
    ...mapActions(['setTaskChatHeader', 'deleteTask', 'fetchAllPostedByMe', 'fetchDashboardDetails']),
    startChat(){
      if(this.task.difficulty){
        this.setTaskChatHeader(this.task)
        this.$router.push('/Task/Chat')
      } else {
        const confirmation = "You failed to complete the process of adding this task. If it was the last one that you added then go to post task to complete the process. Otherwise you must delete it. Press OK to delete it. \n Proceed?"
        if(!confirm(confirmation)){return}
        this.deleting = true
        const data = {
          task_id: this.task.id
        }
        this.deleteTask(data).then(res => (
          this.fetchDashboardDetails(),
          this.fetchAllPostedByMe()
        ))
      }
     
    }
  },
  created(){
    dayjs.extend(relativeTime)
  }
}
</script>
<style lang="css" scoped>
 .head{
    font-size: 1rem;
    font-weight: 800;
  }
 .head::after{
    font-size: 1rem;
    font-weight: 800;
  }
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
