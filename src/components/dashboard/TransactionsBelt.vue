<template>
  <div class="pa-0 ma-0">
    <v-row class="align-start mx-0 grey lighten-1 rounded mt-3 px-2 no-gutters py-2 component-wrapper">
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
          <v-btn large class="success elevation-5"  @click="openDepositForm">
            deposit
          </v-btn>
      </v-col>
    </v-row>
    <div class="transparent lighten-4 d-flex align-center my-4 justify-center" v-if="deposit_form">
      <div class="grey px-4 py-2 -2 rounded">
        <div class="d-flex justify-end">
          <v-icon class="pa-4 red--text mb-2" @click="closeDepositForm">
            mdi-close
          </v-icon>
        </div>
        <div class="green--text bold d-flex justify-center white rounded" style=" font-size: 2rem;">
          Deposit From Mpesa
        </div><br>
        <span style="color: #ffffff;">
          1. Go to Mpesa Menu
        </span><br>
        <span style="color: #ffffff;">
          2. Select Lipa na Mpesa
        </span><br>
        <span style="color: #ffffff;">
          3. Select Paybill
        </span><br>
        <span style="color: #ffffff;">
          4. Input the paybil number <strong>123456</strong>
        </span><br>
        <span style="color: #ffffff;">
          5. Input the number you registered with as account number
        </span><br>
        <span style="color: #ffffff;">
          6. Input the amount you want to deposit and PIN
        </span><br>
        <span style="color: #ffffff;">
          7. Input the Mpesa Transaction code below here
        </span><br>
        <v-row class="no-gutters d-flex align-center">
          <v-col class="col-8 d-flex justify-center align-center pa-4">
            <input type="text" placeholder="mpesa transaction code" 
            style="border-radius: 5px; border: solid black 1px;"
            class="px-4 white">
          </v-col>
          <v-col class="col-4 d-flex justify-center pa-4">
            <v-btn small class="green white--text">
              Deposit
            </v-btn>
          </v-col>
        </v-row>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TransactionsBelt',
  data(){
    return{
      deposit_form: false
    }
  },
  methods:{
    openDepositForm(){
      this.deposit_form = true
    },
    closeDepositForm(){
      this.deposit_form = false
    },
  }
}
</script>
<style lang="css" scoped>
.component-wrapper{
  border-radius: 5px;
}
</style>