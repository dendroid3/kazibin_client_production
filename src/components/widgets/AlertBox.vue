<template lang="html">
  <div>
    <v-alert
      @input="onclose"
      v-if="isAlertOpen && getAlertCode == 'error'"
      style="position: fixed; bottom: 0; right: 0.2rem; left: 0.2rem; width: calc(100% - 0.4rem); z-index: 99999;"
      border="left"
      color="red"
      dense
      dismissible
      type="info"
    ><span v-html="getAlertMessage" @click="resolve" /></v-alert>
    <v-alert
      @input="onclose"
      v-if="isAlertOpen && getAlertCode == 'info'"
      style="position: fixed; bottom: 0; right: 0.2rem; left: 0.2rem; width: calc(100% - 0.4rem); z-index: 99999;"
      border="left"
      color="blue"
      dense
      dismissible
      type="info"
    ><span v-html="getAlertMessage" @click="resolve" /></v-alert>

    <v-alert
      @input="onclose"
      v-if="isAlertOpen && getAlertCode == 'success'"
      style="position: fixed; bottom: 0; right: 0.2rem; left: 0.2rem; width: calc(100% - 0.4rem); z-index: 99999;"
      border="left"
      color="success"
      dense
      dismissible
      type="success"
     
    ><span v-html="getAlertMessage" @click="resolve" /></v-alert>

  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import router from '../../router';
export default {
  name: 'AlertBox',
  props :[
    'message',
    'code',
    'endpoint'
  ],
  computed:{
    ...mapGetters(['isAlertOpen', 'getAlertCode', 'getAlertMessage', 'getAlertEndPoint'])
  },

  methods: {
    ...mapActions(['closeAlert']),
    onclose(){
      this.closeAlert()
    },
    resolve(){
      if(this.getAlertEndPoint){
        this.$router.push('/' + this.getAlertEndPoint)
      } else {
        alert('nothing')
      }
    }
  }
}
</script>
<style lang="css" scoped>
.wrapper{
  position: fixed;
  top: 0;
}
  
</style>
