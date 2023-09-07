<template>
  <div class="pa-4">
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
    <v-row class="no-gutters">
      <v-col class="col-12 col-md-4"
      :class="{
        'offset-4': ($vuetify.breakpoint.lg || $vuetify.breakpoint.md || $vuetify.breakpoint.xl)
      }">
        <v-card
          class="mx-auto primary-color elevation-2"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <span>
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? 
                If you didn't receive the email, we will gladly send you another.
              </span>
            </v-list-item-content>

          </v-list-item>

          <v-card-actions class="d-flex justify-space-between">
            <v-row class="no-gutters">
              <v-col class="col-8">
                <v-btn
                  @click="resend"
                  :loading="resending"
                  class="blue white--text"
                  small
                  block
                >
              {{resending ? 'resending' : 'Resend Email'}}
            </v-btn>
              </v-col>
              <v-col class="col-4 d-flex justify-end">
                <v-row class="no-gutters">
                  <v-col class="col-6 d-flex justify-center align-center">
                    <a
                      class="mx-1"
                      @click="isAlreadyVerified"
                      v-if="!checking_if_verified"
                    >
                      Verified
                    </a>
                    <v-progress-circular
                        v-if="checking_if_verified"
                        :size="15"
                        :width="2"
                        color="primary"
                        indeterminate
                    >
                    </v-progress-circular>
                  </v-col>
                  <v-col class="col-6 d-flex justify-center align-center">
                    <a
                    class="mx-1"
                    @click="resend"
                    :loading="resending"
                  >
                    Log Out
                  </a>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
