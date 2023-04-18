<template>
      <v-col class="col-4 px-1 mb-1 white--text">
        <div class="tomato pointer rounded elevation-10" @click="go" :class="{
          'yellow--text': is_here
        }">
          <div class="d-flex justify-center bold">
            {{title}}
          </div>
          <v-divider inset class="red--text dark" dark/>
          <div class="d-flex justify-end align-center px-1">
            <v-icon x-small class="green--text" v-if="isGreen">
              mdi-circle
            </v-icon>
            <v-icon x-small class="red--text" v-if="isRed">
              mdi-circle
            </v-icon>
            <v-spacer />
            <span> {{count}} </span>
          </div>
          <v-progress-linear
            v-if="loading"
            indeterminate
            rounded
            color="rgb(15,14,56)"
            height="3"
          ></v-progress-linear>
         </div>
      </v-col>
</template>
<script>
export default {
  name: 'ContentTab',
  props: [
    'title', 'count', 'loading', 'url', 'isGreen', 'isRed'
  ],
  watch:{
    $route (to, from){
      const page = this.$router.history.current.name
      console.log(page);
      this.is_here = false

      if(page == 'PostedTasks' && this.title == 'posted'){
        this.is_here = true
      } else if(page == 'TakenTasks' && this.title == 'taken'){
        this.is_here = true
      } else if(page == 'Offers' && this.title == 'offers'){
        this.is_here = true
      } else if(page == 'Bids' && this.title == 'bids'){
        this.is_here = true
      } else if(page == 'Network' && this.title == 'network'){
        this.is_here = true
      } else if(page == 'Requests' && this.title == 'requests'){
        this.is_here = true
      } else if(page == 'Invoice' && this.title == 'invoices'){
        this.is_here = true
      } else if(page == 'Invoice' && this.title == 'invoice'){
        this.is_here = true
      } else if(page == 'Transactions' && this.title == 'transactions'){
        this.is_here = true
      }
    }
  } ,
  data: () => {
    return {
      is_here: false
    }
  },
  methods: {
    go(){
      if(this.url){
        this.$router.push('/' +this.url)
      }
    }
  },

}
</script>

<style lang="css" scoped>
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
</style>
