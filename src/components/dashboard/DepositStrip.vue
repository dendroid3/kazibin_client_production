<template lang="html">
  <div>
    <div class="transparent lighten-4 full-page d-flex align-center justify-center">
      <div class="grey px-4 py-2 mx-2 rounded">
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
  name: 'DepositStrip'
}
</script>
