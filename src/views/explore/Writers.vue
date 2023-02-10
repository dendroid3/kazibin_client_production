<template>
    <div class="main-wrapper white">
      <div class="col-12 grey lighten-2">
        
          <span class="heading primary-color-text">
            {{"explore writers"}}
          </span> 
      </div>
      
      <section class="pt-4">
  
        <v-row class="no-gutters" v-if="pagination_links_set">
  
          <v-col class="col-6" v-for="(writer, i) in getAllWriters" :key="i"  :class="{
            'col-12': $vuetify.breakpoint.sm || $vuetify.breakpoint.xs
          }">
            <user-strip :writer="writer"/>
          </v-col>
  
        </v-row>

        <fetching-items :message="`Fetching Writers`" v-if="!pagination_links_set" />
      </section>
  
      <section>
          <v-row class="d-flex justify-center mt-4" v-if="pagination_links_set">
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
  import FetchingItems from '../../components/widgets/FetchingItems.vue';

  export default {
    name: 'Users',
  
    components:{UserStrip, FetchingItems},
  
    computed:{
      ...mapGetters(['getAllWriters', 'getWriterPaginationDetails']),
  
      pagination_links(){
        if(this.getWriterPaginationDetails) {
          let links = []
          this.getWriterPaginationDetails.links.forEach(link => {
            link.previous = link.label == "&laquo; Previous"
            link.next = link.label == "Next &raquo;"
            links.push(link)
          });
          return links
        }
      },
  
    },
  
    data(){
      return {
        pagination_links_set: true
      }
    },
  
    methods:{
      ...mapActions(['fetchAllWritersPaginated']),
      goToPage(page_link){
        
        this.pagination_links_set = false
        const data = {
          link: page_link
        }
        
        this.fetchAllWritersPaginated(data).then((res) => (
            this.pagination_links_set = true
        ))
      },
  
      boot(){
        const data = { }
        this.fetchAllWritersPaginated(data)
      }
    },
  
    mounted(){
        this.boot()
    },
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
  