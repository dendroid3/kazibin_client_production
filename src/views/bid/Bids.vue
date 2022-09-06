<template lang="">
    <div class="main-wrapper">
        <v-row class="d-flex grey lighten-2 align-center no-gutters">
            <v-col class="col-8 pl-4 backg"> bids made
            </v-col>
            <v-col class="col-4 d-flex align-center justify-end px-4">
                <v-icon class="mx-2" @click="go('Explore/Task')">
                    mdi-plus  
                </v-icon>
            </v-col>
        </v-row>

        <v-row class="pa-2 bold no-gutters">
            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer" @click="filterModel(null)">
                    <div class="d-flex justify-center bold">
                        all
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1">
                        <span> {{getDashboadDetails.bids.bids_all}} </span>
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
                        <span> {{getDashboadDetails.bids.bids_pending}} </span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer"  @click="filterModel(4)" :class="{
                  'green--text': filter_model == 4
                }">
                    <div class="d-flex justify-center bold">
                        won
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1">
                        <span> {{getDashboadDetails.bids.bids_accepted}} </span>
                    </div>
                </div>
            </v-col>
            
            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer" @click="filterModel(3)" :class="{
                  'red--text': filter_model == 3
                }">
                    <div class="d-flex justify-center bold">
                        lost
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{getDashboadDetails.bids.bids_rejected}}  </span>
                    </div>
                </div>
            </v-col>

            <v-col class="col-4 pa-1">
                <div class="grey lighten-2 rounded elevation-1 pointer" @click="filterModel(2)" :class="{
                  'red--text': filter_model == 2
                }">
                    <div class="d-flex justify-center bold">
                        pulled
                    </div>
                    <v-divider inset/>
                    <div class="d-flex justify-end align-center px-1 ">
                        <span> {{getDashboadDetails.bids.bids_pulled}}  </span>
                    </div>
                </div>
            </v-col>

            <v-col class="col-4 pa-1">
                <div class="grey rounded elevation-1 pointer" style="color: transparent;">
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

        <bids-strip v-for="(bid, i) in bids" :key="i" :bid="bid" v-if="pagination_links_set"/>
        
        <v-row class="padder" v-if="!getMyBids[0]">
          <div class="padded mb-4">
            <v-row class="no-gutters d-flex align-center">
            <v-col class="col-12">
            <emptyHere />
            </v-col>
            <v-col class="col-12">
              You have not bid on any task yet, they will appear here once you do. This is the most straight-forward way to get assigned tasks while you build your score 
              on the platform.To bid on tasks start
              <span @click="go('Explore/Tasks')" class="blue--text bold-tiny">here.</span>
              This page displays all availble tasks up for bidding. Click on the task's topic to view more information on the task. If you are up to the task then you can 
              click on the bid button to bid.
              Bidding is time sensitive since the broker can go through only so many bids. To ensure that you are among the first bidders join our telegram group 
              <a class="bold-tiny blue--text" href="https://t.me/writersplatform"> here.</a>
              where we send tasks available for bidding as soon as they are posted.
            </v-col>
            </v-row>
          </div>
        </v-row>
            
        <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set">
          <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
          :key="i" 
          :class="{
            'red': link.active,
            'grey': ((getMyBidsPaginationDetails.current_page === getMyBidsPaginationDetails.last_page) && link.next) ||
                    (getMyBidsPaginationDetails.current_page === 1) && link.previous
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

        <fetching-items :message="`getting bids`"  v-else/>

    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import BidsStrip from '../../components/dashboard/BidsStrip.vue';
import emptyHere from '../../components/svg/emptyHere.vue'
import FetchingItems from '../../components/widgets/FetchingItems.vue';

export default {
    name: 'Bids',
    components:{
        BidsStrip,
        emptyHere,
        FetchingItems
    },
    computed:{
        ...mapGetters(['getMyBids', 'getDashboadDetails', 'getMyBidsPaginationDetails']),

      bids(){
        if(this.filter_model){
            return this.getMyBids.filter(bid => (bid.status == this.filter_model))
        } else {
            return this.getMyBids
        }
      },

      pagination_links(){
          let links = []
          this.getMyBidsPaginationDetails.links.forEach(link => {
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
        ...mapActions(['fetchMyBids', 'fetchMyBidsPaginated']),

        filterModel(status){
          this.pagination_links_set = false
          this.filter_model = status
          
          if(!this.filter_model){
            const data = {}
            this.fetchMyBidsPaginated(data).then((res) => (
              this.pagination_links_set = true
            ))
          } else {
            const data = {
              status: this.filter_model
            }
            this.fetchMyBidsPaginated(data).then((res) => (
              this.pagination_links_set = true
            ))
          }
          this.filter_model = status
        },

        go(code){
        this.$router.push('/' + code)
        },

        goToPage(page_link){
      
          this.pagination_links_set = false
          const data = {
            link: page_link
          }
          
          if(!this.filter_model){
            this.fetchMyBidsPaginated(data).then((res) => (
              this.pagination_links_set = true
            ))
          } else {
            data.status = this.filter_model
            this.fetchMyBidsPaginated(data).then((res) => (
              this.pagination_links_set = true
            ))
          }
        },

        boot(){
          const data = {}
          this.fetchMyBidsPaginated(data)
        }
    },

    mounted(){
      this.boot()
    }
}
</script>

<style lang="css" scoped>
.main-wrapper{
  overflow-x: hidden;
  padding-bottom: 5rem;
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
