<template>
  <div class="main-wrapper white">
    <div> 
      <div class="d-flex grey lighten-1">
        <span class="heading primary-color-text">
          {{`available tasks `}}
        </span>
        <v-spacer />
        <p class="white rounded primary-color-text px-1">
          {{getAllTasksAvailableForBidding.length}}
        </p>
        <v-icon @click="toogleFilter" class="white rounded">
          mdi-filter
        </v-icon>
      </div>
    </div>
    <div>
      <div class="d-flex grey lighten-1">
        <span class="heading primary-color-text" v-if="this.task">
          {{filter_options + " Page " + getAllTasksAvailableForBiddingPaginationDetails.current_page}}
        </span>
      </div>
    </div>
    <div v-if="filter_open" class="grey lighten-1 filter pa-4">
      <v-select
        :items="units"
        v-model="task.unit"
        label="task units"
        outlined
      ></v-select>
      <v-select
        :items="types"
        v-model="task.type"
        label="task type"
        outlined
      ></v-select>
      
      <v-slider
        v-model="task.min_full_pay"
        :max="(getAvailabilityDetails.max_full_pay.full_pay - 2000)"
        label="Lowest Pay"
        class="align-center"
      >
        <template v-slot:append>
          <v-text-field
            v-model="task.min_full_pay"
            class="mt-0 pt-0"
            type="number"
            style="width: 60px"
          ></v-text-field>
        </template>
      </v-slider>
      <v-slider
        v-model="task.max_full_pay"
        :min="(task.min_full_pay) ? task.min_full_pay+2000 :0 "
        :max="getAvailabilityDetails.max_full_pay.full_pay"
        label="Highest Pay"
        class="align-center"
      >
        <template v-slot:append>
          <v-text-field
            v-model="task.max_full_pay"
            class="mt-0 pt-0"
            type="number"
            style="width: 60px"
          ></v-text-field>
        </template>
      </v-slider>
      <div class="d-flex py-2 justify-end">
        <v-btn class="success white--text" @click="apply" :loading="applying">
          apply
        </v-btn>
      </div>
    </div>

    <section v-if="!getAllTasksAvailableForBidding[0] && pagination_links_set">
      <v-row class="no-gutters pt-4 mt-4">
        <v-col class="col-8 offset-2 pa-4">
          <v-img class="" :src="require(`../../assets/pageNotFound.svg`)" contain />
        </v-col>
        <v-col class="col-8 offset-2 px-4 d-flex justify-center text-center tomato-text bold">
          {{"Ooops! No Tasks currently available!"}}
        </v-col>
        <v-col class="col-8 offset-2 px-4 d-flex justify-center primary-color-text text-center mt-4">
          {{"We forward all available tasks real time to our telegram channel. Join it to be notified as soon as there is an available task"}}
        </v-col>
        <v-col class="col-8 offset-2 px-4 d-flex justify-center ">
          <v-btn class="mx-1 white--text" @click="goTelegram" style="background-color: tomato;">Join Channel</v-btn>
          <v-btn class="mx-1 white--text" @click="go('/Dashboard')" style="background-color: tomato;">Dashboard</v-btn>
        </v-col>
      </v-row>
    </section>
    
    <task-strip />
    <v-row class="no-gutters">
      <v-col class="col-12 col-md-6" v-for="(task, i) in getAllTasksAvailableForBidding" :key="i" v-if="pagination_links_set">
        <task-strip :task="task"/>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-4 n-gutters" v-if="pagination_links_set && getAllTasksAvailableForBidding[0] && pagination_links.length > 3">
      <v-col class="col-1 white--text mt-4 primary-color text-center pointer" v-for="(link, i) in pagination_links" 
      :key="i" 
      :class="{
        'red': link.active,
        'grey': ((getAllTasksAvailableForBiddingPaginationDetails.current_page === getAllTasksAvailableForBiddingPaginationDetails.last_page) && link.next) ||
                (getAllTasksAvailableForBiddingPaginationDetails.current_page === 1) && link.previous
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
    
    <fetching-items :message="`Fetching Available Tasks`" v-if="!pagination_links_set" />
  </div>
