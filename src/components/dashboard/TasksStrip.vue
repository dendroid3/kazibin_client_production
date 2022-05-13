<template lang="html">
  <div class="pa-2 wrapper">
    <span class="head">
      {{task.code}}
      {{': '}}
      {{task.topic}}  

    </span>
     <br>
     
    {{task.unit}} {{task.type}} 
    {{posted_time}} <br>
    {{full_pay }}{{mode_of_payment}} <br>
      <span class="red--text">
        |
      {{"unassigned"}}
        |
      </span>
  </div>
</template>
<script>

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
  name: 'TaskStrip',
  props:[
    'task'
  ],
  computed:{
    mode_of_payment(){
      switch (this.task.pay_day) {
        case '1997-09-17 00:00:00':
          return ' to be paid on approval'
          break;
          
        case '1965-05-28 00:00:00':
          return ' to be paid on delivery'
          break;
      
        default:
          return ' to be paid in ' + dayjs(this.task.pay_day).fromNow(true)
          break;
      }
    },
    full_pay(){
      // return this.task
      if(this.task.pages == null ){
          return this.task.full_pay + ' KES for whole task'

      } else {
          return this.task.pages * this.task.page_cost + ' KES ( ' + this.task.pages + ' @ ' + this.task.page_cost + ' )'
      }
    },
    posted_time(){
      return 'posted ' + dayjs(this.task.created_at).fromNow(true) + ' ago'
    }
  },
  data(){
    return {
      rating:3,
      difficulty: 2
    }
  },
  created(){
    dayjs.extend(relativeTime)
  }
}
</script>
<style lang="css" scoped>
 .head{
    font-size: 1rem;
    font-weight: 800;
  }
 .head::after{
    font-size: 1rem;
    font-weight: 800;
  }
  .wrapper{
    background-color: #e0e0e0;
    border-left: solid red 4px;
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
