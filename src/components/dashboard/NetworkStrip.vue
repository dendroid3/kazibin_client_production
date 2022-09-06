<template>
  <div>
    
    <section v-if="network_option == 'brokers'">
      <div class="grey d-flex lighten-3 align-center liaison" v-for="broker in getMyBrokers" :key="broker.id">
        <div style="min-height: 3rem;" class="pa-2">
          <span class="bold">
            {{broker.username}}
          </span>
          <br>
            {{broker.email}}
        </div>
        <v-spacer />
        <!-- <v-btn small class="white--text mr-3" style="background-color: tomato;">
          message
        </v-btn> -->
      </div>
    </section>

    <section v-if="network_option == 'writers'">
      <div class="grey d-flex lighten-3 align-center liaison" v-for="writer in getMyWriters" :key="writer.id">
        <div style="min-height: 3rem;" class="pa-2">
          <span class="bold">
            {{writer.username}}
          </span>
          <br>
            {{writer.email}}
        </div>
        <v-spacer />
        <!-- <v-btn small class="white--text mr-3" style="background-color: tomato;" @click="giveJob(writer)">
          offer task
        </v-btn> -->
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NetworkStrip',
  props: [
    'network_option'
  ],
  computed:{
    ...mapGetters(['getMyWriters', 'getMyBrokers'])
  },
  
}
</script>
<style lang="css" scoped>
  .liaison{
    position: relative;
    /* border-bottom: solid 2px red; */
    overflow-x: hidden;

  }
  .liaison::after{
    content: '';
    display: inline;
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }  
  
  .active-tab{
    border-bottom: solid tomato 3px;
  }
</style>
