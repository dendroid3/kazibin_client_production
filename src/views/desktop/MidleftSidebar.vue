<template lang="">
    <div class="mid-left-bar grey lighten-3">
        <tabs-strip 
        :posted_fetched="true" 
        :taken_fetched="true" 
        :offers_fetched="true" 
        :bids_fetched="true" 
        :liaisons_fetched="true" 
        :invoices_fetched="true" 
        :chats_fetched="true" 
        />
        <section class="limiting_wrapper" v-if="getLogMessages[0]">
            <title-strip :title="`timeline`" :page="'/Logs'" />
            <div class="limiting_wrapper">
                <logs-strip :Logs="getLogMessages"/>
            </div>
        </section>
    </div>
</template>
<script>
import TabsStrip from '../../components/dashboard/TabsStrip.vue';
import TitleStrip from '../../components/dashboard/TitleStrip.vue';
import LogsStrip from '../../components/dashboard/LogsStrip.vue';
import { mapGetters } from 'vuex';
export default {
    name: "MidleftSidebar",
    components:{TabsStrip, TitleStrip, LogsStrip},

    computed:{
        ...mapGetters(['getLogMessages'])
    }
}
</script>
<style lang="css" scoped>
  .limiting_wrapper{
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .mid-left-bar{
    height: 100vh;
  }
</style>