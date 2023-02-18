<template>
<div class="main white">
  <v-toolbar 
    class="pb-4 grey lighten-3 mb-4 top-toolbar"
    text
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }"
    >
        <div style="width:100%;">
          <v-toolbar-title class="ml-1">{{getTaskChatHeader.code + ": " + getTaskChatHeader.topic}} </v-toolbar-title> 
          <section v-if="getTaskChatHeader.status < 2">
            <v-toolbar-title>
              <v-row class="no-gutters ml-1 ">
                <v-col>
                  {{getTaskChatHeader.unit +" "+ getTaskChatHeader.type}}
                </v-col>
                <v-col class="col-4 d-flex justify-end">
                  <span class="blue--text pointer" @click="openMoreInfo" v-if="!more_info_open">
                    {{'more info'}}
                  </span>
                  <span class="blue--text pointer"  @click="closeMoreInfo" v-if="more_info_open">
                    {{'close'}}
                  </span>
                </v-col>
              </v-row>
            </v-toolbar-title>
          </section>

          <section v-else>
            <v-toolbar-title class="ml-1" v-if="getTaskChatHeader.broker">
                <v-row class="no-gutters">
                  <v-col class="col-8">
                    {{'Broker: '}} {{getTaskChatHeader.broker.user.username}}
                  </v-col>
                  <v-col class="d-flex justify-end col-4">
                    <span class="blue--text pointer" @click="closeMoreInfo" v-if="more_info_open">
                      {{'more info'}}
                    </span>
                    <span class="blue--text pointer" @click="openMoreInfo" v-if="!more_info_open">
                      {{'close'}}
                    </span>
                  </v-col>
                </v-row>
            </v-toolbar-title>
            
            <v-toolbar-title v-else>
                <v-row class="no-gutters">
                  <v-col class="col-8">
                      {{'Writer: '}} {{getTaskChatHeader.writer.user.username}}
                  </v-col>
                  <v-col class="d-flex justify-end col-4">
                    <span class="blue--text pointer" @click="closeMoreInfo" v-if="more_info_open">
                      {{'close'}}
                    </span>
                    <span class="blue--text pointer" @click="openMoreInfo" v-if="!more_info_open">
                      {{'more info'}}
                    </span>
                  </v-col>
                </v-row>
            </v-toolbar-title>
            </section>
        </div>
  </v-toolbar>
  
  <div class="transparent transparent--text" id="instructions">
    <a href="#instructions" id="top_button"></a>
  </div>
  <section v-if="more_info_open" style="margin-top: 4rem;">
    <v-row class="d-flex mx-4 no-gutters bold">
      <v-col class="col-12 d-flex justify-end">
          <h3 class="py-1 px-4 white rounded" >
              {{status}}
          </h3>
      </v-col>
      <v-col class="col-2 d-flex align-center">
        {{"Instructions: "}}
      </v-col>
      <v-col class="col-10 justify-end d-flex">
        <v-icon @click="instructions_open = false" v-if="instructions_open">
          mdi-arrow-up
        </v-icon>
        <v-icon @click="instructions_open = true" v-if="!instructions_open">
          mdi-arrow-down
        </v-icon>
      </v-col>
    </v-row>
    <div class="px-2">
      <v-card class="d-flex mx-4 white instructions elevated-4 px-2" v-if="instructions_open"> 
        {{getTaskChatHeader.instructions }}
      </v-card> 
    </div>
    
    <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskChatHeader.files.length > 0">
      <v-col class="col-2 d-flex align-center">
        {{"Files: "}}
      </v-col>
      <v-col class="col-10 justify-end d-flex">
        <v-icon @click="files_open = false" v-if="files_open">
          mdi-arrow-up
        </v-icon>
        <v-icon @click="files_open = true" v-if="!files_open">
          mdi-arrow-down
        </v-icon>
      </v-col>
    </v-row>

    <div v-if="files_open">
      <v-card class="mx-4 pa-1 rounded mb-1" v-for="file in getTaskChatHeader.files" :key="file.id">
        <v-row class="no-gutters">
          <v-col class="col-1 d-flex align-center">
              <v-icon x-small class="white--text green rounded pa-1">mdi-image</v-icon>
          </v-col>
          <v-col class="col-10 d-flex align-center justify-center">
            {{file.name | refineFileName}}
          </v-col>
          <v-col class="col-1 d-flex align-center justify-center">
            <a :href="gethref(file.url)" class=" ">
              <v-icon x-small class="white--text green rounded pa-1">mdi-arrow-collapse-down</v-icon>
            </a> 
          </v-col>
        </v-row>
      </v-card>
    </div>

    <v-row class="d-flex mx-4 no-gutters bold">
      <v-col class="col-4">
        {{"Deadline: " }}
      </v-col>
      <v-col class="col-8 d-flex align-center">
       {{getTaskChatHeader.expiry_time | diffForHumans}}
      </v-col>
    </v-row>

    <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskChatHeader.page_cost">
      <v-col class="col-4">
        {{"Pages: " }}
      </v-col>
      <v-col class="col-8">
       {{page_count}}
      </v-col>
    </v-row>

    <v-row class="d-flex mx-4 no-gutters bold" v-if="getTaskChatHeader.page_cost">
      <v-col class="col-4">
        {{"CPP: " }}
      </v-col>
      <v-col class="col-8">
       {{"KES " + getTaskChatHeader.page_cost}}
      </v-col>
    </v-row>

    <v-row class="d-flex mx-4 no-gutters bold">
      <v-col class="col-4">
        {{"Full pay: " }}
      </v-col>
      <v-col class="col-8">
       {{"KES " + getTaskChatHeader.full_pay}}
      </v-col>
    </v-row>

    <v-row class="d-flex mx-4 no-gutters bold">
      <v-col class="col-4">
        {{"Pay mode: " }}
      </v-col>
      <v-col class="col-8">
       {{pay_mode}}
      </v-col>
    </v-row>

  </section>
    
  <section v-if="(getTaskChatHeader.takers) && (getTaskChatHeader.status < 2)" style="margin-top: 4rem;">
  
    <div class="mx-4 bold">
      {{"offers: "}}
      {{getTaskChatHeader.offers.length}}
    </div>
    
    <section v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
      <div
      @click="startOfferChat(offer)"
      class="red lighten-4 mx-2 my-1 d-flex pa-2 rounded" 
      text
      v-for="offer in getTaskChatHeader.offers" :key="offer.id">
        <v-list-item-avatar
          tile
          size="80"
          color="grey"
          class="d-flex align-center justify-center"
        >
          <span style="font-size:3rem; font-weight: 900; color: white;" class="d-flex">
            {{initials(offer.writer.user.username)}}

          </span>
        </v-list-item-avatar>
        <div>
          <div class="d-flex align-center mx-4" style="font-size:1rem; font-weight: 900;">
            to: {{offer.writer.user.username}}
            <v-icon v-if="offer.unread_message"  small class="green--text ml-4">
              mdi-message
            </v-icon>
          </div>
          <div class="px-4"> 
            {{offer.last_message[0].message }}
          </div>
        </div>
      </div>
    </section>
    <section v-else>
      <d-offers-card :offers="offers"/>
    </section>
  
  </section>

  <section v-if="(getTaskChatHeader.bids) && (getTaskChatHeader.status < 2)" style="margin-top: 4rem;">
    
    <div class="mx-4 bold">
      {{"bids: "}}
      {{getTaskChatHeader.bids.length}}
    </div>

    <div class="padder" v-if="!getTaskChatHeader.bids.length">
      <v-row class=" no-gutters padded">
        <v-col class="col-12 col-md-6 d-flex align-center justify-center">
          <empty-here />
        </v-col>
        <v-col class="col-12 col-md-6 d-flex align-center justify-center">
          <div>
            You have no bid yet for this job. Get some leads by sharing the link to your network. Or offer it to some writers on your network.
            <div class="d-flex justify-center mb-2">
              <v-btn class="green submit-button white--text" small>
                copy link
              </v-btn>
            </div>

            <div class="d-flex justify-center mb-2">
              <v-btn class="green submit-button white--text" small @click="reassigning = true" :disabled="reassigning">
                offer to writer
              </v-btn>
            </div>

            <div class="d-flex justify-center mb-2">
              <v-btn class="red submit-button white--text" small @click="deleteIt" :loading="deleting">
                <v-icon small class="white--text">
                  mdi-delete
                </v-icon>
                delete
              </v-btn>
            </div>
            <section v-if="reassigning">
            <div class="d-flex justify-end">
              <v-icon class="red--text" @click="reassigning = false">
                mdi-close
              </v-icon>
            </div>
              <div class="grey d-flex lighten-3 align-center liaison" v-for="(writer, i) in getMyWriters" :key="i">
                <div class="pa-2">
                  <v-icon small class="green--text" v-if="isSelected(writer.writer_id)">
                    mdi-check
                  </v-icon>
                  <span class="bold">
                    {{writer.code}}
                    {{": "}}
                    {{writer.username}}
                  </span>
                </div>
                <v-spacer />
                <v-btn x-small class="white--text mr-2 success" @click="addWriter(writer.writer_id)" v-if="!isSelected(writer.writer_id)">
                  select
                </v-btn>
                <v-btn x-small class="white--text mr-2" style="background-color: tomato;" @click="removeWriter(writer.writer_id)" v-if="isSelected(writer.writer_id)">
                  remove
                </v-btn>
              </div>
              <div class="d-flex justify-end">
                <v-btn small class="success mt-2" v-if="selected_writers.length > 0" @click="selectWriters" :disabled="applied || (( selected_writers.length < 1 ) && ( getMyWriters.length > 1 ))">
                  {{applied ? 'applied' : 'apply'}}
                  <v-icon small class="green--text" v-if="applied">
                    mdi-check
                  </v-icon>
                </v-btn>
              </div>
              <div class="d-flex justify-end">
                <v-btn small class="success mt-2" @click="reassign" :disabled="(!applied || (( selected_writers.length < 1 ) ))" :loading="submiting_reassign">
                  {{'submit'}}
                </v-btn>
              </div>
            </section>
          </div>
        </v-col>
      </v-row>
    </div>

    <section v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
      <div
      class="red lighten-4 mx-2 my-1 pa-2 rounded pointer" 
      text
      @click="startBidChat(bid)"
      v-for="bid in getTaskChatHeader.bids" :key="bid.id">
        <div class="d-flex">
          <v-list-item-avatar
            tile
            size="80"
            color="tomato"
            class="d-flex align-center justify-center"
          >
            <span style="font-size:3rem; font-weight: 900; color: white;" class="d-flex">
              {{initials(bid.writer.user.username)}}
            </span>
          </v-list-item-avatar>
          <div>
            <div class="d-flex align-center mx-4" style="font-size:1rem; font-weight: 900;">
              from: {{bid.writer.user.username}}
              
              <v-icon v-if="bid.unread_message"  small class="green--text ml-4">
                mdi-message
              </v-icon>
            </div>
            <div class="px-4"> 
              {{bid.last_message[0].message }}
            </div>
          </div>
        </div>
        <div class="px-4 d-flex justify-end bold" v-if="bid.status == 2"> 
          {{'bid pulled'}}
        </div>
        <div class="px-4 d-flex justify-end bold" v-if="bid.status == 3"> 
          {{'bid rejected'}}
        </div>
      </div>
    </section>
    <section v-else class="ma-4">
      <d-bids-table :bids="getTaskChatHeader.bids"/>
    </section>    
  </section>
  <div class="bg-image" style="min-height:calc(100vh - 30px); margin-top: 4rem;" v-if="!fetching_messages">
    <chat-box :messages="getTaskMessages" v-if="!fetching_messages" :type='"task_chat"'/>
  </div>
  
  
  <div style=" margin-bottom: 100px;">
    <create-invoice v-if="getTaskChatInvoice" />
    <view-invoice v-if="getTaskChatViewInvoice" :invoice_id="getTaskChatHeader.invoice_id" :recipient="recipient" />
      <!--===== rating section ====-->
    <section class="ma-4 pa-4 grey lighten-3 " v-if="rating_open">
      <div class="d-flex justify-end">
        <v-icon @click="rating_open = false" class="red--text">
          mdi-close
        </v-icon>
      </div>
      <v-text-field
      outlined
      v-model="review"
      clearable
      type="name"
      label="write a review"
      class="white"
      required
      > </v-text-field>
      <div class="d-flex">
        <v-rating
          v-model="rating"
          small
          background-color="white"
          color="yellow accent-4"
          dense
          size="18"
          :length="5"
          hover
        ></v-rating> 
        {{"("}} {{rating}} {{" / 5)"}}
        <v-spacer />
        <v-btn 
        :disabled="rating == 0 || review == ''"
        small
        @click="rate"
        :loading="is_rating" 
        class="green white--text mx-1">
          rate
        </v-btn>
      </div>
    </section>
  </div>
  
  <v-toolbar 
  v-if="getTaskChatHeader.status > 1"
  :min-height="100"
  text
  class="bottom-toolbar"
  :class="{
    'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
    'medium-width':  $vuetify.breakpoint.md,
    'large-width':  $vuetify.breakpoint.lg,
  }">
    <section class="section" >

      <div class="d-flex justify-center mb-2">
        
        <v-btn 
          v-if="getTaskChatHeader.status == 2 && !marked"
          small 
          :loading="marking"
          @click="complete"
          class="green white--text mx-1">
            mark complete
        </v-btn>
        
          <!-- :disabled="initialise_pay"
          @click="initialisePay" -->
        <v-btn 
          v-if="getTaskChatHeader.status == 3"
          small 
          :disabled="getTaskChatInvoice"
          @click="openInvoiceCreate"
          class="green white--text mx-1">
            create invoice
        </v-btn>
        <v-btn 
          v-if="getTaskChatHeader.status == 3"
          small 
          :disabled="getTaskChatInvoice"
          @click="openInvoiceCreate"
          class="red white--text mx-1">
            cancel
        </v-btn>
        
        <v-btn 
          v-if="getTaskChatHeader.status == 5 || getTaskChatHeader.status == 8"
          small 
          :disabled="getTaskChatViewInvoice"
          @click="openInvoiceView"
          class="green white--text mx-1">
            view invoice
        </v-btn>

        <v-btn 
          v-if="canRate"
          small 
          :disabled="rating_open"
          @click="openRating"
          class="green white--text mx-1">
            {{getTaskChatHeader.broker ? 'rate broker' : 'rate writer'}}
        </v-btn>
        
      </div>
        

      <v-row class="no-gutters d-flex align-center">
        <v-col class="col-9">
          <textarea v-model="draft" class="send-bar pa-1" placeholder="message" label="message" />
        </v-col>
        <v-col class="col-4 d-flex justify-space-between send-buttons">
          <v-btn class="blue" @click="openFileSelect"
          :loading="uploading"
          small>
            <v-icon class="white--text">
              mdi-attachment
            </v-icon>
          </v-btn>
          <v-btn class="green" 
          @click="send" 
          :loading="sending"
          small>
            <v-icon class="white--text">
              mdi-send
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    
    </section>

  </v-toolbar>

  <v-file-input
  class="d-none"
  outlined
  id="files"
  @change="registerFiles"
  multiple
  label="Files"
  accept="image/*,
  application/pdf,
  application/vnd.ms-excel,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  application/msword"
  ></v-file-input> 
  <!-- <div class="transparent transparent--text bottom" id="bottom">
    <a href="#bottom" id="bottom_button"></a>
  </div> -->

