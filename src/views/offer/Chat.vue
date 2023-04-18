<template lang="">
  <div class="main bg-image">
    <v-toolbar 
      class="pb-4 top-toolbar"
      text
      :class="{
        'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
        'medium-width':  $vuetify.breakpoint.md,
        'large-width':  $vuetify.breakpoint.lg,
      }">

        <section v-if="(getOfferChatHeader.writer_id) && (getOfferChatHeader.writer_id != getUser.writer.id)">

          <div class="d-flex">
            <v-toolbar-title>{{getOfferChatHeader.writer.user.code + ": "}}</v-toolbar-title>
            <v-toolbar-title class="ml-1">{{getOfferChatHeader.writer.user.username}}</v-toolbar-title>
          </div>

          <div class="d-flex">
            <v-toolbar-title>{{"Offer"}}</v-toolbar-title>
          </div>

        </section>
        <section v-else>
           <div class="d-flex">
            <v-toolbar-title>{{getOfferChatHeader.task.broker.user.code + ": "}}</v-toolbar-title>
            <v-toolbar-title class="ml-1">{{getOfferChatHeader.task.broker.user.username}}</v-toolbar-title>
          </div>
          <div class="" style="width: 100vw;">
            <v-toolbar-title>
              <v-row class="no-gutters ml-1">
                <v-col class="c">
                  {{"Offer: " + getOfferChatHeader.task.code }}
                </v-col>
                <v-col class="col-4">
                  <span class="blue--text" @click="openMoreInfo" v-if="!more_info_open">
                    {{'more info'}}
                  </span>
                  <span class="blue--text"  @click="closeMoreInfo" v-if="more_info_open">
                    {{'close'}}
                  </span>
                </v-col>
              </v-row>
            </v-toolbar-title>
          </div>
        </section>

        <!-- <section v-else>

          <div class="d-flex">
            <v-toolbar-title>{{getRequestChatView.writer.code + ": "}}</v-toolbar-title>
            <v-toolbar-title class="ml-1">{{getRequestChatView.writer.username}}</v-toolbar-title>
          </div>

          <div v-if="getRequestChatView.mine">
            Request sent to writer
          </div>

          <div v-else>
            Request sent from writer
          </div>

        </section> -->

    </v-toolbar>
   
    <div class="transparent transparent--text" id="instructions">
      <a href="#instructions" id="top_button"></a>
    </div>
    <section v-if="more_info_open" style="margin-top: 4rem;">
        
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
          {{getOfferChatHeader.task.instructions }}
        </v-card> 
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
        <v-card class="mx-4 pa-1 rounded mb-1" v-for="file in getOfferChatHeader.task.files" :key="file.id">
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
        {{getOfferChatHeader.task.expiry_time | diffForHumans}}
        </v-col>
      </v-row>

      <v-row class="d-flex mx-4 no-gutters bold" v-if="getOfferChatHeader.task.page_cost">
        <v-col class="col-4">
          {{"Pages: " }}
        </v-col>
        <v-col class="col-8">
        {{page_count}}
        </v-col>
      </v-row>

      <v-row class="d-flex mx-4 no-gutters bold" v-if="getOfferChatHeader.task.page_cost">
        <v-col class="col-4">
          {{"CPP: " }}
        </v-col>
        <v-col class="col-8">
        {{"KES " + getOfferChatHeader.task.page_cost}}
        </v-col>
      </v-row>

      <v-row class="d-flex mx-4 no-gutters bold">
        <v-col class="col-4">
          {{"Full pay: " }}
        </v-col>
        <v-col class="col-8">
        {{"KES " + getOfferChatHeader.task.full_pay}}
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
    <chat-box :messages="getOfferMessages" :type='"offer"' v-if="!fetching_messages"/>

    <v-toolbar 
    :min-height="100"
    text
    class="bottom-toolbar"
    :class="{
      'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
      'medium-width':  $vuetify.breakpoint.md,
      'large-width':  $vuetify.breakpoint.lg,
    }">
    <section  class="section" v-if="getOfferChatHeader.status == 1" >

      <section v-if="(getOfferChatHeader.writer_id) && (getOfferChatHeader.writer_id != getUser.writer.id)" >
        
        <div class="d-flex justify-center mb-2">
          <v-btn 
          small 
          @click="cancel"
          class="red white--text">
            cancel offer
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
      <section class="section" v-else>
      <!-- <section class="section" v-else> -->
        
        <div class="d-flex justify-space-between">
          <v-spacer />
          
          <v-btn 
          small 
          :loading="accepting"
          @click="accept"
          class="success mr-1">
            accept
          </v-btn>
          
          <v-spacer />
          
          <v-btn 
          small 
          :loading="rejecting"
          @click="reject"
          class="red white--text">
            reject
          </v-btn>

          <v-spacer />

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
    </section>
    <section v-else class="d-flex title justify-center">
      <v-icon class="mr-2 red--text">
        mdi-alert
      </v-icon>
      <span v-if="getOfferChatHeader.status == 2">
        {{"Conversation closed. Offer cancelled."}}
      </span>
      <span v-if="getOfferChatHeader.status == 3">
        {{"Conversation closed. Offer Rejected."}}
      </span>
      <span v-if="getOfferChatHeader.status == 4">
        {{getUser.writer.id == getOfferChatHeader.writer_id ? "Conversation closed. Task already assigned to you. " : "Conversation closed. Task already assigned to " + getOfferChatHeader.writer.user.username}}
      </span>
      <span v-if="getOfferChatHeader.status == 5">
        {{"Conversation closed. Task accepted by another writer"}}
      </span>
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
    
    <div class="transparent transparent--text bottom" id="bottom">
      <a href="#bottom" id="bottom_button"></a>
    </div>
  </div>
