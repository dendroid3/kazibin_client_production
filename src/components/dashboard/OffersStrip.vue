<template lang="">
  <div class="grey lighten-3 col-block" >
    
    <v-row  class="box">
      <v-col class="col-12 pointer" :class="{
        redlist: offer.status == 1 || offer.status == 3, 
        blacklist: offer.status == 2, 
        greenlist: offer.status == 4, 
      }"
      @click="startOfferChat(offer)"
      >
      <!-- {{offer}} -->
        <span class="head">
          {{offer.task.code}}
          {{': '}}
          {{offer.task.topic}}  
          <v-icon class="green--text" small v-if="offer.unread_message">
            mdi-message
          </v-icon>
        </span>
        
        <br>
     
        {{offer.task.unit}} {{offer.task.type}} 
        {{posted_time}} <br>
        {{full_pay }}{{mode_of_payment}} <br>

        <span class="bold-2 mr-1 align-center d-flex justify-end">
          <span class="username">
            By: {{offer.task.broker.user.username}}
          </span>
          <v-spacer />
          {{offer.task.expiry_time | diffForHumans}} {{" to go"}}

        </span>
        
        <span class="red--text" v-if="offer.status == 1">
          {{"Offer Pending"}}
        </span>

        <span class="red--text" v-if="offer.status == 2">
          {{"Offer Canceled"}}
        </span>

        <span class="red--text" v-if="offer.status == 3">
          {{"Offer Rejected"}}
        </span>

        <span class="green--text" v-if="offer.status == 4">
          {{"Offer Accepted"}}
        </span>
        
        <span v-if="offer.status == 5">
          {{"Task Assigned"}}
        </span>
        <!-- <span class="d-flex my-0 mr-1 justify-end">
          {{offer.task.unit}} 
          <v-icon x-small class="mx-1 green--text">
            mdi-circle
          </v-icon>
          {{offer.task.expiry_time | diffForHumans}} {{" to go"}}
        </span> -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'
export default {
  name: 'OffersStrip',
  props: [
    'offer'
  ],
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
              return 'cancelled'
          case code = 3:
              return 'rejected'
          case code = 4:
              return 'accepted'
          default:
              return null
      }
    }
  },
  computed:{
    
    mode_of_payment(){
      switch (this.offer.task.pay_day) {
        case '1997-09-17 00:00:00':
          return ' to be paid on approval'
          break;
          
        case '1965-05-28 00:00:00':
          return ' to be paid on delivery'
          break;
      
        default:
          return ' to be paid in ' + dayjs(this.offer.task.pay_day).fromNow(true)
          break;
      }
    },
    
    full_pay(){
      // return this.offer.task
      if(this.offer.task.pages == null ){
          return this.offer.task.full_pay + ' KES for whole task'

      } else {
          return this.offer.task.pages * this.offer.task.page_cost + ' KES ( ' + this.offer.task.pages + ' @ ' + this.offer.task.page_cost + ' )'
      }
    },

    posted_time(){
      return 'posted ' + dayjs(this.offer.task.created_at).fromNow(true) + ' ago'
    },

  },
  methods:{
    ...mapActions(['setTaskOfferChatHeader']),
    
    startOfferChat(){
      this.setTaskOfferChatHeader(this.offer)
      this.$router.push('/Offer/Chat')
    }
  },
  created(){
    dayjs.extend(relativeTime)
  },
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
.redlist{
    background-color: #EEEEEE; 
    border-left: solid 20px red;
  }
  .purplelist{
    background-color: #EEEEEE; 
    border-left: solid 20px rgb(161, 1, 161);
  }
  .greenlist{
    background-color: #EEEEEE; 
    border-left: solid 20px green;
  }
  .yellowlist{
    background-color: #EEEEEE; 
    border-left: solid 20px yellow;
  }
  .blacklist{
    background-color: #EEEEEE; 
    border-left: solid 20px black;
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
</style>
