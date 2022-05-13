<template>
    <v-row class="align-start mx-1 grey lighten-1 rounded mt-3 px-1 no-gutters py-2 component-wrapper">
      <v-col class="col-5 d-flex no-gutters justify-start">
        <div>
          <span class="black--text" style="font-weight: 200; font-size: 90%;">
            Net Bal: 1000 KES
          </span>
          <br>
          <span class="black--text" style="font-weight: 600; font-size: 110%;">
              In Ac: 150 KES
          </span> 
        </div>  
      </v-col>
      <v-col class="pa-1 ">
          <v-progress-linear 
            :value="50"
            :active="true"
            :background-opacity="0.5"
            :bottom="false"
            :buffer-value="100"
            :height="10"
            :indeterminate="false"
            :rounded="true"
            :color="`green`">
              <v-icon small
              class="white--text mx-2">
                mdi-plus
              </v-icon> 
              <span class="white--text">/</span>
              <v-icon small
              class="white--text mx-2">
                mdi-minus
              </v-icon>
          </v-progress-linear> 
          
          <v-progress-linear 
            class="mt-1"
            :value="50"
            :active="true"
            :background-opacity="0.5"
            :bottom="false"
            :buffer-value="100"
            :height="30"
            :indeterminate="false"
            :rounded="true"
            :color="`green`">
              <span class="white--text">
                {{0}}
              </span>
              <span class="white--text">{{" / "}}</span>
              <span class="white--text">
                {{0}}
              </span>
          </v-progress-linear> 
          
      </v-col>
      
       <v-col class="col-4 mb-1 rounded pa-1 d-flex no-gutters justify-end">
          <v-btn large class="success elevation-5">
            deposit
          </v-btn>
      </v-col>
    </v-row>
</template>
<script>
export default {
  name: 'TransactionsBelt'
}
</script>
<style lang="css" scoped>
.component-wrapper{
  border-radius: 5px;
}
  
</style>