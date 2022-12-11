<template>
  <div class="main bg-image">
    <v-toolbar 
    class="pb-4 top-toolbar"
    text
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }">

        <section>

          <div class="d-flex">
            <v-toolbar-title>{{getBidChatHeader.task.code + ": " + getBidChatHeader.task.topic}}</v-toolbar-title>
          </div>
            <v-toolbar-title>
              <v-row class="no-gutters" >
                <v-col class="col-8">
                  {{"Broker: " + getBidChatHeader.task.broker.user.username}}
                </v-col>
                <v-spacer />
                <v-col class="col-3 d-flex justify-end">
                  <span class="blue--text  pointer" @click="openMoreInfo" v-if="!more_info_open">
                    {{'more info'}}
                  </span>
                  <span class="blue--text  pointer"  @click="closeMoreInfo" v-if="more_info_open">
                    {{'close'}}
                  </span>
                </v-col>
              </v-row>
            </v-toolbar-title>

        </section>

    </v-toolbar>
   
    <v-toolbar 
    :min-height="100"
    text
    class="bottom-toolbar"
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }">
      <section class="section" v-if="getBidChatHeader.status < 2">
        <div class="d-flex justify-center mb-2">
          <v-btn 
          small 
          :loading="pulling"
          @click="pull"
          class="red white--text">
            pull bid
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

      <section v-else class="d-flex title justify-center">
        <v-icon class="mr-2 red--text">
          mdi-alert
        </v-icon>
        <span v-if="getBidChatHeader.status == 2">
          {{"Conversation closed.  Bid Pulled."}}
        </span>
        <span v-if="getBidChatHeader.status == 3">
          {{"Conversation closed.  Bid Rejected."}}
        </span>
        <span v-if="getBidChatHeader.status == 4">
          {{"Conversation closed.  Bid Accepted."}}
        </span>
        <span v-if="getBidChatHeader.status == 5">
          {{"Conversation closed.  Task assigned"}}
        </span>
      </section>
    </v-toolbar>
    
    <section v-if="fetching_messages">

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
          getting chat's messages
        </v-col>
      </v-row>

    </section>
    <div class="transparent transparent--text" id="instructions">
      <a href="#instructions" id="top_button"></a>
    </div>
    
    <section v-if="more_info_open" style="margin-top: 10rem;" class="">
        
      <v-row class="d-flex mx-4 no-gutters bold">
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
          {{getBidChatHeader.task.instructions }}
        </v-card> 
        <!-- {{getBidChatHeader.task}} -->
      </div>
      
      <v-row class="d-flex mx-4 no-gutters bold">
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
        <v-card class="mx-4 pa-1 rounded mb-1" v-for="file in getBidChatHeader.task.files" :key="file.id">
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
        {{getBidChatHeader.task.expiry_time | diffForHumans}}
        </v-col>
      </v-row>

      <v-row class="d-flex mx-4 no-gutters bold" v-if="getBidChatHeader.task.page_cost">
        <v-col class="col-4">
          {{"Pages: " }}
        </v-col>
        <v-col class="col-8">
        {{page_count}}
        </v-col>
      </v-row>

      <v-row class="d-flex mx-4 no-gutters bold" v-if="getBidChatHeader.task.page_cost">
        <v-col class="col-4">
          {{"CPP: " }}
        </v-col>
        <v-col class="col-8">
        {{"KES " + getBidChatHeader.task.page_cost}}
        </v-col>
      </v-row>

      <v-row class="d-flex mx-4 no-gutters bold">
        <v-col class="col-4">
          {{"Full pay: " }}
        </v-col>
        <v-col class="col-8">
        {{"KES " + getBidChatHeader.task.full_pay}}
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
    <chat-box :messages="getBidMessages" :type='"bid"' v-if="!fetching_messages"/>
    
    <div class="transparent transparent--text bottom" id="bottom">kazibin</div>
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
    <div class="transparent transparent--text bottom" id="bottom">
    <a href="#bottom" id="bottom_button"></a>
  </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ChatBox from '../../components/ChatBox.vue'