</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import EmptyHere from '../../components/widgets/EmptyHere.vue'
import CreateInvoice from './CreateInvoice.vue'
import ViewInvoice from './ViewInvoice.vue'
import ChatBox from '../../components/ChatBox.vue'
import DBidsTable from './DBidsTable.vue'
import DOffersCard from '../../components/dashboard/desktop/DOffersCard.vue'
export default {
  components: { EmptyHere, CreateInvoice, ViewInvoice, ChatBox,DBidsTable, DOffersCard },
  name: "TaskChat",
  filters:{
       
    refineFileNameMessage: (name) => {
      if(name.length > 20 ){
        return name.substring(0, 20) + '...'
      } else {
        return name.substring(0, name.lastIndexOf('.'))
      }
    },
    
    diffForHumans: (date) => {
      
      let ex = dayjs(date).format('DD/M/YY @ hh:mm')
      let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

      if((today > ex))
      {
        return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'
      }
      return dayjs(date).format('DD/M/YY @ hh:mm') + " ( " + dayjs(date).fromNow(true) + " left )"
    },
    
    orderLongString: (string) => {
      return string
    },
    
    refineFileName: (name) => {
      return name.substring(0, name.lastIndexOf('.'))
    },
    
    cutString: (string) => {
      return string.substring(0,30) 
    },
  },
  computed:{
    ...mapGetters(['getUser', 'getTaskChatHeader', 'getMyWriters', 'getTaskMessages', 'getTaskChatInvoice', 'getTaskChatViewInvoice']),
    status(){
      switch (this.getTaskChatHeader.status) {
        case 2:
          return 'underway'
          break;

        case 3:
          return 'complete'
          break;
          
        case 4:
          return 'canceled'
          break;

        case 5:
          return 'invoiced'
          break;

        case 6:
          return 'paid'
          break;

        case 7:
          return 'canceled (pending)'
          break;

        case 8:
          return 'paid (pending)'
          break;
      
        default:
          return 'unassigned'
          break;
      }
    },

    recipient(){
      if(this.getTaskChatHeader.writer){
        return 'writer'
      } else {
        return 'broker'
      }
    },

    pay_mode() {
      switch (this.getTaskChatHeader.pay_day) {
        case '1965-05-28 00:00:00':
          return 'paid on delivery.'
          break;
        case '1997-09-17 00:00:00':
          return 'paid on approval'
          break;
      
        default:
          return 'paid on ' + dayjs(this.getTaskChatHeader.pay_day).format('DD/MM') + " ( in " +
          dayjs(this.getTaskChatHeader.pay_day).fromNow(true) +" ) "

          break;
      }
    },

    page_count(){
      if(this.getTaskChatHeader.pages){
        return this.getTaskChatHeader.pages + " pages"
      } else {
        return " the whole task"
      }
    },

    canRate(){
      if(this.getTaskChatHeader.status < 3){
        return false
      } 

      if(this.getTaskChatHeader.ratings){
        let canrate = true
        this.getTaskChatHeader.ratings.forEach(rating => {
          if(rating.initiator_id == this.getUser.id){
            canrate = false
          }
        });

        return canrate
      }
    },

    offers(){
      if(!this.getTaskChatHeader.offers){
        return 
      } else {
        console.log(this.getTaskChatHeader)
        let offers = []
        this.getTaskChatHeader.offers.forEach(offer => {
          offer.task = {}
          // offer.task = this.getTaskChatHeader writer_id
          offer.task.code = this.getTaskChatHeader.code
          offer.task.topic = this.getTaskChatHeader.topic
          offer.task.unit = this.getTaskChatHeader.unit
          offer.task.status = this.getTaskChatHeader.status
          offer.writer_id = offer.writer_id
          offers.push(offer)
        })
        return offers
      }
    }
  },
  data(){
    return{
      is_rating: false,
      rating_open: false,
      instructions_open: false,
      files_open: false,
      reassigning: false,
      selected_writers: [],
      applied: false,
      more_info_open: false,
      takers: [],
      marking: false,
      marked: false,
      draft:'',
      uploading: false,
      sending: false,
      fetching_messages: true,
      submiting_reassign: false,
      deleting: false,
      formdata: null,
      rating: null,
      review: ''
    }
  },
  methods:{
    ...mapActions([
      'setTaskOfferChatHeader', 'stepSix', 'setBidChatHeader', 'setCurrentBidTask', 
      'fetchTaskMessages', 'sendTaskMessage', 'markComplete', 'toggleTaskChatInvoice',
      'createInvoice', 'toogleTaskChatViewInvoice', 'stepSix', 'deleteTask', 'rateUser'
    ]),

    rate(){
      const data = {
        writer_id: this.getTaskChatHeader.writer_id,
        broker_id: this.getTaskChatHeader.broker_id,
        task_id: this.getTaskChatHeader.id,
        review: this.review,
        rating: this.rating
      }
      this.rateUser(data)
    },
    
    isImage(url){
      let base = url.substring((url.lastIndexOf('.') + 1), (url.lastIndexOf('.') + 4))
      if(base == 'jpg' || base =='png' || base =='jpe' || base =='svg'){
        return true
      }
      return false
    },

    registerFiles(event){
      this.uploading = true
      var fd = new FormData()
      let files = event.length
      for (let i = 0; i < files; i++) {
          fd.append('documents[]', event[i])
      }
      this.formdata = fd;
      this.formdata.append('task_id', this.getTaskChatHeader.id)

      this.sendTaskMessage(this.formdata).then(response => {
        this.uploading = false
        this.goBottom()
      })
    },
    
    deleteIt(){
      const confirmation = "You are about to delete this task. This process is irreversable. \n Proceed?"
      if(!confirm(confirmation)){return}
      this.deleting = true
      const data = {
        task_id: this.getTaskChatHeader.id
      }
      this.deleteTask(data).then((res) => (
        this.deleting = false,
        this.$router.push('/dashboard')
      ))
    },

    initials(username){
      let matches = username.match( /\b(\w)/g )
      return matches.join('')
    },

    openMoreInfo(){
      this.more_info_open = true
      this.goTop()
    },
    closeMoreInfo(){
      this.more_info_open = false
      this.goBottom()
    },

    openRating(){
      this.rating_open = true,
      this.goBottom()
    },

    complete(){
      const confirmation = 'You are about to mark task ' + this.getTaskChatHeader.code + ' as complete. You will be able to either cancel it or create an invoice for the task afterwards. Proceed?'
      if(!confirm(confirmation)){
        return
      }
      this.marking = true
      const data = {
        task_id: this.getTaskChatHeader.id
      }
      this.markComplete(data).then((res) => {
        this.marking = false
      })
    },

    openInvoiceCreate(){
      this.toggleTaskChatInvoice(true)
      this.goBottom()
    },

    openInvoiceView(){
      this.toogleTaskChatViewInvoice(true)
      this.goBottom()
    },

    gethref(file_url){
      return 'http://192.168.0.104:8000/storage/' + file_url
    },

    openFileSelect(){
      document.getElementById('files').click()
    },

    goBottom(){
      // this.$nextTick(() => {
      //   document.getElementById('bottom').scrollIntoView({
      //     behavior: 'smooth'
      //   })
      // })
      // console.log('go bottom called');
    },
    
    goTop(){
      //document.getElementById('top_button').click()
    },

    send(){
      this.sending = true
      if(!this.draft){
        this.sending = false
        return
      } else{
        const data = {
          task_id: this.getTaskChatHeader.id,
          message: this.draft
        }
        this.sendTaskMessage(data).then((response) => {
          if(response){
            this.draft = null
            this.goBottom()
            this.sending = false
          }
        })
      }
    },
    
    isSelected(writer_id){
      return this.selected_writers.filter(id => (id == writer_id)).length
    },

    selectWriters(){
      this.applied = true
      let takers = ''
      this.selected_writers.forEach(id => {
        takers += id +  '_'
      });
      this.takers = takers
    },
    
    addWriter(writer_id){
      this.applied = false
      this.selected_writers.push(writer_id)
    },

    removeWriter(writer_id){
      this.applied = false
      this.selected_writers = this.selected_writers.filter(id => (id != writer_id))
    },

    startOfferChat(offer){
      this.setTaskOfferChatHeader(offer)
      this.$router.push('/Offer/Chat')
    },

    startBidChat(bid){
      this.setBidChatHeader(bid)
      this.setCurrentBidTask({
        topic: this.getTaskChatHeader.topic,
        code: this.getTaskChatHeader.code
      })
      this.$router.push('/Bid/Chat')
    },

    reassign(){
      let usernames = ''
        
        this.selected_writers.forEach(writer_id => {
          let writer = this.getMyWriters.filter(writer => (
            writer.writer_id == writer_id
          ))  
          usernames += (" -- " + writer[0].code+ ": " + writer[0].username + '\r\n')
        });
        
        let writer_vs_writers = null
        if(this.selected_writers.length > 1){
          writer_vs_writers = " writers: \r\n"
        } else {
          writer_vs_writers = " writer: \r\n"
        }
        
        let text = "This task will be offered to " + 
                    this.selected_writers.length + 
                    writer_vs_writers + "\r\n" +
                    usernames + "\r\n" +
                    "Proceed?"

        if(!confirm(text)){
          return
        }
        this.submiting_reassign = true
        const data = {
          takers: this.takers,
          difficulty: this.getTaskChatHeader.difficulty,
          task_id: this.getTaskChatHeader.id,
          broadcast_on_telegram: false,
          reassigning: true
        }

        this.stepSix(data).then((res) => {
          this.loading = res
        })
      }
  },
  created(){
    dayjs.extend(relativeTime)
  },
  mounted(){
    if(this.getTaskChatHeader.status > 1){
      const data = {
        task_id: this.getTaskChatHeader.id
      }
      this.fetchTaskMessages(data).then(
        this.fetching_messages = false,
        this.goBottom()
      )
    }
  }
}
</script>
<style lang="css" scoped>
  .main{
    height: 100%;
  }
  .tomato{
    background: tomato;
  }  
  .bottom{
    height: 0.1rem;
  }
  @media only screen and (max-width: 960px) {
    .bottom-toolbar{
      padding-bottom: 5rem; 
      position: fixed; 
      bottom: 0; 
      right: 0;
      width: 100%;
    }
  }
  @media only screen and (min-width: 960px) and (max-width: 1264px) {
    .bottom-toolbar{
      padding-bottom: 5rem; 
      position: fixed; 
      bottom: 0; 
      right: 0;
      width: 83.33%;
    }
  }
  @media only screen and (min-width: 1264px) {
    .bottom-toolbar{
      padding-bottom: 5rem; 
      position: fixed; 
      bottom: 0; 
      right: 0;
      width: 58.33%;
    }
  }
  .top-toolbar{
    padding-bottom: 5rem; 
    position: fixed; 
    top: 50px; 
    right: 0; 
    z-index: 1;
  }
  .padder{
    margin: 1rem 2rem;
    padding: 1rem 0;
    animation: flash; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
    animation-delay: 2s;
  }
  .padded{
    background-color: rgb(228, 227, 227);
    padding: 1rem 3rem;
    font-size: 0.8rem;
    border-radius: 3%;
  }
   .section{
    width: 100%;
  }
  .left{
    text-align: left;
    margin-right: 3rem;
    background-color: rgba(15,14,56,0.3);
    border-radius:10px;
    color: black;
    padding:  0.5rem 0.5rem;
  } 
  .center{
    text-align: center;
    justify-content: center;
    border-radius:10px;
    color: black;
    padding: 0.75rem;
  }
  .right{
    text-align: right;
    margin-left: 3rem;
    /* position: relative;   */
    right: 0;
    background-color: rgba(36, 99, 75, 0.3);
    border-radius:10px;
    padding: 0.5rem 0.5rem;
  } 
  .filemessage{
    width: 60vw;
  }
  .all_right{
    display: flex;
    justify-content: flex-end;
  }
  .main{
    height: 100%;
  }

  .send-bar{
    height: 3rem;
    position: fixed; 
    bottom: 5px; 
    width: 60%;
    background-color: white;
    border: solid 1px black;
    border-radius:4px;
  }
  .send-bar:focus{
    height: 50%; 
  }
  .send-buttons{
    position: fixed; 
    bottom: 1rem; 
    right: 5px;
  }
  
  .attach{
    position: fixed; 
    bottom: 3.5rem; 
    right: 0.25rem;
  }
  .send{
    position: fixed; 
    bottom: 0.25rem; 
    right: 0.25rem;
  }
  .bg-image{
    background-image: url('~@/assets/c21.jpg');
    background-attachment: fixed;
    background-repeat: repeat-x;
  }

</style>

