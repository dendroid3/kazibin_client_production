<template>
  <div class="pa-0 ma-0">
    <v-row class="align-start mx-0 d-flex align-center grey lighten-1 rounded mt-3 px-2 no-gutters py-2 component-wrapper">
      <v-col class="col-3 d-flex no-gutters justify-start">
        <div>
          <span class="black--text" style="font-weight: 600; font-size: 120%;">
            Bal: <br> {{getDashboadDetails.transactions.balance + " KES"}}
          </span>
        </div>  
      </v-col>
      <v-col class="pa-1 ">
          <v-progress-linear 
            :value="credit_debit"
            :active="true"
            :background-opacity="0.5"
            :bottom="false"
            :buffer-value="100"
            :height="10"
            :indeterminate="false"
            :rounded="true"
            :color="parseInt(getDashboadDetails.transactions.total_debit) > parseInt(getDashboadDetails.transactions.total_credit) ? `green`: 'red'">
              <v-icon small
              class="white--text mx-2">
                mdi-plus
              </v-icon> 
              <span class="white--text">|</span>
              <v-icon small
              class="white--text mx-2">
                mdi-minus
              </v-icon>
          </v-progress-linear> 
          
          <v-progress-linear 
            class="mt-1"
            :value="credit_debit"
            :active="true"
            :background-opacity="0.5"
            :bottom="false"
            :buffer-value="100"
            :height="30"
            :indeterminate="false"
            :color="parseInt(getDashboadDetails.transactions.total_debit) > parseInt(getDashboadDetails.transactions.total_credit) ? `green`: 'red'"
            :rounded="true">
              <span class="white--text mr-2">
                {{getDashboadDetails.transactions.total_debit}}
              </span>
              <span class="white--text">{{" | "}}</span>
              <span class="white--text ml-2">
                {{getDashboadDetails.transactions.total_credit}}
              </span>
          </v-progress-linear> 
          
      </v-col>
      
       <v-col class="col-4 mb-1 rounded pa-1 d-flex no-gutters justify-end">
          <v-btn large class="success elevation-5"  @click="openDepositForm">
            deposit
          </v-btn>
      </v-col>
    </v-row>
    <div class=" lighten-4 d-flex align-center my-4 justify-center" style="position: fixed; z-index: 999; top: 0; right: 0; left: 0; bottom: 0;" v-if="deposit_form">
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
          3. Select Buy Goods and Services
        </span><br>
        <span style="color: #ffffff;">
          4. Input the till number <strong class="red--text white rounded px-1">XXXXXX</strong>
        </span><br>
        <span style="color: #ffffff;">
          6. Input the amount you want to deposit and PIN
        </span><br>
        <span style="color: #ffffff;">
          7. Input the Mpesa Transaction code below here
        </span><br>
        <span style="color: #ffffff;">
          *. The Mpesa Hakikisha name is; <strong class="red--text white rounded px-1">WAZO TANK 2</strong>
        </span><br>
        <v-row class="no-gutters d-flex align-center">
          <v-col class="col-9 d-flex justify-center align-center pa-4">
            <input type="text" placeholder="mpesa transaction code" 
            style="border-radius: 5px; border: solid black 1px; width: 100%;"
            class="px-4 white" v-model="mpesa_transaction_id">
          </v-col>
          <v-col class="col-3 d-flex justify-center pa-4">
            <v-btn small class="green white--text" @click="claim" :disabled="!can_deposit" :loading="claiming">
              Deposit
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="no-gutters d-flex align-center white pa-2">
          <ul>
            <li>
              <span class="link pointer" @click="alert('use_of_money')">What do I need the money for?</span>
            </li>
            <li>
              <span class="link pointer" @click="alert('deposit_from_bank')">Can I deposit from a bank account?</span>
            </li>
            <li>
              <span class="link pointer" @click="alert('coupons')">Do you have coupons?</span>
            </li>
            <li>
              <span class="link pointer" @click="alert('transaction_not_found')">I deposited but my transaction is not found!</span>
            </li>
            <li>
              <span class="link pointer" @click="alert">Refund policy</span>
            </li>
          </ul>
        </v-row>
        <br>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'TransactionsBelt',
  computed:{
    ...mapGetters(['getDashboadDetails', 'getUser']),
    can_deposit(){
      if(this.mpesa_transaction_id.length == 10){
        return true
      }
      return false
    },
    credit_debit(){
      let credit = this.getDashboadDetails.transactions.total_credit
      let debit = this.getDashboadDetails.transactions.total_debit
      let balance = (parseInt(debit) - parseInt(credit))

      if(credit == 0 && debit > 0){
        return 100
      } else if(credit > 0 && debit > 0){
        let percentage = ( balance / debit ) * 100
        return percentage
      } else {
        return 90
      }
    },
  },
  data(){
    return{
      deposit_form: false,
      mpesa_transaction_id: 'The 10 Alphanumeric Code',
      claiming: false
    }
  },
  methods:{
    ...mapActions(['claimTransaction']),
    alert(question){
      switch (question) {
        case 'use_of_money':
          const answer = 'You may spend this money for \n'+
          '1. Bidding on tasks, our bidding taarifs are: \n' +
          '   -10 KES for tasks worth 1 - 1000 KES. \n' +
          '   -20 KES for tasks worth 1001 - 5000 KES. \n' +
          '   -30 KES for tasks worth over 5000 KES. \n\n' +
          '2. Getting your account verified. \n' +
          '   Verification is letting us to confirm your actual identity to boost your credibility on the platform. For this we need: \n' +
          '   -A picture of the front of your ID card. \n' +
          '   -A picture of the back of your ID card. \n' +
          '   -And your selfie. \n' +
          'This infomation is kept offline once the verification is done and is not shared by any third party, read on our privacy policy on our terms and conditions \n' +
          'We charge 500 KES for this process. You do not need to be verified to use this platform, although being verified boasts other users confidence in you.\n\n' +
          '3. To forward your tasks to our Telegram group (in real time) with more than 20000 users. This ensures that it reaches more people faster. Particularly important for urgent tasks. We charge 30 KES for this.\n\n' +
          '4. For buying our login services. To see the charges for the various services go to our services page.'
          alert(answer)
          break;

          case 'deposit_from_bank':
            const answer_2 = 'Yes you can. Deposit the amount to our Equity bank account number: \n' +
            'XXXXXX\n' +
            'Then send a the slip to our support team via the email, deposits@kazibin.com\n' +
            'This process takes at most 72 Hours to reflect on your account, it would be sage if you transfered the amount to your Mpesa and use Mpesa which is virtually instaneous.'
            alert(answer_2) 
          break;

          case 'coupons':
            const answer_3 = 'We currently do not offer coupons but are working to incoporate a refferal system. We will keep you updated on this.'
            alert(answer_3)
          break;

          case 'transaction_not_found':
            const answer_4 = 'We apologise for the inconvince. Ensure that the recieving organisation is Wazo Tank. If indeed it is, contact us immediately on 0705 715 099'
            alert(answer_4)
          break;
      
        default:
          const answer_5 = 'We offer refunds for erronious deposits of over 500 KES. Otherwise, Bid on tasks, you`ll recoup your money in no time. Cheers Mate!'
          alert(answer_5)
          break;
      }
    },
    claim(){
      this.claiming = true
      const data = {
        mpesa_transaction_id: this.mpesa_transaction_id
      }
      this.claimTransaction(data).then((res) => (
        this.claiming = false,
        this.deposit_form = res
      ))
    },
    openDepositForm(){
      this.deposit_form = true
    },
    closeDepositForm(){
      this.deposit_form = false
    },
  },

  mounted() {
    
    let credit = this.getDashboadDetails.transactions.total_credit
    let debit = this.getDashboadDetails.transactions.total_debit
    let total = parseInt(credit) + parseInt(debit)
  },
}
</script>
<style lang="css" scoped>
.component-wrapper{
  border-radius: 5px;
  z-index: 999;
}
.link{
  text-decoration: underline;
  color: blue;
}
</style>