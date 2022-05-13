<template lang="html">
  <div>
    {{"writer   --- >>> "}}
    {{getViewWriter}}
    <br>
    <v-btn class="red" @click="send" :loading="sending">
      Liaise
    </v-btn> <br> 
    Response: {{response}}
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'ViewWriter',
  computed:{
    ...mapGetters(['getViewWriter'])
  },
  data(){
    return{
      response: null,
      sending: false
    }
  },
  methods:{
    ...mapActions(['sendRequestToWriter']),
    send(){
      let proceed = confirm('You are about to request ' + this.getViewWriter.username + " to become your writer. Proceed?")
      if(!proceed){return}
      // alert(this.getViewWriter.username)
      this.sending = true
      this.sendRequestToWriter({writer_id: this.getViewWriter.id}).then((res) => {
        this.sending = false
        this.response = res.data.liaison_request
      })
    }
  }
}
</script>
