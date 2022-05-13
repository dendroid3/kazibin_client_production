<template lang="html">
  <v-alert
    style="z-index: 919;"
    dismissible
    class="pink"
    dark
    border="top"
    transition="scroll-y-transition"
  >
  <v-icon x-large>
    mdi-alert
  </v-icon>
  <!-- <v-icon x-large v-if="getAlertBoxDetails.code == 'success'">
    mdi-check
  </v-icon> -->
  {{"getAlertBoxDetails.information"}}
  </v-alert>
</template>
<script>
export default {
  name: 'AlertBox',
  props :[
    'message',
    'code'
  ],
}
</script>
<style lang="css" scoped>
.wrapper{
  position: fixed;
  top: 0;
}
  
</style>
