<template>
  <div class="white py-2">
    <v-card class="grey lighten-3 my-1 mx-2 pointer" v-for="network in networks" :key="network.id">
        <v-row class="no-gutters">
            <v-col class="col-12 px-4 username d-flex justify-center primary-color-text">
                {{network.code + ": " + upperCase(network.username)}}
                <span class="ml-4">
                    <span v-if="network.credential_verification">
                        {{ "[verified]" }}
                    </span>
                </span>
            
            </v-col>
            <v-col class="col-4 px-4">
                <v-list-item-avatar
                    tile
                    size="80"
                    color="tomato"
                    class="align-center justify-center"
                >
                    <div class="white--text">
                        <span class="d-flex initials">
                            {{network.username}}
                        </span>
                        <v-divider dark/>
                        <span v-if="network_option == 'broker'">
                            {{'broker'}}
                        </span>
                        <span v-else>
                            {{'writer'}}
                        </span>
                    </div>
                </v-list-item-avatar>
            </v-col>

            <v-col class="col-8 metrics">
                <div>
                  {{ "Underway :: " + network.underway }}
                </div>
                <div>
                  {{ "Complete :: " + network.complete }}
                </div>
                <div>
                  {{ "Cancelled :: " + network.cancelled }}
                </div>
                <div>
                  {{ "Paid :: " + network.paid }}
                </div>
                <div>
                  <strong>
                    {{ "Total Amount :: " + network.total_amount }}
                  </strong>
                </div>
            </v-col>
        </v-row>

    </v-card>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { mapActions } from 'vuex'
export default {
  name:'NetworkStrip',

  props:['network_option', 'networks'],

  methods: {
      initials(username){
          let matches = username.match( /\b(\w)/g )
          return matches.join('').substring(0,2)
      },

      memberSince(created_at){
          if(!created_at){return 'over'}
          return dayjs(created_at).format('MMM   YYYY')
      },

      upperCase(name){
          return name.toUpperCase()
      },

      split(string){
          return string.split(",")
      }

  },

  mounted(){
    console.log(this.networks)
  },

  created(){
      dayjs.extend(relativeTime)
  }

}
</script>
<style lang="css" scoped>
  .metrics{
      font-weight: 900;
      font-size: 0.75rem;
  }
  .username{
      font-weight: 900;
      font-size: 1.2rem;
      text-decoration: underline;
  }
  .initials{
      font-size:3rem; 
      font-weight: 900;
  }
</style>