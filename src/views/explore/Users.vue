<template>
  <div class="main-wrapper">
    <div class="col-12 grey lighten-2">
      
        <span class="heading primary-color-text">
          {{title}}
        </span> 
    </div>
    
    <section class="pt-4">

      <v-row class="no-gutters" v-if="pagination_links_set && page == 'Brokers'">

        <v-col class="col-6" v-for="(broker, i) in getAllBrokers" :key="i" :class="{
          'col-12': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs
        }">
          <user-strip :broker="broker"/>
        </v-col>

      </v-row>
      <v-row class="no-gutters" v-if="pagination_links_set && page == 'Writers'">

        <v-col class="col-6" v-for="(writer, i) in getAllWriters" :key="i"  :class="{
          'col-12': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs
        }">
          <user-strip :writer="writer"/>
        </v-col>

      </v-row>
      <v-row class="no-gutters" v-if="!pagination_links_set">
      <v-col class="col-4 offset-4">
        <v-progress-linear
          indeterminate
          rounded
          color="blue darken-2"
          height="5"
        ></v-progress-linear>
      </v-col>
      </v-row> 
    </section>

    <section>
        <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && page == 'Brokers' && getAllBrokers[0]">
          <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
          :key="i" 
          :class="{
            'red': link.active,
            'grey': ((getBrokerPaginationDetails.current_page === getBrokerPaginationDetails.last_page) && link.next) ||
                    (getBrokerPaginationDetails.current_page === 1) && link.previous
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

        <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set && page == 'Writers'">
          <v-col class="col-1 white--text mt-4 primary-color text-center" v-for="(link, i) in pagination_links" 
          :key="i" 
          :class="{
            'red': link.active,
            'grey': ((getWriterPaginationDetails.current_page === getWriterPaginationDetails.last_page) && link.next) ||
                    (getWriterPaginationDetails.current_page === 1) && link.previous
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
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import UserStrip from '../../components/home/UserStrip.vue';
export default {
  name: 'Users',

  components:{UserStrip},

  computed:{
    ...mapGetters(['getAllBrokers', 'getAllWriters', 'getBrokerPaginationDetails', 'getWriterPaginationDetails']),

    pagination_links(){
      if(this.page == 'Brokers' && this.getBrokerPaginationDetails){
        let links = []
        this.getBrokerPaginationDetails.links.forEach(link => {
          link.previous = link.label == "&laquo; Previous"
          link.next = link.label == "Next &raquo;"
          links.push(link)
        });
        return links
      } 
      if(this.page == 'Writers' && this.getWriterPaginationDetails) {
        let links = []
        this.getWriterPaginationDetails.links.forEach(link => {
          link.previous = link.label == "&laquo; Previous"
          link.next = link.label == "Next &raquo;"
          links.push(link)
        });
        return links
      }
    },

    title(){
      if(this.page){
        let page_name = this.page.toLowerCase()
        return 'explore ' + page_name
      }
    }
  },

  data(){
    return {
      page: null,
      pagination_links_set: true
    }
  },

  methods:{
    ...mapActions(['fetchAllBrokersPaginated', 'fetchAllWritersPaginated']),
    goToPage(page_link){
      
      this.pagination_links_set = false
      const data = {
        link: page_link
      }
      if(this.page === "Brokers"){
      
        this.fetchAllBrokersPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      } else {
        
        this.fetchAllWritersPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      }
    },

    boot(){
      if(this.page === "Brokers"){
        this.fetchAllBrokersPaginated(null)
      } else {
        this.fetchAllWritersPaginated(null)
      }
    }
  },

  mounted(){
    if((this.$router.history.current.params.user_type == 'Brokers' || this.$router.history.current.params.user_type == 'Writers')){
      this.page = this.$router.history.current.params.user_type
      this.boot()
    } else {
      this.$router.push('/')
    }
  },

  updated(){
    if((this.$router.history.current.params.user_type == 'Brokers' || this.$router.history.current.params.user_type == 'Writers')){
      this.page = this.$router.history.current.params.user_type
      // this.boot()
    } else {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="css" scoped>

  .backg{
    color: rgb(15,14,56);
    font-size: 2rem;
  }

  .main-wrapper{
    padding-bottom: 5rem;
  }
</style>
