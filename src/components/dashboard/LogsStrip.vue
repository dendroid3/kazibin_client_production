<template>
<div class="grey lighten-3 body">
  <v-container>
    <v-timeline
      dense
      clipped
    >
      <v-timeline-item
        v-for="log in Logs"
        :key="log.id"
        class="mb-4 wrapper"
        color="red"
        small
      >
      <v-row class="no-gutters ">
        <v-col class="col-12">
          <b>
          {{log.code}} <span>>=></span>
          </b> 
          <!-- <div class="mx-1">
            {{" || "}}
          </div> -->
          {{log.message}}
        </v-col>
        <v-col class="col-12 d-flex justify-end">
          <b>
          {{log.created_at | diffForHumans}}
          </b>
        </v-col>
      </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</div>
</template>
<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
export default {
  name: 'LogsStrip.vue',
  props: [
    'Logs'
  ],
  filters:{
    diffForHumans: (date) => {
      if(!date){return 'over'}
      return dayjs(date).fromNow(true) + ' ago'
    },
  },
  created(){
    dayjs.extend(relativeTime)
  }
}
</script>
<style scoped>
  .body{
    padding-bottom: 5rem;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  
  .wrapper{
    position: relative;
  }
  .wrapper::after{
    content: '';
    border-bottom: solid 1px white;
    position: absolute;
    bottom: 0;
    width: 80%;
    left: 10%;
  }
</style>
