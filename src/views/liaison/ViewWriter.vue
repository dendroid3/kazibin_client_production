<template lang="html">
  <div class="main-wrapper grey lighten-3">
    <user-card :user="getViewWriter" />


    <section v-if="fetching">
      <div style="margin-top: 50px;" class="center">
      </div>

      <v-row class="no-gutters">
        <v-col class="col-4 offset-4">
          <v-progress-linear
            indeterminate
            rounded
            color="blue darken-2"
            height="5"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="no-gutters">
        <v-col class="col-12 blue--text d-flex justify-center darken-2">
          getting writer metrics
        </v-col>
      </v-row>

    </section>

    <section  v-if="!fetching">
      <writer-metric />

      <div class="d-flex justify-end grey lighten-3" style="padding-bottom: 1.5rem; padding-right: 0.5rem; padding-top: 0.25rem;">

      </div>
      

    </section>
    
    <div class="pa-3" v-if="getViewWriter.bio">
      <span class="bold">
        Bio:
      </span>
      {{getViewWriter.bio}}
    </div>

    <div class="pa-3" v-if="getViewWriter.interests">
      <span class="bold">
        Interests:
      </span>
      <v-row class="px-4 mx-4 py-2">
          <div class="px-4 white rounded mx-2 my-1" style="font-size: 0.95rem;" v-for="(interest, i) in split(getViewWriter.interests)" :key="i">
              {{interest}}
          </div>
      </v-row>
    </div>
    
    <div class="pa-3" v-if="getWriterMetrics.writer.ratings[0]">
      <span class="bold">
        {{"Reviews: " + getViewWriter.writer.number_of_reviews}}
      </span>
      <v-row class="px-1 py-1" v-for="rating in getViewWriter.writer.ratings.slice(0,5)" :key="rating.id">
          <div class="px-4 white rounded my-1 col-12" style="font-size: 0.95rem;" >
            {{rating.review}}
            <div class="d-flex justify-end col-12" style="font-size: 0.95rem;">
              <v-icon small class="yellow--text" v-for="star in rating.rating" :key="star">
                mdi-star
              </v-icon>
              <v-icon small class="grey--text" v-for="star in (5-rating.rating)" :key="star">
                mdi-star
              </v-icon>
            </div>
          </div>

      </v-row>
    </div>

    <div class="d-flex justify-center">
        <v-btn class="elevation-15 submit-button red lighten-2 white--text" small @click="send" :loading="sending"  style="font-weight: 900;" :disabled="request_sent">
          Liaise
        </v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import WriterMetric from './WriterMetric.vue'
import UserCard from '../../components/dashboard/UserCard.vue'
export default {
  name: 'ViewWriter',

  components:{WriterMetric, UserCard},

  computed:{
    ...mapGetters(['getViewWriter', 'getWriterMetrics'])
  },
  data(){
    return{
      response: null,
      sending: false,
      fetching: false,
      request_sent: false
    }
  },

  methods:{
    ...mapActions(['sendRequestToWriter', 'fetchWriterMetrics']),
    send(){
      let proceed = confirm('You are about to request ' + this.getViewWriter.username + " to become your writer. Proceed?")
      if(!proceed){return}
      // alert(this.getViewWriter.username)
      this.sending = true
      this.sendRequestToWriter({writer_id: this.getViewWriter.writer.id}).then((res) => {
        this.sending = false
        this.request_sent = true
      })
    },

    split(string){
        return string.split(",")
    },
    boot(){
        try{
          const data = {
            user_id: this.getViewWriter.id
          }
          this.fetchWriterMetrics(data).then( res => {
            this.fetching = false
          })
        } catch(e){

        }
    },
  },

  mounted(){
    this.boot()
  }
}
</script>
<style lang="css" scoped>
.main-wrapper{
  overflow-x: hidden;
  min-height: calc(100vh - 50px);
}
  
</style>
