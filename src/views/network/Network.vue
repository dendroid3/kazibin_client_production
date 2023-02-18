<template lang="html">
    <div>
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> network
            </v-col>
        </v-row>
        <v-row class="d-flejx grey lighten-2 align-center mt-0  no-gutters">
          <v-col class="col-6 primary-color-text title d-flex justify-center pointer brokers" @click="setNetworkModel(`brokers`)" :class="{
            'underline elevation-1': network_model === `brokers`
          }"> 
            {{'brokers'}}
          </v-col>
          <v-col class="col-6 primary-color-text title d-flex justify-center pointer writers" @click="setNetworkModel(`writers`)" :class="{
            'underline elevation-1': network_model === `writers`
          }"> 
            {{'writers'}}
          </v-col>
        </v-row>
        <section v-if="getMyBrokers[0] && network_model === `brokers`">
          <div v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
            <network-strip :network_option="'broker'" :networks="getMyBrokers"/>
          </div> 
          <div v-else>
            <d-network-card :network_option="'brokers'" :networks="getMyBrokers"/>
          </div>
        </section>

        <section v-if="getMyWriters[0] && network_model === `writers`">
          <!-- <network-strip :network_option="'writer'" /> -->
          <div v-if="!($vuetify.breakpoint.lg || $vuetify.breakpoint.md)">
            <network-strip :network_option="'writer'" :networks="getMyWriters"/>
          </div> 
          <div v-else>
            <d-network-card :network_option="'writers'" :networks="getMyWriters"/>
          </div>
        </section>

        <v-row class="padder" v-if="!getMyWriters[0] && !getMyBrokers[0]">
            <div class="padded mb-4 d-flex justify-center">
                <v-row class="no-gutters d-flex align-center">
                    <v-col class="col-12 col-md-6">
                      <emptyHere />
                    </v-col>
                    <v-col class="col-12 col-md-6">
                        You are yet to build a network. Having brokers in your network allows them to offer you tasks directly without having to bid on them.
                        To have brokers on your network you have request them and them to accept. 
                        You may view the top brokers <span @click="go('Explore/Brokers')" class="blue--text bold-tiny">here</span>
                        If you are a broker, having writers on your network allows you to get your tasks done without having to display them to the public for bidding.
                        You may view the top writers <span @click="go('Explore/Writers')" class="blue--text bold-tiny">here</span>
                        To be add a broker or writer to your network click on their username, which will take you to their page then click on the 'liaise' button to send them a request.
                    </v-col>
                </v-row>
            </div>
        </v-row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TitleStrip from '../../components/dashboard/TitleStrip.vue';
import NetworkStrip from '../../components/dashboard/NetworkStrip.vue';
import EmptyHere from '../../components/widgets/EmptyHere.vue';
import DNetworkCard from '../../components/dashboard/desktop/DNetworkCard.vue';

export default {
    name: "Network",

    components: { TitleStrip, NetworkStrip, EmptyHere,DNetworkCard },

    computed: {
        ...mapGetters(["getMyBrokers", "getMyWriters"])
    },

    data(){
      return {
        network_model: 'brokers'
      }
    },

    methods:{
      go(code){
          this.$router.push('/' + code)
      },
      setNetworkModel(code){
        this.network_model = code
      }
    },

    mounted(){
    }
}
</script>
<style lang="css" scoped>
.main-wrapper{
  overflow-x: hidden;
  min-height: calc(100vh - 50px);
}
  .limiting_wrapper{
    max-height: 70vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .col-block{
    position: relative;
  }
  .col-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
   .username{
    font-weight: 900;
    font-size: 1.2rem;
  }

  .padder{
    margin: 1rem 2rem;
    padding: 1rem 0;
    animation: tada; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 2s;
    animation-delay: 2s;
    animation-iteration-count: 3;
  }
  .padded{
    background-color: rgb(228, 227, 227);
    padding: 1rem 1rem;
    font-size: 0.8rem;
    border-radius: 3%;
  }
  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }
  .backgs{
    background-color: rgb(15,14,56);
  }
  .bold{
    font-weight: 900;
  }
  
  .bold-tiny{
  font-weight: 900;
  font-size: 0.9rem;
}
  .brokers{
    border-right: solid 1px white;
  }
  .writers{
    border-left: solid 1px white;
  }  .list{
    background-color: rgb(231, 231, 231); 
    /* border-left: solid 20px red; */
  }
  .usn-block{
    position: relative;
  }
  .usn-block::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
  .redtext{
    color: red;
  }
  .purpletext{
    color: purple;
  }
  .greentext{
    color: green;
  }
  .yellowtext{
    color: yellow;
  }
</style>