<template>
  <v-row class="wrapper px-3">
    <v-col class="col-12 col-block redlist pointer" :class="{
      greenlist: status == 'Won',
      blacklist: status == 'Pulled'
    }"
    @click="startBidChat(bid)">
      <div class="username">
        {{bid.task.code}} 
        {{": "}}
        {{bid.task.topic}}
        <v-icon v-if="bid.unread_message" small class="ml-4 green--text">
          mdi-message
        </v-icon>
      </div>
      <span class="bold-2 mr-1 align-center d-flex justify-kjend">
        <span class="username">
          Task by: {{ bid.task.broker.user.username + ' '}}
        </span> 
        <span class="bold-2 ml-1  d-flex justify-n" v-if="bid.task.pages">
          {{"( " + bid.task.pages + " " +  "pages "}} 
          <v-icon x-small class="mx-1 green--text">
            mdi-at
          </v-icon>
          {{bid.task.page_cost + " )"}}
        </span>
      </span>
      <span class="d-flex my-0 mr-1 justify-">
        {{bid.task.unit + " " + bid.task.type}}
        <v-icon x-small class="mx-1 green--text">
          mdi-circle
        </v-icon>
        {{bid.task.expiry_time | diffForHumans }} {{' to go'}}
      </span> 

      <span class="" :class="{
        'red--text': status == 'Unassigned' || status == 'Rejected',
        'green--text': status == 'Won',
        'black--text': status == 'Pulled' || status == 'Lost'
      }">
        {{"Bid " + status}}
      </span>

    </v-col>
  </v-row>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'BidsStrip',
  props: [
    'bid'
  ],

  computed:{
    ...mapGetters(['getUser']),
    status(){
      // if(this.bid.task.status < 2){
      //   return 'Unassigned'
      // } else if(this.bid.task.writer_id == this.getUser.writer.id) {
      //   return "Won"
      // } else {
      //   return "Lost"
      // }
      switch (this.bid.status) {
        case 1:
          return 'Unassigned'
          break;
        case 2:
          return 'Pulled'
          break;
        case 3:
          return 'Rejected'
          break;
        case 4:
          return 'Won'
          break;
        case 5:
          return 'Lost'
          break;
      
        default:
          break;
      }
    }
  },

  filters:{
    diffForHumans: (date) => {
      if(!date){return 'over'}
      return dayjs(date).fromNow(true)
    },
  },
  
  methods: {
    ...mapActions(['setBidChatHeader']),
    startBidChat(bid){
      this.setBidChatHeader(bid)
      this.$router.push('/Bid/Chat')
    }
  },

  created(){
    dayjs.extend(relativeTime)
  }
}
</script>

<style lang="css" scoped>
.wrapper{
    /* background-color: #eeeeee; */
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
    font-size: 1rem;
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
    padding: 1rem 3rem;
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