export default {
  name: 'WriterChat',

  components:{ChatBox},
  
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

      if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
      return dayjs(date).format('DD/M/YY @ hh:mm') + " ( " + dayjs(date).fromNow(true) + " left )"
    },
  },

  computed: {
    ...mapGetters(['getBidChatHeader', 'getBidMessages']),
    
    pay_mode() {
      switch (this.getBidChatHeader.task.pay_day) {
        case '1965-05-28 00:00:00':
          return 'paid on delivery.'
          break;
        case '1997-09-17 00:00:00':
          return 'paid on approval'
          break;
      
        default:
          return 'paid on ' + dayjs(this.getBidChatHeader.task.pay_day).format('DD/MM') + " ( in " +
          dayjs(this.getBidChatHeader.task.pay_day).fromNow(true) +".) "
          break;
      }
    },

    page_count(){
      if(this.getBidChatHeader.task.pages){
        return this.getBidChatHeader.task.pages + " pages"
      } else {
        return " the whole task"
      }
    }
  },
  
  data(){
    return{
      instructions_open: false,
      files_open: false,
      more_info_open: false,
      uploading: false,
      sending: false,
      draft: null,
      pulling: false,
      fetching_messages: true 
    }
  },

  methods:{
    ...mapActions(['sendBidMessage', 'fetchMessages', 'pullBid']),

    openMoreInfo(){
      this.more_info_open = true
      this.goTop()
    },

    closeMoreInfo(){
      this.more_info_open = false
      this.goBottom()
    },

    openFileSelect(){
      document.getElementById('files').click()
    },

    registerFiles(event){
      this.uploading = true
      var fd = new FormData()
      let files = event.length
      for (let i = 0; i < files; i++) {
        fd.append('documents[]', event[i])
      }
      this.formdata = fd;
      this.formdata.append('bid_id', this.getBidChatHeader.id)

      this.sendBidMessage(this.formdata).then(response => {
        this.uploading = false
        this.goBottom()
      })
    },
  
    goBottom(){
      document.getElementById('bottom_button').click()
    },
    
    goTop(){
      document.getElementById('top_button').click()
    },
    send(){
      this.sending = true
      if(!this.draft){
        this.sending = false
        return
      } else{
        const data = {
          bid_id: this.getBidChatHeader.id,
          message: this.draft
        }
        this.sendBidMessage(data).then((response) => {
          if(response){
            this.draft = null
            this.goBottom()
            this.sending = false
          }
        })
      }
    },

    pull(){
      let prompt_message = "You are about to pull bid on this task. It will no longer be possible for you to be assigned this task or bid on it again. Proceed?"

      if(!confirm(prompt_message)){
        return
      }

      this.pulling = true
      const data = {
        bid_id: this.getBidChatHeader.id
      }

      this.pullBid(data).then(() => {
        this.pulling = false
      })
    },

    async boot(){
      try{
        await this.fetchMessages({bid_id: this.getBidChatHeader.id}).then((res) => {
          this.fetching_messages = false
        })
      } catch (e){
      }
    }
  },
  mounted(){
    this.boot()
  },
  
  created(){
    dayjs.extend(relativeTime)
  },
}
</script>

<style lang="css" scoped>
   .section{
    width: 100%;
   }  
  .full-width{
    width: 100vw;
  }
  .large-width{
    width: 58.3333vw;
  }
  .medium-width{
    width: 83.333vw;
  }
  .all_right{
    display: flex;
    justify-content: flex-end;
  }
  .main{
    height: 100%;
  }
  .bottom{
    height: 3rem;
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
  .bottom-toolbar{
    padding-bottom: 5rem; 
    position: fixed; 
    bottom: 0; 
    right: 0;
  }
  .top-toolbar{
    padding-bottom: 5rem; 
    position: fixed; 
    top: 50px; 
    right: 0; 
    z-index: 1;
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
    background-image: url('~@/assets/c2.jpg');
    background-attachment: fixed;
  }
</style>
