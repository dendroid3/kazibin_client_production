<template>
  <div class="main grey lighten-3">
    <v-toolbar 
      class="pb-4 top-toolbar"
      flat
      :class="{
        'full-width': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs,
        'medium-width':  $vuetify.breakpoint.md,
        'large-width':  $vuetify.breakpoint.lg,
      }">

        <section v-if="getRequestChatView.broker" >

          <div class="d-flex">
            <v-toolbar-title>{{getRequestChatView.broker.code + ": "}}</v-toolbar-title>
            <v-toolbar-title class="ml-1">{{getRequestChatView.broker.username}}</v-toolbar-title>
          </div>

          <div v-if="getRequestChatView.mine">
            Request to broker
          </div>
          
          <div v-else>
            Request from broker 
          </div>

        </section>

        <section v-else>

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

        </section>
        <!-- <v-row v-if="!getRequestChatView.mine" class="justify-end pointer" style="text-decoration: underline; color: blue;" @click="setCPP">
          
          <v-progress-circular
          v-if="setting_cpp"
            indeterminate
            rounded
            color="blue darken-2"
            size="15"
          ></v-progress-circular>
          <span 
          v-if="!setting_cpp"
          >
            CPP: {{new_cpp}}
          </span>
        </v-row> -->
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
        <section v-if="getRequestChatView.status < 2">
          
          <section v-if="!getRequestChatView.mine" class="section">

            <div class="d-flex justify-center">
              <v-btn 
              small 
              :loading="accepting"
              @click="accept"
              class="success mr-1">
                accept 
              </v-btn>
              
              <v-btn 
              small 
              :loading="rejecting"
              @click="reject"
              class="red white--text ml-1">
                reject 
              </v-btn>

            </div>
            <v-row class="no-gutters d-flex align-center">
              <v-col class="col-8">
                <textarea v-model="draft" class="send-bar pa-1" placeholder="message" label="message" />
              </v-col>
              <v-col class="col-4 d-flex justify-space-between send-buttons">
                <v-btn class="blue" 
                @click="openFileSelect"
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
                  <v-icon class="white--text" >
                    mdi-send
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </section>

          <section v-else class="section">

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
          <span v-if="getRequestChatView.status == 2">
            {{"Conversation closed. Request Pulled."}}
          </span>
          <span v-if="getRequestChatView.status == 3">
            {{"Conversation closed. Request Rejected."}}
          </span>
          <span v-if="getRequestChatView.status == 4">
            {{"Conversation closed. Request Accepted."}}
          </span>
          <span v-if="getRequestChatView.status == 5">
            {{"Conversation closed.  Task assigned"}}
          </span>
        </section>

    </v-toolbar>
    <div style="margin-top: 50px;" class="center">
    <!-- {{getRequestMessages[0]}} -->
    </div>

    <section v-if="fetching_messages">

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
    <div class="bg-image" style="min-height:calc(100vh - 50px);" v-if="!fetching_messages">
      <chat-box :messages="getRequestMessages" :type='"request"' v-if="!fetching_messages"/>
    </div>
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
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ChatBox from '../../../components/ChatBox.vue'
export default {
  name: 'Chat',
  components:{ChatBox},
  filters: {
    refineFileNameMessage: (name) => {
      if(name.length > 10 ){
        return name.substring(0, 10) + '...'
      } else {
        return name.substring(0, name.lastIndexOf('.'))
      }
    },
  },
  computed: {
    ...mapGetters(['getRequestChatView', 'getRequestMessages', 'getUser']),
    options () {
      return {
        duration: 500,
        offset: 0,
        easing: 'easeInOutCubic',
      }
    }
  },
  data(){
    return {
      draft: '',
      accept_status: false,
      accepting: false,
      reject_status: false,
      rejecting: false,
      sending: false,
      formdata: null,
      uploading: false,
      fetching_messages: true,
      setting_cpp: false,
      new_cpp: 'not set'
    }
  },
  methods: {
    ...mapActions(['fetchRequestMessages', 'sendRequestMessage', 'rejectRequest', 'acceptLiaisonRequest', 'setCostPerPage']),
    async boot(){
      try{
        this.goBottom()
        await this.fetchRequestMessages({request_id: this.getRequestChatView.id}).then((req) => {
          this.fetching_messages = false
        })
        this.goBottom()
      }catch(e){}
    },
    
    goBottom(){
      this.$vuetify.goTo('#bottom', this.options)
    },
    isImage(url){
      let base = url.substring((url.lastIndexOf('.') + 1), (url.lastIndexOf('.') + 4))
      if(base == 'jpg' || base =='png' || base =='jpe' || base =='svg'){
        return true
      }
      return false
    },
    send(){
      this.sending = true
      if(!this.draft){
        this.sending = false
        return
      } else{
        const data = {
          message: this.draft,
          request_id: this.getRequestChatView.id,
          mine: true
        }
        this.sendRequestMessage(data).then(response => {
          if(response){
            this.draft = null,
            this.sending = false
            this.goBottom()
          }
        })
      }
    },
    accept(){
      let proceed = confirm(
      (this.getRequestChatView.writer) ? 
        "You are about to add " + this.getRequestChatView.writer.username + " to your network. Proceed?" : 
        "You are about to add " + this.getRequestChatView.broker.username + " to your network. Proceed?"
      )
      if(!proceed){return}

      this.accepting = true
      if(this.getUser.broker.id != this.getRequestChatView.broker_id){
        const data = {
          base: 'attach_broker_to_me',
          broker_id: this.getRequestChatView.broker_id
        }
        this.acceptLiaisonRequest(data).then(response => {
          this.accept_status = response.data.success
          this.accepting = false
        })
      } else {
        const data = {
          writer_id: this.getRequestChatView.writer_id
        }
        this.acceptLiaisonRequest(data).then(response => {
          this.accept_status = response.data.success
          this.accepting = false
        })
      }
    },
    reject(){
      
      let proceed = confirm("You are about to reject this request. This action cannot be reversed. Proceed?")
      if(!proceed){return}

      this.rejecting = true
      if(this.getUser.broker.id != this.getRequestChatView.broker_id){
        const data = {
          base: 'reject_request_from_broker',
          broker_id: this.getRequestChatView.broker_id
        }
        this.rejectRequest(data).then(response => {
          this.reject_status = true
          this.rejecting = false
          // this.$router.push('/dashboard')
        })
      } else {
        const data = {
          writer_id: this.getRequestChatView.writer_id
        }
        this.rejectRequest(data).then(response => {
          this.reject_status = response.data.success
          this.rejecting = false
        })
      }
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
      this.formdata.append('request_id', this.getRequestChatView.id)

      this.sendRequestMessage(this.formdata).then(response => {
        if(response.status == 200){
          this.uploading = false
          this.goBottom()
        }
      })
    },
    gethref(file_url){
      return 'http://kzbbe.publeek.buzzstorage/' + file_url
    },
    setCPP(){
      let new_cpp = prompt("Propose a new CPP, offers to this writer will be paid with this CPP by default, you can change this for particular tasks to another CPP as explicitly stated by you.", this.new_cpp);
      let proposed_cpp;
      if (new_cpp == null || new_cpp == "") {
        text = "User cancelled the prompt.";
      } else {
        this.setting_cpp = true
        proposed_cpp = new_cpp
        const data = {
          cpp: proposed_cpp,
          request_id: this.getRequestChatView.id,
        };

        this.setCostPerPage(data).then(response => {
          this.setting_cpp = false
          this.goBottom()
          this.new_cpp = proposed_cpp
        })

      }

      // alert(text)
    }
  }, 
  mounted(){
    this.goBottom()
    this.boot()
  }
  
}
</script>
<style lang="css" >
  .section{
    width: 100%;
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
