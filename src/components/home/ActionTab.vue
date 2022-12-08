<template>
  <v-card class="mb-1 pa-4 grey lighten-1 rounded" text>
    <v-row class="px-4 rounded">
      <v-col class=" col-10 primary-color"  style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
        <span class="white--text action">
          {{action}}
        </span> <br>
        <span class="white--text">
          {{description}}
        </span>
      </v-col>
      <v-col class="col-2 tomato d-flex align-center justify-center"  style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
        <div class="tomato-bordered pa-1 rounded">
          <v-icon
          class="white rounded black--text pa-1"
          @click="takeAction"
          small
          dark>
            mdi-arrow-right
          </v-icon>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: "ActionTab",
  props: [
    'action',
    'description',
    'route'
  ],
  methods: {
    takeAction () {
      this.$router.push('/' + this.route)
    } 
  }
}
</script>
<style lang="css" scoped>
  .action{
    font-weight: 900;
    font-size: 1.3rem;
  }  
</style>
