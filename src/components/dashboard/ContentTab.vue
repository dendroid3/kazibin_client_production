<template>
  <v-col class="col-4 px-1 mb-1">
        <div class="white rounded elevation-1">
          <div class="d-flex justify-center black--text bold">
            {{title}}
          </div>
          <v-divider inset/>
          <div class="d-flex justify-end align-center px-1 black--text">
            <v-icon small class="green--text" v-if="1==2">
              mdi-circle
            </v-icon>
            <v-icon small class="red--text" v-if="1==2">
              mdi-circle
            </v-icon>
            <v-spacer />
            <span> {{count}} </span>
          </div>
          <v-progress-linear
            v-if="loading"
            indeterminate
            rounded
            color="grey darken-2"
            height="1"
          ></v-progress-linear>
         </div>
      </v-col>
</template>
<script>
export default {
  name: 'ContentTab',
  props: [
    'title', 'count', 'loading'
  ]
}
</script>
