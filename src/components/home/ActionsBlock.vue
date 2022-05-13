<template>
  <div class="grey lighten-1">
    
    <action-tab
      :action="`post a task`"
      :description="`access the the benefits`"
      :route="`Task/Add`"
    />
    <action-tab
      :action="`Explore Tasks`"
      :description="`open tasks catalogue`"
      :route="`Explore/Task`"
    />
    <action-tab
      :action="`Discover Writers`"
      :description="`get writers to be giving jobs to`"
      :route="`Explore/Writers`"
    />
    <action-tab
      :action="`Discover Brokers`"
      :description="`get brokers to be giving you jobs `"
      :route="`Explore/Brokers`"
    />

  </div>
</template>
<script>
import ActionTab from './ActionTab.vue'
export default {
  name: 'ActionsBlock',
  components:{ActionTab}
}
</script>
<style lang="css" scoped>
  
</style>
