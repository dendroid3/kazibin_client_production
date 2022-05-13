<template lang="html">
  <div>
    <div>
      <div class="d-flex grey lighten-1">
        <span class="heading primary-color-text">
          {{`available tasks`}}
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
    <task-strip v-for="(task, i) in getAllTasksAvailableForBidding" :key="i" :task="task" />
    <div class="d-flex py-2 justify-center">
      <v-btn 
      small 
      class="rounded success submit-button">
        <v-icon large>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import TaskStrip from './../../components/home/TaskStrip.vue'
import HeadingTab from './../../components/home/HeadingTab.vue'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Explore',
  components:{TaskStrip, HeadingTab},
  computed:{
    ...mapGetters(['getAllTasksAvailableForBidding', 'getAvailabilityDetails']),
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
  },
  data(){
    return{
      filter_open: false,
      task_types: ['essay', 'report', 'review', 'article', 'blog', 'resumes', 'captioning', 'programming'],
      task: {},
      applying: false
    }
  },
  methods: {
    ...mapActions(['fetchAllAvailableForBidding', 'fetchAvailabilityDetails']),
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
        // alert(this.task.max_full_pay)
        this.fetchAllAvailableForBidding(this.task).then((res) => {
        if(res){
          this.filter_open = false
          this.applying = false
        }
      })
      }
    }
  },
  mounted(){
    this.fetchAvailabilityDetails()
  }
}
</script>
<style lang="css" scoped>
/* .filter{
  min-height: 70vh;
} */
  
</style>
