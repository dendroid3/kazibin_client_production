<template>
  <div class="pa-4" style="height: calc(100vh - 50px);">
    <v-row class="no-gutters">
      <v-col class="col-12 pa-4 d-flex justify-center">
        <span @click="go('/')">
          <animated-icon style="height:70px;" />
        </span>
      </v-col>
    </v-row>
    <p class="backg d-flex justify-center heading">
      Verify Email
    </p>
    <v-card
    class="mx-auto primary-color"
    height="350"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4 --text">
          <v-icon large>
            mdi-mail
          </v-icon>
          <h1 class="text-center">
            You've got mail!
          </h1>
        </div>
        <h5 class="--text text-center">{{'Email sent to '}}{{getUser.email}} {{'. Access it to go ahead with this process'}}</h5>
      </v-list-item-content>

    </v-list-item>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        @click="isAlreadyVerified"
        :disabled="checking_if_verified"
        class="blue white--text"
        small
      >
        {{checking_if_verified ? 'checking' : 'Already verified'}}
      </v-btn>
      <v-btn
        @click="resend"
        class="red white--text"
        small
        :loading="resending"
      >
        Resend Email
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>
<script>
import LoaderWidget from '../widgets/LoaderWidget'
import AnimatedIcon from '../widgets/AnimatedIcon.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EmailVerification',
  components:{LoaderWidget, AnimatedIcon},
  computed:{
    ...mapGetters(['getUser'])
  },

  data: () => ({
    checking_if_verified: false,
    resending: false
  }),

  methods:{
    ...mapActions(['checkIfAccountIsVerified', 'resendVerificationEmail']),
    go(code){
      this.$router.push(code)
    },

    resend(){
      this.resending = true
      this.resendVerificationEmail().then(() => (
        this.resending = false
      ))
    },

    isAlreadyVerified(){
      this.checking_if_verified = true
      this.checkIfAccountIsVerified().then(() => (
        this.checking_if_verified = false
      ))
    }
  },
  mounted(){
    // this.verifyEmail()
  }
}
</script>

<style lang="css" scoped>
  
</style>