</template>
<script>
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import ChatBox from '../../components/ChatBox.vue'
import { mapActions, mapGetters } from 'vuex'
  export default{
    name: 'Chat',

    components:{ChatBox},

    filters:{
      diffForHumans: (date) => {
        
   let ex = dayjs(date).format('DD/M/YY @ hh:mm')
   let today = dayjs(Date.now()).format('DD/M/YY @ hh:mm')

   if(today > ex){return dayjs(date).format('DD/M/YY @ hh:mm') + ' ( Past Deadline! )'}
        return dayjs(date).format('DD/M/YY @ hh:mm') + " ( " + dayjs(date).fromNow(true) + " left )"
      },
      
      refineFileNameMessage: (name) => {
          if(name.length > 20 ){
              return name.substring(0, 20) + '...'
          } else {
              return name.substring(0, name.lastIndexOf('.'))
          }
      },
    },
    computed:{
      ...mapGetters(['getOfferChatHeader', 'getUser', 'getOfferMessages', 'getUser']),
      options () {
        return {
          duration: 500,
          offset: 0,
          easing: 'easeInOutCubic',
        }
      },

      pay_mode() {
        switch (this.getOfferChatHeader.task.pay_day) {
          case '1965-05-28 00:00:00':
            return 'paid on delivery.'
            break;
          case '1997-09-17 00:00:00':
            return 'paid on approval'
            break;
        
          default:
            return 'paid on ' + dayjs(this.getOfferChatHeader.task.pay_day).format('DD/MM') + " ( in " +
            dayjs(this.getOfferChatHeader.task.pay_day).fromNow(true) +" ) "

            break;
        }
      },

      page_count(){
        if(this.getOfferChatHeader.task.pages){
          return this.getOfferChatHeader.task.pages + " pages"
        } else {
          return " the whole task"
        }
      }
    },
    data(){
      return{
        fetching_messages: true,
        uploading: false,
        sending: false,
        draft: null,
        accepting: false,
        rejecting: false,
        more_info_open: false,
        instructions_open: true,
        files_open: false
      }
    },
    methods:{
      ...mapActions(['fetchTaskOfferMessages', 'sendTaskOfferMessage', 'acceptOffer', 'rejectOffer', 'cancelOffer']),
      
      openMoreInfo(){
        this.more_info_open = true
        this.goTop()
      },
      closeMoreInfo(){
        this.more_info_open = false
        this.goBottom()
      },
      goBottom(){
        //   this.$nextTick(() => {
    //     document.getElementById('bottom').scrollIntoView({
    //       behavior: 'smooth'
    //     })
    //   })
      },
      
      goTop(){
        //document.getElementById('top_button').click()
      },

      registerFiles(event){
        this.uploading = true
        var fd = new FormData()
        let files = event.length
        for (let i = 0; i < files; i++) {
            fd.append('documents[]', event[i])
        }
        this.formdata = fd;
        this.formdata.append('task_offer_id', this.getOfferChatHeader.id)

        this.sendTaskOfferMessage(this.formdata).then(response => {
          this.uploading = false
          this.goBottom()
        })
      },

      reject(){
        let confirmation = "You are about to reject " + this.getOfferChatHeader.task.code + ': ' + this.getOfferChatHeader.task.topic + ' by '
        + this.getOfferChatHeader.task.broker.user.username + ". Proceed?"
        if(!confirm(confirmation)){
          return
        }
        this.rejecting = true
        const data = {
          offer_id: this.getOfferChatHeader.id,
          task_id: this.getOfferChatHeader.task_id
        }
        this.rejectOffer(data)
        this.rejecting = false
      },
      
      cancel(){
        let confirmation = "You are about to cancel offer to "
        + this.getOfferChatHeader.writer.user.username + ". Proceed?"
        if(!confirm(confirmation)){
          return
        }
        this.rejecting = true
        const data = {
          offer_id: this.getOfferChatHeader.id,
          task_id: this.getOfferChatHeader.task_id
        }
        this.cancelOffer(data)
        this.$router.push('/dashboard')

        this.rejecting = false
      },
      accept(){
        let confirmation = "You are about to accept task " + this.getOfferChatHeader.task.code + ': ' + this.getOfferChatHeader.task.topic + ' by '
        + this.getOfferChatHeader.task.broker.user.username + " you need to complete it in " + dayjs(this.getOfferChatHeader.task.expiry_time).fromNow(true) 
        + " Proceed?"
        if(!confirm(confirmation)){
          return
        }
        this.accepting = true
        const data = {
          offer_id: this.getOfferChatHeader.id,
          task_id: this.getOfferChatHeader.task_id
        }
        this.acceptOffer(data)
        this.accepting = false
        this.$router.push('/dashboard')
      },
      openFileSelect(){
        document.getElementById('files').click()
      },
      send(){
        this.sending = true
        if(!this.draft){
          this.sending = false
          return
        } else{
          const data = {
            task_offer_id: this.getOfferChatHeader.id,
            message: this.draft
          }
          this.sendTaskOfferMessage(data).then(response => {
            if(response){
              this.draft = null
              this.goBottom()
              this.sending = false
            }
          })
        }
      },
      isImage(url){
        let base = url.substring((url.lastIndexOf('.') + 1), (url.lastIndexOf('.') + 4))
        if(base == 'jpg' || base =='png' || base =='jpe' || base =='svg'){
          return true
        }
        return false
      },
      goBottom(){
        this.$vuetify.goTo('#bottom', this.options)
      },
      async boot(){
        try{
          this.goBottom()
          await this.fetchTaskOfferMessages({task_offer_id: this.getOfferChatHeader.id}).then((req) => {
            this.fetching_messages = false
          })
          this.goBottom()
        }catch(e){}
      },
      setCPP(){
        let person = prompt("Please enter your name", "Harry Potter");
        let text;
        if (person == null || person == "") {
          text = "User cancelled the prompt.";
        } else {
          text = "Hello " + person + "! How are you today?";
        }
      }
    },
    mounted(){
      this.goBottom()
      this.boot()
    },
  
    created(){
      dayjs.extend(relativeTime)
    }
  }
</script>
<style lang="css">
  .bg-image{
    background-image: url('~@/assets/c21.jpg');
    background-attachment: fixed;
    background-repeat: repeat-x;
  }
  .section{
    width: 100%;
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
  .chat-body{
    margin-bottom: 5rem;
  }
  .all_right{
    display: flex;
    justify-content: flex-end;
  }
  .main{
    height: 100%;
    padding-bottom: 5rem;
  }
  .bottom{
    height: 3rem;
    position: fixed;
    bottom: 0;
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
</style>

