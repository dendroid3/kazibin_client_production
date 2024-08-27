<template>
  <div class="grey lighten-1">
    
    <action-tab
      :action="`Post a Task`"
      :description="`post task to over 10000 writers`"
      :route="`Task/Add`"
    />

    <action-tab
      :action="`Explore Tasks`"
      :description="`open tasks catalogue`"
      :route="`Explore/Task`"
    />
    
    <action-tab
      :action="`Sell a Writing Account`"
      :description="`advertise writing account to potential buyers`"
      :route="`Account/Add`"
    />

    <action-tab
      :action="`Explore Writing Accounts`"
      :description="`browse through writing accounts on sell`"
      :route="`Marketplace`"
    />

    <action-tab
      :action="`Discover Writers`"
      :description="`get writers to be giving tasks to`"
      :route="`Explore/Writers`"
    />

    <action-tab
      :action="`Discover Brokers`"
      :description="`get brokers to be giving you tasks `"
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
