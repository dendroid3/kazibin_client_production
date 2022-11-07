<template lang="">
    <div class="main-wrapper">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> tasks offered
            </v-col>
            <v-col class="col-4 d-flex align-center justify-end px-4">
                <!-- <v-icon class="mx-2" @click="go('Explore/Task')">
                    mdi-plus  
                </v-icon> -->
                <!-- <v-icon class="mx-2">
                mdi-magnify  
                </v-icon> -->

                <!-- <v-menu 
                transition="slide-y-transition"
                bottom
                open-on-hover>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mx-2" v-on="on" v-bind="attrs" :disabled="filter_model != 'unassigned'">
                    mdi-filter  
                    </v-icon>
                </template>
                <v-list >
                    <v-list-item @click="toMyWriters">
                    to my writers
                    </v-list-item>
                    <v-list-item>
                    to public
                    </v-list-item>
                    <v-list-item>
                    with bids
                    </v-list-item>
                </v-list>
                </v-menu> -->
            </v-col>
        </v-row> 
        <v-row class="pa-2 bold no-gutters mb-4 ">
            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer" @click="filterModel(null)">
                    <div class="d-flex justify-center bold">
                        all
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1">
                        <span> {{getDashboadDetails.offers.offers_all}} </span>
                    </div>
                </div>
            </v-col>

            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer" @click="filterModel(1)" :class="{
                  'red--text': filter_model == 1
                }">
                    <div class="d-flex justify-center bold">
                        pending
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1">
                        <span> {{getDashboadDetails.offers.offers_pending}} </span>
                    </div>
                </div>
            </v-col>

            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer"  @click="filterModel(4)" :class="{
                  'green--text': filter_model == 4
                }">
                    <div class="d-flex justify-center bold">
                        accepted
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1">
                        <span> {{getDashboadDetails.offers.offers_accepted}} </span>
                    </div>
                </div>
            </v-col>
            
            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer" @click="filterModel(3)" :class="{
                  'red--text': filter_model == 3
                }">
                    <div class="d-flex justify-center bold">
                        rejected
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{getDashboadDetails.offers.offers_rejected}}  </span>
                    </div>
                </div>
            </v-col>

            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer"  @click="filterModel(2)" :class="{
                  'red--text': filter_model == 2
                }">
                    <div class="d-flex justify-center bold">
                        cancelled
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{getDashboadDetails.offers.offers_cancelled}}  </span>
                    </div>
                </div>
            </v-col>
            
            <v-col class="col-4 pa-1">
                <div class="grey rounded elevation-1 pointer" style="color: transparent;" >
                    <div class="d-flex justify-center bold">
                        pulled
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{'s'}}  </span>
                    </div>
                </div>
            </v-col>
        </v-row>

      <offers-strip v-for="(offer, i) in getMyOffers" :key="i" :offer="offer"  v-if="pagination_links_set"/>

      <v-row class="padder" v-if="!getMyOffers[0]">
        <div class="padded mb-4">
          <v-row class="no-gutters d-flex align-center">
          <v-col class="col-12">
          <emptyHere />
          </v-col>
          <v-col class="col-12">
            You are yet to be recieve any task offer, your task offers will appear here once you get any. You need to have brokers on your network so they may be able to offer
            you tasks. You are at liberty to accept or turn the offer down as you well please.
            To get brokers start <span @click="go('Explore/Brokers')" class="blue--text bold-tiny">here</span>
            To be added to their network click on their username, which will take you to their page then click on the 'liaise' button to send them a request.
          </v-col>
          </v-row>
        </div>
      </v-row>

      
            
      <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set">
          <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
          :key="i" 
          :class="{
            'red': link.active,
            'grey': ((getMyOffersPaginationDetails.current_page === getMyOffersPaginationDetails.last_page) && link.next) ||
                    (getMyOffersPaginationDetails.current_page === 1) && link.previous
            }" 
          @click="goToPage(link.url)">
            <span>
              <span v-if="link.previous">
              {{"<<"}}
              </span>
              <span v-if="!link.previous && !link.next">
                {{link.label}}
              </span>
              <span v-if="(link.next)">
                {{">>"}}
              </span>
            </span>
          </v-col>
        </v-row>
        
        <v-row class="no-gutters" v-else>
          <v-col class="col-4 offset-4">
            <v-progress-linear
              indeterminate
              rounded
              color="blue darken-2"
              height="5"
            ></v-progress-linear>
          </v-col>
        </v-row>  
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import OffersStrip from '../../components/dashboard/OffersStrip.vue';
import EmptyHere from '../../components/widgets/EmptyHere.vue';
export default {
    name: 'Offers',
    components:{
        OffersStrip, EmptyHere
    },

    computed:{
        ...mapGetters(['getMyOffers', 'getDashboadDetails', 'getMyOffersPaginationDetails']),
        pagination_links(){
          let links = []
          this.getMyOffersPaginationDetails.links.forEach(link => {
            link.previous = link.label == "&laquo; Previous"
            link.next = link.label == "Next &raquo;"
            links.push(link)
          });
          return links
      },
    },

    data(){
      return {
        filter_model: null,
        pagination_links_set: true
      }
    },

    methods:{
      ...mapActions(['fetchMyOffersPaginated']),
      
      goToPage(page_link){
      
        this.pagination_links_set = false
        const data = {
          link: page_link
        }
        
        if(!this.filter_model){
          this.fetchMyOffersPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        } else {
          data.status = this.filter_model
          this.fetchMyOffersPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        }
      },
      
      filterModel(status){
        this.pagination_links_set = false
        this.filter_model = status
        
        if(!this.filter_model){
          const data = {}
          this.fetchMyOffersPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        } else {
          const data = {
            status: this.filter_model
          }
          this.fetchMyOffersPaginated(data).then((res) => (
            this.pagination_links_set = true
          ))
        }
        this.filter_model = status
      },
      
      boot(){
        const data = {}
        this.fetchMyOffersPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      },

      go(code){
          this.$router.push('/' + code)
      },
    },

    mounted(){
      this.boot()
    }
}
</script>

<style lang="css" scoped>

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
  }  .limiting_wrapper{
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
    padding: 1rem 3rem;
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
  .list{
    background-color: rgb(231, 231, 231); 
    border-left: solid 20px red;
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
  
  .main-wrapper{
    padding-bottom: 5rem;
    overflow-x: hidden;
  }
</style>