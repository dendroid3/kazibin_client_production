<template lang="">
    <div class="mid-left-bar grey lighten-2">
        <div v-if="1==1">
          <TransactionsBelt style="z-index: 9;" />
          <tabs-strip 
          :posted_fetched="true" 
          :taken_fetched="true" 
          :offers_fetched="true" 
          :bids_fetched="true" 
          :liaisons_fetched="true" 
          :invoices_fetched="true" 
          :chats_fetched="true" 
          :accounts_fetched="true"
          />
          <title-strip :title="`timeline`" :page="'/Logs'" />
          <section class="limiting_wrapper" v-if="getLogMessages[0]">
              <div class="limiting_wrapper">
                  <logs-strip :Logs="getLogMessages"/>
              </div>
          </section>
        </div>
        <div v-else style="background-color: red; height: 85%;">
          <title-strip :title="`timeline`" :page="'/Logs'" />

          Login 
        </div>
    </div>
</template>
<script>
import TabsStrip from '../../components/dashboard/TabsStrip.vue';
import TitleStrip from '../../components/dashboard/TitleStrip.vue';
import LogsStrip from '../../components/dashboard/LogsStrip.vue';
import TransactionsBelt from '../../components/dashboard/TransactionsBelt.vue';
import { mapGetters } from 'vuex';
export default {
    name: "MidleftSidebar",

    components:{TabsStrip, TitleStrip, LogsStrip, TransactionsBelt},

    computed:{
        ...mapGetters(['getLogMessages'])
    }
}
</script>
<style lang="css" scoped>
  .limiting_wrapper{
    max-height: 70vh;
    overflow-y: scrollp;
    overflow-x: hidden;
  }
  .mid-left-bar{
    height: 100vh;
    z-index: 99;
  }
</style>