</template>
<script>
import TaskStrip from './../../components/home/TaskStrip.vue'
import HeadingTab from './../../components/home/HeadingTab.vue'
import FetchingItems from '../../components/widgets/FetchingItems.vue'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Explore',
  components:{TaskStrip, HeadingTab, FetchingItems},
  computed:{
    ...mapGetters(['getAllTasksAvailableForBidding', 'getAvailabilityDetails', 'getAllTasksAvailableForBiddingPaginationDetails']),
  pagination_links(){
      let links = []
      this.getAllTasksAvailableForBiddingPaginationDetails.links.forEach(link => {
        link.previous = link.label == "&laquo; Previous"
        link.next = link.label == "Next &raquo;"
        links.push(link)
      });
      return links
  },
  units(){
    const units = []
    this.getAvailabilityDetails.units.forEach(unit => {
      units.push(unit.unit)
    });
    return units;
  },
  types(){
    const types = []
    this.getAvailabilityDetails.types.forEach(type => {
      types.push(type.type)
    });
    return types;
  },
  filter_options(){
    let options = ''
    if(this.task.unit){
        options = options + this.task.unit
      }
    if(this.task.type){
      options = options + ' ' + this.task.type
    }
    if(!this.task.unit && !this.task.type){
      options = options + "All "
    }
    options = options + " Tasks"

    return options
  }
  },
  data(){
    return{
      filter_open: false,
      task_types: ['essay', 'report', 'review', 'article', 'blog', 'resumes', 'captioning', 'programming'],
      task: {},
      applying: false,
      pagination_links_set: false
    }
  },
  methods: {
    ...mapActions(['fetchAllAvailableForBidding', 'fetchAvailabilityDetails', 'fetchAllAvailableForBidding', 'fetchAllAvailableForBiddingPaginated']),
    goTelegram(){
      let url = "https://t.me/writersplatform"
      window.open(url, '_blank').focus()
    },

    go(code){
      this.$router.push(code)
    },

    goToPage(page_link){
      // this.pagination_links_set = false
      // const data = {
      //   link: page_link
      // }
      this.pagination_links_set = false
      if(this.task){
        const data = this.task
        data.link = page_link
        this.fetchAllAvailableForBiddingPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      } else {
        const data = {
          link: page_link
        }
        this.fetchAllAvailableForBiddingPaginated(data).then((res) => (
          this.pagination_links_set = true
        ))
      }
    },
    toogleFilter(){
      this.filter_open = !this.filter_open
    },
    apply(){
      let question = 'Get '
      if(this.task.unit){
        question = question + this.task.unit
      }
      if(this.task.type){
        question = question + ' ' + this.task.type
      }
      question = question + ' Tasks'

      if(this.task.min_full_pay || this.task.max_full_pay){
        question = question + ' Paying'
        question = question + (this.task.min_full_pay ? ' > ' : ' ') + this.task.min_full_pay + ((this.task.min_full_pay && !this.task.max_full_pay) ? ' KES ' : '')
        question = question + (this.task.max_full_pay ? ' < ' : '') + this.task.max_full_pay + (this.task.max_full_pay ? ' KES ' : '')
      }
      if(confirm(question) == true){
        this.applying = true
        this.fetchAllAvailableForBiddingPaginated(this.task)
        .then((res) => {
        if(res){
          this.filter_open = false
          this.applying = false
        }
      })
      }
    }
  },
  mounted(){
    this.fetchAvailabilityDetails();
    const data = {}
    this.fetchAllAvailableForBiddingPaginated(data).then((res) => (
      this.pagination_links_set = true
    ))
  }
}
</script>
<style lang="css" scoped>
/* .filter{
  min-height: 70vh;
} */

.main-wrapper{
  padding-bottom: 5rem;
  overflow-x: hidden;
}
  
</style>
