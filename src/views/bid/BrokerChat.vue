<template>
  <div class="main bg-image">
    <v-toolbar 
    class="pb-4 top-toolbar"
    flat
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }"
    >
        <section>

          <div class="d-flex">
            <v-toolbar-title>{{getCurrentBidTask.code + ": " + getCurrentBidTask.topic}}</v-toolbar-title>
          </div>
          <div class="d-flex">
            <v-toolbar-title class="ml-1">{{"Writer: " + getBidChatHeader.writer.user.username}}</v-toolbar-title>
          </div>

        </section>

    </v-toolbar>
   
    <v-toolbar 
    :min-height="100"
    flat
    class="bottom-toolbar"
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }">
      <section class="section"  v-if="getBidChatHeader.status < 2">
        
        <div class="d-flex justify-center mb-2">
          <v-btn 
          small 
          :loading="rejecting"
          @click="reject"
          class="red white--text mx-1">
            reject bid
          </v-btn>
          <v-btn 
          :loading="accepting"
          @click="accept"
          small 
          class="success white--text mx-1">
            accept bid
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
    <chat-box :messages="getBidMessages" v-if="!fetching_messages" :type='"bid"' />

    <!-- <div class="d-flex align-end" style="min-height:calc(100vh - 300px);" v-if="!fetching_messages">
      <div>

        <div class="d-flex message"
          v-for="message in getBidMessages" 
          :key="message.created_at" 
          :class="{ all_right: message.mine }">
            <div style="min-height: 3rem; width:100vw;"  class="justify-end pa-2">
              <div :class="{
              'center d-flex': !message.mine  && message.user_id == 1, 
              'right': message.mine && (message.type == 'text') && (message.type == 'text'), 
              'file-right': message.mine && !(message.type == 'text'), 
              'left': !message.mine  && message.user_id != 1 && (message.type == 'text'), 
              'file-left': !message.mine  && message.user_id != 1 && !(message.type == 'text'), 
              }">
                <div v-if="message.type == 'text'" >
                  {{message.message}}
                </div>
                <v-row v-else class="no-gutters grey lighten-3">
                  <v-col class="col-2 d-flex align-center">
                      <v-icon small class="pa-2 green--text" v-if="!isImage(message.message)">mdi-file</v-icon>
                      <v-icon small class="pa-2 green--text" v-if="isImage(message.message)">mdi-image</v-icon>
                  
                  </v-col>
                  
                  <v-col class="col-8 align-center black--text d-flex justify-center">
                    {{message.message | refineFileNameMessage}}
                  </v-col>
                  
                  <v-col class="col-2 d-flex align-center justify-end">
                    <v-icon x-small class="pa-1 white--text green rounded">mdi-arrow-collapse-down</v-icon>
                  </v-col>
                </v-row>
              </div>
            </div>
        </div>

      </div>
    </div> -->

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
import ChatBox from '../../components/ChatBox.vue'
export default {
  name: 'BrokerChat',

  components:{
    ChatBox
  },
  
  filters:{
    refineFileNameMessage: (name) => {
      if(name.length > 20 ){
        return name.substring(0, 20) + '...'
      } else {
        return name.substring(0, name.lastIndexOf('.'))
      }
    },
  },
  
  computed: {
    ...mapGetters(['getBidChatHeader', 'getBidMessages', 'getCurrentBidTask']),
  },
  
  data(){
    return{
      uploading: false,
      sending: false,
      draft: null,
      pulling: false,
      fetching_messages: true,
      accepting: false,
      rejecting: false
    }
  },

  methods:{
    ...mapActions(['sendBidMessage', 'fetchMessages', 'acceptBid', 'rejectBid']),
    
    isImage(url){
      let base = url.substring((url.lastIndexOf('.') + 1), (url.lastIndexOf('.') + 4))
      if(base == 'jpg' || base =='png' || base =='jpe' || base =='svg'){
        return true
      }
      return false
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

    accept(){
      let prompt_message = "You are about to accept this bid from " + this.getBidChatHeader.writer.user.username + 
      ". On task " + this.getCurrentBidTask.code + ": " + this.getCurrentBidTask.topic + ". All other bids will be dropped. \r\n Procced?"
      if(!confirm(prompt_message)){
        return
      }
      this.accepting = true
      const data = {
        bid_id: this.getBidChatHeader.id
      }
      this.acceptBid(data).then(() => {
        this.accepting = false
      })
    },

    reject(){
      let prompt_message = "You are about to reject this bid from " + this.getBidChatHeader.writer.user.username + 
      ". On task " + this.getCurrentBidTask.code + ": " + this.getCurrentBidTask.topic + ". The writer will be unable to bid on it again. \r\n Procced?"
      if(!confirm(prompt_message)){
        return
      }
      this.rejecting = true
      const data = {
        bid_id: this.getBidChatHeader.id
      }
      this.rejectBid(data).then(() => {
        this.rejecting = false
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
  }
}
</script>

<style lang="css" scoped>
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
  .right{
    text-align: right;
    margin-left: 3rem;
    position: relative;  
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
