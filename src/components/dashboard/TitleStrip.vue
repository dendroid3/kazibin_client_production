<template>
  <v-row class="d-flex grey lighten-2 px-2" >
    <v-col class="col-8 primary-color-text title d-flex justify-start"> {{title}}
    </v-col>
    <v-col class="col-4 d-flex justify-end px-4">
      <v-icon class="mr-4" @click="goAdd()">
        mdi-plus
      </v-icon>
      <v-icon>
        mdi-arrow-right
      </v-icon>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'TitleStrip',
  props: [
    'title', 'icons', 'add_url'
  ],
  methods:{
    goAdd(){
      this.$router.push(this.add_url)
    }
  }
}
</script>
