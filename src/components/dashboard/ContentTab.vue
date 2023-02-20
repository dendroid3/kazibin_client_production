<template>
      <v-col class="col-4 px-1 mb-1 white--text">
        <div class="tomato pointer rounded elevation-10" @click="go">
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
  methods: {
    go(){
      if(this.url){
        this.$router.push('/' +this.url)
      }
    }
  }
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
