<template lang="html">
  <div>
    <v-alert
      v-if="isAlertOpen && getAlertCode == 'error'"
      style="position: fixed; bottom: 0; right: 0.2rem; left: 0.2rem; width: calc(100% - 0.4rem); z-index: 99999;"
      border="left"
      color="red"
      dense
      dismissible
      type="info"
    >{{getAlertMessage}}</v-alert>
    <v-alert
      v-if="isAlertOpen && getAlertCode == 'info'"
      style="position: fixed; bottom: 0; right: 0.2rem; left: 0.2rem; width: calc(100% - 0.4rem); z-index: 99999;"
      border="left"
      color="blue"
      dense
      dismissible
      type="info"
    >{{getAlertMessage}}</v-alert>
      <!--  -->

    <v-alert
    v-if="isAlertOpen && getAlertCode == 'success'"
      style="position: fixed; bottom: 0; right: 0.2rem; left: 0.2rem; width: calc(100% - 0.4rem); z-index: 99999;"
      border="left"
      color="success"
      dense
      dismissible
      type="success"
    >{{getAlertMessage}}</v-alert>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AlertBox',
  props :[
    'message',
    'code'
  ],
  computed:{
    ...mapGetters(['isAlertOpen', 'getAlertCode', 'getAlertMessage'])
  }
}
</script>
<style lang="css" scoped>
.wrapper{
  position: fixed;
  top: 0;
}
  
</style>
