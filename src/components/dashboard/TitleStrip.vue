<template>
  <v-row class="d-flex grey lighten-2 px-2 py-4" >
    <v-col class="col-8 primary-color-text title d-flex justify-start pointer" @click="goPage()"> 
      {{title}}
    </v-col>
    <v-col class="col-4 d-flex justify-end px-4">
      <v-icon class="mr-4" v-if="add_url" @click="goAdd()">
        mdi-plus
      </v-icon>
      <!-- <v-icon>
        mdi-arrow-right
      </v-icon> -->
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'TitleStrip',
  props: [
    'title', 'icons', 'add_url','page'
  ],
  methods:{
    goAdd(){
      this.$router.push(this.add_url)
    },

    goPage(){
      if(this.page){
        this.$router.push(this.page)
      }
    }
  }
}
</script>
