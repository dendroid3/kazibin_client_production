<template>
  <v-row class="no-gutters d-flex align-center">
    <v-col class="col-8 d-flex justify-center align-center pa-4">
      <input type="text" placeholder="enter user or job code" 
      v-model="search_code"
      class="px-4 input pa-1">
    </v-col>
    <v-col class="col-4 d-flex justify-center pa-4">
      <v-btn  class="success white--text"
      small 
      :loading="searching"
      @click="search">
        search
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'SearchTab',
  computed: {
    
  },
  data () {
    return {
      search_code: null,
      searching: false
    }
  } ,
  methods: {
    search () {
      console.log('searching')
    }
  }
}
</script>
<style lang="css" scoped>
  .input{
    border-radius: 5px; 
    background-color: white;
    border: solid black 1px;
  }  
</style>
